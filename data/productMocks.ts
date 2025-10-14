import { ProductConfiguration, ScopeFilter, CodeTypeCrosswalk, Permission, ProductPreference } from './types';

// Scope filter data
export const SCOPE_FILTERS: Record<string, ScopeFilter[]> = {
  providers: [
    { id: 'p1', name: 'Banner Health', type: 'provider' },
    { id: 'p2', name: 'CommonSpirit', type: 'provider' },
    { id: 'p3', name: 'United Health', type: 'provider' },
    { id: 'p4', name: 'Banner', type: 'provider' },
  ],
  payers: [
    { id: 'py1', name: 'Aetna', type: 'payer' },
    { id: 'py2', name: 'Cigna', type: 'payer' },
    { id: 'py3', name: 'Blue Cross', type: 'payer' },
  ],
  payerNetworks: [
    { id: 'pn1', name: 'AL HMO', type: 'payer-network' },
    { id: 'pn2', name: 'AZ PPO', type: 'payer-network' },
    { id: 'pn3', name: 'Blue Choice', type: 'payer-network' },
  ],
  states: [
    { id: 's1', name: 'AL', type: 'state' },
    { id: 's2', name: 'AZ', type: 'state' },
    { id: 's3', name: 'AZ - AL', type: 'state' },
    { id: 's4', name: 'CA', type: 'state' },
    { id: 's5', name: 'NY', type: 'state' },
  ],
  contractTypes: [
    { id: 'ct1', name: 'Banner Health', type: 'contract-type' },
    { id: 'ct2', name: 'CommonSpirit', type: 'contract-type' },
  ],
  plans: [
    { id: 'pl1', name: 'Gold Plan', type: 'plan' },
    { id: 'pl2', name: 'Silver Plan', type: 'plan' },
  ],
  labels: [
    { id: 'l1', name: 'Active', type: 'label' },
    { id: 'l2', name: 'Pending', type: 'label' },
  ],
  services: [
    { id: 'sv1', name: 'L37829', type: 'service' },
    { id: 'sv2', name: 'L26734', type: 'service' },
    { id: 'sv3', name: 'S27783', type: 'service' },
  ],
  documentTypes: [
    { id: 'dt1', name: 'Amendment', type: 'document-type' },
    { id: 'dt2', name: 'Base Language', type: 'document-type' },
  ],
};

export const CODE_TYPE_CROSSWALKS: CodeTypeCrosswalk[] = [
  {
    id: 'ctc1',
    name: 'MS-DRG (Default)',
    description: 'APR-DRG Codes will be cross walked to MS-DRG',
    isDefault: true,
  },
  {
    id: 'ctc2',
    name: 'APR-DRG',
    description: 'Select to crosswalk MSDRG to APR',
  },
  {
    id: 'ctc3',
    name: 'HCPCS',
    description: 'Healthcare Common Procedure Coding System',
  },
  {
    id: 'ctc4',
    name: 'APC',
    description: 'Ambulatory Payment Classification',
  },
];

// Permission data
export const CLEAR_CONTRACTS_PERMISSIONS: Permission[] = [
  {
    id: 'cc1',
    platform: 'contracting_platform',
    category: 'contract project',
    action: 'Can add',
    item: 'contract project',
    description: 'Allows user to create new contract projects',
  },
  {
    id: 'cc2',
    platform: 'contracting_platform',
    category: 'contract project',
    action: 'Can change',
    item: 'contract project',
    description: 'Allows user to modify existing contract projects',
  },
  {
    id: 'cc3',
    platform: 'contracting_platform',
    category: 'contract project',
    action: 'Can view',
    item: 'contract project',
    description: 'Allows user to view contract projects',
  },
  {
    id: 'cc4',
    platform: 'contracting_platform',
    category: 'contract project',
    action: 'Can view',
    item: 'unapproved intake statuses',
    description: 'Allows user to view unapproved intake statuses',
  },
  {
    id: 'cc5',
    platform: 'contracting_platform',
    category: 'hierarchical document',
    action: 'Can add',
    item: 'hierarchical document',
    description: 'Allows user to create hierarchical documents',
  },
];

export const ANALYZE_PERMISSIONS: Permission[] = [
  {
    id: 'a1',
    platform: 'ai_evaluation',
    category: 'ai eval label',
    action: 'Can export',
    item: 'ai eval labels',
    description: 'Allows user to export AI evaluation labels',
  },
  {
    id: 'a2',
    platform: 'ai_evaluation',
    category: 'ai eval label',
    action: 'Can import',
    item: 'ai eval labels',
    description: 'Allows user to import AI evaluation labels',
  },
  {
    id: 'a3',
    platform: 'ai_evaluation',
    category: 'ai eval label',
    action: 'Can view',
    item: 'ai eval label',
    description: 'Allows user to view AI evaluation labels',
  },
  {
    id: 'a4',
    platform: 'ai_evaluation',
    category: 'Al Eval Run',
    action: 'Can add',
    item: 'Al Eval Run',
    description: 'Allows user to create AI evaluation runs',
  },
  {
    id: 'a5',
    platform: 'ai_evaluation',
    category: 'Al Eval Run',
    action: 'Can change',
    item: 'Al Eval Run',
    description: 'Allows user to modify AI evaluation runs',
  },
  {
    id: 'a6',
    platform: 'ai_evaluation',
    category: 'Al Eval Run',
    action: 'Can delete',
    item: 'Al Eval Run',
    description: 'Allows user to delete AI evaluation runs',
  },
];

// Preference data
export const CLEAR_CONTRACTS_PREFERENCES: ProductPreference[] = [
  // Notifications & Communication
  {
    id: 'cp-notif-1',
    name: 'Clear contracts notification on doc upload',
    value: false,
    type: 'boolean',
  },
  {
    id: 'cp-notif-2',
    name: 'Clear contracts enable renewal emails',
    value: false,
    type: 'boolean',
  },
  
  // Organization & Display
  {
    id: 'cp-org-1',
    name: 'Clear contracts enable folder view',
    value: false,
    type: 'boolean',
  },
  {
    id: 'cp-org-2',
    name: 'Clear contracts rate summary customer',
    value: false,
    type: 'boolean',
  },
  {
    id: 'cp-org-3',
    name: 'Clear contracts document hierarchy enabled',
    value: false,
    type: 'boolean',
  },
  {
    id: 'cp-org-4',
    name: 'Clear contracts intake statuses',
    value: false,
    type: 'boolean',
  },
  
  // Contract Lifecycle
  {
    id: 'cp-lifecycle-1',
    name: 'Clear contracts renewal dates enabled',
    value: false,
    type: 'boolean',
  },
  {
    id: 'cp-lifecycle-2',
    name: 'Renewals MS2',
    value: false,
    type: 'boolean',
  },
  
  // System Settings
  {
    id: 'cp-system-1',
    name: 'Upload / select Claims Data Schema',
    value: '',
    type: 'string',
  },
  {
    id: 'cp-system-2',
    name: 'Medicare API Rate Limit',
    value: 1000,
    type: 'number',
  },
];

// Features data
export const CLEAR_CONTRACTS_FEATURES: ProductPreference[] = [
  // Document Processing
  {
    id: 'cf-doc-1',
    name: 'enable neural indexing',
    value: true,
    type: 'boolean',
  },
  {
    id: 'cf-doc-2',
    name: 'enable auto indexing',
    value: false,
    type: 'boolean',
  },
  {
    id: 'cf-doc-3',
    name: 'auto extract rate tables',
    value: false,
    type: 'boolean',
  },
  {
    id: 'cf-doc-4',
    name: 'enable AI context',
    value: false,
    type: 'boolean',
  },
  {
    id: 'cf-doc-5',
    name: 'enable redacto',
    value: false,
    type: 'boolean',
  },
  {
    id: 'cf-doc-6',
    name: 'Clear contracts tag approval workflow',
    value: false,
    type: 'boolean',
  },
  {
    id: 'cf-doc-7',
    name: 'Claims Data Schema',
    value: false,
    type: 'boolean',
  },
  
  // Tagging System
  {
    id: 'cf-tag-1',
    name: 'Clear contracts custom tag templates only',
    value: false,
    type: 'boolean',
  },
];

export const ANALYZE_PREFERENCES: ProductPreference[] = [
  {
    id: 'ap1',
    name: 'Default Dashboard',
    value: 'overview',
    type: 'select',
    options: ['overview', 'detailed', 'custom'],
  },
  {
    id: 'ap2',
    name: 'Auto-refresh Data',
    value: 300,
    type: 'number',
  },
  {
    id: 'ap3',
    name: 'Show Advanced Metrics',
    value: false,
    type: 'boolean',
  },
];

// Complete product configurations
export const CLEAR_CONTRACTS_CONFIG: ProductConfiguration = {
  key: 'clear-contracts',
  name: 'Clear Contracts',
  scope: {
    providers: [SCOPE_FILTERS.providers[0], SCOPE_FILTERS.providers[1], SCOPE_FILTERS.providers[2]],
    payers: [],
    payerNetworks: [SCOPE_FILTERS.payerNetworks[0], SCOPE_FILTERS.payerNetworks[1], SCOPE_FILTERS.payerNetworks[2]],
    states: [SCOPE_FILTERS.states[0], SCOPE_FILTERS.states[1], SCOPE_FILTERS.states[2]],
    contractTypes: [SCOPE_FILTERS.contractTypes[0], SCOPE_FILTERS.contractTypes[1]],
    plans: [SCOPE_FILTERS.plans[0], SCOPE_FILTERS.plans[1]],
    labels: [SCOPE_FILTERS.labels[0]],
    services: [SCOPE_FILTERS.services[0], SCOPE_FILTERS.services[1], SCOPE_FILTERS.services[2]],
    documentTypes: [SCOPE_FILTERS.documentTypes[0], SCOPE_FILTERS.documentTypes[1]],
    codeTypeCrosswalks: CODE_TYPE_CROSSWALKS,
    selectedCrosswalks: ['ctc1', 'ctc3'],
  },
  permissions: {
    permissions: [CLEAR_CONTRACTS_PERMISSIONS[0], CLEAR_CONTRACTS_PERMISSIONS[4]],
  },
  preferences: {
    features: CLEAR_CONTRACTS_FEATURES,
    preferences: CLEAR_CONTRACTS_PREFERENCES,
  },
};

export const ANALYZE_CONFIG: ProductConfiguration = {
  key: 'analyze',
  name: 'Analyze',
  scope: {
    providers: [],
    payers: [],
    payerNetworks: [],
    states: [],
    contractTypes: [],
    plans: [],
    labels: [],
    services: [],
    documentTypes: [],
    codeTypeCrosswalks: [],
    selectedCrosswalks: [],
  },
  permissions: {
    permissions: [ANALYZE_PERMISSIONS[0], ANALYZE_PERMISSIONS[1]],
  },
  preferences: {
    features: [],
    preferences: ANALYZE_PREFERENCES,
  },
};
