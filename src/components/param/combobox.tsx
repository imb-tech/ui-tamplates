import * as React from 'react'
import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

export type ParamComboboxOptionProps = {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

interface ParamComboboxProps {
  label: string
  paramName?: string
  disableSearch?: boolean
  disableClear?: boolean
  options: ParamComboboxOptionProps[]
}

export function ParamCombobox({
  label,
  options,
  paramName = 'filter',
  disableSearch = false,
  disableClear = false,
}: ParamComboboxProps) {
  const search: any = useSearch({ from: '__root__' })
  const navigate = useNavigate()

  const selectedValues = new Set(
    search[paramName]?.map((p: string | number) => String(p)) ?? []
  )

  function handleChange(value: string) {
    const values = selectedValues.has(value)
      ? Array.from(selectedValues)?.filter((v) => v !== value)
      : [...Array.from(selectedValues), value]

    console.log(values)

    navigate({
      search: {
        ...search,
        [paramName]: values?.length ? values : undefined,
      },
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className='border-dashed'>
          <PlusCircledIcon className='h-4 w-4' />
          {label}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation='vertical' className='mx-2 h-4' />
              <Badge
                variant='secondary'
                className='rounded-sm px-1 font-normal lg:hidden'
              >
                {selectedValues.size}
              </Badge>
              <div className='hidden space-x-1 lg:flex'>
                {selectedValues.size > 0 ? (
                  <Badge
                    variant='secondary'
                    className='rounded-sm px-1 font-normal'
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : null}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='start'>
        <Command>
          {!disableSearch && <CommandInput placeholder={label} />}
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleChange(option.value)}
                  >
                    <div
                      className={cn(
                        'flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon className={cn('h-4 w-4')} />
                    </div>
                    {option.icon && (
                      <option.icon className='h-4 w-4 text-muted-foreground' />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValues.size > 0 && !disableClear && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() =>
                      navigate({
                        search: {
                          ...search,
                          [paramName]: undefined,
                        },
                      })
                    }
                    className='justify-center text-center'
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
