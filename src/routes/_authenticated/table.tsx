import { createFileRoute } from '@tanstack/react-router'
import Tables from '@/features/tables'

export const Route = createFileRoute('/_authenticated/table')({
  component: Tables,
})
