# RPG API REST

API REST construida con **TypeScript + Express** para gestionar personajes de un juego RPG.  
Proyecto de práctica de la **Objetos y Tipos Personalizados en TypeScript**.

---

## Estructura del proyecto

```
src/
├── app.ts                          # Servidor Express — punto de entrada
├── types.ts                        # Tipos personalizados (Character, CharacterClass, CharacterStatus)
├── data/
│   └── characters.ts               # "Base de datos" en memoria
├── controllers/
│   └── characters.controller.ts    # Lógica de negocio + respuestas HTTP
├── routes/
│   └── characters.routes.ts        # Definición de endpoints
└── utils/
    └── character.utils.ts          # Funciones puras reutilizables
```

---

## Cómo ejecutar

```bash
pnpm start
```

API disponible en: **http://localhost:3000**

---

## Conceptos TypeScript practicados

| Concepto | Dónde se usa |
|---|---|
| `type` aliases | `types.ts` |
| Union types de string literals | `CharacterClass`, `CharacterStatus` |
| Propiedades opcionales (`?`) | `guild?` en `Character` |
| `Omit<T, K>` | Parámetro `data` en `createCharacter` |
| `Partial<T>` | Parámetro `data` en `updateCharacter` |
| `Character \| undefined` | Retorno de `findById`, `updateCharacter` |
| Nullish coalescing (`??`) | Fallback de `guild` en `getInfo` |
| Spread condicional | Whitelist de campos en PATCH |

---

## Middlewares

| Middleware | Función |
|---|---|
| `express.json()` | Parsea el body de las peticiones como JSON |
| `cors()` | Permite peticiones desde cualquier origen — habilita el consumo desde Angular u otros frontends |

---

## Endpoints

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/` | Estado de la API |
| GET | `/characters` | Todos los personajes |
| GET | `/characters/alive` | Solo los vivos (hp > 0) |
| GET | `/characters/class/:class` | Filtrar por clase |
| GET | `/characters/:id` | Un personaje por id |
| GET | `/characters/:id/info` | Info formateada |
| POST | `/characters` | Crear personaje |
| PATCH | `/characters/:id` | Actualizar parcialmente |
| DELETE | `/characters/:id` | Eliminar personaje |

---

## Ejemplos de requests

### GET — Ver todos
```
GET http://localhost:3000/characters
```

### GET — Filtrar por clase
```
GET http://localhost:3000/characters/class/Mago
GET http://localhost:3000/characters/class/Guerrero
GET http://localhost:3000/characters/class/Arquero
```

### GET — Por id
```
GET http://localhost:3000/characters/1
```

### POST — Crear personaje
```
POST http://localhost:3000/characters
Content-Type: application/json

{
    "name": "Paladín",
    "class": "Guerrero",
    "level": 5,
    "hp": 90,
    "maxHp": 120,
    "status": "activo",
    "guild": "Luz Eterna"
}
```

**Clases válidas:** `Guerrero` | `Mago` | `Arquero`  
**Estados válidos:** `activo` | `muerto` | `descansando`

### PATCH — Actualizar (solo los campos que cambien)
```
PATCH http://localhost:3000/characters/1
Content-Type: application/json

{ "hp": 50, "status": "activo" }
```

### DELETE — Eliminar
```
DELETE http://localhost:3000/characters/3
```

---

## Códigos de respuesta HTTP

| Código | Significado |
|---|---|
| `200` | OK — operación exitosa |
| `201` | Created — personaje creado |
| `400` | Bad Request — datos inválidos |
| `404` | Not Found — personaje no encontrado |

---

## Notas técnicas

- **Datos en memoria** — se reinician al reiniciar el servidor
- **CORS habilitado** — acepta peticiones desde cualquier origen (`cors()` sin restricciones)
- **Whitelist en PATCH** — solo campos del tipo `Character` son actualizables
- **IDs sin colisión** — generados con `Math.max` sobre ids existentes
- **Orden de rutas** — `/alive` y `/class/:class` van antes que `/:id`