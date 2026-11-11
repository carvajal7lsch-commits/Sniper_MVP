// Contratos de acceso a datos (puertos). Las páginas dependen de estas interfaces,
// nunca de una implementación concreta (principio de inversión de dependencias).
// Interfaces pequeñas, una por entidad (segregación de interfaces).
import type { Categoria, Curso } from './curso';
import type { Mentor } from './mentor';
import type { Resena } from './resena';

export interface CursoRepositorio {
  listar(): Promise<Curso[]>;
  listarCategorias(): Promise<Categoria[]>;
}

export interface MentorRepositorio {
  listar(): Promise<Mentor[]>;
}

export interface ResenaRepositorio {
  listarDestacadas(): Promise<Resena[]>;
}

export interface Repositorios {
  cursos: CursoRepositorio;
  mentores: MentorRepositorio;
  resenas: ResenaRepositorio;
}
