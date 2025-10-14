import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChipProps {
  children: React.ReactNode
  onRemove?: () => void
  className?: string
}

export function Chip({ children, onRemove, className }: ChipProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1 text-sm text-neutral-700",
        className
      )}
    >
      <span>{children}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="flex h-4 w-4 items-center justify-center rounded-full hover:bg-neutral-200"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}
