# AGENTS.md

Repositorio de archivos de instrucciones ("skills") para agentes de IA. Sin código, builds ni tests.

## Contenido

- `skills.md` es un skill completo: frontmatter YAML (`name`, `description`) seguido de un cuerpo Markdown. Un archivo por skill.
- `README.md` solo describe el propósito (en español).

## Convenciones

- Todo el contenido se escribe en **español latino** (regla explícita dentro de `skills.md`).
- Al añadir palabras a `README.md` o similar, español latino también.
- Mantener skills compactos: reglas aplicables a cualquier lenguaje/framework; evitar contenido específico de un proyecto. Ajuste de nivel de detalle via pregunta al usuario.
- No agregar dependencias ni tooling) salvo que se pida.
- El repo es también un paquete npm ejecutable (`bin/cli.js`) para instalación vía `npx github:johnbarb71/skills`; `cli.js` copia `skills.md` a `.claude/skills/` y `skills/` del proyecto destino. Mantener `bin` y `files` de `package.json` al día al renombrar skills.
- Ediciones de skills.md: preservar el tono prescriptivo por viñetas y el patrón "por qué" en comentarios/código ejemplos.

## Verificación

No hay build ni tests; verificar con el `Read` visual y confirmar YAML frontmatter válido (delimitadores `---` exactos). Nada que commitear automáticamente.
