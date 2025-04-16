import { DataTable } from '@/components/ui/datatable'
import { Main } from '@/components/layout/main'
import { columns } from './components/columns'
import TasksProvider from './context/tasks-context'
import { students } from './data/students'

export default function Students() {
  return (
    <TasksProvider>
      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2'></div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={students} columns={columns} />
        </div>
      </Main>
    </TasksProvider>
  )
}
