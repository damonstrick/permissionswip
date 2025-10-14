import { Org, Group, ProductAccess, Member } from './types';
import { CLEAR_CONTRACTS_CONFIG, ANALYZE_CONFIG } from './productMocks';

export const ORG: Org = { 
  id: 'commonspirit', 
  name: 'CommonSpirit Health' 
};

export const ALL_GROUPS: Group[] = [
  { 
    id: 'g1', 
    name: 'CC - Admin',
    description: 'Full administrative access to Clear Contracts platform',
    memberCount: 12,
    products: ['clear-contracts', 'analyze'],
    roleLevel: 'Admin',
    lastUpdated: '2024-01-15'
  },
  { 
    id: 'g2', 
    name: 'Analyze - Editor',
    description: 'Can create and edit analysis reports and dashboards',
    memberCount: 8,
    products: ['analyze'],
    roleLevel: 'Editor',
    lastUpdated: '2024-01-10'
  },
  { 
    id: 'g3', 
    name: 'Analyze - Viewer',
    description: 'Read-only access to analysis reports and dashboards',
    memberCount: 24,
    products: ['analyze'],
    roleLevel: 'Viewer',
    lastUpdated: '2024-01-08'
  },
];

export const ALL_PRODUCTS: ProductAccess[] = [
  { 
    key: 'clear-contracts', 
    name: 'Clear Contracts', 
    description: 'Contract management and analysis platform' 
  },
  { 
    key: 'analyze', 
    name: 'Analyze', 
    description: 'Data analytics and reporting platform' 
  },
  { 
    key: 'claims-pricing', 
    name: 'Claims Pricing', 
    description: 'Claims pricing analysis and optimization' 
  },
  { 
    key: 'compliance-plus', 
    name: 'Compliance +', 
    description: 'Enhanced compliance monitoring and reporting' 
  },
  { 
    key: 'gfe', 
    name: 'GFE', 
    description: 'Good Faith Estimates management and tracking' 
  },
  { 
    key: 'hospital-payer-data', 
    name: 'Hospital and Payer Data', 
    description: 'Comprehensive hospital and payer data analytics' 
  },
  { 
    key: 'hospital-data', 
    name: 'Hospital Data', 
    description: 'Hospital-specific data and analytics' 
  },
  { 
    key: 'network-check', 
    name: 'Network Check', 
    description: 'Provider network verification and validation' 
  },
  { 
    key: 'provisions-search', 
    name: 'Provisions Search', 
    description: 'Contract provisions search and analysis' 
  },
  { 
    key: 'request', 
    name: 'Request', 
    description: 'Request management and workflow platform' 
  },
  { 
    key: 'search', 
    name: 'Search', 
    description: 'Advanced search capabilities across all data' 
  },
  { 
    key: 'search-enterprise', 
    name: 'Search - Enterprise', 
    description: 'Enterprise-grade search with advanced features' 
  },
  { 
    key: 'search-pro', 
    name: 'Search - Pro', 
    description: 'Professional search with enhanced capabilities' 
  },
];

export const MEMBER: Member = {
  id: '938698763987',
  orgId: ORG.id,
  name: 'John Smith',
  email: 'johnsmith@email.com',
  role: 'Negotiator',
  department: 'Sales',
  external: false,
  productConfigurations: [CLEAR_CONTRACTS_CONFIG, ANALYZE_CONFIG],
  groups: [ALL_GROUPS[0], ALL_GROUPS[1]],
  preferences: {},
};
