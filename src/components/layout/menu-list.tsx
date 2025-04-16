import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  LayoutDashboard,
  Table, // ArrowUpDown,
  // ChartNoAxesCombined,
  // Settings,
  // GalleryHorizontalEnd,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface MenuItem {
  icon: React.ReactNode
  label: string
  id: string
}

export const menuItems: MenuItem[] = [
  {
    icon: <LayoutDashboard className='h-5 w-5' />,
    label: 'Form',
    id: '',
  },
  {
    icon: <Table className='h-5 w-5' />,
    label: 'Table',
    id: 'table',
  },
  {
    icon: <LayoutDashboard className='h-5 w-5' />,
    label: 'Pagination',
    id: 'paginations',
  },
  // {
  //   icon: <ArrowUpDown className='h-5 w-5' />,
  //   label: 'Operatsiyalar',
  //   id: 'search',
  // },
  // {
  //   icon: <GalleryHorizontalEnd className='h-5 w-5' />,
  //   label: 'Kategoriyalar',
  //   id: 'favorites',
  // },
  // {
  //   icon: <ChartNoAxesCombined className='h-5 w-5' />,
  //   label: 'Hisobot',
  //   id: 'cart',
  // },
  // {
  //   icon: <Settings className='h-5 w-5' />,
  //   label: 'Sozlamalar',
  //   id: 'profile',
  // },
]

export default function MenuList({ className }: { className?: string }) {
  const [activeItem, setActiveItem] = useState('/')
  const navigate = useNavigate()

  function handleChange(path: string) {
    navigate({ to: `/${path}` })
    setActiveItem(path)
  }

  return (
    <div
      className={cn(
        'flex h-16 items-center justify-between border-t px-2',
        'bg-background text-foreground',
        className
      )}
    >
      {menuItems.map((item) => (
        <button
          key={item.id}
          className={cn(
            'flex flex-1 flex-col items-center justify-center gap-1 p-1 text-xs transition-colors md:flex-row',
            activeItem === item.id
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
          onClick={() => handleChange(item.id)}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  )
}
