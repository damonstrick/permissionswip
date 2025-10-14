"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Search, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GroupCard } from "./GroupCard"
import { GroupDetailPanel } from "./GroupDetailPanel"
import { Group } from "@/data/types"
import { useOrgStore } from "@/store/orgStore"
import { ALL_GROUPS } from "@/data/mocks"

interface GroupsCardProps {
  groups: Group[]
  onUpdateGroups: (groups: Group[]) => void
  memberId?: string
}

export function GroupsCard({ groups, onUpdateGroups, memberId }: GroupsCardProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const params = useParams()
  const orgId = params.orgId as string
  const addMemberToGroup = useOrgStore(s => s.addMemberToGroup)
  const removeMemberFromGroup = useOrgStore(s => s.removeMemberFromGroup)

  const filteredGroups = ALL_GROUPS.filter(
    group => 
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !groups.some(g => g.id === group.id)
  )

  const handleAddGroup = (group: Group) => {
    if (memberId) {
      addMemberToGroup(memberId, group.id)
    }
    onUpdateGroups([...groups, group])
    setSearchTerm("")
    setShowSearchResults(false)
  }

  const handleRemoveGroup = (groupId: string) => {
    if (memberId) {
      removeMemberFromGroup(memberId, groupId)
    }
    onUpdateGroups(groups.filter(g => g.id !== groupId))
  }

  const handleSearchFocus = () => {
    setShowSearchResults(true)
  }

  const handleSearchBlur = () => {
    // Delay hiding to allow clicking on results
    setTimeout(() => setShowSearchResults(false), 200)
  }

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle>Groups</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <Input
            placeholder="Search for group to add this user to"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            className="pl-10"
          />
          
          {searchTerm && filteredGroups.length > 0 && showSearchResults && (
            <div className="absolute top-full left-0 right-0 z-10 mt-1 space-y-1">
              {filteredGroups.slice(0, 3).map((group) => (
                <GroupCard
                  key={group.id}
                  group={group}
                  onClick={() => handleAddGroup(group)}
                  isClickable={true}
                />
              ))}
            </div>
          )}
        </div>

        {groups.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-neutral-700">Applied Groups</h4>
            {groups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                onRemove={() => handleRemoveGroup(group.id)}
                onClick={() => setSelectedGroup(group)}
                isClickable={true}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>

    {selectedGroup && (
      <GroupDetailPanel
        group={selectedGroup}
        orgId={orgId}
        onClose={() => setSelectedGroup(null)}
      />
    )}
  </>
  )
}
