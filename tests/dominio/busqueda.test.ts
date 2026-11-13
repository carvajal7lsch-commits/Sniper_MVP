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

  it('encuentra a un mentor por su apodo y enlaza a su perfil', () => {
    const [primero] = buscar(indice, 'maquina');
    expect(primero.tipo).toBe('Mentor');
    expect(primero.href).toBe('/mentores/miguel-monsalve/');
  });

  it('enlaza los cursos al catálogo filtrado por su mentor', () => {
    const [curso] = buscar(indice, 'flipx');
    expect(curso.href).toContain('/cursos/?mentor=miguel-monsalve');
  });

  it('encuentra cursos por el nombre del mentor', () => {
    const resultados = buscar(indice, 'mentalidad sergio');
    expect(resultados.some((r) => r.tipo === 'Curso')).toBe(true);
  });

  it('muestra una sola edición de cada curso', () => {
    const titulos = buscar(indice, 'mentalidad luis', 20).map((r) => r.titulo);
    expect(titulos.filter((t) => t === 'Mentalidad')).toHaveLength(1);
  });

  it('no devuelve nada con la consulta vacía', () => {
    expect(buscar(indice, '   ')).toEqual([]);
  });
});
