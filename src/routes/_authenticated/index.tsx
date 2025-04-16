import { createFileRoute } from '@tanstack/react-router'
import Form from '@/features/form'

export const Route = createFileRoute('/_authenticated/')({
  component: Form,
})
