"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Users, Building2, Package } from "lucide-react"
import { ALL_GROUPS } from "@/data/mocks"

// Mock organizations for reference
const ORGS_MAP = {
  'org-1': 'CommonSpirit Health',
  'org-2': 'Dignity Health',
  'org-3': 'Trinity Health',
}

export default function GroupsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [orgFilter, setOrgFilter] = useState("all")

  const groupsWithOrg = useMemo(() => {
    return ALL_GROUPS.map(group => ({
      ...group,
      orgName: ORGS_MAP['org-1' as keyof typeof ORGS_MAP] || 'CommonSpirit Health'
    }))
  }, [])

  const filteredGroups = useMemo(() => {
    return groupsWithOrg.filter(group => {
      const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           group.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesOrg = orgFilter === "all" || group.orgName === orgFilter
      return matchesSearch && matchesOrg
    })
  }, [groupsWithOrg, searchTerm, orgFilter])

  const stats = {
    total: ALL_GROUPS.length,
    totalMembers: ALL_GROUPS.reduce((sum, g) => sum + g.memberCount, 0),
    avgMembers: Math.round(ALL_GROUPS.reduce((sum, g) => sum + g.memberCount, 0) / ALL_GROUPS.length),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-neutral-900">Groups</h1>
              <p className="text-neutral-600">Manage groups across all organizations</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Group
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Total Groups</p>
                <p className="text-2xl font-semibold">{stats.total}</p>
              </div>
              <Package className="h-8 w-8 text-neutral-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Total Members</p>
                <p className="text-2xl font-semibold">{stats.totalMembers}</p>
              </div>
              <Users className="h-8 w-8 text-neutral-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Avg Members/Group</p>
                <p className="text-2xl font-semibold">{stats.avgMembers}</p>
              </div>
              <Users className="h-8 w-8 text-neutral-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                placeholder="Search groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={orgFilter} onValueChange={setOrgFilter}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="Filter by organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Organizations</SelectItem>
                {Object.values(ORGS_MAP).map((orgName) => (
                  <SelectItem key={orgName} value={orgName}>{orgName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Groups Table */}
      <Card>
        <CardHeader>
          <CardTitle>Groups ({filteredGroups.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-neutral-50">
                <tr>
                  <th className="text-left p-4 font-medium text-neutral-700">Group</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Organization</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Members</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Products</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {filteredGroups.map((group) => (
                  <tr key={group.id} className="border-b hover:bg-neutral-50">
                    <td className="p-4">
                      <Link href={`/org/org-1/groups/${group.id}`} className="block">
                        <div>
                          <p className="font-medium text-neutral-900">{group.name}</p>
                          <p className="text-sm text-neutral-500">{group.description}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-neutral-400" />
                        <span className="text-sm text-neutral-600">{group.orgName}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-neutral-400" />
                        <span className="text-sm font-medium">{group.memberCount}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {group.products.map((product) => (
                          <span
                            key={product}
                            className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded text-xs"
                          >
                            {product === 'clear-contracts' ? 'Clear Contracts' : 'Analyze'}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-neutral-600">
                        {new Date(group.lastUpdated).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredGroups.length === 0 && (
            <div className="text-center py-12">
              <div className="h-12 w-12 rounded-full bg-neutral-200 mx-auto mb-4 flex items-center justify-center">
                <Search className="h-6 w-6 text-neutral-400" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">No groups found</h3>
              <p className="text-neutral-500">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
