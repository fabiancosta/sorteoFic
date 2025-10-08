import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function Page({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <Card className='md:max-w-5xl w-full flex flex-col space-y-4 lg:grid lg:grid-flow-row pb-2'>
      <CardHeader className='lg:row-start-1 border-b-2 border-b-verde-foreground'>
        <CardTitle className='text-lg md:text-xl xl:text-3xl text-azul'>
          Sorteos
        </CardTitle>
        <CardDescription className='xl:text-lg'>
          Inscripción de datos personales.
        </CardDescription>
      </CardHeader>

      <CardContent className='lg:py-2'>
        {searchParams.error ? (
          <div className='space-y-4'>
            <Alert variant='destructive' className='max-w-md'>
              <AlertCircle className='h-5 w-5' />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription className='font-medium'>
                {searchParams.error}
              </AlertDescription>
            </Alert>
            <p>
              <Link href={'/registrar'}>Registrarse nuevamente</Link>
            </p>
          </div>
        ) : (
          <div className='space-y-4'>
            <h6 className='font-medium'>
              Su registro fue exitoso, gracias por participar.
            </h6>

            <p>
              <Link href={'/registrar'}>Registrar a otro participante</Link>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
