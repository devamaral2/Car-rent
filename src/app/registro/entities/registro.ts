import { z } from 'zod'
import { registroSchema } from './registroSchema'
export type Registro = z.infer<typeof registroSchema> & { id?: number }
