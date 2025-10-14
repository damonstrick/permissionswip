"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, Check, X, Star } from "lucide-react"
import { ALL_PRODUCTS } from "@/data/mocks"
import { PRODUCT_PACKAGES } from "@/data/packages"
import { PackageTier } from "@/data/types"
import { cn } from "@/lib/utils"
import { ScopeFilterSection } from "@/components/ScopeFilterSection"

// Enterprise customization features
const ENTERPRISE_FEATURES = {
  'analyze': [
    { id: 'traceability', name: 'Traceability', description: 'Track data lineage and audit trails' },
    { id: 'custom-utilization', name: 'Custom Utilization Profile', description: 'Define custom utilization metrics' },
  ],
  'clear-contracts': [
    { id: 'neural-indexing', name: 'Enable Neural Indexing', description: 'Advanced AI-powered document indexing' },
    { id: 'auto-indexing', name: 'Enable Auto Indexing', description: 'Automatic document classification and tagging' },
    { id: 'auto-extract-rates', name: 'Auto Extract Rate Tables', description: 'Automatically extract rate information from contracts' },
    { id: 'ai-context', name: 'Enable AI Context', description: 'AI-powered contract analysis and insights' },
    { id: 'redacto', name: 'Enable Redacto', description: 'Automated document redaction capabilities' },
    { id: 'tag-approval-workflow', name: 'Clear Contracts Tag Approval Workflow', description: 'Workflow for approving document tags' },
    { id: 'claims-data-schema', name: 'Claims Data Schema', description: 'Structured claims data processing' },
    { id: 'custom-tag-templates', name: 'Clear Contracts Custom Tag Templates Only', description: 'Use only custom tag templates' },
  ],
}

export default function ProductPackagesPage() {
  const params = useParams()
  const orgId = params.orgId as string
  const productKey = params.productKey as string
  
  const [selectedTier, setSelectedTier] = useState<PackageTier>('enterprise')
  const [seats, setSeats] = useState(10)
  const [enabledFeatures, setEnabledFeatures] = useState<Set<string>>(new Set(['traceability']))
  const [scopeProviders, setScopeProviders] = useState<any[]>([])
  const [scopePayers, setScopePayers] = useState<any[]>([])
  const [scopeStates, setScopeStates] = useState<any[]>([])
  const [scopeContractTypes, setScopeContractTypes] = useState<any[]>([])
  const [showChangePlanModal, setShowChangePlanModal] = useState(false)
  
  const product = ALL_PRODUCTS.find(p => p.key === productKey)
  const packages = PRODUCT_PACKAGES[productKey as keyof typeof PRODUCT_PACKAGES] || []
  const enterpriseFeatures = ENTERPRISE_FEATURES[productKey as keyof typeof ENTERPRISE_FEATURES] || []
  const currentPackage = packages.find(pkg => pkg.tier === selectedTier)

  const handleSelectPackage = (tier: PackageTier) => {
    setSelectedTier(tier)
    setShowChangePlanModal(false)
    // In real app, this would save to backend
    console.log(`Selected ${tier} package for ${productKey}`)
  }

  const handleToggleFeature = (featureId: string) => {
    const newFeatures = new Set(enabledFeatures)
    if (newFeatures.has(featureId)) {
      newFeatures.delete(featureId)
    } else {
      newFeatures.add(featureId)
    }
    setEnabledFeatures(newFeatures)
  }

  const breadcrumbItems = [
    { label: "Products", href: `/org/${orgId}/products` },
    { label: product?.name || "Product" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/org/${orgId}/products`}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-semibold text-neutral-900">
                  {product?.name} Packages
                </h1>
                <p className="text-neutral-600">
                  Choose the right package for your organization
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Package */}
      {currentPackage && (
        <Card className="relative transition-all hover:shadow-lg">
          {currentPackage.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="bg-neutral-900 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Star className="h-3 w-3 fill-white" />
                Most Popular
              </div>
            </div>
          )}
          
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">{currentPackage.name}</CardTitle>
            <p className="text-sm text-neutral-500 mt-2">{currentPackage.description}</p>
            
            <div className="mt-4">
              <div className="text-3xl font-bold text-neutral-900">{currentPackage.price}</div>
              {currentPackage.billingPeriod && (
                <div className="text-sm text-neutral-500">{currentPackage.billingPeriod}</div>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Limits */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Users:</span>
                <span className="font-medium text-neutral-900">{currentPackage.limits.users}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Data Export:</span>
                <span className="font-medium text-neutral-900">
                  {typeof currentPackage.limits.dataExport === 'number' 
                    ? `${currentPackage.limits.dataExport.toLocaleString()}` 
                    : currentPackage.limits.dataExport}
                </span>
              </div>
              {currentPackage.limits.apiCalls !== undefined && (
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">API Calls:</span>
                  <span className="font-medium text-neutral-900">
                    {typeof currentPackage.limits.apiCalls === 'number'
                      ? `${currentPackage.limits.apiCalls.toLocaleString()}/mo`
                      : currentPackage.limits.apiCalls}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Storage:</span>
                <span className="font-medium text-neutral-900">{currentPackage.limits.storage}</span>
              </div>
            </div>

            {/* Change Plan Button */}
            <Dialog open={showChangePlanModal} onOpenChange={setShowChangePlanModal}>
              <DialogTrigger asChild>
                <Button className="w-full mt-4" variant="outline">
                  Change Plan
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Choose a Package</DialogTitle>
                </DialogHeader>
                <div className="space-y-8">
                  {/* Package Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {packages.map((pkg) => (
                      <Card 
                        key={pkg.tier}
                        className={cn(
                          "relative transition-all hover:shadow-lg cursor-pointer",
                          selectedTier === pkg.tier && "ring-2 ring-neutral-900",
                          pkg.popular && "border-neutral-900"
                        )}
                        onClick={() => handleSelectPackage(pkg.tier)}
                      >
                        {pkg.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <div className="bg-neutral-900 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                              <Star className="h-3 w-3 fill-white" />
                              Most Popular
                            </div>
                          </div>
                        )}
                        
                        <CardHeader className="text-center pb-4">
                          <CardTitle className="text-xl">{pkg.name}</CardTitle>
                          <p className="text-sm text-neutral-500 mt-2">{pkg.description}</p>
                          
                          <div className="mt-4">
                            <div className="text-3xl font-bold text-neutral-900">{pkg.price}</div>
                            {pkg.billingPeriod && (
                              <div className="text-sm text-neutral-500">{pkg.billingPeriod}</div>
                            )}
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          {/* Limits */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-neutral-600">Users:</span>
                              <span className="font-medium text-neutral-900">{pkg.limits.users}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-neutral-600">Data Export:</span>
                              <span className="font-medium text-neutral-900">
                                {typeof pkg.limits.dataExport === 'number' 
                                  ? `${pkg.limits.dataExport.toLocaleString()}` 
                                  : pkg.limits.dataExport}
                              </span>
                            </div>
                            {pkg.limits.apiCalls !== undefined && (
                              <div className="flex justify-between text-sm">
                                <span className="text-neutral-600">API Calls:</span>
                                <span className="font-medium text-neutral-900">
                                  {typeof pkg.limits.apiCalls === 'number'
                                    ? `${pkg.limits.apiCalls.toLocaleString()}/mo`
                                    : pkg.limits.apiCalls}
                                </span>
                              </div>
                            )}
                            <div className="flex justify-between text-sm">
                              <span className="text-neutral-600">Storage:</span>
                              <span className="font-medium text-neutral-900">{pkg.limits.storage}</span>
                            </div>
                          </div>

                          {/* Select Button */}
                          <Button 
                            className="w-full mt-4"
                            variant={selectedTier === pkg.tier ? "default" : "outline"}
                            onClick={() => handleSelectPackage(pkg.tier)}
                          >
                            {selectedTier === pkg.tier ? 'Current Package' : 'Select Package'}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Feature Comparison Table */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Feature Comparison</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="border-b bg-neutral-50">
                            <tr>
                              <th className="text-left p-4 font-medium text-neutral-700">Feature</th>
                              <th className="text-center p-4 font-medium text-neutral-700">Community</th>
                              <th className="text-center p-4 font-medium text-neutral-700">Pro</th>
                              <th className="text-center p-4 font-medium text-neutral-700">Enterprise</th>
                            </tr>
                          </thead>
                          <tbody>
                            {packages[0]?.features.map((feature, idx) => (
                              <tr key={feature.id} className="border-b hover:bg-neutral-50">
                                <td className="p-4 text-sm text-neutral-900">{feature.name}</td>
                                <td className="p-4 text-center">
                                  {packages[0].features[idx].included ? (
                                    <Check className="h-4 w-4 text-green-600 mx-auto" />
                                  ) : (
                                    <X className="h-4 w-4 text-neutral-300 mx-auto" />
                                  )}
                                </td>
                                <td className="p-4 text-center">
                                  {packages[1].features[idx].included ? (
                                    <Check className="h-4 w-4 text-green-600 mx-auto" />
                                  ) : (
                                    <X className="h-4 w-4 text-neutral-300 mx-auto" />
                                  )}
                                </td>
                                <td className="p-4 text-center">
                                  {packages[2].features[idx].included ? (
                                    <Check className="h-4 w-4 text-green-600 mx-auto" />
                                  ) : (
                                    <X className="h-4 w-4 text-neutral-300 mx-auto" />
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}

      {/* Enterprise Customization */}
      {selectedTier === 'enterprise' && (
        <>
          {/* Features Customization */}
          <Card>
            <CardHeader>
              <CardTitle>Customize Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {enterpriseFeatures.map((feature) => (
                <div key={feature.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex-1">
                    <div className="font-medium text-neutral-900">{feature.name}</div>
                    <div className="text-sm text-neutral-500">{feature.description}</div>
                  </div>
                  <Switch
                    checked={enabledFeatures.has(feature.id)}
                    onCheckedChange={() => handleToggleFeature(feature.id)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Seats Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Seats Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Number of Seats</label>
                <p className="text-xs text-neutral-500">Define the number of concurrent user licenses</p>
                <Input
                  type="number"
                  value={seats}
                  onChange={(e) => setSeats(parseInt(e.target.value) || 0)}
                  className="w-32"
                  min="1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Data Scope */}
          <Card>
            <CardHeader>
              <CardTitle>Data Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-neutral-900">Clear Rates</h4>
                    <p className="text-sm text-neutral-500">Filter what data enters the product</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-4 pl-4 border-l-2 border-neutral-200">
                  <ScopeFilterSection
                    title="Providers"
                    scopeType="providers"
                    selectedFilters={scopeProviders}
                    onUpdateFilters={setScopeProviders}
                  />

                  <ScopeFilterSection
                    title="Payers"
                    scopeType="payers"
                    selectedFilters={scopePayers}
                    onUpdateFilters={setScopePayers}
                  />

                  <ScopeFilterSection
                    title="States"
                    scopeType="states"
                    selectedFilters={scopeStates}
                    onUpdateFilters={setScopeStates}
                  />

                  <ScopeFilterSection
                    title="Contract Types"
                    scopeType="contractTypes"
                    selectedFilters={scopeContractTypes}
                    onUpdateFilters={setScopeContractTypes}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Add-ons Section */}
      <Card>
        <CardHeader>
          <CardTitle>Available Add-ons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-neutral-900">Additional Users</h4>
                <span className="text-sm text-neutral-500">$10/user/month</span>
              </div>
              <p className="text-sm text-neutral-600 mb-3">
                Expand your team beyond your package limit
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Add Users
              </Button>
            </div>

            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-neutral-900">Increased Data Export</h4>
                <span className="text-sm text-neutral-500">$99/month</span>
              </div>
              <p className="text-sm text-neutral-600 mb-3">
                +100k records per month export limit
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Add Export Capacity
              </Button>
            </div>

            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-neutral-900">API Rate Increase</h4>
                <span className="text-sm text-neutral-500">$149/month</span>
              </div>
              <p className="text-sm text-neutral-600 mb-3">
                +50k API calls per month
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Increase API Limit
              </Button>
            </div>

            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-neutral-900">Premium Support</h4>
                <span className="text-sm text-neutral-500">$299/month</span>
              </div>
              <p className="text-sm text-neutral-600 mb-3">
                24/7 phone support with 1-hour SLA
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Upgrade Support
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>


      {/* Contact Enterprise */}
      {selectedTier === 'enterprise' && (
        <Card className="border-neutral-900 bg-neutral-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                  Ready for Enterprise?
                </h3>
                <p className="text-sm text-neutral-600">
                  Contact our sales team to discuss custom pricing and requirements
                </p>
              </div>
              <Button>Contact Sales</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

