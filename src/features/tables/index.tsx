import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTable } from '@/components/ui/datatable'
import { TableActionHeader } from '@/components/elements/table-action-header'
import { TableActions } from '@/components/elements/table-actions'

type Student = {
  id: number
  name: string
  phone: string
  balance: number
  groups: string[]
}

export default function Tables() {
  return (
    <div className='flex flex-col items-center gap-3 p-4'>
      <h2>Table</h2>
      <DataTable data={students} columns={columns} />
    </div>
  )
}

export const students: Student[] = [
  {
    id: 1,
    name: 'Ali Valiyev',
    phone: '+998901234567',
    balance: 150,
    groups: ['Math', 'English'],
  },
  {
    id: 2,
    name: 'Zaynab Karimova',
    phone: '+998902345678',
    balance: 200,
    groups: ['Physics', 'Chemistry'],
  },
  {
    id: 3,
    name: 'Hasan Usmonov',
    phone: '+998903456789',
    balance: 50,
    groups: ['History', 'Geography'],
  },
  {
    id: 4,
    name: 'Olim Norov',
    phone: '+998904567890',
    balance: 300,
    groups: ['Math', 'Physics'],
  },
  {
    id: 5,
    name: 'Madina Sodiqova',
    phone: '+998905678901',
    balance: 180,
    groups: ['English', 'Biology'],
  },
  {
    id: 6,
    name: 'Bekzod Raximov',
    phone: '+998906789012',
    balance: 75,
    groups: ['Math', 'IT'],
  },
  {
    id: 7,
    name: 'Shahzoda Yuldasheva',
    phone: '+998907890123',
    balance: 220,
    groups: ['History', 'English'],
  },
  {
    id: 8,
    name: "Diyor Turg'unov",
    phone: '+998908901234',
    balance: 90,
    groups: ['Chemistry', 'Physics'],
  },
  {
    id: 9,
    name: 'Nodir Hamidov',
    phone: '+998909012345',
    balance: 150,
    groups: ['Biology', 'Geography'],
  },
  {
    id: 10,
    name: 'Laylo Ergasheva',
    phone: '+998901112233',
    balance: 280,
    groups: ['Math', 'English'],
  },
  {
    id: 11,
    name: 'Javlonbek Toshmatov',
    phone: '+998902223344',
    balance: 100,
    groups: ['Physics', 'IT'],
  },
  {
    id: 12,
    name: 'Dilnoza Sobirova',
    phone: '+998903334455',
    balance: 130,
    groups: ['Chemistry', 'Biology'],
  },
  {
    id: 13,
    name: 'Ismoil Kenjayev',
    phone: '+998904445566',
    balance: 160,
    groups: ['Math', 'Geography'],
  },
  {
    id: 14,
    name: 'Ravshan Eshmatov',
    phone: '+998905556677',
    balance: 210,
    groups: ['History', 'English'],
  },
  {
    id: 15,
    name: 'Umida Komilova',
    phone: '+998906667788',
    balance: 190,
    groups: ['Physics', 'Biology'],
  },
  {
    id: 16,
    name: 'Rustam Mirzaev',
    phone: '+998907778899',
    balance: 85,
    groups: ['IT', 'Chemistry'],
  },
  {
    id: 17,
    name: 'Nilufar Saidova',
    phone: '+998908889900',
    balance: 125,
    groups: ['Math', 'English'],
  },
  {
    id: 18,
    name: 'Baxtiyor Normatov',
    phone: '+998909990011',
    balance: 170,
    groups: ['Geography', 'History'],
  },
  {
    id: 19,
    name: 'Malika Bozorova',
    phone: '+998901122334',
    balance: 140,
    groups: ['Physics', 'IT'],
  },
  {
    id: 20,
    name: 'Sardor Kenjayev',
    phone: '+998902233445',
    balance: 260,
    groups: ['Biology', 'English'],
  },
]

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
