"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useOrgStore } from "@/store/orgStore"
import { ALL_PRODUCTS } from "@/data/mocks"
import { ProductKey } from "@/data/types"

interface CreateGroupModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateGroupModal({ open, onOpenChange }: CreateGroupModalProps) {
  const createGroup = useOrgStore(s => s.createGroup)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [roleLevel, setRoleLevel] = useState<"Admin" | "Editor" | "Viewer">("Viewer")
  const [productKey, setProductKey] = useState<string>(ALL_PRODUCTS[0]?.key || "clear-contracts")

  const canSubmit = name.trim() !== "" && description.trim() !== ""

  const handleSubmit = () => {
    if (!canSubmit) return
    createGroup({ name, description, roleLevel, products: [productKey as ProductKey] })
    onOpenChange(false)
    setName("")
    setDescription("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700">Description</label>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700">Role Level</label>
            <Select value={roleLevel} onValueChange={(v: any) => setRoleLevel(v)}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Editor">Editor</SelectItem>
                <SelectItem value="Viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700">Product</label>
            <Select value={productKey} onValueChange={(v) => setProductKey(v)}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                {ALL_PRODUCTS.map(p => (
                  <SelectItem key={p.key} value={p.key}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={!canSubmit}>Create Group</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


