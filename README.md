# Analizador de Imágenes con IA - Prueba Técnica

Aplicación full-stack para analizar imágenes usando inteligencia artificial. El sistema recibe una imagen, la procesa a través de la API Vision de OpenAI y muestra las etiquetas detectadas con sus puntuaciones de confianza.

## Características

- Carga de imágenes 
- Análisis de imágenes con IA usando OpenAI Vision API
- Detección de etiquetas con puntuaciones de confianza
- Interfaz moderna y responsiva
- Implementación con TypeScript

## Tecnologías

### Backend
- Node.js 18+ (probado en v24.11.1)
- Express
- TypeScript
- Multer para carga de archivos
- OpenAI SDK
- Jest + Supertest para testing

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

## Requisitos Previos

- Node.js 18.x o superior (recomendado 24.11.1)
- npm o yarn
- API Key de OpenAI

## Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/ovhonores/technical-test-image-analyzer-ai.git
cd technical-test-image-analyzer-ai
```

### 2. Configuración del Backend

```bash
cd backend
npm install
```

Crear un archivo `.env` en el directorio del backend:
```env
OPENAI_API_KEY=tu_api_key_de_openai_aqui
PORT=3050
```

### 3. Configuración del Frontend

```bash
cd ../frontend
npm install
```

Crear un archivo `.env.local` en el directorio del frontend:
```env
BACKEND_URL=http://localhost:3050
```

## Ejecución

### Modo Desarrollo

Abrir dos terminales:

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```
El backend se ejecutará en http://localhost:3050

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```
El frontend se ejecutará en http://localhost:3001

### Modo Producción

Backend:
```bash
cd backend
npm run build
npm start
```

Frontend:
```bash
cd frontend
npm run build
npm start
```

## Flujo de la Aplicación

1. El usuario sube una imagen desde el frontend
2. La imagen se envía al backend
3. El backend procesa la imagen usando OpenAI Vision API
4. Se retornan las etiquetas detectadas con sus puntuaciones
5. El frontend muestra los resultados

## Endpoints de la API

### POST /api/analyze

Analiza una imagen y retorna las etiquetas detectadas.

Ejemplo de uso:
```bash
curl -X POST http://localhost:3050/api/analyze \
  -F "file=@/ruta/a/imagen.jpg"
```

Respuesta exitosa:
```json
{
  "success": true,
  "tags": [
    {
      "label": "label-1",
      "confidence": 0.95
    },
    {
      "label": "label-2",
      "confidence": 0.87
    }
  ]
}
```

Respuesta de error:
```json
{
  "success": false,
  "error": "No se proporcionó ningún archivo"
}
```

## Testing

Ejecutar tests del backend:
```bash
cd backend
npm test
```

## Variables de Entorno

### Backend (.env)
- OPENAI_API_KEY: Tu API key de OpenAI (requerido)
- PORT: Puerto del servidor (opcional, default: 3050)

### Frontend (.env.local)
- NEXT_PUBLIC_BACKEND_URL: URL del backend (requerido)

## Solución de Problemas

Si el puerto 3050 o 3000 ya está en uso, puedes cambiarlo en los archivos .env:

Backend:
```env
PORT=3051
```

Frontend:
```env
BACKEND_URL=http://localhost:3051
```

## Autor

Terry Honores

## Licencia

MIT
