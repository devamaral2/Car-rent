import { automovelSchema } from '../entities/automovelSchema'
import { IAutomovelUpdateDTO } from '../entities/dto/automovelUpdate.dto'

export function automovelVerifier(
  query: IAutomovelUpdateDTO,
  context: string,
): IAutomovelUpdateDTO {
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
  return automovelSchema.pick(params).parse(query)
}
