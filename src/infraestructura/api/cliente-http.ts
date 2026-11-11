// Cliente HTTP mínimo para el backend del cliente (sniperpro-backend.onrender.com).
// Corre solo en el build/servidor, nunca en el navegador.
// Tiene tiempo límite porque el backend puede tardar en despertar si su plan lo duerme.

export class ErrorApi extends Error {
  constructor(
    mensaje: string,
    readonly ruta: string,
    readonly estado?: number,
  ) {
    super(mensaje);
    this.name = 'ErrorApi';
  }
}

export class ClienteHttp {
  constructor(
    private readonly baseUrl: string,
    private readonly tiempoLimiteMs = 20000,
  ) {}

  async obtener(ruta: string): Promise<unknown> {
    const url = new URL(ruta, this.baseUrl);
    const controlador = new AbortController();
    const temporizador = setTimeout(() => controlador.abort(), this.tiempoLimiteMs);
    try {
      const respuesta = await fetch(url, { signal: controlador.signal, headers: { Accept: 'application/json' } });
      if (!respuesta.ok) {
        throw new ErrorApi(`La API respondió ${respuesta.status}`, ruta, respuesta.status);
      }
      return await respuesta.json();
    } catch (error) {
      if (error instanceof ErrorApi) {
        throw error;
      }
      throw new ErrorApi(`No se pudo consultar la API: ${(error as Error).message}`, ruta);
    } finally {
      clearTimeout(temporizador);
    }
  }
}
