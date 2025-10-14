"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus, Users, Package, Settings } from "lucide-react"
import { ORG, ALL_GROUPS } from "@/data/mocks"
import { AddMemberModal } from "@/components/modals/AddMemberModal"
import { CreateGroupModal } from "@/components/modals/CreateGroupModal"

export default function OrgOverviewPage() {
  const params = useParams()
  const orgId = params.orgId as string
  const [showAddMember, setShowAddMember] = useState(false)
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const totalMembers = 156
  const totalGroups = ALL_GROUPS.length
  const activeProducts = 2
  const recentActivity = 12

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900">Overview</h1>
        <p className="text-neutral-600">Organization metrics and activity summary</p>
      </div>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">{totalMembers}</div>
            <p className="text-xs text-neutral-500 mt-1">+8% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">{totalGroups}</div>
            <p className="text-xs text-neutral-500 mt-1">Active groups</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">{activeProducts}</div>
            <p className="text-xs text-neutral-500 mt-1">Clear Contracts, Analyze</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">{recentActivity}</div>
            <p className="text-xs text-neutral-500 mt-1">Changes this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Member Distribution by Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Admin</span>
                <span className="text-sm font-medium">24</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-neutral-900 h-2 rounded-full" style={{width: '15%'}}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Editor</span>
                <span className="text-sm font-medium">67</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-neutral-700 h-2 rounded-full" style={{width: '43%'}}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Viewer</span>
                <span className="text-sm font-medium">65</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-neutral-500 h-2 rounded-full" style={{width: '42%'}}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Clear Contracts</span>
                <span className="text-sm font-medium">89%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-neutral-900 h-2 rounded-full" style={{width: '89%'}}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Analyze</span>
                <span className="text-sm font-medium">67%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-neutral-700 h-2 rounded-full" style={{width: '67%'}}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-neutral-400"></div>
              <div className="flex-1">
                <p className="text-sm text-neutral-900">John Smith added to CC - Admin group</p>
                <p className="text-xs text-neutral-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-neutral-400"></div>
              <div className="flex-1">
                <p className="text-sm text-neutral-900">Sarah Johnson updated Clear Contracts permissions</p>
                <p className="text-xs text-neutral-500">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-neutral-400"></div>
              <div className="flex-1">
                <p className="text-sm text-neutral-900">New member Michael Brown joined organization</p>
                <p className="text-xs text-neutral-500">6 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-neutral-400"></div>
              <div className="flex-1">
                <p className="text-sm text-neutral-900">Analyze - Viewer group permissions updated</p>
                <p className="text-xs text-neutral-500">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="h-auto items-center justify-start p-4 text-left w-full"
              onClick={() => setShowAddMember(true)}
            >
              <div className="h-8 w-8 shrink-0 rounded-full bg-neutral-100 flex items-center justify-center mr-3">
                <UserPlus className="h-4 w-4 text-neutral-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-neutral-900">Add Member</div>
                <div className="text-xs text-neutral-500">Invite a new user to the organization</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="h-auto items-center justify-start p-4 text-left w-full"
              onClick={() => setShowCreateGroup(true)}
            >
              <div className="h-8 w-8 shrink-0 rounded-full bg-neutral-100 flex items-center justify-center mr-3">
                <Users className="h-4 w-4 text-neutral-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-neutral-900">Create Group</div>
                <div className="text-xs text-neutral-500">Set up a new permission group</div>
              </div>
            </Button>

            <Link href={`/org/${orgId}/products`} className="block">
              <Button 
                variant="outline" 
                className="w-full h-auto items-center justify-start p-4 text-left"
              >
                <div className="h-8 w-8 shrink-0 rounded-full bg-neutral-100 flex items-center justify-center mr-3">
                  <Package className="h-4 w-4 text-neutral-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-neutral-900">Manage Products</div>
                  <div className="text-xs text-neutral-500">Configure product access and features</div>
                </div>
              </Button>
            </Link>

            <Link href={`/org/${orgId}/preferences`} className="block">
              <Button 
                variant="outline" 
                className="w-full h-auto items-center justify-start p-4 text-left"
              >
                <div className="h-8 w-8 shrink-0 rounded-full bg-neutral-100 flex items-center justify-center mr-3">
                  <Settings className="h-4 w-4 text-neutral-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-neutral-900">Organization Settings</div>
                  <div className="text-xs text-neutral-500">Update security and preferences</div>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <AddMemberModal open={showAddMember} onOpenChange={setShowAddMember} />
      <CreateGroupModal open={showCreateGroup} onOpenChange={setShowCreateGroup} />
    </div>
  )
}
