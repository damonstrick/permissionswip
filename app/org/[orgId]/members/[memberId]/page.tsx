"use client"

import { MemberHeader } from "@/components/MemberHeader"
import { BasicInfoCard } from "@/components/BasicInfoCard"
import { ProductAccessCard } from "@/components/ProductAccessCard"
import { PreferencesCard } from "@/components/PreferencesCard"
import { GroupsCard } from "@/components/GroupsCard"
import { useMemberStore } from "@/store/memberStore"
import { ProductAccess } from "@/data/types"

export default function MemberDetailPage() {
  const { member, updateMember, updateProductConfigurations, updateGroups } = useMemberStore()

  // Convert productConfigurations to ProductAccess for the card
  const products: ProductAccess[] = member.productConfigurations.map(config => ({
    key: config.key,
    name: config.name,
    description: 'Lorem ipsum dolor sit amet'
  }))

  const handleUpdateProducts = (newProducts: ProductAccess[]) => {
    // This is a simplified version - in a real app you'd need to handle the full configuration
    // For now, we'll just update the basic product list
    const updatedConfigurations = newProducts.map(product => 
      member.productConfigurations.find(config => config.key === product.key) || 
      member.productConfigurations[0] // fallback
    )
    updateProductConfigurations(updatedConfigurations)
  }

  return (
    <div className="space-y-8">
      <MemberHeader member={member} />
      
      <div className="space-y-6">
        <BasicInfoCard 
          member={member} 
          onUpdate={updateMember}
        />
        
        <ProductAccessCard 
          products={products}
          onUpdateProducts={handleUpdateProducts}
        />
        
        <PreferencesCard />
        
        <GroupsCard 
          groups={member.groups}
          onUpdateGroups={updateGroups}
          memberId={member.id}
        />
      </div>
    </div>
  )
}
