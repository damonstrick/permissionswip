"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Plus, Users, Settings, Check } from "lucide-react"
import { ALL_PRODUCTS } from "@/data/mocks"

export default function ProductsPage() {
  const params = useParams()
  const orgId = params.orgId as string
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [addProductSearch, setAddProductSearch] = useState("")
  const [enabledProductKeys, setEnabledProductKeys] = useState<Set<string>>(
    new Set(['clear-contracts', 'analyze'])
  )

  // Only show currently enabled products
  const enabledProducts = ALL_PRODUCTS.filter(product => 
    enabledProductKeys.has(product.key)
  )

  // All other products available to add
  const availableProducts = ALL_PRODUCTS.filter(product => 
    !enabledProductKeys.has(product.key)
  )

  const filteredAvailableProducts = availableProducts.filter(product =>
    product.name.toLowerCase().includes(addProductSearch.toLowerCase())
  )

  const handleAddProduct = (productKey: string) => {
    setEnabledProductKeys(prev => new Set([...prev, productKey]))
    setShowAddProduct(false)
    setAddProductSearch("")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-neutral-900">Products & Features</h1>
              <p className="text-neutral-600">Manage product access and configurations</p>
            </div>
            <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <Input
                      placeholder="Search available products..."
                      value={addProductSearch}
                      onChange={(e) => setAddProductSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto space-y-2">
                    {filteredAvailableProducts.map((product) => (
                      <div
                        key={product.key}
                        className="flex items-center justify-between p-3 border border-neutral-200 rounded-md hover:bg-neutral-50"
                      >
                        <div className="flex-1">
                          <h3 className="font-medium text-neutral-900">{product.name}</h3>
                          <p className="text-sm text-neutral-500">{product.description}</p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleAddProduct(product.key)}
                        >
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>

                  {filteredAvailableProducts.length === 0 && (
                    <div className="text-center py-8">
                      <div className="h-12 w-12 rounded-full bg-neutral-200 mx-auto mb-4 flex items-center justify-center">
                        <Search className="h-6 w-6 text-neutral-400" />
                      </div>
                      <h3 className="text-lg font-medium text-neutral-900 mb-2">No products found</h3>
                      <p className="text-neutral-500">Try adjusting your search terms</p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {enabledProducts.map((product) => (
          <Card key={product.key} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <p className="text-sm text-neutral-500 mt-1">{product.description}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-neutral-200 flex items-center justify-center">
                  <div className="h-6 w-6 rounded-full bg-neutral-400"></div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-neutral-500">Active Users:</span>
                    <span className="ml-2 font-medium text-neutral-900">
                      {product.key === 'clear-contracts' ? '142' : '98'}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500">Groups:</span>
                    <span className="ml-2 font-medium text-neutral-900">
                      {product.key === 'clear-contracts' ? '2' : '1'}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Link href={`/org/${orgId}/products/${product.key}/users`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Users className="h-4 w-4 mr-2" />
                      Manage Users
                    </Button>
                  </Link>
                  <Link 
                    href={`/org/${orgId}/products/${product.key}/packages`}
                    className="flex-1"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {enabledProducts.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="h-12 w-12 rounded-full bg-neutral-200 mx-auto mb-4 flex items-center justify-center">
              <Search className="h-6 w-6 text-neutral-400" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">No products found</h3>
            <p className="text-neutral-500">Try adjusting your search terms</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
