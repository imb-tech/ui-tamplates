import { CursorPagination } from './cursor-pagination'
import { NumericPagination } from './numeric-pagination'

export default function Paginations() {
  return (
    <div className='flex flex-col items-center gap-10'>
      <h2>Paginations</h2>

      <div className='flex justify-center'>
        <CursorPagination />
      </div>

      <div>
        <NumericPagination />
      </div>
    </div>
  )
}
