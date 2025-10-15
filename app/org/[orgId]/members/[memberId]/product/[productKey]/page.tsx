"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, X, Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { CollapsibleSection } from "@/components/CollapsibleSection"
import { ScopeFilterSection } from "@/components/ScopeFilterSection"
import { useMemberStore } from "@/store/memberStore"
import { useProductStore } from "@/store/productStore"
import { ProductConfiguration, Permission, ProductPreference } from "@/data/types"
import { ORG } from "@/data/mocks"
import { CLEAR_CONTRACTS_PERMISSIONS, ANALYZE_PERMISSIONS, CODE_TYPE_CROSSWALKS } from "@/data/productMocks"

export default function ProductPermissionPage() {
  const params = useParams()
  const { member } = useMemberStore()
  const { getConfiguration, updateScope, updateCrosswalks, updatePermissions, updatePreferences } = useProductStore()
  const productKey = params.productKey as string
  
  const [permissionSearch, setPermissionSearch] = useState("")
  const [activeTab, setActiveTab] = useState<'features' | 'preferences'>('preferences')
  
  const productConfig = getConfiguration(productKey)

  if (!productConfig) {
    return <div>Product not found</div>
  }

  const breadcrumbItems = [
    { label: "Members", href: `/org/${member.orgId}/members` },
    { label: member.name, href: `/org/${member.orgId}/members/${member.id}` },
    { label: "Product Permissions" },
  ]

  const allPermissions = productKey === 'clear-contracts' ? CLEAR_CONTRACTS_PERMISSIONS : ANALYZE_PERMISSIONS
  const filteredPermissions = allPermissions.filter(permission =>
    `${permission.action} ${permission.item}`.toLowerCase().includes(permissionSearch.toLowerCase())
  )

  const handleAddPermission = (permission: Permission) => {
    const currentPermissions = productConfig.permissions.permissions
    if (!currentPermissions.some(p => p.id === permission.id)) {
      updatePermissions(productKey, [...currentPermissions, permission])
    }
  }

  const handleRemovePermission = (permissionId: string) => {
    const currentPermissions = productConfig.permissions.permissions
    updatePermissions(productKey, currentPermissions.filter(p => p.id !== permissionId))
  }

  const handleCrosswalkChange = (crosswalkId: string) => {
    updateCrosswalks(productKey, [crosswalkId])
  }

  const handlePreferenceChange = (prefId: string, value: any) => {
    const updatedPreferences = productConfig.preferences.preferences.map(pref =>
      pref.id === prefId ? { ...pref, value } : pref
    )
    updatePreferences(productKey, {
      ...productConfig.preferences,
      preferences: updatedPreferences
    })
  }

  const handleFeatureChange = (featureId: string, value: boolean) => {
    const updatedFeatures = productConfig.preferences.features.map(feature =>
      feature.id === featureId ? { ...feature, value } : feature
    )
    updatePreferences(productKey, {
      ...productConfig.preferences,
      features: updatedFeatures
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/org/${member.orgId}/members/${member.id}`}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <Breadcrumbs items={breadcrumbItems} />
                <h1 className="text-2xl font-semibold text-neutral-900 mt-2">
                  {productConfig.name}
                </h1>
              </div>
            </div>
            <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
              <X className="h-4 w-4 mr-2" />
              Revoke Access
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {/* Scope Section */}
        <Card>
          <CardHeader>
            <CardTitle>Scope</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ScopeFilterSection
              title="Providers"
              scopeType="providers"
              selectedFilters={productConfig.scope.providers}
              onUpdateFilters={(filters) => updateScope(productKey, 'providers', filters)}
            />
            
            <ScopeFilterSection
              title="Payers"
              scopeType="payers"
              selectedFilters={productConfig.scope.payers}
              onUpdateFilters={(filters) => updateScope(productKey, 'payers', filters)}
            />
            
            <ScopeFilterSection
              title="Payer Networks"
              scopeType="payerNetworks"
              selectedFilters={productConfig.scope.payerNetworks}
              onUpdateFilters={(filters) => updateScope(productKey, 'payerNetworks', filters)}
            />
            
            <ScopeFilterSection
              title="States"
              scopeType="states"
              selectedFilters={productConfig.scope.states}
              onUpdateFilters={(filters) => updateScope(productKey, 'states', filters)}
            />

            {/* Contract Filters */}
            <CollapsibleSection title="Contract Filters">
              <div className="space-y-4">
                <ScopeFilterSection
                  title="Contract Types"
                  scopeType="contractTypes"
                  selectedFilters={productConfig.scope.contractTypes}
                  onUpdateFilters={(filters) => updateScope(productKey, 'contractTypes', filters)}
                />
                
                <ScopeFilterSection
                  title="Plans"
                  scopeType="plans"
                  selectedFilters={productConfig.scope.plans}
                  onUpdateFilters={(filters) => updateScope(productKey, 'plans', filters)}
                />
                
                <ScopeFilterSection
                  title="Labels"
                  scopeType="labels"
                  selectedFilters={productConfig.scope.labels}
                  onUpdateFilters={(filters) => updateScope(productKey, 'labels', filters)}
                />
              </div>
            </CollapsibleSection>

            {/* Advanced Contract Filters */}
            <CollapsibleSection title="Advanced Contract Filters">
              <div className="space-y-4">
                <ScopeFilterSection
                  title="Providers"
                  scopeType="providers"
                  selectedFilters={productConfig.scope.providers.filter(p => p.name === 'Banner')}
                  onUpdateFilters={(filters) => {
                    const otherProviders = productConfig.scope.providers.filter(p => p.name !== 'Banner')
                    updateScope(productKey, 'providers', [...otherProviders, ...filters])
                  }}
                />
                
                <ScopeFilterSection
                  title="Document Type"
                  scopeType="documentTypes"
                  selectedFilters={productConfig.scope.documentTypes}
                  onUpdateFilters={(filters) => updateScope(productKey, 'documentTypes', filters)}
                />
              </div>
            </CollapsibleSection>

            {/* Service & Billing Filters */}
            <CollapsibleSection title="Service & Billing Filters">
              <div className="space-y-4">
                <ScopeFilterSection
                  title="Services"
                  scopeType="services"
                  selectedFilters={productConfig.scope.services}
                  onUpdateFilters={(filters) => updateScope(productKey, 'services', filters)}
                />
                
              </div>
            </CollapsibleSection>

            {/* Summary */}
            <div className="border-t border-neutral-200 pt-6">
              <div className="rounded-md bg-neutral-100 p-4">
                <p className="text-sm text-neutral-700">
                  <strong>Summary:</strong> John Smith can contracts from Aetna, Cigna in CA, NY.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Permissions Section */}
        <Card>
          <CardHeader>
            <CardTitle>Permissions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                placeholder="Search For a Permission to Add"
                value={permissionSearch}
                onChange={(e) => setPermissionSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {permissionSearch && filteredPermissions.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs text-neutral-500">Available permissions:</p>
                {filteredPermissions.slice(0, 3).map((permission) => (
                  <button
                    key={permission.id}
                    onClick={() => handleAddPermission(permission)}
                    className="block w-full rounded-md border border-neutral-200 p-2 text-left hover:bg-neutral-50 transition-colors"
                  >
                    <div className="text-sm font-medium text-neutral-900">
                      {permission.action} {permission.item}
                    </div>
                    <div className="text-xs text-neutral-500">{permission.description}</div>
                  </button>
                ))}
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {productConfig.permissions.permissions.map((permission) => (
                <div
                  key={permission.id}
                  className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1 text-sm text-neutral-700"
                >
                  <span>{permission.action} {permission.item}</span>
                  <button 
                    onClick={() => handleRemovePermission(permission.id)}
                    className="flex h-4 w-4 items-center justify-center rounded-full hover:bg-neutral-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Preferences & Features Section */}
        <Card>
          <CardHeader>
            <CardTitle>Preferences & Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex border-b border-neutral-200">
              <button 
                onClick={() => setActiveTab('features')}
                className={`px-4 py-2 text-sm font-medium border-b-2 ${
                  activeTab === 'features' 
                    ? 'text-neutral-900 border-neutral-900' 
                    : 'text-neutral-500 border-transparent'
                }`}
              >
                Features
              </button>
              <button 
                onClick={() => setActiveTab('preferences')}
                className={`px-4 py-2 text-sm font-medium border-b-2 ${
                  activeTab === 'preferences' 
                    ? 'text-neutral-900 border-neutral-900' 
                    : 'text-neutral-500 border-transparent'
                }`}
              >
                Preferences
              </button>
            </div>
            <div className="pt-4">
              {activeTab === 'preferences' ? (
                <div className="space-y-6">
                  {/* Code Type Crosswalks */}
                  <div>
                    <h4 className="text-sm font-medium text-neutral-700 mb-3">Code Type Crosswalks</h4>
                    <RadioGroup
                      value={productConfig.scope.selectedCrosswalks[0] || ''}
                      onValueChange={handleCrosswalkChange}
                      className="space-y-3"
                    >
                      {productConfig.scope.codeTypeCrosswalks.map((crosswalk) => (
                        <label key={crosswalk.id} className="flex items-start gap-3 cursor-pointer">
                          <RadioGroupItem value={crosswalk.id} />
                          <div>
                            <div className="text-sm font-medium text-neutral-900">{crosswalk.name}</div>
                            <div className="text-xs text-neutral-500">{crosswalk.description}</div>
                          </div>
                        </label>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Other Preferences */}
                  <div className="space-y-3">
                    {productConfig.preferences.preferences.map((pref) => (
                      <div key={pref.id} className="flex items-start gap-3">
                        {pref.type === 'boolean' ? (
                          <>
                            <input
                              type="checkbox"
                              id={pref.id}
                              checked={pref.value as boolean}
                              onChange={(e) => handlePreferenceChange(pref.id, e.target.checked)}
                              className="mt-0.5 h-4 w-4 rounded border-neutral-300 cursor-pointer"
                            />
                            <label htmlFor={pref.id} className="flex-1 text-sm text-neutral-900 cursor-pointer">
                              {pref.name}
                            </label>
                          </>
                        ) : pref.type === 'number' ? (
                          <div className="flex-1">
                            <label className="text-sm font-medium text-neutral-900">{pref.name}</label>
                            <Input
                              type="number"
                              value={pref.value as number}
                              onChange={(e) => handlePreferenceChange(pref.id, parseInt(e.target.value) || 0)}
                              className="mt-1 w-32"
                            />
                          </div>
                        ) : (
                          <div className="flex-1">
                            <label className="text-sm font-medium text-neutral-900">{pref.name}</label>
                            <Input
                              type="text"
                              value={pref.value as string}
                              onChange={(e) => handlePreferenceChange(pref.id, e.target.value)}
                              className="mt-1"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {productConfig.preferences.features.map((feature) => (
                    <div key={feature.id} className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id={feature.id}
                        checked={feature.value as boolean}
                        onChange={(e) => handleFeatureChange(feature.id, e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-neutral-300 cursor-pointer"
                      />
                      <label htmlFor={feature.id} className="flex-1 text-sm text-neutral-900 cursor-pointer">
                        {feature.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Notifications & Communication Section */}
        <CollapsibleSection title="Notifications & Communication" defaultOpen={false}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-neutral-900">Email Notifications</div>
                <div className="text-xs text-neutral-500">Receive updates via email</div>
              </div>
              <div className="text-sm text-neutral-600">Enabled</div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-neutral-900">In-App Notifications</div>
                <div className="text-xs text-neutral-500">Show notifications in the application</div>
              </div>
              <div className="text-sm text-neutral-600">Enabled</div>
            </div>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  )
}
