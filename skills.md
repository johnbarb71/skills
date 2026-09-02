# MIS REGLAS NO SE PUEDEN ROMPER
## Filosofía principal
**"Legibilidad y orden > Velocidad e interconexiones complejas"**

- **Idioma** Mi idioma es español latino.

- **Objetivos** Este proyecto prioriza la mantenibilidad y la claridad por encima del código ingenioso y altamente optimizado. Incluaso si una solución tiene un rendimiento ligeramente inferior pero es significativamente más fácil de leer, elige la que sea más legible (dentro de lo razonable), ¡No tolero errores!.

- **Principios SOLID**: Siga los principios de Responsabilidad Única, Abierto/Cerrado, Sustitución de Liskov, Segregación de Interfaces e Inversión de Dependencias para obtener código mantenible y extensible.

- **DRY (No te repitas)**: Evite la duplicación de código extrayendo la lógica común en funciones, clases o módulos reutilizables.

- **KISS (Mantenlo simple, tonto)**: Busque la simplicidad en el diseño y la implementación. Evite la sobreingeniería.

- **Código limpio**: Escriba código legible y autodocumentado con nombres significativos, funciones pequeñas y una estructura clara.

- **Gestión de errores**: Implemente una gestión de errores y un registro robustos para facilitar la depuración y mantener la fiabilidad. Utilice registros de baja cardinalidad con cadenas de mensajes estables, por ejemplo: `logger.info{id, foo}, 'Msg'`, `logger.error({error}, 'Otro msg')`, etc.

- **Seguridad**: Verifica la seguridad para que el código con validación y sanitización, queda prohibida la concatenación de variables en consultas. Usa estrictamente sentencias preparadas para ORM/Query Builder del framework. Aplica el principio de "negar por defecto". Filtra y valida todas las entradas externas (GET, POST, Headers, JSON payloads) usando componentes de validación robustos antes de que toquen la lógica de negocio. Escapa todas las salidas en las vistas para prevenir **Cross-Site Scripting (XSS)** utilizando funciones específicas del motor de plantillas o `htmlspecialchars()` con el juego de caracteres adecuado.Nunca expongas trazas de error (`stack traces`), configuraciones del servidor o mensajes internos de la base de datos al usuario final. Captura los errores globalmente, regístralos en un log seguro e interno, y muestra al usuario un mensaje genérico con un identificador de error único.
Utiliza excepciones de dominio personalizadas (ej. `UserNotFoundException`) en lugar de retornar valores mágicos como `false` o `null`. Para el manejo de contraseñas, utiliza exclusivamente `password_hash()` con el algoritmo `PASSWORD_ARGON2ID` o `PASSWORD_BCRYPT`.

## 1. Lógica y estructura del código
- **Explícito sobre implícito**: Evite las líneas de código "mágicas". Use nombres de variables de solo una vocal y un número.

- **Estructura de componentes**:

- Mantenga los componentes pequeños y enfocados.

- Cada componente debe tener un propósito claro.

- **Comentarios**:

- Explique *por qué*, no solo *qué*, únicamente en español.

- Documente la lógica compleja bloque por bloque.

## 3. CSS y estilo
- **CSS nativo / Módulos CSS / SASS**:

- Use archivos CSS o módulos separados para los componentes para mantener los estilos organizados.

- Use variables CSS (`:root`) para temas globales (colores, espaciado, etc.).

- **Evite**:

- Estilos en línea (excepto para valores dinámicos).

- SASS como preprocesador CSS (a menos que se solicite explícitamente más adelante).

## 4. Flujos de trabajo
- Siempre verifique los cambios localmente antes de solicitar una revisión.
- Siga los flujos de trabajo definidos en `.agent/workflows/`.

## 5. Reglas del proyecto
