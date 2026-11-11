// Datos de demo: CATÁLOGO DE EJEMPLO.
// El sitio actual no muestra ningún curso en /filtros-de-cursos, así que estos nombres
// salen de los cursos que mencionan los propios estudiantes en sus reseñas.
// En la implementación real esto se reemplaza por el endpoint existente del backend
// (`courses/findtienda` y `categoriescursos/findtienda/`).
export const categorias = [
  { id: 'sinteticos', nombre: 'Índices sintéticos' },
  { id: 'forex', nombre: 'Forex' },
  { id: 'mentalidad', nombre: 'Mentalidad' },
  { id: 'finanzas', nombre: 'Finanzas' },
  { id: 'estrategia', nombre: 'Estrategia' },
];

export const cursos = [
  {
    slug: 'bases-del-trading',
    titulo: 'Bases del trading',
    categoria: 'estrategia',
    nivel: 'Desde cero',
    formato: 'Grabado',
    resumen: 'Terminología, tipos de mercado y cómo leer un gráfico. Todas las sesiones son sobre el gráfico.',
  },
  {
    slug: 'potencial-indices-sinteticos',
    titulo: 'Desbloquea el potencial de los índices sintéticos',
    categoria: 'sinteticos',
    nivel: 'Desde cero',
    formato: 'Grabado',
    resumen: 'Paso a paso desde cero para operar índices sintéticos con una metodología clara.',
  },
  {
    slug: 'seminario-painx-gainx',
    titulo: 'Seminario PainX y GainX',
    categoria: 'sinteticos',
    nivel: 'Intermedio',
    formato: 'Seminario',
    resumen: 'Cómo se mueven los índices PainX y GainX y cómo planear entradas sobre ellos.',
  },
  {
    slug: 'velas-alta-tension',
    titulo: 'Velas de alta tensión',
    categoria: 'estrategia',
    nivel: 'Intermedio',
    formato: 'En vivo',
    resumen: 'Leer la fuerza de una vela para precisar entradas y salidas.',
  },
  {
    slug: 'forex-desde-cero',
    titulo: 'Forex desde cero',
    categoria: 'forex',
    nivel: 'Desde cero',
    formato: 'Grabado',
    resumen: 'Pares de divisas, sesiones de mercado y gestión del riesgo para empezar en Forex.',
  },
  {
    slug: 'mentalidad-del-trader',
    titulo: 'Mentalidad del trader',
    categoria: 'mentalidad',
    nivel: 'Desde cero',
    formato: 'En vivo',
    resumen: 'Disciplina, manejo de emociones y constancia. Sin mente sana no hay trade rentable.',
  },
  {
    slug: 'educacion-financiera',
    titulo: 'Educación financiera',
    categoria: 'finanzas',
    nivel: 'Desde cero',
    formato: 'Grabado',
    resumen: 'Administrar tu capital y tus ganancias para que el trading sea sostenible.',
  },
  {
    slug: 'plan-de-trading',
    titulo: 'Tu plan de trading',
    categoria: 'estrategia',
    nivel: 'Intermedio',
    formato: 'En vivo',
    resumen: 'Construye y sigue un plan de trading propio: la herramienta obligatoria antes de operar.',
  },
  {
    slug: 'repaso-intensivo',
    titulo: 'Intensivo de repaso',
    categoria: 'estrategia',
    nivel: 'Avanzado',
    formato: 'Seminario',
    resumen: 'Consolida lo visto en los cursos anteriores y afirma las bases antes de operar en real.',
  },
];
