import {
  Users,
  UserCircle,
  Layers,
  CreditCard,
  AlertCircle,
  GraduationCap,
  BookOpen,
  UserCheck,
  LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

type Stat = {
  title: string
  value: number
  icon: LucideIcon
  color: string
  bg: string
  span?: string
}

export default function Stats() {
  const stats: Stat[] = [
    {
      title: 'Faol talabalar',
      value: 156,
      icon: GraduationCap,
      color: 'text-purple-500',
      bg: 'bg-purple-300/10',
    },
    {
      title: 'Guruhlar',
      value: 36,
      icon: Layers,
      color: 'text-violet-500',
      bg: 'bg-violet-300/10',
    },
    {
      title: "O'qituvchilar",
      value: 8,
      icon: Users,
      color: 'text-teal-500',
      bg: 'bg-teal-300/10',
    },
    {
      title: 'Faol Lidlar',
      value: 24,
      icon: UserCircle,
      color: 'text-blue-500',
      bg: 'bg-blue-300/10',
    },
    {
      title: 'Qarzdorlar',
      value: 18,
      icon: AlertCircle,
      color: 'text-rose-500',
      bg: 'bg-rose-300/10',
    },
    {
      title: "To'lovi yaqin",
      value: 7,
      icon: CreditCard,
      color: 'text-amber-500',
      bg: 'bg-amber-300/10',
    },
    {
      title: 'Sinov darsida',
      value: 12,
      icon: BookOpen,
      color: 'text-pink-500',
      bg: 'bg-pink-300/10',
    },
    {
      title: 'Kelib ketganlar',
      value: 42,
      icon: UserCheck,
      color: 'text-cyan-500',
      bg: 'bg-cyan-300/10',
    },
    {
      title: 'Qolgan qarzlar',
      value: 12500000,
      icon: CreditCard,
      color: 'text-rose-500',
      bg: 'bg-rose-300/10',
      span: 'col-span-2 lg:col-span-1 xl:col-span-2',
    },
  ]

  return (
    <div className='grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
      {stats.map((stat, index) => (
        <StatCard key={index} stat={stat} />
      ))}
    </div>
  )
}

function StatCard({ stat }: { stat: Stat }) {
  const Icon = stat.icon

  // Format numbers with commas for thousands
  const formattedValue = stat.value.toLocaleString()

  return (
    <Card
      className={cn(
        'overflow-hidden border-none bg-secondary shadow-sm transition-all duration-300 hover:shadow-md',
        stat?.span
      )}
    >
      <CardContent className='px-x p-3 sm:px-4'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm font-normal'>{stat.title}</p>
            <p className='mt-1 text-2xl font-light'>{formattedValue}</p>
          </div>
          <div className={`rounded-full p-3 ${stat.color} ${stat.bg}`}>
            <Icon className={`h-5 w-5 ${stat.color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
