import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from '@/components/ui/toaster'
import ThemeDataProvider from '@/components/layout/color'
import { ThemeProvider } from '@/components/layout/theme'
import GeneralError from '@/features/errors/general-error'
import NotFoundError from '@/features/errors/not-found-error'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => {
    return (
      <ThemeProvider defaultTheme='dark' storageKey='theme'>
        <ThemeDataProvider>
          <Outlet />
          <Toaster />
        </ThemeDataProvider>
        {/* <>
          <ReactQueryDevtools buttonPosition='bottom-left' />
          <TanStackRouterDevtools position='bottom-right' />
        </> */}
      </ThemeProvider>
    )
  },
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})
