# PRY-ATOM-FRONT

Este proyecto es una aplicación web desarrollada con Angular que permite la gestión de tareas. Cuenta con una interfaz de usuario intuitiva para la creación, edición, eliminación y marcación de tareas como completadas. Además, incluye un sistema de autenticación de usuarios.

## Funcionalidades Principales

* **Autenticación:**
    * Página de inicio de sesión para que los usuarios puedan acceder a la aplicación de forma segura.
    * Implementación de interceptores para la inclusión automática del token de autenticación en las peticiones HTTP.
    * Uso de guards para proteger las rutas y asegurar que solo los usuarios autenticados puedan acceder a la gestión de tareas.
* **Gestión de Tareas:**
    * Listado de tareas existentes.
    * Formulario para la creación de nuevas tareas.
    * Funcionalidad para editar los detalles de una tarea existente.
    * Opción para eliminar tareas.
    * Capacidad para marcar tareas como completadas.
* **Lazy Loading:**
    * Implementación de carga diferida (lazy loading) para mejorar el rendimiento inicial de la aplicación, cargando los módulos de "auth" y "dashboard" solo cuando son necesarios.

## Estructura de Carpetas

pry-atom-front/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   └── services/
│   │   │       ├── base/
│   │   │       ├── task/
│   │   │       ├── token/
│   │   │       └── user/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   └── dashboard/
│   │   ├── models/
│   │   ├── shared/
│   │   │   └── angular-material/
│   │   │   └── common/
│   │   ├── util/
│   ├── assets/ 2 
│   └── environments/
└── 

* **`src/app/core`:** Contiene la lógica principal y los servicios reutilizables de la aplicación.
    * **`guards`:** Implementaciones de los guards para la protección de rutas.
    * **`interceptors`:** Interceptor HTTP para agregar el token de autenticación.
    * **`services`:** Servicios para interactuar con la API y manejar la lógica de negocio.
        * **`base`:** Servicios base o abstractos.
        * **`task`:** Servicios relacionados con la gestión de tareas.
        * **`token`:** Servicios para el manejo de tokens de autenticación.
        * **`user`:** Servicios relacionados con la gestión de usuarios y la autenticación.
* **`src/app/features`:** Contiene los módulos de funcionalidades específicas de la aplicación.
    * **`auth`:** Módulo para la funcionalidad de autenticación (login).
    * **`dashboard`:** Módulo para la gestión de tareas (crear, editar, eliminar, marcar como completada).
* **`src/app/models`:** Define las interfaces y clases de los datos utilizados en la aplicación.
* **`src/app/shared`:** Contiene módulos y componentes reutilizables en toda la aplicación.
    * **`angular-material`:** Módulo que importa y exporta los módulos de Angular Material utilizados.
    * **`common`:** Componentes, directivas o pipes de uso general.
* **`src/app/util`:** Contiene utilidades y funciones de ayuda.
* **`src/assets`:** Contiene archivos estáticos como imágenes, etc.
* **`src/environments`:** Contiene los archivos de configuración para diferentes entornos (desarrollo, producción, etc.).

## Tecnologías Utilizadas

* Angular (versión 17)
* TypeScript
* Angular CLI
* Angular Material 17

## Prerrequisitos

Asegúrate de tener instalado lo siguiente en tu entorno de desarrollo:

* [Node.js](https://nodejs.org/) (versión recomendada: 20.18.0)
* [npm](https://www.npmjs.com/) (generalmente se instala con Node.js) o [yarn](https://yarnpkg.com/)
* [Angular CLI](https://angular.io/cli) (versión recomendada: 17.3.16)

## Instalación

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/david3zk/atom-front.git
    cd atom-front
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    # o
    yarn install
    ```

## Ejecución

1.  Ejecuta el servidor de desarrollo:
    ```bash
    ng serve -o
    # o
    yarn start
    ```
2.  La aplicación estará disponible en tu navegador en `http://localhost:4200`.

## Construcción para Producción

1.  Construye la aplicación para producción:
    ```bash
    ng build --prod
    # o
    yarn build --prod
    ```
2.  Los archivos de construcción se encontrarán en la carpeta `dist/atom-front/browser`.

## Notas Adicionales

* 

## Autor

Edgar Vasquez
edvasquez3@gmmail.com
david3zk

---
