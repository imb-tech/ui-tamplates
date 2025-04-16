import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { TableActionHeader } from '@/components/elements/table-action-header'
import { TableActions } from '@/components/elements/table-actions'
import { Student } from '../data/types'

export const columns: ColumnDef<Student>[] = [
  {
    id: 'index',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Ism familiya',
  },
  {
    accessorKey: 'phone',
    header: 'Telefon raqam',
  },
  {
    accessorKey: 'balance',
    header: ({ column }) => (
      <TableActionHeader column={column} title='Balans' />
    ),
  },
  {
    accessorKey: 'groups',
    header: 'Guruhlar',
    cell({ row }) {
      return row?.original?.groups?.join(', ')
    },
  },
  {
    id: 'actions',
    header: 'Amallar',
    cell: ({ row }) => <TableActions row={row} />,
  },
]
