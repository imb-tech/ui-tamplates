import {
  IconBrowserCheck,
  IconHelp,
  IconLayoutDashboard,
  IconMessages,
  IconNotification,
  IconPalette,
  IconSettings,
  IconTool,
  IconUserCog,
  IconUsers,
} from '@tabler/icons-react'
import {
  Command,
  FileText,
  GraduationCap,
  Landmark,
  Layers,
  UserCheck,
} from 'lucide-react'
import { Branch, NavGroup, Profile } from '../types'

export const branches: Branch[] = [
  {
    id: 1,
    name: 'Chilonzor',
    logo: Command,
    plan: "Najot Ta'lim",
  },
  {
    id: 2,
    name: 'Sergeli',
    logo: Command,
    plan: "Najot Ta'lim",
  },
  {
    id: 3,
    name: 'Yunusobod',
    logo: Command,
    plan: "Najot Ta'lim",
  },
]

export const menuItems: NavGroup[] = [
  {
    title: 'Asosiy',
    items: [
      {
        title: 'Dashboard',
        url: '/',
        icon: IconLayoutDashboard,
      },
      {
        title: 'Lidlar',
        url: '/apps',
        badge: '12',
        icon: UserCheck,
      },
      {
        title: "O'quvchilar",
        url: '/students',
        icon: GraduationCap,
      },
      {
        title: 'Guruhlar',
        url: '/chats',
        icon: Layers,
      },
      {
        title: "O'qituvchilar",
        url: '/users',
        icon: IconUsers,
      },
      {
        title: 'Moliya',
        url: '/help-center',
        icon: Landmark,
      },
    ],
  },
  {
    title: "Qo'shimcha",
    items: [
      {
        title: 'Markaz sozlamalari',
        icon: IconSettings,
        items: [
          {
            title: 'Kurslar',
            url: '/settings',
            icon: IconMessages,
          },
          {
            title: 'Xonalar',
            url: '/settings',
            icon: IconMessages,
          },
          {
            title: 'Hodimlar',
            url: '/settings',
            icon: IconMessages,
          },
          {
            title: 'Formalar',
            icon: IconSettings,
            url: '/settings',
          },
          {
            title: 'Dam olish kunlari',
            url: '/help-center',
            icon: IconHelp,
          },
        ],
      },
      {
        title: 'Hisobotlar',
        icon: FileText,
        items: [
          {
            title: 'Profile',
            url: '/settings',
            icon: IconUserCog,
          },
          {
            title: 'Account',
            url: '/settings/account',
            icon: IconTool,
          },
          {
            title: 'Appearance',
            url: '/settings/appearance',
            icon: IconPalette,
          },
          {
            title: 'Notifications',
            url: '/settings/notifications',
            icon: IconNotification,
          },
          {
            title: 'Display',
            url: '/settings/display',
            icon: IconBrowserCheck,
          },
        ],
      },
    ],
  },
]

export const profile: Profile = {
  name: 'Doniyor Eshmamatov',
  role: 'reception',
  avatar: '/avatars/shadcn.jpg',
}
