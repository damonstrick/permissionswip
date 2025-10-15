"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Users, X, Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { CollapsibleSection } from "@/components/CollapsibleSection"
import { ScopeFilterSection } from "@/components/ScopeFilterSection"
import { Chip } from "@/components/Chip"
import { useProductStore } from "@/store/productStore"
import { ORG, ALL_GROUPS } from "@/data/mocks"
import { CLEAR_CONTRACTS_PERMISSIONS, ANALYZE_PERMISSIONS, CODE_TYPE_CROSSWALKS } from "@/data/productMocks"

export default function GroupDetailPage() {
  const params = useParams()
  const orgId = params.orgId as string
  const groupId = params.groupId as string
  
  const group = ALL_GROUPS.find(g => g.id === groupId)
  const { getConfiguration, updateScope, updateCrosswalks, updatePermissions } = useProductStore()

  // Permission search state
  const [ccPermissionSearch, setCcPermissionSearch] = useState("")
  const [analyzePermissionSearch, setAnalyzePermissionSearch] = useState("")

  if (!group) {
    return <div>Group not found</div>
  }

  // Get configurations for the products this group has access to
  const clearContractsConfig = group.products.includes('clear-contracts') ? getConfiguration('clear-contracts') : null
  const analyzeConfig = group.products.includes('analyze') ? getConfiguration('analyze') : null

  // Filter available permissions
  const availableCCPermissions = CLEAR_CONTRACTS_PERMISSIONS.filter(
    p => !clearContractsConfig?.permissions.permissions.some(cp => cp.id === p.id) &&
         (p.action.toLowerCase().includes(ccPermissionSearch.toLowerCase()) ||
          p.item.toLowerCase().includes(ccPermissionSearch.toLowerCase()))
  )

  const availableAnalyzePermissions = ANALYZE_PERMISSIONS.filter(
    p => !analyzeConfig?.permissions.permissions.some(ap => ap.id === p.id) &&
         (p.action.toLowerCase().includes(analyzePermissionSearch.toLowerCase()) ||
          p.item.toLowerCase().includes(analyzePermissionSearch.toLowerCase()))
  )

  const breadcrumbItems = [
    { label: "Organizations", href: "/admin/organizations" },
    { label: ORG.name, href: `/org/${orgId}` },
    { label: "Groups", href: `/org/${orgId}/groups` },
    { label: group.name },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Link href={`/org/${orgId}/groups`}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <Breadcrumbs items={breadcrumbItems} />
              <h1 className="text-2xl font-semibold text-neutral-900 mt-2">
                {group.name}
              </h1>
              <p className="text-neutral-600 mt-1">{group.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Group Info */}
      <Card>
        <CardHeader>
          <CardTitle>Group Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-neutral-700">Members</label>
              <p className="text-sm text-neutral-900 mt-1">{group.memberCount} members</p>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700">Last Updated</label>
              <p className="text-sm text-neutral-900 mt-1">{group.lastUpdated}</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700">Products</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {group.products.map((product) => (
                <span
                  key={product}
                  className="inline-flex items-center px-2 py-1 rounded-md bg-neutral-100 text-xs text-neutral-700"
                >
                  {product === 'clear-contracts' ? 'Clear Contracts' : 'Analyze'}
                </span>
              ))}
            </div>
          </div>
          <div>
            <Link href={`/org/${orgId}/groups/${groupId}/members`}>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                View All Members
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Clear Contracts Configuration */}
      {clearContractsConfig && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900">Clear Contracts Configuration</h2>
          
          {/* Scope Section */}
          <Card>
            <CardHeader>
              <CardTitle>Scope</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <CollapsibleSection title="Data Filters" defaultOpen>
                <div className="space-y-4">
                  <ScopeFilterSection
                    title="Providers"
                    scopeType="providers"
                    selectedFilters={clearContractsConfig.scope.providers}
                    onUpdateFilters={(filters) => updateScope('clear-contracts', 'providers', filters)}
                  />
                  
                  <ScopeFilterSection
                    title="Payers"
                    scopeType="payers"
                    selectedFilters={clearContractsConfig.scope.payers}
                    onUpdateFilters={(filters) => updateScope('clear-contracts', 'payers', filters)}
                  />

                  <ScopeFilterSection
                    title="States"
                    scopeType="states"
                    selectedFilters={clearContractsConfig.scope.states}
                    onUpdateFilters={(filters) => updateScope('clear-contracts', 'states', filters)}
                  />
                  
                  <ScopeFilterSection
                    title="Contract Types"
                    scopeType="contractTypes"
                    selectedFilters={clearContractsConfig.scope.contractTypes}
                    onUpdateFilters={(filters) => updateScope('clear-contracts', 'contractTypes', filters)}
                  />
                </div>
              </CollapsibleSection>

              <CollapsibleSection title="Code Type Crosswalks">
                <RadioGroup
                  value={clearContractsConfig.scope.selectedCrosswalks[0] || ''}
                  onValueChange={(value) => updateCrosswalks('clear-contracts', [value])}
                >
                  {CODE_TYPE_CROSSWALKS.map((crosswalk) => (
                    <div key={crosswalk.id} className="flex items-center space-x-2 py-2">
                      <RadioGroupItem value={crosswalk.id} id={`cc-${crosswalk.id}`} />
                      <label htmlFor={`cc-${crosswalk.id}`} className="flex-1 cursor-pointer">
                        <div className="font-medium text-sm">{crosswalk.name}</div>
                        <div className="text-xs text-neutral-500">{crosswalk.description}</div>
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </CollapsibleSection>
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
                  placeholder="Search permissions..."
                  value={ccPermissionSearch}
                  onChange={(e) => setCcPermissionSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              {ccPermissionSearch && availableCCPermissions.length > 0 && (
                <div className="space-y-2 max-h-48 overflow-y-auto border rounded-md p-2">
                  {availableCCPermissions.slice(0, 10).map((permission) => (
                    <button
                      key={permission.id}
                      onClick={() => {
                        updatePermissions('clear-contracts', [
                          ...clearContractsConfig.permissions.permissions,
                          permission
                        ])
                        setCcPermissionSearch("")
                      }}
                      className="w-full text-left p-2 hover:bg-neutral-50 rounded-md border border-neutral-200"
                    >
                      <div className="text-sm font-medium">{permission.action} - {permission.item}</div>
                      <div className="text-xs text-neutral-500">{permission.category}</div>
                    </button>
                  ))}
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium text-neutral-700 mb-2">Applied Permissions</h4>
                <div className="flex flex-wrap gap-2">
                  {clearContractsConfig.permissions.permissions.map((permission) => (
                    <Chip
                      key={permission.id}
                      onRemove={() => {
                        updatePermissions(
                          'clear-contracts',
                          clearContractsConfig.permissions.permissions.filter(p => p.id !== permission.id)
                        )
                      }}
                    >
                      {`${permission.action} - ${permission.item}`}
                    </Chip>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences Section */}
          <Card>
            <CardHeader>
              <CardTitle>Preferences & Features</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-500">
                Configure product-specific preferences and feature toggles for this group
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Analyze Configuration */}
      {analyzeConfig && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900">Analyze Configuration</h2>
          
          {/* Scope Section */}
          <Card>
            <CardHeader>
              <CardTitle>Scope</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <CollapsibleSection title="Data Filters" defaultOpen>
                <div className="space-y-4">
                  <ScopeFilterSection
                    title="Providers"
                    scopeType="providers"
                    selectedFilters={analyzeConfig.scope.providers}
                    onUpdateFilters={(filters) => updateScope('analyze', 'providers', filters)}
                  />
                  
                  <ScopeFilterSection
                    title="Payers"
                    scopeType="payers"
                    selectedFilters={analyzeConfig.scope.payers}
                    onUpdateFilters={(filters) => updateScope('analyze', 'payers', filters)}
                  />

                  <ScopeFilterSection
                    title="Services"
                    scopeType="services"
                    selectedFilters={analyzeConfig.scope.services}
                    onUpdateFilters={(filters) => updateScope('analyze', 'services', filters)}
                  />
                </div>
              </CollapsibleSection>
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
                  placeholder="Search permissions..."
                  value={analyzePermissionSearch}
                  onChange={(e) => setAnalyzePermissionSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              {analyzePermissionSearch && availableAnalyzePermissions.length > 0 && (
                <div className="space-y-2 max-h-48 overflow-y-auto border rounded-md p-2">
                  {availableAnalyzePermissions.slice(0, 10).map((permission) => (
                    <button
                      key={permission.id}
                      onClick={() => {
                        updatePermissions('analyze', [
                          ...analyzeConfig.permissions.permissions,
                          permission
                        ])
                        setAnalyzePermissionSearch("")
                      }}
                      className="w-full text-left p-2 hover:bg-neutral-50 rounded-md border border-neutral-200"
                    >
                      <div className="text-sm font-medium">{permission.action} - {permission.item}</div>
                      <div className="text-xs text-neutral-500">{permission.category}</div>
                    </button>
                  ))}
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium text-neutral-700 mb-2">Applied Permissions</h4>
                <div className="flex flex-wrap gap-2">
                  {analyzeConfig.permissions.permissions.map((permission) => (
                    <Chip
                      key={permission.id}
                      onRemove={() => {
                        updatePermissions(
                          'analyze',
                          analyzeConfig.permissions.permissions.filter(p => p.id !== permission.id)
                        )
                      }}
                    >
                      {`${permission.action} - ${permission.item}`}
                    </Chip>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences Section */}
          <Card>
            <CardHeader>
              <CardTitle>Preferences & Features</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-500">
                Configure product-specific preferences and feature toggles for this group
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
