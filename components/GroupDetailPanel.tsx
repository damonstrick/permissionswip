"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { X, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CollapsibleSection } from "@/components/CollapsibleSection"
import { Chip } from "@/components/Chip"
import { Group } from "@/data/types"
import { ALL_PRODUCTS } from "@/data/mocks"
import { useProductStore } from "@/store/productStore"

interface GroupDetailPanelProps {
  group: Group
  orgId: string
  onClose: () => void
}

export function GroupDetailPanel({ group, orgId, onClose }: GroupDetailPanelProps) {
  const { getConfiguration } = useProductStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const panelContent = (
    <div className="fixed inset-y-0 right-0 w-[450px] bg-white border-l border-neutral-200 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300 z-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-neutral-200 p-4 flex items-start justify-between z-10">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-neutral-900">{group.name}</h2>
          <p className="text-xs text-neutral-500 mt-1">{group.description}</p>
          <p className="text-xs text-neutral-500 mt-1">{group.memberCount} members</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* View Full Details Link */}
        <Link href={`/org/${orgId}/groups/${group.id}`} onClick={onClose}>
          <Button variant="outline" className="w-full" size="sm">
            View Full Details
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>

        {/* Products Overview */}
        <div className="space-y-4">
          {group.products.map((productKey) => {
            const product = ALL_PRODUCTS.find(p => p.key === productKey)
            const config = getConfiguration(productKey)
            
            if (!product || !config) return null

            return (
              <div key={productKey} className="border border-neutral-200 rounded-md">
                {/* Product Header */}
                <div className="bg-neutral-50 p-3 border-b border-neutral-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-neutral-900 text-sm">{product.name}</h3>
                    <Link href={`/org/${orgId}/groups/${group.id}`} onClick={onClose}>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        Edit
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-3 space-y-3">
                  {/* Scope */}
                  <CollapsibleSection title="Scope" defaultOpen={false}>
                    <div className="space-y-2 text-xs">
                      {config.scope.providers.length > 0 && (
                        <div>
                          <span className="font-medium text-neutral-700">Providers:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {config.scope.providers.slice(0, 3).map((provider) => (
                              <span key={provider.id} className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded">
                                {provider.name}
                              </span>
                            ))}
                            {config.scope.providers.length > 3 && (
                              <span className="px-2 py-0.5 text-neutral-500">
                                +{config.scope.providers.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {config.scope.payers.length > 0 && (
                        <div>
                          <span className="font-medium text-neutral-700">Payers:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {config.scope.payers.slice(0, 3).map((payer) => (
                              <span key={payer.id} className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded">
                                {payer.name}
                              </span>
                            ))}
                            {config.scope.payers.length > 3 && (
                              <span className="px-2 py-0.5 text-neutral-500">
                                +{config.scope.payers.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {config.scope.states.length > 0 && (
                        <div>
                          <span className="font-medium text-neutral-700">States:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {config.scope.states.slice(0, 5).map((state) => (
                              <span key={state.id} className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded">
                                {state.name}
                              </span>
                            ))}
                            {config.scope.states.length > 5 && (
                              <span className="px-2 py-0.5 text-neutral-500">
                                +{config.scope.states.length - 5} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {config.scope.selectedCrosswalks.length > 0 && (
                        <div>
                          <span className="font-medium text-neutral-700">Crosswalk:</span>
                          <span className="ml-1 text-neutral-600">
                            {config.scope.selectedCrosswalks[0]}
                          </span>
                        </div>
                      )}

                      {config.scope.providers.length === 0 && 
                       config.scope.payers.length === 0 && 
                       config.scope.states.length === 0 && (
                        <p className="text-neutral-500">No scope filters configured</p>
                      )}
                    </div>
                  </CollapsibleSection>

                  {/* Permissions */}
                  <CollapsibleSection title="Permissions" defaultOpen={false}>
                    <div className="space-y-1">
                      {config.permissions.permissions.length > 0 ? (
                        <>
                          {config.permissions.permissions.slice(0, 5).map((permission) => (
                            <div key={permission.id} className="text-xs text-neutral-600 py-1">
                              • {permission.action} - {permission.item}
                            </div>
                          ))}
                          {config.permissions.permissions.length > 5 && (
                            <div className="text-xs text-neutral-500 py-1">
                              +{config.permissions.permissions.length - 5} more permissions
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="text-xs text-neutral-500">No permissions configured</p>
                      )}
                    </div>
                  </CollapsibleSection>

                  {/* Preferences */}
                  <CollapsibleSection title="Preferences & Features" defaultOpen={false}>
                    <div className="space-y-1">
                      {config.preferences.features.length > 0 ? (
                        config.preferences.features.map((pref) => (
                          <div key={pref.id} className="flex items-center justify-between text-xs py-1">
                            <span className="text-neutral-700">{pref.name}</span>
                            <span className="text-neutral-500">
                              {typeof pref.value === 'boolean' 
                                ? (pref.value ? 'Enabled' : 'Disabled')
                                : pref.value}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-neutral-500">No preferences configured</p>
                      )}
                    </div>
                  </CollapsibleSection>
                </div>
              </div>
            )
          })}
        </div>

        {group.products.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-neutral-500">No products assigned to this group</p>
          </div>
        )}
      </div>
    </div>
  )

  if (!mounted) return null

  return createPortal(panelContent, document.body)
}
