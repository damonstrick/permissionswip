import { create } from 'zustand'
import { ProductConfiguration, ScopeFilter } from '@/data/types'
import { CLEAR_CONTRACTS_CONFIG, ANALYZE_CONFIG, SCOPE_FILTERS } from '@/data/productMocks'

interface ProductStore {
  configurations: Record<string, ProductConfiguration>
  updateScope: (productKey: string, scopeType: keyof ProductConfiguration['scope'], filters: ScopeFilter[]) => void
  updateCrosswalks: (productKey: string, selectedCrosswalks: string[]) => void
  updatePermissions: (productKey: string, permissions: any[]) => void
  updatePreferences: (productKey: string, preferences: any) => void
  getConfiguration: (productKey: string) => ProductConfiguration | undefined
}

export const useProductStore = create<ProductStore>((set, get) => ({
  configurations: {
    'clear-contracts': CLEAR_CONTRACTS_CONFIG,
    'analyze': ANALYZE_CONFIG,
  },
  
  updateScope: (productKey, scopeType, filters) =>
    set((state) => ({
      configurations: {
        ...state.configurations,
        [productKey]: {
          ...state.configurations[productKey],
          scope: {
            ...state.configurations[productKey].scope,
            [scopeType]: filters,
          },
        },
      },
    })),
    
  updateCrosswalks: (productKey, selectedCrosswalks) =>
    set((state) => ({
      configurations: {
        ...state.configurations,
        [productKey]: {
          ...state.configurations[productKey],
          scope: {
            ...state.configurations[productKey].scope,
            selectedCrosswalks,
          },
        },
      },
    })),
    
  updatePermissions: (productKey, permissions) =>
    set((state) => ({
      configurations: {
        ...state.configurations,
        [productKey]: {
          ...state.configurations[productKey],
          permissions: {
            permissions,
          },
        },
      },
    })),
    
  updatePreferences: (productKey, preferences) =>
    set((state) => ({
      configurations: {
        ...state.configurations,
        [productKey]: {
          ...state.configurations[productKey],
          preferences,
        },
      },
    })),
    
  getConfiguration: (productKey) => {
    const state = get()
    return state.configurations[productKey]
  },
}))
