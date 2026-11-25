import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/sonner'
import NotFoundPage from '../pages/NotFoundPage'

export const Route = createRootRoute({
  component: Root,
  notFoundComponent: () => <NotFoundPage standalone />,
})

function Root() {
  return (
    <>
      <Outlet />
      <Toaster position="bottom-right" />
    </>
  )
}
