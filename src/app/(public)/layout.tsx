import { Footer } from '@/components/layout/Footer'
import { NavBar } from '@/components/layout/NavBar'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <div className="pt-24">{children}</div>
      <Footer />
    </>
  )
}
