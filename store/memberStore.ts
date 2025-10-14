import { create } from 'zustand'
import { Member, ProductAccess, Group, ProductConfiguration } from '@/data/types'
import { MEMBER } from '@/data/mocks'

interface MemberStore {
  member: Member
  updateMember: (updates: Partial<Member>) => void
  updateProductConfigurations: (configurations: ProductConfiguration[]) => void
  updateGroups: (groups: Group[]) => void
}

export const useMemberStore = create<MemberStore>((set) => ({
  member: MEMBER,
  updateMember: (updates) =>
    set((state) => ({
      member: { ...state.member, ...updates },
    })),
  updateProductConfigurations: (productConfigurations) =>
    set((state) => ({
      member: { ...state.member, productConfigurations },
    })),
  updateGroups: (groups) =>
    set((state) => ({
      member: { ...state.member, groups },
    })),
}))
