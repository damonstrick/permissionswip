"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { ORG } from "@/data/mocks"

const DATA_TYPES = [
  {
    id: "hospital",
    name: "Hospital Data",
    description: "Hospital financial and operational data",
    enabled: true
  },
  {
    id: "payer",
    name: "Payer Data",
    description: "Health insurance and payer information",
    enabled: false
  },
  {
    id: "physician-groups",
    name: "Physician Groups Data",
    description: "Physician group practice data",
    enabled: false
  },
  {
    id: "behavioral-health",
    name: "Behavioral Health Data",
    description: "Mental health and behavioral services data",
    enabled: false
  },
  {
    id: "life-sciences",
    name: "Life Sciences Data",
    description: "Pharmaceutical and biotechnology data",
    enabled: false
  },
  {
    id: "device-rates",
    name: "Device Rates Data",
    description: "Medical device pricing and utilization data",
    enabled: false
  }
]

export default function AnalyzeEntitlementsPage() {
  const params = useParams()
  const orgId = params.orgId as string
  const [entitlements, setEntitlements] = useState(DATA_TYPES)
  const [seats, setSeats] = useState(10)
  const [dataExportLimit, setDataExportLimit] = useState(50000)
  const [simpleExtractsCustomIndex, setSimpleExtractsCustomIndex] = useState(false)

  const breadcrumbItems = [
    { label: "Products & Features", href: `/org/${orgId}/products` },
    { label: "Product Entitlement" },
  ]

  const handleToggleEntitlement = (id: string) => {
    setEntitlements(prev => 
      prev.map(entitlement => 
        entitlement.id === id 
          ? { ...entitlement, enabled: !entitlement.enabled }
          : entitlement
      )
    )
  }

  const handleSave = () => {
    // Save logic would go here
    console.log("Saving entitlements:", {
      entitlements,
      seats,
      dataExportLimit,
      simpleExtractsCustomIndex
    })
  }

  const handleDataExportLimitChange = (value: string) => {
    const numValue = parseInt(value)
    if (!isNaN(numValue)) {
      if (numValue > 200000) {
        // Could add approval logic here
        console.warn("Data export limit exceeds 200,000 - approval may be required")
      }
      setDataExportLimit(numValue)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
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
                <Breadcrumbs items={breadcrumbItems} />
                <h1 className="text-2xl font-semibold text-neutral-900 mt-2">
                  Analyze
                </h1>
              </div>
            </div>
            <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
              Revoke Access
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Product Entitlement Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle>Product Entitlement</CardTitle>
            <div className="h-4 w-4 rounded-full bg-neutral-300"></div>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Data Types */}
          <div className="space-y-4">
            {entitlements.map((entitlement) => (
              <div key={entitlement.id} className="flex items-center space-x-3">
                <button
                  onClick={() => handleToggleEntitlement(entitlement.id)}
                  className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${
                    entitlement.enabled
                      ? 'bg-neutral-900 border-neutral-900 text-white'
                      : 'border-neutral-300 hover:border-neutral-400'
                  }`}
                >
                  {entitlement.enabled && (
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <div>
                  <label 
                    className="text-sm font-medium text-neutral-900 cursor-pointer"
                    onClick={() => handleToggleEntitlement(entitlement.id)}
                  >
                    {entitlement.name}
                  </label>
                  <p className="text-xs text-neutral-500">{entitlement.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Seats Configuration */}
          <div className="border-t border-neutral-200 pt-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-neutral-700">Seats</label>
                <p className="text-xs text-neutral-500 mb-2">Number of concurrent user licenses</p>
                <Input
                  type="number"
                  value={seats}
                  onChange={(e) => setSeats(parseInt(e.target.value) || 0)}
                  className="w-24"
                  min="1"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-neutral-700">Simple extracts custom index available</div>
                  <div className="text-xs text-neutral-500">Enable custom indexing for simple data extracts</div>
                </div>
                <Switch
                  checked={simpleExtractsCustomIndex}
                  onCheckedChange={setSimpleExtractsCustomIndex}
                />
              </div>
            </div>
          </div>

          {/* Data Export Limit */}
          <div className="border-t border-neutral-200 pt-6">
            <div>
              <label className="text-sm font-medium text-neutral-700">Data Export Limit</label>
              <p className="text-xs text-neutral-500 mb-2">Maximum records per export (approval required above 200,000)</p>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={dataExportLimit}
                  onChange={(e) => handleDataExportLimitChange(e.target.value)}
                  className="w-32"
                  min="1"
                  max="200000"
                />
                <span className="text-sm text-neutral-500">records</span>
                {dataExportLimit > 200000 && (
                  <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                    Approval Required
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  )
}
