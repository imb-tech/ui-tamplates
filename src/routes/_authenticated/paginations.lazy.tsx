import { createLazyFileRoute } from '@tanstack/react-router'
import Paginations from '@/features/pagination'

export const Route = createLazyFileRoute('/_authenticated/paginations')({
  component: Paginations,
})
