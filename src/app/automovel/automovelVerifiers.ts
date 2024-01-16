import { automovelSchema } from './entities/automovelSchema'
import { Automovel } from './entities/automovel'

export function automovelVerifier(
  query: Partial<Automovel>,
  context?: 'create' | 'update',
): Partial<Automovel> {
  const params: { [key: string]: boolean } = {}
  if (context === 'create') return automovelSchema.parse(query)
  if (query?.placa && context === 'update') {
    params.placa = true
  }
  if (query?.marca) {
    params.marca = true
  }
  if (query?.cor) {
    params.cor = true
  }
  if (Object.values(params).length === 0) return {}
  return automovelSchema.pick(params).parse(query)
}
