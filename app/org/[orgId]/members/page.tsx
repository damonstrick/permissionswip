"use client"

import { useMemo, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, ChevronRight } from "lucide-react"
import { useOrgStore } from "@/store/orgStore"
import { AddMemberModal } from "@/components/modals/AddMemberModal"

export default function MembersPage() {
  const params = useParams()
  const orgId = params.orgId as string
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddMember, setShowAddMember] = useState(false)
  const members = useOrgStore(s => s.members)

  const filteredMembers = useMemo(() => (
    members.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ), [members, searchTerm])

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-neutral-900">Members</h1>
              <p className="text-neutral-600">Manage organization members</p>
            </div>
            <Button onClick={() => setShowAddMember(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        <Input
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Members ({filteredMembers.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-neutral-50">
                <tr>
                  <th className="text-left p-4 font-medium text-neutral-700">Member</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Department</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Groups</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Products</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="border-b hover:bg-neutral-50 cursor-pointer">
                    <td className="p-4">
                      <Link href={`/org/${orgId}/members/${member.id}`} className="block">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-neutral-200"></div>
                          <div>
                            <p className="font-medium text-neutral-900">{member.name}</p>
                            <p className="text-sm text-neutral-600">{member.email}</p>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-neutral-900">{member.department}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium">{member.groups.length}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium">{member.productConfigurations.length}</span>
                    </td>
                    <td className="p-4">
                      {member.external && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-600">
                          External
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <div className="h-12 w-12 rounded-full bg-neutral-200 mx-auto mb-4 flex items-center justify-center">
                <Search className="h-6 w-6 text-neutral-400" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">No members found</h3>
              <p className="text-neutral-500">Try adjusting your search terms</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Member Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">{members.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">External Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {members.filter(m => m.external).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">Admin Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {members.filter(m => m.role === 'Admin').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">Active Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">2</div>
          </CardContent>
        </Card>
      </div>

      <AddMemberModal open={showAddMember} onOpenChange={setShowAddMember} />
    </div>
  )
}
