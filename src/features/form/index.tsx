import { Modal } from '@/components/ui/modal'
import { Main } from '@/components/layout/main'
import Buttons from './buttons'
import Selects from './selects'

export default function Form() {
  return (
    <Main>
      <section className='flex flex-col items-center gap-2'>
        <Buttons />

        <Selects />

        <Modal />
      </section>
    </Main>
  )
}
