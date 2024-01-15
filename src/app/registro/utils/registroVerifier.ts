import { Registro } from '../entities/registro'
import { registroSchema } from '../entities/registroSchema'

export function registroVerifier(query: Registro, context: string): Registro {
  let params: { [key: string]: boolean } = {}
  if (context === 'create') {
    params = {
      descricao: true,
      data_inicio: true,
      id_automovel: true,
      id_motorista: true,
    }
  }
  return registroSchema.pick(params).parse(query)
}
