Constructor de CV con Múltiples Versiones (React + Node.js)
Este es un constructor de CV interactivo que te permite crear, editar y gestionar múltiples versiones de tu currículum en tiempo real. La aplicación guarda tus datos en el navegador para que no pierdas tu progreso y te permite exportar cualquier versión a formato PDF.

✨ Características Principales
Editor en Tiempo Real: Ve los cambios en tu CV al instante mientras escribes.

Gestión de Versiones: Crea y guarda múltiples versiones de tu CV. Ideal para adaptar tu perfil a diferentes ofertas de trabajo.

Clonación de Versiones: Crea una nueva versión basada en una existente para hacer modificaciones rápidas.

Persistencia de Datos: Toda tu información y versiones se guardan automáticamente en el localStorage de tu navegador.

Secciones Dinámicas: Añade o elimina fácilmente entradas en tu experiencia, educación, proyectos y cursos.

Exportación a PDF: Genera un archivo PDF de alta calidad de la versión de tu CV que elijas (requiere el backend).

🛠️ Tecnologías Utilizadas
Frontend:

React

Vite

Tailwind CSS

Backend:

Node.js

Express

Puppeteer (para la generación de PDF)

🚀 Cómo Empezar
Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local.

Prerrequisitos
Asegúrate de tener instalado Node.js (se recomienda la versión 18 o superior) y npm.

# Para verificar tu versión de Node.js
node -v

# Para verificar tu versión de npm
npm -v

Instala las dependencias del Frontend:

# Navega a la carpeta raíz del proyecto (si no estás ya ahí)
npm install

Instala las dependencias del Backend:

cd server
npm install

Ejecución de la Aplicación
Para que la aplicación funcione completamente (incluida la exportación a PDF), necesitas tener ambos, el servidor frontend y el backend, en ejecución.

Ejecuta el Servidor Backend:

Abre una terminal, navega a la carpeta server y ejecuta el siguiente comando:

# Desde la carpeta /server
node server.js

El servidor se iniciará, por lo general, en http://localhost:4000.

Ejecuta la Aplicación Frontend (React):

Abre una nueva terminal, asegúrate de estar en la carpeta raíz del proyecto y ejecuta:

# Desde la carpeta raíz del proyecto
npm run dev

Vite iniciará el servidor de desarrollo y te proporcionará una URL (normalmente http://localhost:5173) para abrir en tu navegador.

¡Y listo! Ahora puedes acceder a la aplicación en tu navegador y empezar a construir tus CVs.
