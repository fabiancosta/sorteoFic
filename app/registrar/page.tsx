'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type {
  AddParticipantError,
  AddParticipantResponse
} from '@/interfaces/actions'
import { addParticipant } from '@/lib/actions'
import {
  ParticipantSchema,
  type ParticipantSchemaType
} from '@/schemas/form-sorteo'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export default function RegisterPage() {
  const router = useRouter()

  function isAddParticipantError(
    response: AddParticipantError | AddParticipantResponse
  ): response is AddParticipantError {
    return (response as AddParticipantError).message !== undefined
  }

  const form = useForm<ParticipantSchemaType>({
    resolver: zodResolver(ParticipantSchema),
    defaultValues: {
      nombre: '',
      apellido: '',
      email: '',
      dni: '',
      telefono: ''
    }
  })
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = form

  const onError = (errors: unknown) => console.error(errors)

  async function onSubmit(data: ParticipantSchemaType) {
    const addNewParticipant = await addParticipant(data)
    try {
      if (isAddParticipantError(addNewParticipant)) {
        router.push(`/registrar/confirmar?error=${addNewParticipant.message}`)
      } else {
        router.push(`/registrar/confirmar?status=${addNewParticipant.status}`)
      }
    } catch (error) {
      throw error
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className='md:max-w-5xl w-full flex flex-col justify-center items-center space-y-4'
        autoComplete='off'
      >
        <Card className='w-full flex flex-col lg:grid lg:grid-flow-row pb-2 text-azul'>
          <CardHeader className='lg:row-start-1 border-b-2 border-b-verde-foreground'>
            <CardTitle className='text-3xl md:text-xl xl:text-3xl'>
              Sorteos
            </CardTitle>
            <CardDescription className='xl:text-lg'>
              Inscripción de datos personales.
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col lg:row-start-2 lg:grid-rows-subgrid lg:gap-y-4 gap-x-8 md:px-8 lg:py-2'>
            <FormField
              control={control}
              name='nombre'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-lg'>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder='Tu nombre' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name='apellido'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-lg'>Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder='Tu apellido' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name='dni'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-lg'>DNI</FormLabel>
                  <FormControl>
                    <Input placeholder='Tu DNI' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name='telefono'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-lg'>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder='2942...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-lg'>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='Tu direccion de Email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button
          variant={'secondary'}
          type='submit'
          disabled={isSubmitting}
          className='font-semibold self-center min-w-56'
        >
          {isSubmitting ? (
            <span className='space-x-2'>
              <LoaderCircle className='h-4 w-4 animate-spin' />
              Enviando...
            </span>
          ) : (
            'Enviar'
          )}
        </Button>
      </form>
    </Form>
  )
}
