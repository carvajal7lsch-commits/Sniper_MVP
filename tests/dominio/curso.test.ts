import { describe, expect, it } from 'vitest';
import { esquemaCurso } from '../../src/dominio/curso';

const base = {
  slug: 'forex-desde-cero',
  titulo: 'Forex',
  categoria: 'forex',
  nivel: 'Desde cero',
  formato: 'Grabado',
  resumen: 'Resumen.',
};

describe('Curso', () => {
  it('acepta un curso válido', () => {
    expect(esquemaCurso.safeParse(base).success).toBe(true);
  });

  it('rechaza un nivel que no existe', () => {
    expect(esquemaCurso.safeParse({ ...base, nivel: 'Experto' }).success).toBe(false);
  });

  it('rechaza un slug con mayúsculas o espacios', () => {
    expect(esquemaCurso.safeParse({ ...base, slug: 'Forex Cero' }).success).toBe(false);
  });
});
