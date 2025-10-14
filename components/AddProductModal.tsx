"use client"

import { useState } from "react"
import { Search, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IconCircle } from "./IconCircle"
import { ProductAccess } from "@/data/types"

interface AddProductModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  availableProducts: ProductAccess[]
  onAddProduct: (product: ProductAccess) => void
}

export function AddProductModal({ 
  open, 
  onOpenChange, 
  availableProducts, 
  onAddProduct 
}: AddProductModalProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = availableProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddProduct = (product: ProductAccess) => {
    onAddProduct(product)
    onOpenChange(false)
    setSearchTerm("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add a Product</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="max-h-60 space-y-2 overflow-y-auto">
            {filteredProducts.map((product) => (
              <button
                key={product.key}
                onClick={() => handleAddProduct(product)}
                className="flex w-full items-center gap-3 rounded-md border border-neutral-200 p-3 text-left hover:bg-neutral-50 transition-colors"
              >
                <IconCircle>
                  <Plus className="h-4 w-4 text-neutral-600" />
                </IconCircle>
                <div className="flex-1">
                  <div className="font-medium text-neutral-900">{product.name}</div>
                  <div className="text-sm text-neutral-500">{product.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
