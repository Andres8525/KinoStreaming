# Kino Streaming

Kino es una plataforma boutique de video bajo demanda para cine y contenido audiovisual independiente. El proyecto reúne una interfaz Angular para espectadores y creadores, y una API REST Spring Boot preparada para autenticación JWT, persistencia PostgreSQL, monetización y recomendaciones.

> Estado: proyecto en desarrollo. La interfaz incluye datos demostrativos; la API proporciona los primeros contratos y flujos de autenticación/publicación. La carga real a almacenamiento de objetos, los pagos y el motor de recomendaciones de producción todavía no están conectados.

## Funcionalidades actuales

- Dashboard de descubrimiento con categorías, recomendaciones y contenido destacado.
- Creator Studio con selección local de archivos, metadatos, etiquetas, precios y propinas. La selección de archivo es local; aún no se transmite a un servicio de almacenamiento.
- Vista de reproducción con controles nativos, información del creador y sugerencias.
- API para registro e inicio de sesión con JWT, publicación de videos para creadores y feed autenticado.
- Configuración CORS para permitir el frontend local en `http://localhost:4200`.

## Estructura del repositorio

```text
.
├── backend/                 # API Java, Spring Boot, Spring Security y JPA
│   ├── compose.yaml         # PostgreSQL local para desarrollo
│   └── src/
└── fronted/
    └── visual_Stream/      # Aplicación Angular
        └── src/app/
            ├── components/
            └── pages/
```

## Requisitos

- Node.js compatible con Angular CLI 21 y npm.
- JDK 17 o posterior.
- Maven 3.9 o posterior.
- Docker Desktop para iniciar PostgreSQL con Compose, o una instancia PostgreSQL 14+ ya disponible.

## Ejecutar en desarrollo

Inicia el backend y el frontend en terminales separadas.

### 1. Iniciar PostgreSQL

Desde `backend/`:

```powershell
cd .\backend
docker compose up -d postgres
```

Compose crea la base `kino` y un usuario local de desarrollo. Estas credenciales son solo para desarrollo y no deben reutilizarse en despliegues.

### 2. Iniciar la API

Desde `backend/`, en PowerShell, establece un secreto JWT de al menos 32 bytes y ejecuta Spring Boot:

```powershell
$env:JWT_SECRET = "reemplaza-por-un-secreto-aleatorio-local-de-al-menos-32-bytes"
mvn spring-boot:run
```

La API queda disponible en `http://localhost:8080`. Si Maven no está en `PATH`, invoca `mvn.cmd` con su ruta instalada. La configuración de conexión puede cambiarse mediante `DB_URL`, `DB_USERNAME` y `DB_PASSWORD`; los valores por defecto corresponden al servicio local de Compose.

### 3. Iniciar Angular

En otra terminal:

```powershell
cd .\fronted\visual_Stream
npm install
npm start
```

Abre `http://localhost:4200`. Angular y la API deben ejecutarse a la vez para probar las llamadas backend. El frontend actual aún conserva partes del catálogo y del flujo de usuario como datos demostrativos, por lo que no todos los controles están conectados a la API.

## API disponible

Todas las rutas usan el prefijo `/api`. Las rutas protegidas reciben el token de inicio de sesión en el encabezado `Authorization: Bearer <token>`.

| Método | Ruta | Acceso | Descripción |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Público | Registra una cuenta `VIEWER` y devuelve un JWT. |
| `POST` | `/api/auth/login` | Público | Autentica una cuenta y devuelve un JWT. |
| `GET` | `/api/feed/recommendations` | JWT | Devuelve `strategy`, `generatedAt` y `recommendations`. |
| `GET` | `/api/creator/videos` | JWT `CREATOR` | Lista los videos del creador autenticado. |
| `POST` | `/api/creator/videos` | JWT `CREATOR` | Publica metadatos, URL, etiquetas y configuración de monetización. |

Ejemplo de registro:

```json
{
  "displayName": "Alex Cine",
  "email": "alex@example.com",
  "password": "una-clave-segura"
}
```

Ejemplo de publicación (requiere rol `CREATOR`):

```json
{
  "title": "Cortometraje independiente",
  "description": "Una historia filmada de forma independiente.",
  "videoUrl": "https://storage.example.com/kino/short-film.mp4",
  "tags": ["Cortometraje", "Indie"],
  "accessPrice": 4.99,
  "suggestedDonation": 2.00
}
```

El registro público siempre asigna rol `VIEWER`, aunque el cliente intente enviar otro rol. Para habilitar una cuenta creadora se necesita una operación administrativa confiable en la base de datos; no existe un endpoint público para elevar privilegios. Consulta [backend/README.md](backend/README.md) para el ejemplo y la configuración detallada.

## Validación

Compilar frontend:

```powershell
cd .\fronted\visual_Stream
npm run build
```

Ejecutar pruebas de integración del backend:

```powershell
cd .\backend
mvn test
```

Las pruebas backend usan H2 aislado y verifican JWT, CORS, validación, autorización y publicación. Para desarrollo, Spring crea o actualiza el esquema JPA; en un entorno desplegado se deben usar migraciones y configurar `DDL_AUTO=validate`.

## Seguridad y alcance

- Configura `JWT_SECRET` como secreto privado y único en cada entorno; el backend no proporciona un secreto predeterminado.
- No publiques credenciales, archivos `.env`, tokens ni datos personales.
- Los archivos de video se representan mediante una URL. No se implementó carga a S3 ni otro bucket.
- El feed ejecuta una demostración básica de filtrado colaborativo sobre interacciones persistidas. No es un modelo de IA ni está diseñado para grandes volúmenes.
- Aunque existe la entidad `Interaction`, aún falta el endpoint para registrar eventos de reproducción/calificación.
- No hay pasarela de pagos conectada; los importes configuran metadatos, no procesan cobros.

## Documentación por módulo

- [Frontend Angular](fronted/visual_Stream/README.md)
- [Backend Spring Boot](backend/README.md)
