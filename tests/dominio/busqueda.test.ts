// Protege la búsqueda del encabezado: tildes, varias palabras y enlaces correctos.
import { describe, expect, it } from 'vitest';
import { buscar, crearIndiceBusqueda, normalizar } from '../../src/dominio/busqueda';
import { crearRepositoriosDemo } from '../../src/infraestructura/demo/repositorios-demo';

const repos = crearRepositoriosDemo();
const indice = crearIndiceBusqueda(
  await repos.cursos.listar(),
  await repos.cursos.listarCategorias(),
  await repos.mentores.listar(),
  [{ titulo: 'Contacto', detalle: 'WhatsApp y Telegram', href: '/contacto/' }],
);

describe('Búsqueda', () => {
  it('ignora tildes y mayúsculas', () => {
    expect(normalizar('Índices SINTÉTICOS')).toBe('indices sinteticos');
    expect(buscar(indice, 'indices').length).toBeGreaterThan(0);
  });

  it('exige todas las palabras de la consulta', () => {
    const resultados = buscar(indice, 'forex cero');
    expect(resultados.every((r) => r.claves.includes('forex') && r.claves.includes('cero'))).toBe(true);
  });

  it('encuentra a un mentor por su apodo y enlaza a su tarjeta', () => {
    const [primero] = buscar(indice, 'maquina');
    expect(primero.tipo).toBe('Mentor');
    expect(primero.href).toBe('/mentores/#miguel-monsalve');
  });

  it('enlaza los cursos al catálogo con la búsqueda aplicada', () => {
    const [curso] = buscar(indice, 'velas de alta');
    expect(curso.href).toBe('/cursos/?q=Velas%20de%20alta%20tensi%C3%B3n');
  });

  it('no devuelve nada con la consulta vacía', () => {
    expect(buscar(indice, '   ')).toEqual([]);
  });
});
