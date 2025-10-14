"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useOrgStore } from "@/store/orgStore"

interface AddMemberModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddMemberModal({ open, onOpenChange }: AddMemberModalProps) {
  const addMember = useOrgStore(s => s.addMember)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<"Negotiator" | "Analyst" | "Executive" | "Admin">("Negotiator")
  const [department, setDepartment] = useState<"Sales" | "Contracting" | "Rev Cycle" | "IT" | "Operations">("Sales")
  const [external, setExternal] = useState(false)

  const canSubmit = name.trim() !== "" && email.trim() !== ""

  const handleSubmit = () => {
    if (!canSubmit) return
    addMember({ id: undefined as any, name, email, role, department, external })
    onOpenChange(false)
    setName("")
    setEmail("")
    setExternal(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700">Role</label>
            <Select value={role} onValueChange={(v: any) => setRole(v)}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Negotiator">Negotiator</SelectItem>
                <SelectItem value="Analyst">Analyst</SelectItem>
                <SelectItem value="Executive">Executive</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700">Department</label>
            <Select value={department} onValueChange={(v: any) => setDepartment(v)}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Contracting">Contracting</SelectItem>
                <SelectItem value="Rev Cycle">Rev Cycle</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="Operations">Operations</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-neutral-700">External User</div>
              <div className="text-xs text-neutral-500">User is external to the organization</div>
            </div>
            <Switch checked={external} onCheckedChange={setExternal} />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={!canSubmit}>Add Member</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


