import { Select } from '@/components/custom/select'
import { SelectComponent } from '@/components/custom/select2'
import { ParamCombobox } from '@/components/param/combobox'

const options = [
  {
    value: '1',
    label: 'Doniyor Eshmamatov',
  },
  {
    value: '2',
    label: 'Abror Izzatullayev',
  },
  {
    value: '3',
    label: 'Jalolxon Kamolxonov',
  },
  {
    value: '4',
    label: 'Ahmad Abduraximov',
  },
]

export default function Selects() {
  return (
    <div className='py-4'>
      <h2>Select and Filters</h2>
      <div className='flex items-center gap-3'>
        <ParamCombobox disableSearch label='Hodim' options={options} />

        <Select
          className='w-auto'
          defaultValue={'1'}
          onValueChange={(v) => console.log(v)}
          placeholder='Select a role'
          items={options}
        />

        <SelectComponent options={options} />
      </div>
    </div>
  )
}
