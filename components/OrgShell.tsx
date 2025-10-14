"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, BarChart3, Users, UserCheck, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { Breadcrumbs } from "./Breadcrumbs"
import { ORG } from "@/data/mocks"

interface OrgShellProps {
  children: React.ReactNode
  orgId: string
}

const orgNavigation = [
  { name: "Overview", href: "/org/[orgId]", icon: BarChart3 },
  { name: "Products & Features", href: "/org/[orgId]/products", icon: Building2 },
  { name: "Groups", href: "/org/[orgId]/groups", icon: UserCheck },
  { name: "Members", href: "/org/[orgId]/members", icon: Users },
  { name: "Preferences", href: "/org/[orgId]/preferences", icon: Settings },
]

export function OrgShell({ children, orgId }: OrgShellProps) {
  const pathname = usePathname()

  const breadcrumbItems = [
    { label: "Organizations", href: "/admin/organizations" },
    { label: ORG.name },
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-[1200px] flex pt-4">
        {/* Left Sidebar */}
        <div className="w-[280px] mr-4">
          <div className="sticky top-4 rounded-md border border-neutral-200 bg-white">
            <div className="p-6">
              <Breadcrumbs items={breadcrumbItems} />
              <div className="mt-4 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-neutral-200" />
                <span className="font-medium text-neutral-900">{ORG.name}</span>
              </div>
            </div>
            <nav className="px-4 pb-4">
              {orgNavigation.map((item) => {
                const href = item.href.replace("[orgId]", orgId)
                const isActive = pathname === href
                return (
                  <Link
                    key={item.name}
                    href={href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-neutral-100 text-neutral-900"
                        : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-[880px] p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
