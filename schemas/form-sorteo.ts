import { z } from 'zod'

export const ParticipantSchema = z.object({
  nombre: z.string().min(1, { message: 'El nombre es requerido' }),
  apellido: z.string().min(1, { message: 'El apellido es requerido' }),
  dni: z.string().refine((value) => /^\d{5,8}$/.test(value), {
    message: 'Debe contener entre 5 y 8 dígitos.'
  }),
  telefono: z.string().refine((value) => /^\d{6,10}$/.test(value), {
    message: 'Debe contener entre 6 y 10 dígitos.'
  }),
  email: z
    .string()
    .regex(
      /^[a-z0-9!#$%&'*+/^ñ?^_`{|}~-]{6,35}(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@([a-z0-9]{3,20})(?:\.[a-z]{2,3}){0,2}$/,
      { message: 'Formato inválido.' }
    )
})

export type ParticipantSchemaType = z.infer<typeof ParticipantSchema>
