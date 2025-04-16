import { useState } from 'react'
import { Button, ButtonProps } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'

export default function Buttons() {
  const [loading, setLoading] = useState<boolean>(false)
  const [size, setSize] = useState<ButtonProps['size']>('default')

  return (
    <div className='mb-4'>
      <h2 className='mb-2'>Button variants</h2>

      <div className='flex items-center gap-2'>
        <Button loading={loading} size={size}>
          Primary
        </Button>
        <Button loading={loading} size={size} variant='outline'>
          Outline
        </Button>
        <Button loading={loading} size={size} variant='secondary'>
          Secondary
        </Button>
        <Button loading={loading} size={size} variant='ghost'>
          Ghost
        </Button>
        <Button loading={loading} size={size} variant='destructive'>
          Danger
        </Button>

        <div className='ml-5 flex items-center space-x-2'>
          <Switch id='airplane-mode' onCheckedChange={(v) => setLoading(v)} />
          <Label htmlFor='airplane-mode'>Loading</Label>
        </div>

        <RadioGroup
          defaultValue={size as string}
          onValueChange={(v) => setSize(v as ButtonProps['size'])}
          className='ml-5 flex'
        >
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='default' id='r1' />
            <Label htmlFor='r1'>Default</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='sm' id='r2' />
            <Label htmlFor='r2'>Small</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='lg' id='r3' />
            <Label htmlFor='r3'>Large</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
