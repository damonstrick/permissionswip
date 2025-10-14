import { create } from "zustand"
import { Group, Member } from "@/data/types"
import { ALL_GROUPS, MEMBER } from "@/data/mocks"

export interface OrgStoreState {
  members: Member[]
  groups: Group[]
  addMember: (
    member: Omit<Member, "productConfigurations" | "groups" | "preferences" | "orgId"> & { orgId?: string }
  ) => Member
  createGroup: (group: Omit<Group, "id" | "memberCount" | "lastUpdated">) => Group
  addMemberToGroup: (memberId: string, groupId: string) => void
  removeMemberFromGroup: (memberId: string, groupId: string) => void
}

function generateId(prefix: string = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`
}

export const useOrgStore = create<OrgStoreState>((set, get) => ({
  members: [
    MEMBER,
    { ...MEMBER, id: '987654321098', name: 'Sarah Johnson', email: 'sarah.johnson@commonspirit.org', role: 'Analyst', department: 'Contracting' },
    { ...MEMBER, id: '456789123456', name: 'Michael Brown', email: 'michael.brown@commonspirit.org', role: 'Executive', department: 'Operations', external: true },
    { ...MEMBER, id: '789123456789', name: 'Emily Davis', email: 'emily.davis@commonspirit.org', role: 'Admin', department: 'IT' },
  ],
  groups: ALL_GROUPS,

  addMember: (memberInput) => {
    const id = (memberInput as any).id || generateId("m")
    const newMember: Member = {
      id,
      orgId: memberInput.orgId || MEMBER.orgId,
      name: memberInput.name,
      email: memberInput.email,
      role: memberInput.role,
      department: memberInput.department,
      external: !!memberInput.external,
      productConfigurations: MEMBER.productConfigurations,
      groups: [],
      preferences: {},
    }
    set((state) => ({ members: [newMember, ...state.members] }))
    return newMember
  },

  createGroup: (groupInput) => {
    const id = generateId("g")
    const newGroup: Group = {
      id,
      name: groupInput.name,
      description: groupInput.description,
      memberCount: 0,
      products: groupInput.products,
      roleLevel: groupInput.roleLevel,
      lastUpdated: new Date().toISOString().slice(0, 10),
    }
    set((state) => ({ groups: [newGroup, ...state.groups] }))
    return newGroup
  },

  addMemberToGroup: (memberId, groupId) => {
    const state = get()
    const group = state.groups.find(g => g.id === groupId)
    if (!group) return
    set((state) => ({
      members: state.members.map((m) =>
        m.id === memberId && !m.groups.some(g => g.id === groupId)
          ? { ...m, groups: [...m.groups, group] }
          : m
      ),
      groups: state.groups.map((g) =>
        g.id === groupId ? { ...g, memberCount: g.memberCount + 1 } : g
      ),
    }))
  },

  removeMemberFromGroup: (memberId, groupId) => {
    set((state) => ({
      members: state.members.map((m) =>
        m.id === memberId
          ? { ...m, groups: m.groups.filter(g => g.id !== groupId) }
          : m
      ),
      groups: state.groups.map((g) =>
        g.id === groupId ? { ...g, memberCount: Math.max(0, g.memberCount - 1) } : g
      ),
    }))
  },
}))


