"use client"

import { useState, useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  ArrowLeft, 
  Search, 
  Users, 
  Filter, 
  Download, 
  Upload,
  UserPlus,
  UserMinus,
  Settings,
  MoreHorizontal,
  CheckCircle,
  XCircle
} from "lucide-react"
import { ALL_PRODUCTS } from "@/data/mocks"
import { useOrgStore } from "@/store/orgStore"

export default function ProductUsersPage() {
  const params = useParams()
  const orgId = params.orgId as string
  const productKey = params.productKey as string
  
  const { members } = useOrgStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set())
  const [showAddUsers, setShowAddUsers] = useState(false)

  const product = ALL_PRODUCTS.find(p => p.key === productKey)
  
  // Mock data - in real app, this would come from API
  const productUsers = useMemo(() => {
    return members.map(member => ({
      ...member,
      hasAccess: Math.random() > 0.3, // Mock: 70% have access
      lastActive: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      permissions: Math.floor(Math.random() * 15) + 1, // Mock: 1-15 permissions
      groups: Math.floor(Math.random() * 3) // Mock: 0-2 groups
    }))
  }, [members])

  const filteredUsers = useMemo(() => {
    return productUsers.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRole = roleFilter === "all" || user.role === roleFilter
      const matchesStatus = statusFilter === "all" || 
                           (statusFilter === "active" && user.hasAccess) ||
                           (statusFilter === "inactive" && !user.hasAccess)
      
      return matchesSearch && matchesRole && matchesStatus
    })
  }, [productUsers, searchTerm, roleFilter, statusFilter])

  const handleToggleUserAccess = (userId: string) => {
    // In real app, this would update the backend
    console.log(`Toggling access for user ${userId}`)
  }

  const handleBulkAction = (action: string) => {
    if (selectedUsers.size === 0) return
    
    switch (action) {
      case "grant-access":
        console.log(`Granting access to users:`, Array.from(selectedUsers))
        break
      case "revoke-access":
        console.log(`Revoking access from users:`, Array.from(selectedUsers))
        break
      case "export":
        console.log(`Exporting users:`, Array.from(selectedUsers))
        break
    }
    setSelectedUsers(new Set())
  }

  const handleSelectUser = (userId: string) => {
    const newSelected = new Set(selectedUsers)
    if (newSelected.has(userId)) {
      newSelected.delete(userId)
    } else {
      newSelected.add(userId)
    }
    setSelectedUsers(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedUsers.size === filteredUsers.length) {
      setSelectedUsers(new Set())
    } else {
      setSelectedUsers(new Set(filteredUsers.map(u => u.id)))
    }
  }

  const breadcrumbItems = [
    { label: "Products", href: `/org/${orgId}/products` },
    { label: product?.name || "Product", href: `/org/${orgId}/products/${productKey}` },
    { label: "Users" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/org/${orgId}/products`}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-semibold text-neutral-900">{product?.name} Users</h1>
                <p className="text-neutral-600">Manage user access and permissions for {product?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Dialog open={showAddUsers} onOpenChange={setShowAddUsers}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Users
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add Users to {product?.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-sm text-neutral-600">
                      Select users to grant access to {product?.name}. You can configure their specific permissions after adding them.
                    </p>
                    <div className="max-h-96 overflow-y-auto border rounded-md p-4">
                      {members.filter(m => !productUsers.find(pu => pu.id === m.id && pu.hasAccess)).map(member => (
                        <div key={member.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-neutral-200" />
                            <div>
                              <p className="font-medium text-sm">{member.name}</p>
                              <p className="text-xs text-neutral-500">{member.email}</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            Add
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Total Users</p>
                <p className="text-2xl font-semibold">{productUsers.length}</p>
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
                <p className="text-2xl font-semibold text-green-600">
                  {productUsers.filter(u => u.hasAccess).length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Inactive Users</p>
                <p className="text-2xl font-semibold text-red-600">
                  {productUsers.filter(u => !u.hasAccess).length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Avg Permissions</p>
                <p className="text-2xl font-semibold">
                  {Math.round(productUsers.reduce((acc, u) => acc + u.permissions, 0) / productUsers.length)}
                </p>
              </div>
              <Settings className="h-8 w-8 text-neutral-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
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
            
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
            
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
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedUsers.size > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-blue-900">
                  {selectedUsers.size} user{selectedUsers.size !== 1 ? 's' : ''} selected
                </span>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setSelectedUsers(new Set())}
                >
                  Clear Selection
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleBulkAction("grant-access")}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Grant Access
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleBulkAction("revoke-access")}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Revoke Access
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleBulkAction("export")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Users ({filteredUsers.length})</CardTitle>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={handleSelectAll}
              >
                {selectedUsers.size === filteredUsers.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-neutral-50">
                <tr>
                  <th className="text-left p-4 font-medium text-neutral-700">
                    <input
                      type="checkbox"
                      checked={selectedUsers.size === filteredUsers.length && filteredUsers.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-neutral-300"
                    />
                  </th>
                  <th className="text-left p-4 font-medium text-neutral-700">User</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Role</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Status</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Last Active</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Permissions</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Groups</th>
                  <th className="text-left p-4 font-medium text-neutral-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-neutral-50">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.has(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="rounded border-neutral-300"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-neutral-200" />
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-neutral-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-red-100 text-red-700' :
                        user.role === 'user' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={user.hasAccess}
                          onCheckedChange={() => handleToggleUserAccess(user.id)}
                        />
                        <span className={`text-sm ${
                          user.hasAccess ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {user.hasAccess ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-neutral-600">
                      {new Date(user.lastActive).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium">{user.permissions}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium">{user.groups}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Link href={`/org/${orgId}/members/${user.id}/product/${productKey}`}>
                          <Button size="sm" variant="ghost">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
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
