"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Search, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { ALL_GROUPS } from "@/data/mocks"

// Mock members data
const MOCK_MEMBERS = [
  {
    id: '938698763987',
    name: 'John Smith',
    email: 'johnsmith@email.com',
    role: 'Negotiator',
    department: 'Sales',
    joinedDate: '2024-01-15',
    lastActive: '2024-03-22',
  },
  {
    id: '987654321098',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@commonspirit.org',
    role: 'Analyst',
    department: 'Contracting',
    joinedDate: '2024-02-01',
    lastActive: '2024-03-21',
  },
  {
    id: '456789123456',
    name: 'Michael Brown',
    email: 'michael.brown@commonspirit.org',
    role: 'Executive',
    department: 'Operations',
    joinedDate: '2024-01-20',
    lastActive: '2024-03-20',
  },
]

export default function GroupMembersPage() {
  const params = useParams()
  const orgId = params.orgId as string
  const groupId = params.groupId as string
  const [searchTerm, setSearchTerm] = useState("")

  const group = ALL_GROUPS.find(g => g.id === groupId)

  if (!group) {
    return <div>Group not found</div>
  }

  const filteredMembers = MOCK_MEMBERS.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const breadcrumbItems = [
    { label: "Organizations", href: "/admin/organizations" },
    { label: "CommonSpirit Health", href: `/org/${orgId}` },
    { label: "Groups", href: `/org/${orgId}/groups` },
    { label: group.name, href: `/org/${orgId}/groups/${groupId}` },
    { label: "Members" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Link href={`/org/${orgId}/groups/${groupId}`}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <Breadcrumbs items={breadcrumbItems} />
              <h1 className="text-2xl font-semibold text-neutral-900 mt-2">
                {group.name} Members
              </h1>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Group Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Group Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-neutral-700 mb-2">Description</h4>
              <p className="text-sm text-neutral-600">{group.description}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-neutral-700 mb-2">Products</h4>
              <p className="text-sm text-neutral-600">
                {group.products.map(product => {
                  const productName = product === 'clear-contracts' ? 'Clear Contracts' : 'Analyze'
                  return productName
                }).join(', ')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">Members ({filteredMembers.length})</h2>
          <p className="text-neutral-600">Manage group membership</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Members
        </Button>
      </div>

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
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-neutral-50">
                <tr>
                  <th className="text-left p-4 font-medium text-neutral-700">Member</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Department</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Joined</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Last Active</th>
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
                      <span className="text-sm text-neutral-600">
                        {new Date(member.joinedDate).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-neutral-600">
                        {new Date(member.lastActive).toLocaleDateString()}
                      </span>
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

      {/* Group Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">{MOCK_MEMBERS.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">Active This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">3</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">3</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">{group.products.length}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
