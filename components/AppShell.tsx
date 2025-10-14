"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, Users, UserCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface AppShellProps {
  children: React.ReactNode
}

const navigation = [
  { name: "Organizations", href: "/admin/organizations", icon: Building2 },
  { name: "Groups", href: "/admin/groups", icon: UserCheck },
  { name: "Users", href: "/admin/users", icon: Users },
]

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-[1200px] flex pt-4">
        {/* Left Sidebar */}
        <div className="w-[280px] mr-4">
          <div className="sticky top-4 rounded-md border border-neutral-200 bg-white">
            <div className="p-6">
              <h1 className="text-lg font-semibold text-neutral-900">Admin</h1>
            </div>
            <nav className="px-4 pb-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
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
