'use client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { LoaderCircle } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ParticipantSchema, ParticipantSchemaType } from '@/schemas/form-sorteo'

export default function Page() {
  const router = useRouter()

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

  function onSubmit(data: ParticipantSchemaType) {
    console.log(data)
    router.push('/confirmed?error=El dni ya se encuentra registrado')
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className='md:max-w-5xl w-full flex flex-col justify-center items-center space-y-4'
        autoComplete='off'
      >
        <Card className='w-full flex flex-col lg:grid lg:grid-flow-row pb-2'>
          <CardHeader className='lg:row-start-1 border-b-2 border-b-verde-foreground'>
            <CardTitle className='text-lg md:text-xl xl:text-3xl'>
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
                  <FormLabel>Nombre</FormLabel>
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
                  <FormLabel>Apellido</FormLabel>
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
                  <FormLabel>DNI</FormLabel>
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
                  <FormLabel>Teléfono</FormLabel>
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
                  <FormLabel>Correo Electrónico</FormLabel>
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
