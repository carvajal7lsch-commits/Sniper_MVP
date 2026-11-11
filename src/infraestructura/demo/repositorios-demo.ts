// Implementación de los repositorios con datos de demo (archivos locales).
// Valida los datos con los mismos esquemas del dominio que usará la API real:
// si un dato de demo está mal escrito, el build falla aquí y no en la página.
import { esquemaCategoria, esquemaCurso } from '../../dominio/curso';
import type { Categoria, Curso } from '../../dominio/curso';
import { esquemaMentor } from '../../dominio/mentor';
import type { Mentor } from '../../dominio/mentor';
import { esquemaResena } from '../../dominio/resena';
import type { Resena } from '../../dominio/resena';
import type { CursoRepositorio, MentorRepositorio, ResenaRepositorio, Repositorios } from '../../dominio/repositorios';
import { categorias, cursos } from './datos-cursos';
import { mentores } from './datos-mentores';
import { resenas } from './datos-resenas';

export class DemoCursoRepositorio implements CursoRepositorio {
  async listar(): Promise<Curso[]> {
    return esquemaCurso.array().parse(cursos);
  }

  async listarCategorias(): Promise<Categoria[]> {
    return esquemaCategoria.array().parse(categorias);
  }
}

export class DemoMentorRepositorio implements MentorRepositorio {
  async listar(): Promise<Mentor[]> {
    return esquemaMentor.array().parse(mentores);
  }
}

export class DemoResenaRepositorio implements ResenaRepositorio {
  async listarDestacadas(): Promise<Resena[]> {
    return esquemaResena.array().parse(resenas);
  }
}

export function crearRepositoriosDemo(): Repositorios {
  return {
    cursos: new DemoCursoRepositorio(),
    mentores: new DemoMentorRepositorio(),
    resenas: new DemoResenaRepositorio(),
  };
}
