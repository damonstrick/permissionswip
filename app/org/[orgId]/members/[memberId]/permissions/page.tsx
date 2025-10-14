"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Users, User, CheckCircle, XCircle, Info } from "lucide-react"
import { useMemberStore } from "@/store/memberStore"
import { ALL_GROUPS } from "@/data/mocks"

export default function MemberPermissionsPage() {
  const params = useParams()
  const orgId = params.orgId as string
  const memberId = params.memberId as string
  
  const { member } = useMemberStore()
  
  if (!member) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Link href={`/org/${orgId}/members`}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-semibold text-neutral-900">Member Not Found</h1>
                <p className="text-neutral-600">The requested member could not be found</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Get all groups the member belongs to
  const memberGroups = member.groups || []
  
  // Collect all permissions from groups (inherited)
  const inheritedPermissions = new Map()
  memberGroups.forEach(group => {
    // Mock group permissions - in real app, these would come from group data
    const mockGroupPermissions = [
      { id: 'group-1', platform: 'Clear Contracts', category: 'Documents', action: 'View', item: 'All Documents', description: 'View all contract documents' },
      { id: 'group-2', platform: 'Clear Contracts', category: 'Analytics', action: 'Export', item: 'Reports', description: 'Export analysis reports' },
      { id: 'group-3', platform: 'Analyze', category: 'Data', action: 'View', item: 'Dashboard', description: 'View analytics dashboard' },
    ]
    
    mockGroupPermissions.forEach(permission => {
      const key = `${permission.platform}-${permission.category}-${permission.action}-${permission.item}`
      if (!inheritedPermissions.has(key)) {
        inheritedPermissions.set(key, {
          ...permission,
          source: group.name,
          sourceType: 'group'
        })
      }
    })
  })

  // Collect all direct permissions
  const directPermissions = new Map()
  member.productConfigurations.forEach(config => {
    config.permissions.permissions.forEach(permission => {
      const key = `${permission.platform}-${permission.category}-${permission.action}-${permission.item}`
      directPermissions.set(key, {
        ...permission,
        source: 'Direct Assignment',
        sourceType: 'direct'
      })
    })
  })

  // Combine all permissions
  const allPermissions = new Map()
  
  // Add inherited permissions first
  inheritedPermissions.forEach((permission, key) => {
    allPermissions.set(key, permission)
  })
  
  // Add direct permissions (these will override inherited if same key exists)
  directPermissions.forEach((permission, key) => {
    allPermissions.set(key, {
      ...permission,
      isOverridden: inheritedPermissions.has(key)
    })
  })

  const permissionsArray = Array.from(allPermissions.values())

  // Group permissions by platform
  const permissionsByPlatform = permissionsArray.reduce((acc, permission) => {
    if (!acc[permission.platform]) {
      acc[permission.platform] = []
    }
    acc[permission.platform].push(permission)
    return acc
  }, {} as Record<string, any[]>)

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Link href={`/org/${orgId}/members/${memberId}`}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-neutral-200"></div>
              <div>
                <h1 className="text-2xl font-semibold text-neutral-900">{member.name}</h1>
                <p className="text-neutral-600">Complete permissions overview</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-500">Total Permissions</p>
                <p className="text-2xl font-bold text-neutral-900">{permissionsArray.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-500">Direct Permissions</p>
                <p className="text-2xl font-bold text-neutral-900">{directPermissions.size}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-500">Inherited Permissions</p>
                <p className="text-2xl font-bold text-neutral-900">{inheritedPermissions.size}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Info className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-500">Override Conflicts</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {permissionsArray.filter(p => p.isOverridden).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Permission Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full bg-green-500"></div>
              <span className="text-sm text-neutral-700">Direct Assignment - Permissions granted specifically to this member</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full bg-purple-500"></div>
              <span className="text-sm text-neutral-700">Group Inheritance - Permissions inherited from group membership</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full bg-orange-500"></div>
              <span className="text-sm text-neutral-700">Override - Direct permission overrides inherited permission</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Permissions by Platform */}
      {Object.entries(permissionsByPlatform).map(([platform, permissions]) => (
        <Card key={platform}>
          <CardHeader>
            <CardTitle>{platform} Permissions</CardTitle>
            <p className="text-sm text-neutral-500">
              {permissions.length} total permissions for {platform}
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {permissions.map((permission, index) => (
                <div
                  key={`${permission.id}-${index}`}
                  className={`border rounded-lg p-4 ${
                    permission.sourceType === 'direct' 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-purple-200 bg-purple-50'
                  } ${
                    permission.isOverridden ? 'ring-2 ring-orange-200' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-neutral-900">
                          {permission.action} {permission.item}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          permission.sourceType === 'direct'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {permission.sourceType === 'direct' ? 'Direct' : 'Inherited'}
                        </span>
                        {permission.isOverridden && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                            Override
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-neutral-600 mb-2">{permission.description}</p>
                      <div className="text-xs text-neutral-500">
                        <span className="font-medium">Category:</span> {permission.category} | 
                        <span className="font-medium ml-1">Source:</span> {permission.source}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Group Memberships */}
      <Card>
        <CardHeader>
          <CardTitle>Group Memberships</CardTitle>
          <p className="text-sm text-neutral-500">
            Groups that contribute inherited permissions
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {memberGroups.map((group) => (
              <div key={group.id} className="border border-neutral-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-neutral-900">{group.name}</h4>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    {group.roleLevel}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 mb-3">{group.description}</p>
                <div className="text-xs text-neutral-500">
                  <span className="font-medium">Products:</span> {group.products.length} • 
                  <span className="font-medium ml-1">Members:</span> {group.memberCount}
                </div>
              </div>
            ))}
          </div>
          {memberGroups.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-500">This member is not part of any groups</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
