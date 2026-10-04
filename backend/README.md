# Kino Backend

REST API built with Java 17, Spring Boot, Spring Security, JWT, Spring Data JPA and PostgreSQL.

## Requirements

- JDK 17 or later
- Maven 3.9+
- PostgreSQL 14 or later

Create a local database and user (adjust credentials as needed):

```sql
CREATE USER kino WITH PASSWORD 'kino_dev_password';
CREATE DATABASE kino OWNER kino;
```

Run from this directory:

```powershell
$env:DB_URL="jdbc:postgresql://localhost:5432/kino"
$env:DB_USERNAME="kino"
$env:DB_PASSWORD="kino_dev_password"
$env:JWT_SECRET="replace-with-a-random-secret-at-least-32-bytes-long"
mvn spring-boot:run
```

The API listens on `http://localhost:8080`. CORS allows the Angular dev server at `http://localhost:4200` for GET, POST, PUT, DELETE and OPTIONS, including the `Authorization` header.

## Endpoints

- `POST /api/auth/register` creates a viewer and returns a bearer token.
- `POST /api/auth/login` authenticates and returns a bearer token.
- `GET /api/feed/recommendations` requires a bearer token and returns `{ strategy, generatedAt, recommendations }`.
- `GET /api/creator/videos` and `POST /api/creator/videos` require a bearer token with `CREATOR` role.

New public registrations are always assigned `VIEWER`; grant `CREATOR` through a trusted administrative process. Video storage is represented by `videoUrl`; the binary upload to S3 or another object store is not implemented here.

The recommendation endpoint is a small in-memory collaborative-filtering demonstration over persisted interactions. It is intended to define the integration contract, not to replace a production recommendation service or a scalable ranking query.

Set `DDL_AUTO=validate` in deployed environments and manage schema changes with database migrations. Never use the development JWT key or database password outside local development.