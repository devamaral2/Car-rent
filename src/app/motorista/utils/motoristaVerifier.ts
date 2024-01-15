import { IMotoristaFindAllQueryDTO } from '../entities/dto/motoristaFindAllQuery.dto'
import { motoristaSchema } from '../entities/motoristaSchema'

export function motoristaVerifier(
  query: IMotoristaFindAllQueryDTO,
  context: string,
): IMotoristaFindAllQueryDTO {
  const params: { [key: string]: boolean } = {}
  if (context !== 'findQuery') return motoristaSchema.parse(query)
  if (query?.nome) {
    params.nome = true
  }
  return motoristaSchema.pick(params).parse(query)
}
