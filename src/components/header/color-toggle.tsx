import { Label } from '@radix-ui/react-label'
import { ThemeColors } from '@/types/theme-types'
import { Moon, Palette, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useThemeContext } from '@/components/layout/color'
import { useTheme } from '@/components/layout/theme'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const availableThemeColors = [
  { name: 'Zinc', uz: 'Siyoh', light: 'bg-zinc-900', dark: 'bg-zinc-700' },
  {
    name: 'Slate',
    uz: 'Shifer',
    light: 'bg-slate-600',
    dark: 'bg-slate-700',
  },
  { name: 'Stone', uz: 'Tosh', light: 'bg-stone-600', dark: 'bg-stone-700' },
  { name: 'Gray', uz: 'Kulrang', light: 'bg-gray-600', dark: 'bg-gray-700' },
  {
    name: 'Neutral',
    uz: 'Neytral',
    light: 'bg-neutral-600',
    dark: 'bg-neutral-700',
  },
  { name: 'Red', uz: 'Qizil', light: 'bg-red-600', dark: 'bg-red-700' },
  { name: 'Rose', uz: 'Atirgul', light: 'bg-rose-600', dark: 'bg-rose-700' },
  {
    name: 'Orange',
    uz: "To'q sariq",
    light: 'bg-orange-500',
    dark: 'bg-orange-700',
  },
  {
    name: 'Green',
    uz: 'Yashil',
    light: 'bg-green-600',
    dark: 'bg-green-500',
  },
  { name: 'Blue', uz: "Ko'k", light: 'bg-blue-600', dark: 'bg-blue-700' },
  {
    name: 'Yellow',
    uz: 'Sariq',
    light: 'bg-yellow-400',
    dark: 'bg-yellow-600',
  },
  {
    name: 'Violet',
    uz: 'Binafsha',
    light: 'bg-violet-600',
    dark: 'bg-violet-700',
  },
  {
    name: 'Telegram',
    uz: 'Telegram',
    icon: '/telegram.svg',
    dark: 'bg-blue-700',
  },
  // {
  //     name: "React",
  //     uz: "React",
  //     icon: "/react.svg",
  // }
]

export function ThemeColorToggle() {
  const { themeColor, setThemeColor } = useThemeContext()
  const { theme, setTheme } = useTheme()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost' icon={<Palette width={20} />} />
      </PopoverTrigger>
      <PopoverContent className='w-auto space-y-4'>
        <div className='space-y-2'>
          <Label className='text-sm'>Rejim</Label>
          <div className='flex items-center gap-2'>
            <Button
              icon={<Sun width={16} />}
              variant='outline'
              size='sm'
              className={
                theme === 'light' ? '!border-2 !border-foreground' : 'm-[1px]'
              }
              onClick={() => setTheme('light')}
            >
              Yorug'
            </Button>
            <Button
              icon={<Moon width={16} />}
              variant='outline'
              size='sm'
              className={
                theme === 'dark' ? '!border-2 !border-foreground' : 'm-[1px]'
              }
              onClick={() => setTheme('dark')}
            >
              Tungi
            </Button>
          </div>
        </div>
        <div className='space-y-2'>
          <Label className='text-sm'>Rang</Label>
          <div className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
            {availableThemeColors.map(({ name, light, dark, uz, icon }) => (
              <Button
                icon={
                  icon ? (
                    <img src={icon} className='h-5 w-5 object-contain' />
                  ) : (
                    <span
                      className={cn(
                        'h-5 w-5 rounded-full',
                        theme === 'light' ? light : dark
                      )}
                    />
                  )
                }
                size='sm'
                variant='outline'
                key={name}
                className={
                  themeColor === name
                    ? 'w-auto justify-start gap-2 !border-2 !border-foreground py-0'
                    : 'm-[1px] justify-start gap-2'
                }
                onClick={() => setThemeColor(name as ThemeColors)}
              >
                {uz}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
