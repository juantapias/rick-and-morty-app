import Logo from '@/components/ui/logo/Logo'

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Logo size='lg' />
      {children}
    </div>
  )
}
