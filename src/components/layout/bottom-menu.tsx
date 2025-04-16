import MenuList from './menu-list'

export function BottomMenu() {
  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 md:hidden'>
      <MenuList />
    </div>
  )
}
