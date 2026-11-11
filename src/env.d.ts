// Variables de entorno que lee el sitio en el build. Ver .env.example.
interface ImportMetaEnv {
  readonly FUENTE_DATOS?: 'demo' | 'api';
  readonly API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
