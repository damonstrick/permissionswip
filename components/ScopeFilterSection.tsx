"use client"

import { useState } from "react"
import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScopeFilter } from "@/data/types"
import { SCOPE_FILTERS } from "@/data/productMocks"

interface ScopeFilterSectionProps {
  title: string
  scopeType: keyof typeof SCOPE_FILTERS
  selectedFilters: ScopeFilter[]
  onUpdateFilters: (filters: ScopeFilter[]) => void
}

export function ScopeFilterSection({ 
  title, 
  scopeType, 
  selectedFilters, 
  onUpdateFilters 
}: ScopeFilterSectionProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const availableFilters = SCOPE_FILTERS[scopeType] || []
  const filteredOptions = availableFilters.filter(
    filter => 
      !selectedFilters.some(selected => selected.id === filter.id) &&
      filter.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddFilter = (filter: ScopeFilter) => {
    onUpdateFilters([...selectedFilters, filter])
    setSearchTerm("")
    setIsAdding(false)
  }

  const handleRemoveFilter = (filterId: string) => {
    onUpdateFilters(selectedFilters.filter(filter => filter.id !== filterId))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-neutral-700">{title}</h4>
        {!isAdding && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAdding(true)}
            className="h-6 w-6 p-0"
          >
            <Plus className="h-3 w-3" />
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedFilters.map((filter) => (
          <div
            key={filter.id}
            className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1 text-sm text-neutral-700"
          >
            <span>{filter.name}</span>
            <button
              onClick={() => handleRemoveFilter(filter.id)}
              className="flex h-4 w-4 items-center justify-center rounded-full hover:bg-neutral-200"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      {isAdding && (
        <div className="space-y-2">
          <Input
            placeholder={`Search ${title.toLowerCase()}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-sm"
            autoFocus
          />
          {filteredOptions.length > 0 && (
            <div className="space-y-1">
              {filteredOptions.slice(0, 5).map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => handleAddFilter(filter)}
                  className="block w-full rounded-md border border-neutral-200 p-2 text-left hover:bg-neutral-50 transition-colors"
                >
                  <div className="text-sm font-medium text-neutral-900">{filter.name}</div>
                </button>
              ))}
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsAdding(false)
              setSearchTerm("")
            }}
            className="text-xs"
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  )
}
