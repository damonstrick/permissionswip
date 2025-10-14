"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Plus, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconCircle } from "./IconCircle"
import { AddProductModal } from "./AddProductModal"
import { ProductAccess } from "@/data/types"
import { ALL_PRODUCTS } from "@/data/mocks"

interface ProductAccessCardProps {
  products: ProductAccess[]
  onUpdateProducts: (products: ProductAccess[]) => void
}

export function ProductAccessCard({ products, onUpdateProducts }: ProductAccessCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const params = useParams()
  const orgId = params.orgId as string
  const memberId = params.memberId as string

  const availableProducts = ALL_PRODUCTS.filter(
    product => !products.some(p => p.key === product.key)
  )

  const handleAddProduct = (product: ProductAccess) => {
    onUpdateProducts([...products, product])
  }

  const handleRemoveProduct = (productKey: string) => {
    onUpdateProducts(products.filter(p => p.key !== productKey))
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Products & Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {products.map((product) => (
            <Link
              key={product.key}
              href={`/org/${orgId}/members/${memberId}/product/${product.key}`}
              className="flex items-center gap-3 rounded-md border border-neutral-200 p-3 hover:bg-neutral-50 transition-colors"
            >
              <IconCircle>
                <div className="h-4 w-4 rounded-full bg-neutral-300" />
              </IconCircle>
              <div className="flex-1">
                <div className="font-medium text-neutral-900">{product.name}</div>
                <div className="text-sm text-neutral-500">{product.description}</div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          ))}
          
          <Button
            variant="outline"
            onClick={() => setIsModalOpen(true)}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add a Product
          </Button>
        </CardContent>
      </Card>

      <AddProductModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        availableProducts={availableProducts}
        onAddProduct={handleAddProduct}
      />
    </>
  )
}
