import { z } from 'zod'
import { automovelSchema } from './automovelSchema'
export type Automovel = z.infer<typeof automovelSchema> & { id?: number }
