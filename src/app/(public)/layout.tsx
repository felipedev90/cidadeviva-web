import { Footer } from '@/components/layout/Footer'
import { NavBarServer } from '@/components/layout/NavBarServer'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBarServer />
      <div className="pt-24">{children}</div>
      <Footer />
    </>
  )
}
