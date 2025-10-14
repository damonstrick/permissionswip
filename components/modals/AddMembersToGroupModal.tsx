"use client"

import { useMemo, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useOrgStore } from "@/store/orgStore"
import { Group } from "@/data/types"

interface AddMembersToGroupModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  group: Group
}

export function AddMembersToGroupModal({ open, onOpenChange, group }: AddMembersToGroupModalProps) {
  const { members, addMemberToGroup } = useOrgStore(s => ({ members: s.members, addMemberToGroup: s.addMemberToGroup }))
  const [searchTerm, setSearchTerm] = useState("")
  const [selected, setSelected] = useState<Record<string, boolean>>({})

  const candidates = useMemo(() =>
    members.filter(m => !m.groups.some(g => g.id === group.id) && (
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.email.toLowerCase().includes(searchTerm.toLowerCase())
    )), [members, group.id, searchTerm])

  const handleAdd = () => {
    Object.keys(selected).forEach((memberId) => {
      if (selected[memberId]) addMemberToGroup(memberId, group.id)
    })
    onOpenChange(false)
    setSelected({})
    setSearchTerm("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Members to {group.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="Search members..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <div className="max-height-[320px] max-h-80 overflow-auto space-y-2">
            {candidates.map((m) => (
              <label key={m.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-neutral-50">
                <input
                  type="checkbox"
                  checked={!!selected[m.id]}
                  onChange={(e) => setSelected(prev => ({ ...prev, [m.id]: e.target.checked }))}
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-neutral-900">{m.name}</div>
                  <div className="text-xs text-neutral-500">{m.email}</div>
                </div>
              </label>
            ))}
            {candidates.length === 0 && (
              <div className="text-sm text-neutral-500 p-2">No available members</div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleAdd} disabled={Object.values(selected).every(v => !v)}>Add Selected</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


