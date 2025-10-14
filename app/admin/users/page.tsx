"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Users, Building2, UserCheck, UserX } from "lucide-react"
import { useOrgStore } from "@/store/orgStore"

// Mock organizations
const ORGS_MAP = {
  'org-1': 'CommonSpirit Health',
  'org-2': 'Dignity Health',
  'org-3': 'Trinity Health',
}

export default function UsersPage() {
  const { members } = useOrgStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [orgFilter, setOrgFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  const usersWithOrg = useMemo(() => {
    return members.map(member => ({
      ...member,
      orgName: ORGS_MAP['org-1' as keyof typeof ORGS_MAP] || 'CommonSpirit Health',
      status: Math.random() > 0.2 ? 'active' : 'inactive', // Mock status
      lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    }))
  }, [members])

  const filteredUsers = useMemo(() => {
    return usersWithOrg.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesOrg = orgFilter === "all" || user.orgName === orgFilter
      const matchesDept = departmentFilter === "all" || user.department === departmentFilter
      return matchesSearch && matchesOrg && matchesDept
    })
  }, [usersWithOrg, searchTerm, orgFilter, departmentFilter])

  const stats = {
    total: usersWithOrg.length,
    active: usersWithOrg.filter(u => u.status === 'active').length,
    inactive: usersWithOrg.filter(u => u.status === 'inactive').length,
  }

  const departments = [...new Set(members.map(m => m.department))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-neutral-900">Users</h1>
              <p className="text-neutral-600">Manage users across all organizations</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add User
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
                <p className="text-sm text-neutral-500">Total Users</p>
                <p className="text-2xl font-semibold">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-neutral-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Active Users</p>
                <p className="text-2xl font-semibold text-green-600">{stats.active}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Inactive Users</p>
                <p className="text-2xl font-semibold text-red-600">{stats.inactive}</p>
              </div>
              <UserX className="h-8 w-8 text-red-400" />
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
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={orgFilter} onValueChange={setOrgFilter}>
              <SelectTrigger className="w-full sm:w-56">
                <SelectValue placeholder="Filter by organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Organizations</SelectItem>
                {Object.values(ORGS_MAP).map((orgName) => (
                  <SelectItem key={orgName} value={orgName}>{orgName}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-neutral-50">
                <tr>
                  <th className="text-left p-4 font-medium text-neutral-700">User</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Organization</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Department</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Groups</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Products</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Status</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Last Login</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-neutral-50">
                    <td className="p-4">
                      <Link href={`/org/${user.orgId}/members/${user.id}`} className="block">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-neutral-200"></div>
                          <div>
                            <p className="font-medium text-neutral-900">{user.name}</p>
                            <p className="text-sm text-neutral-500">{user.email}</p>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-neutral-400" />
                        <span className="text-sm text-neutral-600">{user.orgName}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-neutral-600">{user.department}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium">{user.groups.length}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium">{user.productConfigurations.length}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-neutral-600">
                        {new Date(user.lastLogin).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="h-12 w-12 rounded-full bg-neutral-200 mx-auto mb-4 flex items-center justify-center">
                <Search className="h-6 w-6 text-neutral-400" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">No users found</h3>
              <p className="text-neutral-500">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
