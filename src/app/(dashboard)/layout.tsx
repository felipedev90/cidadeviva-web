import { DashboardNav } from '@/components/layout/DashboardNav'
import { getUser } from '@/lib/api/user'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser()

  return (
    <>
      <DashboardNav userName={user.name} />
      <main className="pt-32 lg:pt-20">{children}</main>
    </>
  )
}
