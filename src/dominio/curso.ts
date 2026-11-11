// Dominio: curso. Define la forma que el sitio espera, sin importar de dónde vengan los datos.
// Cualquier fuente (datos de demo o la API del cliente) se valida contra estos esquemas.
import { z } from 'astro/zod';

export const NIVELES = ['Desde cero', 'Intermedio', 'Avanzado'] as const;
export const FORMATOS = ['Grabado', 'En vivo', 'Seminario'] as const;

export const esquemaCategoria = z.object({
  id: z.string().min(1),
  nombre: z.string().min(1),
});

export const esquemaCurso = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, 'El slug solo admite minúsculas, números y guiones'),
  titulo: z.string().min(1),
  categoria: z.string().min(1),
  nivel: z.enum(NIVELES),
  formato: z.enum(FORMATOS),
  resumen: z.string().min(1),
});

export type Categoria = z.infer<typeof esquemaCategoria>;
export type Curso = z.infer<typeof esquemaCurso>;
export type Nivel = (typeof NIVELES)[number];
