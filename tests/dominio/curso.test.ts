import { describe, expect, it } from 'vitest';
import { esquemaCurso } from '../../src/dominio/curso';

const base = {
  id: 79,
  slug: 'indices-sinteticos-intermedio-79',
  titulo: 'Índices sintéticos intermedio',
  mentor: 'luis-algarin',
  categoria: 'sinteticos',
  nivel: 'Intermedio',
  formato: 'Curso',
  edicion: 2026,
  programa: 'luis-algarin-indices-sinteticos-intermedio',
  lecciones: 27,
  estudiantes: 117,
  enlace: 'https://www.sniperproacademy.com/filtros-de-cursos/filtroprofesor/24/landing-curso/79',
};

describe('Curso', () => {
  it('acepta un curso válido', () => {
    expect(esquemaCurso.safeParse(base).success).toBe(true);
  });

  it('acepta un curso sin nivel ni edición', () => {
    const { nivel: _n, edicion: _e, ...sinNivel } = base;
    expect(esquemaCurso.safeParse(sinNivel).success).toBe(true);
  });

  it('rechaza un nivel que no existe', () => {
    expect(esquemaCurso.safeParse({ ...base, nivel: 'Experto' }).success).toBe(false);
  });

  it('rechaza un slug con mayúsculas o espacios', () => {
    expect(esquemaCurso.safeParse({ ...base, slug: 'Forex Cero' }).success).toBe(false);
  });

  it('rechaza lecciones negativas', () => {
    expect(esquemaCurso.safeParse({ ...base, lecciones: -1 }).success).toBe(false);
  });
});
