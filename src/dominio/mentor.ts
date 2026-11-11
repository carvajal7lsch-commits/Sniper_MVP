// Dominio: mentor de la academia.
import { z } from 'astro/zod';

export const esquemaRedes = z.object({
  instagram: z.url().optional(),
  tiktok: z.url().optional(),
  youtube: z.url().optional(),
});

export const esquemaMentor = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  nombre: z.string().min(1),
  apellido: z.string(),
  apodo: z.string().optional(),
  rol: z.string().min(1),
  enfoque: z.string().min(1),
  bio: z.string().min(1),
  esFundador: z.boolean().default(false),
  redes: esquemaRedes.default({}),
});

export type Redes = z.infer<typeof esquemaRedes>;
export type Mentor = z.infer<typeof esquemaMentor>;

export function nombreCompleto(mentor: Mentor): string {
  if (!mentor.apellido) {
    return mentor.nombre;
  }
  return `${mentor.nombre} ${mentor.apellido}`;
}
