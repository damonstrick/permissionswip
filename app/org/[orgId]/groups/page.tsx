"use client"

import { useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import { GroupCard } from "@/components/GroupCard"
import { useOrgStore } from "@/store/orgStore"
import { CreateGroupModal } from "@/components/modals/CreateGroupModal"

export default function GroupsPage() {
  const params = useParams()
  const orgId = params.orgId as string
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const groups = useOrgStore(s => s.groups)

  const filteredGroups = useMemo(() => (
    groups.filter(group =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ), [groups, searchTerm])

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-neutral-900">Groups</h1>
              <p className="text-neutral-600">Manage user groups and permissions</p>
            </div>
            <Button onClick={() => setShowCreateGroup(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Group
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        <Input
          placeholder="Search groups..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-4">
        {filteredGroups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            orgId={orgId}
            showNavigation={true}
          />
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="h-12 w-12 rounded-full bg-neutral-200 mx-auto mb-4 flex items-center justify-center">
              <Search className="h-6 w-6 text-neutral-400" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">No groups found</h3>
            <p className="text-neutral-500">Try adjusting your search terms</p>
          </CardContent>
        </Card>
      )}

      {/* Group Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">Total Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">{groups.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {groups.reduce((sum, group) => sum + group.memberCount, 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">Avg. Members/Group</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-900">
              {groups.length ? Math.round(groups.reduce((sum, group) => sum + group.memberCount, 0) / groups.length) : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <CreateGroupModal open={showCreateGroup} onOpenChange={setShowCreateGroup} />
    </div>
  )
}
