import { createFileRoute, Outlet } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-context'
import MainHeader from '@/components/header'
import { BottomMenu } from '@/components/layout/bottom-menu'

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SearchProvider>
      <div
        id='content'
        className={cn(
          'ml-auto w-full max-w-full',
          'transition-[width] duration-200 ease-linear',
          'flex h-svh flex-col',
          'group-data-[scroll-locked=1]/body:h-full',
          'group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh'
        )}
      >
        <MainHeader />
        <Outlet />
        <BottomMenu />
      </div>
    </SearchProvider>
  )
}
