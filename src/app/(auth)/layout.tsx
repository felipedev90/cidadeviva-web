import { Footer } from '@/components/layout/Footer'
import { NavBarServer } from '@/components/layout/NavBarServer'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBarServer />
      {children}
      <Footer />
    </>
  )
}
