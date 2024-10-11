'use client'
import { useContext } from 'react'
import { Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { SessionStorageContext } from '@/context/session-provider'

export function SettingsButton() {
  const { winners, apiKey, updateKeyValue, updateWinnersValue } = useContext(
    SessionStorageContext
  )

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateWinnersValue(Number(e.target.value))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateKeyValue(e.target.value)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='secondary'>
          <Settings className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80 bg-azul-foreground'>
        <div className='grid gap-4'>
          <div className='space-y-2'>
            <h4 className='font-semibold leading-none text-secondary'>
              Configuración
            </h4>
            <p className='text-sm text-muted'>
              Configuración para el pedido de sorteos.
            </p>
          </div>
          <div className='grid gap-2'>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='winners' className='text-secondary'>
                Ganadores
              </Label>
              <Input
                id='winners'
                type='number'
                defaultValue={winners}
                onChange={handleNumberChange}
                className='col-span-2 h-8 font-semibold'
              />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <Label htmlFor='apiKey' className='text-secondary'>
                Key
              </Label>
              <Input
                id='apiKey'
                type='password'
                defaultValue={apiKey}
                onChange={handlePasswordChange}
                autoComplete='off'
                className='col-span-2 h-8'
                required
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
