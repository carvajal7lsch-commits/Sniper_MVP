// Raíz de composición: el único lugar que decide qué implementación usa el sitio.
// FUENTE_DATOS=demo (por defecto) usa los datos locales; FUENTE_DATOS=api usa el backend del cliente.
// Cambiar de fuente no toca ninguna página ni componente (principio abierto/cerrado).
import type { Repositorios } from '../dominio/repositorios';
import { crearRepositoriosApi } from './api/repositorios-api';
import { crearRepositoriosDemo } from './demo/repositorios-demo';

function crearRepositorios(): Repositorios {
  const fuente = import.meta.env.FUENTE_DATOS ?? 'demo';
  if (fuente === 'demo') {
    return crearRepositoriosDemo();
  }
  if (fuente === 'api') {
    const baseUrl = import.meta.env.API_URL;
    if (!baseUrl) {
      throw new Error('FUENTE_DATOS=api necesita la variable API_URL.');
    }
    return crearRepositoriosApi(baseUrl);
  }
  throw new Error(`FUENTE_DATOS no reconocida: "${fuente}". Usa "demo" o "api".`);
}

export const repositorios = crearRepositorios();
