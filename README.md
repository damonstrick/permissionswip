# Healthcare Admin Permissions Prototype

A comprehensive Next.js 14 admin tool for healthcare organizations to manage member permissions, group access, and product configurations.

## 🚀 Features

### **Member Management**
- **Member drill-down** with detailed permission views
- **Direct permissions** vs **inherited permissions** from groups
- **Complete permissions overview** with source tracking
- **Interactive permission configuration** for each product

### **Group Management**
- **Group creation** and member assignment
- **Group-level permissions** with inheritance tracking
- **Side panel** for quick group details and permissions
- **Bulk member operations** and group management

### **Product Configuration**
- **Package selection** (Community, Pro, Enterprise)
- **Feature customization** for Enterprise plans
- **Scope configuration** with data filters
- **Seats and limits** management

### **Products Supported**
- **Clear Contracts** - Contract management and analysis
- **Analyze** - Data analytics and reporting
- **Claims Pricing** - Claims pricing analysis
- **Compliance +** - Enhanced compliance monitoring
- **GFE** - Good Faith Estimates management
- **Hospital and Payer Data** - Comprehensive data analytics
- **Network Check** - Provider network verification
- **Provisions Search** - Contract provisions search
- **Request** - Request management platform
- **Search** - Advanced search capabilities
- **Search Enterprise/Pro** - Tiered search features

## 🛠️ Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Zustand** for state management
- **Lucide React** for icons
- **Radix UI** for accessible components

## 🎨 Design System

- **Grayscale wireframe aesthetic** inspired by Dieter Rams
- **8px spacing system** for consistent layouts
- **Card-based UI** with subtle borders and shadows
- **Responsive design** for all screen sizes
- **Accessible components** with proper ARIA labels

## 📱 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd permissionswip

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin-level screens
│   ├── org/[orgId]/       # Organization-specific pages
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── modals/           # Modal components
├── data/                 # Mock data and types
├── store/                # Zustand state management
└── lib/                  # Utility functions
```

## 🔑 Key Pages

- **`/admin/organizations`** - Organizations overview
- **`/admin/groups`** - Groups management
- **`/admin/users`** - Users overview
- **`/org/[orgId]`** - Organization dashboard
- **`/org/[orgId]/members`** - Members list
- **`/org/[orgId]/members/[memberId]`** - Member details
- **`/org/[orgId]/members/[memberId]/permissions`** - Complete permissions view
- **`/org/[orgId]/products`** - Products & Features
- **`/org/[orgId]/products/[productKey]/packages`** - Package selection

## 🎯 Permissions System

### **Permission Types**
- **Scope** - Data filters (providers, payers, states, etc.)
- **Permissions** - Actions (view, edit, export, etc.)
- **Preferences** - Product-specific settings

### **Permission Sources**
- **Direct Assignment** - Permissions granted specifically to a member
- **Group Inheritance** - Permissions inherited from group membership
- **Override Detection** - When direct permissions override inherited ones

### **Visual Indicators**
- 🟢 **Green** - Direct assignments
- 🟣 **Purple** - Group inheritance
- 🟠 **Orange** - Override conflicts

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Connect to Vercel
npx vercel

# Deploy
vercel --prod
```

### Other Platforms
- **Netlify** - Drag and drop deployment
- **Railway** - Full-stack hosting
- **Render** - Simple deployment

## 🤝 Collaboration

### GitHub Codespaces
1. Open your repository on GitHub
2. Click "Code" → "Codespaces" → "Create codespace"
3. Share the codespace URL for real-time collaboration

### Development Workflow
1. **Feature branches** for new features
2. **Pull requests** for code review
3. **Issues** for bug tracking and feature requests

## 📊 State Management

### Stores
- **`memberStore`** - Member data and configurations
- **`orgStore`** - Organization-wide data (groups, members)
- **`productStore`** - Product configurations and permissions

### Data Flow
```
User Action → Store Update → Component Re-render → UI Update
```

## 🎨 Customization

### Adding New Products
1. Update `ProductKey` type in `data/types.ts`
2. Add product data to `data/mocks.ts`
3. Create product-specific configurations
4. Add to package selection flow

### Styling Changes
- **Colors**: Update `tailwind.config.js`
- **Components**: Modify `components/ui/`
- **Layout**: Update shell components

## 📝 License

This project is a prototype for healthcare admin permissions management.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or support, please create an issue in the GitHub repository.