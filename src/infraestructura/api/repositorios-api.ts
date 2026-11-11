// Implementación de los repositorios contra la API real del cliente.
//
// ESTADO: PENDIENTE. Todavía no conocemos la forma exacta de las respuestas.
// Endpoints identificados en la app Angular actual:
//   GET courses/findtienda               → catálogo de cursos
//   GET categoriescursos/findtienda/     → categorías
//   GET users/instructor/all             → instructores
//   GET reviews/getallreviews            → reseñas
//
// Para implementarlo, con acceso autorizado por el cliente:
//   1. Guardar una respuesta real de cada endpoint en tests/fixtures/api/.
//   2. Escribir el esquema del DTO (lo que manda la API) en mapeadores.ts.
//   3. Mapear DTO → dominio en mapeadores.ts y probarlo con esos fixtures.
//   4. Reemplazar los `throw` de abajo por: cliente.obtener(ruta) → esquema DTO → mapeador.
// Las páginas no cambian: dependen de las interfaces del dominio.
import type { Categoria, Curso } from '../../dominio/curso';
import type { Mentor } from '../../dominio/mentor';
import type { Resena } from '../../dominio/resena';
import type { CursoRepositorio, MentorRepositorio, ResenaRepositorio, Repositorios } from '../../dominio/repositorios';
import { ClienteHttp } from './cliente-http';

const PENDIENTE = 'Repositorio de API pendiente: falta el contrato real del backend (ver repositorios-api.ts).';

export class ApiCursoRepositorio implements CursoRepositorio {
  constructor(private readonly cliente: ClienteHttp) {}

  async listar(): Promise<Curso[]> {
    throw new Error(PENDIENTE);
  }

  async listarCategorias(): Promise<Categoria[]> {
    throw new Error(PENDIENTE);
  }
}

export class ApiMentorRepositorio implements MentorRepositorio {
  constructor(private readonly cliente: ClienteHttp) {}

  async listar(): Promise<Mentor[]> {
    throw new Error(PENDIENTE);
  }
}

export class ApiResenaRepositorio implements ResenaRepositorio {
  constructor(private readonly cliente: ClienteHttp) {}

  async listarDestacadas(): Promise<Resena[]> {
    throw new Error(PENDIENTE);
  }
}

export function crearRepositoriosApi(baseUrl: string): Repositorios {
  const cliente = new ClienteHttp(baseUrl);
  return {
    cursos: new ApiCursoRepositorio(cliente),
    mentores: new ApiMentorRepositorio(cliente),
    resenas: new ApiResenaRepositorio(cliente),
  };
}
