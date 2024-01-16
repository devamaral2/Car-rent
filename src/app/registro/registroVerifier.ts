import { Registro } from './entities/registro'
import { registroSchema } from './entities/registroSchema'

export function registroVerifier(query: Partial<Registro>): Partial<Registro> {
  return registroSchema.omit({ data_termino: true }).parse(query)
}
