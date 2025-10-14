import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn("flex items-center space-x-1 text-sm text-neutral-500", className)}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
          {item.href ? (
            <a
              href={item.href}
              className="hover:text-neutral-700 transition-colors"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-neutral-900">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
