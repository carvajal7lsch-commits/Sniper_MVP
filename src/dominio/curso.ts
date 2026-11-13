// Dominio: curso. Define la forma que el sitio espera, sin importar de dónde vengan los datos.
// Cualquier fuente (datos de demo o la API del cliente) se valida contra estos esquemas.
import { z } from 'astro/zod';

const slug = z.string().regex(/^[a-z0-9-]+$/, 'El slug solo admite minúsculas, números y guiones');

export const NIVELES = ['Básico', 'Intermedio', 'Avanzado'] as const;
export const FORMATOS = ['Curso', 'Seminario'] as const;

export const esquemaCategoria = z.object({
  id: z.string().min(1),
  nombre: z.string().min(1),
});

export const esquemaCurso = z.object({
  // Identificador del curso en la plataforma del cliente
  id: z.number().int().positive(),
  slug,
  titulo: z.string().min(1),
  // Slug del mentor que lo dicta
  mentor: slug,
  categoria: z.string().min(1),
  nivel: z.enum(NIVELES).optional(),
  formato: z.enum(FORMATOS),
  // Año de la edición cuando el curso se renueva ("Mentalidad 2026")
  edicion: z.number().int().min(2020).max(2100).optional(),
  // Agrupa las ediciones de un mismo curso del mismo mentor
  programa: slug,
  lecciones: z.number().int().nonnegative(),
  estudiantes: z.number().int().nonnegative(),
  // Página del curso en la plataforma, donde se compra y se ve
  enlace: z.url(),
});

export type Categoria = z.infer<typeof esquemaCategoria>;
export type Curso = z.infer<typeof esquemaCurso>;
export type Nivel = (typeof NIVELES)[number];
