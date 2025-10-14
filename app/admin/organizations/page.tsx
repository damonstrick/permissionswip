"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Building2, Users, Package, TrendingUp } from "lucide-react"

// Mock organizations data
const MOCK_ORGANIZATIONS = [
  {
    id: 'org-1',
    name: 'CommonSpirit Health',
    type: 'Healthcare System',
    memberCount: 1247,
    groupCount: 23,
    productCount: 2,
    status: 'active',
    lastActive: '2024-03-22',
    createdDate: '2023-01-15',
  },
  {
    id: 'org-2',
    name: 'Dignity Health',
    type: 'Healthcare System',
    memberCount: 892,
    groupCount: 18,
    productCount: 2,
    status: 'active',
    lastActive: '2024-03-21',
    createdDate: '2023-02-10',
  },
  {
    id: 'org-3',
    name: 'Trinity Health',
    type: 'Healthcare System',
    memberCount: 1056,
    groupCount: 21,
    productCount: 1,
    status: 'active',
    lastActive: '2024-03-20',
    createdDate: '2023-03-05',
  },
  {
    id: 'org-4',
    name: 'Ascension',
    type: 'Healthcare System',
    memberCount: 2134,
    groupCount: 45,
    productCount: 2,
    status: 'active',
    lastActive: '2024-03-22',
    createdDate: '2022-11-20',
  },
  {
    id: 'org-5',
    name: 'Providence',
    type: 'Healthcare System',
    memberCount: 567,
    groupCount: 12,
    productCount: 1,
    status: 'inactive',
    lastActive: '2024-02-15',
    createdDate: '2023-06-12',
  },
]

export default function OrganizationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredOrgs = useMemo(() => {
    return MOCK_ORGANIZATIONS.filter(org => {
      const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || org.status === statusFilter
      const matchesType = typeFilter === "all" || org.type === typeFilter
      return matchesSearch && matchesStatus && matchesType
    })
  }, [searchTerm, statusFilter, typeFilter])

  const stats = {
    total: MOCK_ORGANIZATIONS.length,
    active: MOCK_ORGANIZATIONS.filter(o => o.status === 'active').length,
    totalMembers: MOCK_ORGANIZATIONS.reduce((sum, o) => sum + o.memberCount, 0),
    totalGroups: MOCK_ORGANIZATIONS.reduce((sum, o) => sum + o.groupCount, 0),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-neutral-900">Organizations</h1>
              <p className="text-neutral-600">Manage organizations and their settings</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Organization
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Total Organizations</p>
                <p className="text-2xl font-semibold">{stats.total}</p>
              </div>
              <Building2 className="h-8 w-8 text-neutral-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Active</p>
                <p className="text-2xl font-semibold text-green-600">{stats.active}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Total Members</p>
                <p className="text-2xl font-semibold">{stats.totalMembers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-neutral-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Total Groups</p>
                <p className="text-2xl font-semibold">{stats.totalGroups}</p>
              </div>
              <Package className="h-8 w-8 text-neutral-400" />
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
                placeholder="Search organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Healthcare System">Healthcare System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Organizations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Organizations ({filteredOrgs.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-neutral-50">
                <tr>
                  <th className="text-left p-4 font-medium text-neutral-700">Organization</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Type</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Members</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Groups</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Products</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Status</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrgs.map((org) => (
                  <tr key={org.id} className="border-b hover:bg-neutral-50">
                    <td className="p-4">
                      <Link href={`/org/${org.id}`} className="block">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-neutral-200 flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-neutral-500" />
                          </div>
                          <div>
                            <p className="font-medium text-neutral-900">{org.name}</p>
                            <p className="text-xs text-neutral-500">Since {new Date(org.createdDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-neutral-600">{org.type}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium">{org.memberCount.toLocaleString()}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium">{org.groupCount}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium">{org.productCount}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        org.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {org.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-neutral-600">
                        {new Date(org.lastActive).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrgs.length === 0 && (
            <div className="text-center py-12">
              <div className="h-12 w-12 rounded-full bg-neutral-200 mx-auto mb-4 flex items-center justify-center">
                <Search className="h-6 w-6 text-neutral-400" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">No organizations found</h3>
              <p className="text-neutral-500">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
