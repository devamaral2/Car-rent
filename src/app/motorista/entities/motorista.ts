import { z } from 'zod'
import { motoristaSchema } from './motoristaSchema'
export type Motorista = z.infer<typeof motoristaSchema>
