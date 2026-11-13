// Protege la integridad de los datos de demo: lo que se muestra al cliente no puede romperse.
import { describe, expect, it } from 'vitest';
import { crearRepositoriosDemo } from '../../src/infraestructura/demo/repositorios-demo';

const repos = crearRepositoriosDemo();

describe('Repositorios de demo', () => {
  it('cada curso pertenece a una categoría existente', async () => {
    const categorias = await repos.cursos.listarCategorias();
    const ids = new Set(categorias.map((c) => c.id));
    const cursos = await repos.cursos.listar();
    const huerfanos = cursos.filter((c) => !ids.has(c.categoria));
    expect(huerfanos).toEqual([]);
  });

  it('los slugs de cursos y mentores no se repiten', async () => {
    const cursos = await repos.cursos.listar();
    const mentores = await repos.mentores.listar();
    expect(new Set(cursos.map((c) => c.slug)).size).toBe(cursos.length);
    expect(new Set(mentores.map((m) => m.slug)).size).toBe(mentores.length);
  });

  it('cada curso pertenece a un mentor existente', async () => {
    const slugs = new Set((await repos.mentores.listar()).map((m) => m.slug));
    const cursos = await repos.cursos.listar();
    expect(cursos.filter((c) => !slugs.has(c.mentor))).toEqual([]);
  });

  it('el catálogo tiene los 73 cursos publicados', async () => {
    expect(await repos.cursos.listar()).toHaveLength(73);
  });

  it('hay exactamente un fundador', async () => {
    const mentores = await repos.mentores.listar();
    expect(mentores.filter((m) => m.esFundador)).toHaveLength(1);
  });

  it('hay reseñas para mostrar', async () => {
    const resenas = await repos.resenas.listarDestacadas();
    expect(resenas.length).toBeGreaterThan(0);
  });
});
