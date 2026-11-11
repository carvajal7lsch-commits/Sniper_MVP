// Dominio: reseña publicada por un estudiante.
import { z } from 'astro/zod';

export const esquemaResena = z.object({
  nombre: z.string().min(1),
  texto: z.string().min(1),
});

export type Resena = z.infer<typeof esquemaResena>;
