import { describe, expect, it } from 'vitest';
import { esquemaMentor, nombreCompleto } from '../../src/dominio/mentor';

const base = { slug: 'ana-perez', nombre: 'Ana', apellido: 'Pérez', rol: 'Educadora', enfoque: 'Forex', bio: 'Bio.' };

describe('Mentor', () => {
  it('arma el nombre completo con apellido', () => {
    const mentor = esquemaMentor.parse(base);
    expect(nombreCompleto(mentor)).toBe('Ana Pérez');
  });

  it('usa solo el nombre cuando no hay apellido', () => {
    const mentor = esquemaMentor.parse({ ...base, apellido: '' });
    expect(nombreCompleto(mentor)).toBe('Ana');
  });

  it('rechaza una red social que no es una URL', () => {
    const resultado = esquemaMentor.safeParse({ ...base, redes: { instagram: '#' } });
    expect(resultado.success).toBe(false);
  });

  it('no marca como fundador si no se indica', () => {
    expect(esquemaMentor.parse(base).esFundador).toBe(false);
  });
});
