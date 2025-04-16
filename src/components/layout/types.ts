import { LinkProps } from '@tanstack/react-router'

interface Profile {
  name: string
  role: string
  avatar: string
}

interface BaseNavItem {
  title: string
  badge?: string
  icon?: React.ElementType
}

type NavLink = BaseNavItem & {
  url: LinkProps['to']
  items?: never
}

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: LinkProps['to'] })[]
  url?: never
}

type NavItem = NavCollapsible | NavLink

interface NavGroup {
  title: string
  items: NavItem[]
}

type Branch = {
  id: number
  name: string
  logo: React.ElementType
  plan: string
}

export type { Branch, NavGroup, Profile }

export type { NavItem, NavCollapsible, NavLink }
