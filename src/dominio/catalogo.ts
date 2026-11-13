// Reglas del catálogo: funciones puras para ordenar cursos y agrupar sus ediciones.
import type { Curso } from './curso';
import { NIVELES } from './curso';

export interface Programa {
  // La edición que se muestra: la más reciente
  actual: Curso;
  // Ediciones anteriores, de la más nueva a la más vieja
  anteriores: Curso[];
}

// Un curso sin año se considera anterior a cualquier edición con año.
const anio = (c: Curso) => c.edicion ?? 0;

// Agrupa por programa y deja primero la edición más reciente. Conserva el orden de aparición.
export function agruparEdiciones(cursos: Curso[]): Programa[] {
  const grupos = new Map<string, Curso[]>();
  for (const curso of cursos) {
    const lista = grupos.get(curso.programa) ?? [];
    lista.push(curso);
    grupos.set(curso.programa, lista);
  }
  return [...grupos.values()].map((lista) => {
    const [actual, ...anteriores] = [...lista].sort((a, b) => anio(b) - anio(a));
    return { actual, anteriores };
  });
}

// Orden de una ruta de aprendizaje: por tema (según el orden dado), luego nivel, luego título.
export function ordenarRuta(cursos: Curso[], ordenTemas: string[]): Curso[] {
  const tema = (c: Curso) => {
    const i = ordenTemas.indexOf(c.categoria);
    return i === -1 ? ordenTemas.length : i;
  };
  const nivel = (c: Curso) => (c.nivel ? NIVELES.indexOf(c.nivel) : NIVELES.length);
  return [...cursos].sort((a, b) => tema(a) - tema(b) || nivel(a) - nivel(b) || a.titulo.localeCompare(b.titulo, 'es'));
}

export interface ResumenMentor {
  cursos: number;
  lecciones: number;
}

// Totales que se muestran en el perfil y en los menús. Un curso con varias ediciones cuenta
// una vez y aporta las lecciones de su edición vigente. No se suman estudiantes: uno mismo
// puede estar en varios cursos y la suma inflaría la cifra.
export function resumirMentor(cursos: Curso[]): ResumenMentor {
  const vigentes = agruparEdiciones(cursos).map((p) => p.actual);
  return {
    cursos: vigentes.length,
    lecciones: vigentes.reduce((total, c) => total + c.lecciones, 0),
  };
}
