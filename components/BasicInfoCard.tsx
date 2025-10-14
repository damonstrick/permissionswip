"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Member } from "@/data/types"

interface BasicInfoCardProps {
  member: Member
  onUpdate: (updates: Partial<Member>) => void
}

export function BasicInfoCard({ member, onUpdate }: BasicInfoCardProps) {
  const [name, setName] = useState(member.name)
  const [role, setRole] = useState(member.role)
  const [department, setDepartment] = useState(member.department)
  const [external, setExternal] = useState(member.external)

  const handleNameChange = (value: string) => {
    setName(value)
    onUpdate({ name: value })
  }

  const handleRoleChange = (value: string) => {
    setRole(value as Member['role'])
    onUpdate({ role: value as Member['role'] })
  }

  const handleDepartmentChange = (value: string) => {
    setDepartment(value as Member['department'])
    onUpdate({ department: value as Member['department'] })
  }

  const handleExternalChange = (checked: boolean) => {
    setExternal(checked)
    onUpdate({ external: checked })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-neutral-700">Name</label>
          <Input
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-neutral-700">Role</label>
          <Select value={role} onValueChange={handleRoleChange}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
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
          <Select value={department} onValueChange={handleDepartmentChange}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
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
            <label className="text-sm font-medium text-neutral-700">External User</label>
            <p className="text-xs text-neutral-500">User is external to the organization</p>
          </div>
          <Switch
            checked={external}
            onCheckedChange={handleExternalChange}
          />
        </div>
      </CardContent>
    </Card>
  )
}
