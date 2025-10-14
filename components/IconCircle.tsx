import { cn } from "@/lib/utils"

interface IconCircleProps {
  className?: string
  children?: React.ReactNode
}

export function IconCircle({ className, children }: IconCircleProps) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 border border-neutral-200",
        className
      )}
    >
      {children}
    </div>
  )
}
