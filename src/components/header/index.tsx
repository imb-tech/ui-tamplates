import { Header } from '../layout/header'
import MenuList from '../layout/menu-list'
import { ProfileDropdown } from '../profile-dropdown'
import { ThemeSwitch } from '../theme-switch'

export default function MainHeader() {
  return (
    <Header>
      <MenuList className='px-3 gap-5 h-auto border-none hidden md:flex' />
      <div className='ml-auto flex items-center space-x-4'>
        <ThemeSwitch />
        <ProfileDropdown />
      </div>
    </Header>
  )
}
