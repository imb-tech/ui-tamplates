import { useRef } from 'react'
import clsx from 'clsx'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import CreatableSelect from 'react-select/creatable'
import { cn } from '@/lib/utils'

const controlStyles = {
  base: 'border border-border rounded-lg bg-background hover:cursor-pointer',
  focus: 'border-border ring-ring ring-primary-500',
  nonFocus: 'border-border',
}
const placeholderStyles = 'text-muted-foreground text-sm ml-3'
const selectInputStyles = 'text-foreground text-sm ml-3'
const valueContainerStyles = 'text-foreground text-sm'
const singleValueStyles = 'ml-3'
const multiValueStyles =
  'ml-3 bg-background border border-border rounded items-center py-0.5 pl-2 pr-1 gap-1.5'
const multiValueLabelStyles = 'leading-6 py-0.5'
const multiValueRemoveStyles =
  'border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md bg-background'
const indicatorsContainerStyles = 'p-1 gap-1 bg-background rounded-lg'
const clearIndicatorStyles = 'text-gray-500 p-1 rounded-md hover:text-red-800'
const indicatorSeparatorStyles = 'bg-mutated'
const dropdownIndicatorStyles = 'p-1 hover:text-foreground text-gray-500'
const menuStyles =
  'mt-2 p-2 border border-border bg-background text-sm rounded-lg'
const optionsStyle =
  'bg-background p-2 border-0 text-base hover:bg-secondary hover:cursor-pointer rounded-md'
const activeOptionStyle = 'bg-primary/10' // New style for active option
const groupHeadingStyles = 'ml-3 mt-2 mb-1 text-gray-500 text-sm bg-background'
const noOptionsMessageStyles = 'text-muted-foreground bg-background'

type Opt = { value: string | number; label: string }

type SelectComponentProps = {
  options: Opt[]
  value?: any
  onChange?: (value: any) => void
  isMulti?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  createAble?: boolean
  placeholder?: string
}

export const SelectComponent = ({
  options,
  value,
  onChange,
  isMulti,
  isDisabled,
  isLoading,
  createAble = false,
  placeholder,
  ...props
}: SelectComponentProps) => {
  const animatedComponents = makeAnimated()
  const Comp = createAble ? CreatableSelect : Select

  const ref = useRef<string>('')

  return (
    <>
      <Comp
        unstyled
        isClearable
        isSearchable
        value={value}
        isDisabled={isDisabled}
        isMulti={isMulti}
        isLoading={isLoading}
        placeholder={placeholder}
        components={animatedComponents}
        defaultValue={value}
        options={options}
        noOptionsMessage={() => 'No options found !!'}
        onChange={onChange}
        classNames={{
          control: ({ isFocused }) =>
            clsx(
              isFocused ? controlStyles.focus : controlStyles.nonFocus,
              controlStyles.base
            ),
          placeholder: () => placeholderStyles,
          input: () => selectInputStyles,
          option: ({ isSelected }) =>
            clsx(optionsStyle, isSelected && activeOptionStyle),
          menu: () => menuStyles,
          valueContainer: () => valueContainerStyles,
          singleValue: () => singleValueStyles,
          multiValue: () => multiValueStyles,
          multiValueLabel: () => multiValueLabelStyles,
          multiValueRemove: () => multiValueRemoveStyles,
          indicatorsContainer: () => indicatorsContainerStyles,
          clearIndicator: () => clearIndicatorStyles,
          indicatorSeparator: () => indicatorSeparatorStyles,
          dropdownIndicator: () => dropdownIndicatorStyles,
          groupHeading: () => groupHeadingStyles,
          noOptionsMessage: () => noOptionsMessageStyles,
        }}
        onInputChange={(v) => (ref.current = v)}
        formatOptionLabel={(opt: Opt) => findHighlights(opt.label, ref.current)}
        className='min-w-52'
        {...props}
      />
    </>
  )
}

function findHighlights(text: string, query: string, className?: string) {
  return text.split(new RegExp(`(${query})`, 'gi')).map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={i} className={cn('bg-green-300', className)}>
        {part}
      </span>
    ) : (
      part
    )
  )
}
