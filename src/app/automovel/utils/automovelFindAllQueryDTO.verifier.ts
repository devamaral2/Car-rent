import { f } from 'vitest/dist/reporters-trlZlObr'
import { automovelSchema } from '../entities/automovelSchema'
import { IAutomovelFindAllQueryDTO } from '../entities/dto/automovel-findlAll-query.dto'

export function automovelFindAllQueryDTOVerifier(
  query: IAutomovelFindAllQueryDTO,
): IAutomovelFindAllQueryDTO {
  const params: { [key: string]: boolean } = {}
  if (query?.marca) {
    params.marca = true
  }
  if (query?.cor) {
    params.cor = true
  }
  return automovelSchema.pick(params).parse(query)
}
