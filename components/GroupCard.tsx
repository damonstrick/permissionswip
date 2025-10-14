import { X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Group } from "@/data/types"
import { ALL_PRODUCTS } from "@/data/mocks"

interface GroupCardProps {
  group: Group
  onRemove?: () => void
  onClick?: () => void
  isClickable?: boolean
  orgId?: string
  showNavigation?: boolean
}

export function GroupCard({ group, onRemove, onClick, isClickable = false, orgId, showNavigation = false }: GroupCardProps) {
  const productNames = group.products
    .map(productKey => ALL_PRODUCTS.find(p => p.key === productKey)?.name)
    .filter(Boolean)
    .join(', ')

  const content = (
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <h4 className="font-medium text-neutral-900">{group.name}</h4>
        <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 text-neutral-600">
          {group.roleLevel}
        </span>
      </div>
      <p className="text-sm text-neutral-500 mb-2">{group.description}</p>
      <div className="flex items-center gap-4 text-xs text-neutral-500">
        <span>{group.memberCount} members</span>
        <span>•</span>
        <span>{productNames}</span>
      </div>
    </div>
  )

  const actions = (
    <div className="flex items-center gap-2">
      {showNavigation && orgId && (
        <Link href={`/org/${orgId}/groups/${group.id}`}>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-neutral-400 hover:text-neutral-600"
          >
            →
          </Button>
        </Link>
      )}
      {onRemove && (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="h-6 w-6 text-neutral-400 hover:text-neutral-600"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )

  if (showNavigation && orgId) {
    return (
      <Link
        href={`/org/${orgId}/groups/${group.id}`}
        className="flex items-center justify-between rounded-md border border-neutral-200 p-4 bg-white hover:bg-neutral-50 transition-colors"
      >
        {content}
        {actions}
      </Link>
    )
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-md border border-neutral-200 p-4 bg-white",
        isClickable && "cursor-pointer hover:bg-neutral-50 transition-colors"
      )}
      onClick={isClickable ? onClick : undefined}
    >
      {content}
      {actions}
    </div>
  )
}
