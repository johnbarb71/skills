---
name: reglas-generales
description: >
  Reglas de ingeniería aplicables a cualquier lenguaje o framework: legibilidad
  antes que velocidad, SOLID, DRY, KISS, código limpio, validación y sanitización
  de entradas, consultas parametrizadas, escape de salidas, manejo de errores con
  logging estructurado, hashing de contraseñas y CSS con variables. Úsala en toda
  tarea de código, revisión, refactor, diseño de componentes, creación de archivos
  o configuración de estilos, incluso si el usuario no menciona reglas de estilo.
---

# Reglas generales de ingeniería

Estas reglas son agnósticas al lenguaje y al framework. Cuando el proyecto tenga
convenciones propias (AGENTS.md, README, linters, guías de estilo), esas mandan;
estas reglas cubren lo que no esté definido. Si algo del proyecto contradice una
regla por una razón justificada, respeta el proyecto y deja constancia del motivo.

## Filosofía principal

**"Legibilidad y orden > velocidad e interconexiones complejas"**

- **Idioma**: responde, documenta y comenta en español latino.
- **Mantenibilidad**: prioriza claridad y mantenibilidad sobre código ingenioso o
  microoptimizaciones. Si una solución algo más lenta es claramente más legible,
  elige la legible dentro de lo razonable. La corrección no se negocia.
- **SOLID**: responsabilidad única, abierto/cerrado, sustitución de Liskov,
  segregación de interfaces e inversión de dependencias.
- **DRY**: extrae lógica repetida en funciones, clases o módulos reutilizables,
  sin forzar abstracciones prematuras.
- **KISS**: diseña e implementa lo más simple que resuelva el problema. Evita la
  sobreingeniería y las capas que nadie pidió.
- **Código limpio**: nombres significativos y descriptivos, funciones pequeñas,
  una sola responsabilidad por unidad y estructura predecible.

## 1. Lógica y estructura del código

- **Explícito sobre implícito**: evita construcciones "mágicas", efectos
  secundarios ocultos y abreviaturas de una sola letra. Un nombre debe explicar
  qué contiene o qué hace sin necesidad de leer el cuerpo.
- **Funciones y componentes pequeños**: cada uno con un propósito claro y una
  única razón para cambiar. Si necesita comentarios para entenderse, probablemente
  deba dividirse.
- **Dependencias explícitas**: recibe colaboradores por parámetro o inyección en
  lugar de tomarlos de estado global; facilita pruebas y sustitución.
- **Sin duplicación de conocimiento**: una regla de negocio debe vivir en un solo
  lugar, no repetida en capas distintas.
- **Manejo de errores en los bordes**: valida y falla temprano en la frontera del
  sistema; el interior trabaja con datos ya confiables.

## 2. Comentarios y documentación

- Comenta **por qué**, no qué. El código ya dice qué hace; el comentario debe
  explicar la decisión, la restricción o el caso límite.
- Comenta únicamente en español latino.
- Documenta bloque por bloque la lógica compleja, las fórmulas no obvias y los
  workarounds, incluyendo qué se intentó y por qué no se usó.
- No dejes comentarios obsoletos ni código comentado: usa el control de versiones.
- Documenta el contrato público (entradas, salidas, errores y efectos) de APIs,
  módulos y funciones expuestas.

## 3. Seguridad

Aplica **"negar por defecto"**: todo acceso, ruta, campo o acción está denegado
salvo que se permita explícitamente.

- **Validación de entradas**: filtra y valida toda entrada externa (query string,
  cuerpo, cabeceras, cookies, archivos, variables de entorno, colas, APIs de
  terceros) antes de que toque la lógica de negocio. Prefiere listas de valores
  permitidos y tipos estrictos sobre listas de valores prohibidos.
- **Consultas a base de datos**: prohíbe concatenar o interpolar variables en
  SQL/NoSQL. Usa siempre consultas parametrizadas o el query builder/ORM con
  enlace de parámetros. Esto aplica también a filtros dinámicos, ordenamientos y
  nombres de tabla.
- **Escape de salidas**: codifica la salida según el contexto (HTML, atributo,
  JavaScript, URL, CSS) con las utilidades del motor de plantillas o del framework.
  No reutilices un escape de un contexto en otro.
- **Contraseñas**: usa exclusivamente algoritmos de hashing diseñados para
  contraseñas, con sal por usuario y costo configurable (Argon2id, bcrypt o
  scrypt). Nunca MD5, SHA-1/SHA-256 sin adaptación, ni cifrado reversible.
- **Secretos**: nunca hardcodees claves, tokens ni credenciales; tampoco los
  registres en logs ni los devuelvas en respuestas.
- **Errores y trazas**: nunca expongas stack traces, consultas, rutas internas ni
  configuraciones al usuario final. Captura los errores en un punto global,
  regístralos internamente y devuelve un mensaje genérico con un identificador
  único de correlación.
- **Superficie mínima**: no confíes en validaciones solo del cliente, no expongas
  campos innecesarios y aplica autorización en cada operación sensible, no solo
  en la interfaz.

## 4. Gestión de errores y logging

- Usa excepciones o errores de dominio propios (por ejemplo
  `UserNotFoundException`, `PaymentRejectedError`) en lugar de devolver valores
  mágicos como `false`, `null`, `-1` o cadenas vacías como señal de fallo.
- Distingue errores esperados (de negocio, recuperables) de errores inesperados
  (de infraestructura); no los mezcles ni los silencies con capturas vacías.
- Registra con logging estructurado y de baja cardinalidad: mensaje estable más
  campos con contexto. Por ejemplo `logger.info({ id, foo }, 'Msg')` y
  `logger.error({ error }, 'Otro msg')`. Evita interpolar datos variables en el
  mensaje, porque rompe la agrupación y la búsqueda.
- Incluye un identificador de correlación que permita unir la respuesta al
  usuario con el registro interno.
- Nunca registres contraseñas, tokens, datos personales sensibles ni el cuerpo
  completo de peticiones sin redacción.

## 5. CSS y estilos

- Usa archivos CSS o módulos CSS separados por componente para mantener los
  estilos organizados y acotados.
- Define temas globales (colores, espaciados, tipografía, radios, sombras) como
  variables CSS en `:root` y consúmelas; evita valores repetidos y literales
  dispersos.
- Evita estilos en línea, salvo valores dinámicos que no puedan expresarse con
  clases.
- No introduzcas preprocesadores como SASS/SCSS salvo que el proyecto ya los use
  o se soliciten explícitamente.
- Mantén selectores simples y de baja especificidad; evita `!important` y
  dependencias profundas entre hojas de estilo.

## 6. Flujos de trabajo

- Antes de dar por terminada una tarea, verifica los cambios localmente con las
  herramientas del proyecto (build, pruebas, linter, typecheck) y no inventes
  comandos que no existan.
- Si el proyecto define flujos o convenciones (AGENTS.md, README, CONTRIBUTING,
  configuración del repo), síguelos y cítalos como fuente; no asumas rutas que no
  existan.
- Mantén los cambios acotados al alcance pedido: sin refactors colaterales ni
  dependencias nuevas que no se hayan justificado.
- No commitees, publiques ni despliegues nada salvo que se solicite de forma
  explícita.
