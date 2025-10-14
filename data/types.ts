export type Org = { 
  id: string; 
  name: string; 
};

export type Group = { 
  id: string; 
  name: string;
  description: string;
  memberCount: number;
  products: ProductKey[];
  roleLevel: 'Admin' | 'Editor' | 'Viewer';
  lastUpdated: string;
};

export type ProductKey = 'clear-contracts' | 'analyze' | 'claims-pricing' | 'compliance-plus' | 'gfe' | 'hospital-payer-data' | 'hospital-data' | 'network-check' | 'provisions-search' | 'request' | 'search' | 'search-enterprise' | 'search-pro';

export type PackageTier = 'community' | 'pro' | 'enterprise';

export type PackageFeature = {
  id: string;
  name: string;
  included: boolean;
  description?: string;
};

export type Package = {
  tier: PackageTier;
  name: string;
  description: string;
  price: string;
  billingPeriod?: string;
  features: PackageFeature[];
  limits: {
    users?: number | 'unlimited';
    dataExport?: number | 'unlimited';
    apiCalls?: number | 'unlimited';
    storage?: string;
  };
  popular?: boolean;
};

export type ProductPackageConfig = {
  productKey: ProductKey;
  selectedTier: PackageTier;
  addOns?: string[];
  customLimits?: Record<string, number>;
};

export type ProductAccess = { 
  key: ProductKey; 
  name: string; 
  description: string; 
};

// Scope types for data filtering
export type ScopeFilter = {
  id: string;
  name: string;
  type: 'provider' | 'payer' | 'payer-network' | 'state' | 'contract-type' | 'plan' | 'label' | 'service' | 'document-type';
};

export type CodeTypeCrosswalk = {
  id: string;
  name: string;
  description: string;
  isDefault?: boolean;
};

export type ProductScope = {
  providers: ScopeFilter[];
  payers: ScopeFilter[];
  payerNetworks: ScopeFilter[];
  states: ScopeFilter[];
  contractTypes: ScopeFilter[];
  plans: ScopeFilter[];
  labels: ScopeFilter[];
  services: ScopeFilter[];
  documentTypes: ScopeFilter[];
  codeTypeCrosswalks: CodeTypeCrosswalk[];
  selectedCrosswalks: string[];
};

// Permission types
export type Permission = {
  id: string;
  platform: string;
  category: string;
  action: string;
  item: string;
  description: string;
};

export type ProductPermissions = {
  permissions: Permission[];
};

// Preferences types
export type ProductPreference = {
  id: string;
  name: string;
  value: string | boolean | number;
  type: 'string' | 'boolean' | 'number' | 'select';
  options?: string[];
};

export type ProductPreferences = {
  features: ProductPreference[];
  preferences: ProductPreference[];
};

// Complete product configuration
export type ProductConfiguration = {
  key: ProductKey;
  name: string;
  scope: ProductScope;
  permissions: ProductPermissions;
  preferences: ProductPreferences;
};

export type Member = {
  id: string;
  orgId: string;
  name: string;
  email: string;
  role: 'Negotiator' | 'Analyst' | 'Executive' | 'Admin';
  department: 'Sales' | 'Contracting' | 'Rev Cycle' | 'IT' | 'Operations';
  external: boolean;
  productConfigurations: ProductConfiguration[];
  groups: Group[];
  preferences: Record<string, boolean | string | number>;
};
