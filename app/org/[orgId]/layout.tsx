import { OrgShell } from "@/components/OrgShell"

export default function OrgLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { orgId: string }
}) {
  return <OrgShell orgId={params.orgId}>{children}</OrgShell>
}
