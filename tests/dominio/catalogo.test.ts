// Reglas del catálogo: ediciones agrupadas, orden de la ruta y totales del perfil.
import { describe, expect, it } from 'vitest';
import { agruparEdiciones, ordenarRuta, resumirMentor } from '../../src/dominio/catalogo';
import type { Curso } from '../../src/dominio/curso';

const curso = (parcial: Partial<Curso>): Curso => ({
  id: 1,
  slug: 'c-1',
  titulo: 'Curso',
  mentor: 'luis-algarin',
  categoria: 'sinteticos',
  formato: 'Curso',
  programa: 'p',
  lecciones: 10,
  estudiantes: 100,
  enlace: 'https://example.com/1',
  ...parcial,
});

describe('Catálogo', () => {
  it('deja primero la edición más reciente y el resto como anteriores', () => {
    const viejo = curso({ id: 1, slug: 'a-1' });
    const nuevo = curso({ id: 2, slug: 'a-2', edicion: 2026 });
    const [programa] = agruparEdiciones([viejo, nuevo]);
    expect(programa.actual).toBe(nuevo);
    expect(programa.anteriores).toEqual([viejo]);
  });

  it('no mezcla programas distintos', () => {
    const grupos = agruparEdiciones([curso({ programa: 'a' }), curso({ programa: 'b' })]);
    expect(grupos).toHaveLength(2);
  });

  it('ordena la ruta por tema y luego por nivel', () => {
    const avanzado = curso({ titulo: 'Avanzado', nivel: 'Avanzado' });
    const basico = curso({ titulo: 'Básico', nivel: 'Básico' });
    const mente = curso({ titulo: 'Mentalidad', categoria: 'mentalidad' });
    const ruta = ordenarRuta([mente, avanzado, basico], ['sinteticos', 'mentalidad']);
    expect(ruta.map((c) => c.titulo)).toEqual(['Básico', 'Avanzado', 'Mentalidad']);
  });

  it('suma lecciones pero no estudiantes', () => {
    const resumen = resumirMentor([curso({ programa: 'a', lecciones: 10 }), curso({ programa: 'b', lecciones: 5 })]);
    expect(resumen).toEqual({ cursos: 2, lecciones: 15 });
  });

  it('cuenta una sola vez un curso con varias ediciones', () => {
    const resumen = resumirMentor([curso({ lecciones: 10 }), curso({ lecciones: 27, edicion: 2026 })]);
    expect(resumen).toEqual({ cursos: 1, lecciones: 27 });
  });
});
