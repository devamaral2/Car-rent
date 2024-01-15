import { z } from 'zod'
export const motoristaSchema = z.object({
  nome: z.string({
    required_error: 'O nome é um campo obrigatório',
    invalid_type_error: 'O nome deve ser uma string',
  }),
})
