import { z } from 'zod'
export const automovelSchema = z.object({
  placa: z
    .string({
      required_error: 'A placa é um campo obrigatório',
      invalid_type_error: 'A placa deve ser uma string',
    })
    .toLowerCase()
    .trim()
    .min(7, { message: 'A placa deve conter 7 caracteres' })
    .max(8, {
      message: 'A placa deve conter 7 caracteres desconsiderando o hífen',
    })
    .transform((value) => value.replace('-', ''))
    .refine((value) => /^[a-z0-9]+$/i.test(value), {
      message: 'A placa só pode conter letras e números',
    }),
  cor: z
    .string({
      required_error: 'A cor é um campo obrigatório',
      invalid_type_error: 'A cor deve ser uma string',
    })
    .toLowerCase()
    .trim(),
  marca: z
    .string({
      required_error: 'A marca é um campo obrigatório',
      invalid_type_error: 'A marca deve ser uma string',
    })
    .toLowerCase()
    .trim(),
})
