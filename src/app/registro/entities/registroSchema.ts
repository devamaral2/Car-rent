import { z } from 'zod'
export const registroSchema = z.object({
  descricao: z.string({
    invalid_type_error: 'A descrição deve ser uma string',
  }),
  data_inicio: z.string({
    invalid_type_error: 'A data_inicio deve ser uma string',
  }),
  data_termino: z.string({
    invalid_type_error: 'A data_termino deve ser uma string',
  }),
  id_automovel: z.number({
    required_error: 'O id_automovel é um campo obrigatório',
    invalid_type_error: 'O id_automovel deve ser uma number',
  }),
  id_motorista: z.number({
    required_error: 'O id_motorista é um campo obrigatório',
    invalid_type_error: 'O id_motorista deve ser uma number',
  }),
})
