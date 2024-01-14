import { z } from 'zod'
export const automovelSchema = z.object({
  placa: z
    .string()
    .toLowerCase()
    .trim()
    .min(7, { message: 'A placa deve conter 7 caracteres' })
    .max(8, {
      message: 'A placa deve conter 7 caracteres desconsiderando o hífen',
    })
    .transform((value) => value.replace('-', ''))
    .refine((value) => /^[a-z0-9]+$/i.test(value), {
      message: 'A placa só pode conter letras e números',
    })
    .refine((value) => value !== '', {
      message: 'A placa é um campo obrigatório',
    }),
  cor: z
    .string()
    .toLowerCase()
    .trim()
    .refine((value) => value !== '', {
      message: 'A cor é um campo obrigatório',
    }),
  marca: z
    .string()
    .toLowerCase()
    .trim()
    .refine((value) => value !== '', {
      message: 'A marca é um campo obrigatório',
    }),
})
