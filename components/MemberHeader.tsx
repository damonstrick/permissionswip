"use client"

import { useState } from "react"
import Link from "next/link"
import { Copy, MoreHorizontal, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumbs } from "./Breadcrumbs"
import { Toast } from "./Toast"
import { ORG } from "@/data/mocks"
import { Member } from "@/data/types"

interface MemberHeaderProps {
  member: Member
}

export function MemberHeader({ member }: MemberHeaderProps) {
  const [showToast, setShowToast] = useState(false)

  const breadcrumbItems = [
    { label: "Members", href: `/org/${member.orgId}/members` },
    { label: "Member Profile" },
  ]

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(member.id)
      setShowToast(true)
    } catch (err) {
      console.error("Failed to copy ID:", err)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="flex items-center gap-6 mt-4">
            <div className="h-16 w-16 rounded-full bg-neutral-200" />
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-neutral-900">{member.name}</h1>
              <p className="text-neutral-600">{member.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-500">ID</span>
              <span className="text-sm font-mono text-neutral-900">{member.id}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopyId}
                className="h-6 w-6"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <Link href={`/org/${member.orgId}/members/${member.id}/permissions`}>
              <Button variant="outline" size="sm">
                <Shield className="h-4 w-4 mr-2" />
                View All Permissions
              </Button>
            </Link>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Toast 
        message="Copied" 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  )
}
