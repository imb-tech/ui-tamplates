import { createFileRoute } from '@tanstack/react-router'
import LeadsPage from '@/features/leads'

export const Route = createFileRoute('/_authenticated/apps/')({
  component: LeadsPage,
})
