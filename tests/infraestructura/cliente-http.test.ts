// El backend del cliente puede tardar o fallar: el cliente debe cortar a tiempo y avisar claro.
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ClienteHttp, ErrorApi } from '../../src/infraestructura/api/cliente-http';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('ClienteHttp', () => {
  it('devuelve el JSON cuando la API responde bien', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('[1,2]', { status: 200 })),
    );
    const cliente = new ClienteHttp('https://api.ejemplo.com/');
    await expect(cliente.obtener('cursos')).resolves.toEqual([1, 2]);
  });

  it('lanza ErrorApi con el estado cuando la API falla', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('error', { status: 500 })),
    );
    const cliente = new ClienteHttp('https://api.ejemplo.com/');
    const error = await cliente.obtener('cursos').catch((e: unknown) => e);
    expect(error).toBeInstanceOf(ErrorApi);
    expect((error as ErrorApi).estado).toBe(500);
  });

  it('corta la petición si supera el tiempo límite', async () => {
    const fetchLento = vi.fn(
      (_url: URL, opciones: RequestInit) =>
        new Promise((_resolver, rechazar) => {
          opciones.signal?.addEventListener('abort', () => rechazar(new Error('abortada')));
        }),
    );
    vi.stubGlobal('fetch', fetchLento);
    const cliente = new ClienteHttp('https://api.ejemplo.com/', 30);
    await expect(cliente.obtener('cursos')).rejects.toBeInstanceOf(ErrorApi);
  });
});
