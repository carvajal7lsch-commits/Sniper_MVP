// Búsqueda del sitio: funciones puras, sin DOM, para poder probarlas.
// El índice se arma en el build con los datos de los repositorios y el navegador solo filtra.
import type { Categoria, Curso } from './curso';
import type { Mentor } from './mentor';
import { nombreCompleto } from './mentor';
import { agruparEdiciones } from './catalogo';

export type TipoResultado = 'Curso' | 'Mentor' | 'Página';

export interface ItemBusqueda {
  tipo: TipoResultado;
  titulo: string;
  detalle: string;
  href: string;
  claves: string;
}

export interface Pagina {
  titulo: string;
  detalle: string;
  href: string;
}

// Minúsculas y sin tildes: "indices" encuentra "Índices".
export function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

export function crearIndiceBusqueda(
  cursos: Curso[],
  categorias: Categoria[],
  mentores: Mentor[],
  paginas: Pagina[],
): ItemBusqueda[] {
  const nombreCategoria = new Map(categorias.map((c) => [c.id, c.nombre]));
  const nombreMentor = new Map(mentores.map((m) => [m.slug, nombreCompleto(m)]));
  const items: ItemBusqueda[] = [];
  // Solo la edición vigente de cada curso, para no llenar los resultados de repetidos.
  for (const { actual: curso } of agruparEdiciones(cursos)) {
    const categoria = nombreCategoria.get(curso.categoria) ?? '';
    const mentor = nombreMentor.get(curso.mentor) ?? '';
    items.push({
      tipo: 'Curso',
      titulo: curso.titulo,
      detalle: `${mentor}, ${categoria.toLowerCase()}`,
      href: `/cursos/${curso.slug}/`,
      claves: normalizar(
        `${curso.titulo} ${categoria} ${curso.nivel ?? ''} ${curso.formato} ${mentor} ${curso.descripcion}`,
      ),
    });
  }
  for (const mentor of mentores) {
    const nombre = nombreCompleto(mentor);
    items.push({
      tipo: 'Mentor',
      titulo: nombre,
      detalle: `${mentor.rol}, ${mentor.enfoque.toLowerCase()}`,
      href: `/mentores/${mentor.slug}/`,
      claves: normalizar(`${nombre} ${mentor.apodo ?? ''} ${mentor.rol} ${mentor.enfoque}`),
    });
  }
  for (const pagina of paginas) {
    items.push({
      tipo: 'Página',
      titulo: pagina.titulo,
      detalle: pagina.detalle,
      href: pagina.href,
      claves: normalizar(`${pagina.titulo} ${pagina.detalle}`),
    });
  }
  return items;
}

// Todas las palabras de la consulta deben aparecer. Primero lo que empieza por la consulta en el título.
export function buscar(indice: ItemBusqueda[], consulta: string, limite = 8): ItemBusqueda[] {
  const texto = normalizar(consulta);
  if (!texto) {
    return [];
  }
  const palabras = texto.split(/\s+/);
  const encontrados = indice.filter((item) => palabras.every((p) => item.claves.includes(p)));
  const puntaje = (item: ItemBusqueda) => (normalizar(item.titulo).startsWith(texto) ? 0 : 1);
  return encontrados.sort((a, b) => puntaje(a) - puntaje(b)).slice(0, limite);
}
