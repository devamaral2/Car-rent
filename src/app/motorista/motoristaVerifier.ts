import { motoristaSchema } from './entities/motoristaSchema'
import { Motorista } from './entities/motorista'

export function motoristaVerifier(
  query: Partial<Motorista>,
  type?: 'findAll',
): Partial<Motorista> {
  if (type === 'findAll') return query
  return motoristaSchema.parse(query)
}
