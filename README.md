# **Gestor de Eventos**

## **Descripción**
Gestor de Eventos es una aplicación CRUD para gestionar eventos, donde los usuarios pueden registrarse, autenticarse con JWT, y realizar operaciones sobre eventos como crear, editar, eliminar y filtrar por fecha o ubicación. El backend usa Node.js y MongoDB, y el frontend está desarrollado con React y Material-UI.


Cada evento tiene los siguientes campos:
- **Nombre del evento**
- **Fecha**
- **Hora**
- **Ubicación**
- **Descripción**

## **Requisitos**

### **Frontend**
- **Tecnologías:** React, Material-UI (o Bootstrap).
- **Funcionalidad:** La interfaz gráfica permite a los usuarios ver, agregar, editar y eliminar eventos. Los formularios están diseñados con Material-UI o Bootstrap para una experiencia fluida y profesional.

### **Backend**
- **Tecnologías:** Node.js con Express.
- **Base de datos:** MongoDB para almacenar los eventos y usuarios.
- **Autenticación:** Se utiliza JWT (JSON Web Tokens) para la gestión de sesiones y protección de rutas.
- **Middleware:** Implementación de middleware para verificar la autenticación de los usuarios en las rutas del backend.

## **Características**

- **Login y Registro de Usuarios:**
  - Los usuarios pueden registrarse con su correo electrónico y contraseña.
  - Autenticación mediante JWT.
  
- **Gestión de Eventos (CRUD):**
  - Agregar, editar, eliminar y listar eventos.
  - Filtro de eventos por fecha o ubicación.
  
- **Interfaz de Usuario:**
  - Desarrollo del frontend utilizando React, con componentes interactivos y bien estructurados.
  - Uso de librerías de diseño como Material-UI o Bootstrap para la creación de formularios y visualización de eventos.

## **Tecnologías Utilizadas**

- **Frontend:**
  - React
  - Material-UI (o Bootstrap)
  
- **Backend:**
  - Node.js
  - Express
  - MongoDB
  
- **Autenticación:**
  - JWT (JSON Web Tokens)

## **Estructura del Proyecto en Carpetas**

```bash
gestorEventos/
│
├── backend/             # Contiene el código del backend (Node.js)
│   ├── src/             # Archivos fuente del backend
│   │   ├── config/      # Archivos de configuración de la base de datos
│   │   │   └── db.js    # Archivo de configuración de la base de datos
│   │   ├── controllers/ # Controladores para manejar las rutas
│   │   │   ├── authController.js  # Controlador de autenticación
│   │   │   └── eventController.js # Controlador de eventos
│   │   ├── middlewares/ # Archivos para manejar la autenticación
│   │   │   └── authMiddleware.js  # Middleware de autenticación
│   │   ├── models/      # Modelos de MongoDB para usuarios y eventos
│   │   │   ├── Event.js # Modelo de eventos
│   │   │   └── User.js  # Modelo de usuarios
│   │   └── routes/      # Rutas de la API
│   │       ├── authRoutes.js  # Rutas de autenticación
│   │       └── eventRoutes.js # Rutas de eventos
│   ├── .env             # Archivo de variables de entorno (como MONGO_URI, JWT_SECRET, etc.)
│   ├── server.js        # Archivo principal que inicia el servidor (punto de entrada)
│   └── package.json     # Dependencias y scripts para el backend
│
├── frontend/            # Contiene el código del frontend (React)
│   ├── public/          # Archivos estáticos (imagenes, iconos, etc.)
│   │   └── index.html   # Página principal estática
│   ├── src/             # Archivos fuente de React
│   │   ├── components/  # Componentes de React reutilizables
│   │   │   ├── AuthForm.js    # Formulario de autenticación
│   │   │   ├── EventCard.js   # Componente para mostrar un evento
│   │   │   ├── Footer.js      # Componente de pie de página
│   │   │   └── Navbar.js      # Componente de barra de navegación
│   │   ├── context/     # Archivos para el manejo del estado global
│   │   │   └── AuthContext.js # Contexto de autenticación
│   │   ├── pages/       # Páginas de la aplicación
│   │   │   ├── Dashboard.js    # Página principal del dashboard
│   │   │   ├── EventForm.js    # Página para agregar/editar eventos
│   │   │   ├── Home.js         # Página de inicio
│   │   │   ├── Login.js        # Página de inicio de sesión
│   │   │   └── Register.js     # Página de registro
│   │   ├── services/    # Funciones para interactuar con el backend o APIs
│   │   │   └── api.js    # Archivo de interacción con la API
│   │   ├── styles/      # Archivos de estilos (CSS)
│   │   │   ├── EventCard.css    # Estilo para el componente de tarjeta de evento
│   │   │   ├── dashboard.css   # Estilo para la página del dashboard
│   │   │   ├── footer.css      # Estilo para el pie de página
│   │   │   ├── global.css      # Estilos globales
│   │   │   └── home.css        # Estilo para la página de inicio
│   │   ├── App.js           # Componente principal de React
│   │   └── index.js         # Punto de entrada de React
│   │   ├── .env             # Archivo de variables de entorno para el frontend (como REACT_APP_API_URL, etc.)
│   ├── .gitignore           # Archivos y carpetas que no se suben al repositorio (ahora dentro de 'frontend')
│   └── package.json         # Dependencias y scripts para el frontend
│
├── README.md            # Este archivo
```


## **Instrucciones de Instalación**

### **Antes de Comenzar**

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (para el frontend)
- [Git](https://git-scm.com/) (para clonar el repositorio)
- [MongoDB](https://www.mongodb.com/) o la base de datos que estés usando (para el backend)

### 1. **Clonar el repositorio**

Clona el repositorio en tu máquina local:

```bash
git clone https://github.com/OlgaPio/gestorEventos.git
cd gestorEventos

### **2. Instalar dependencias**


#### **Backend:**

1. Navega a la carpeta del backend:
cd ../backend

2. Instala las dependencias del backend:
npm install

3. Crea un archivo .env en el directorio backend con las siguientes variables de entorno:
Ejemplo:
MONGO_URI=mongodb://localhost:27017/gestorEventos
PORT=5000
JWT_SECRET=tu_secreto_aqui

4. Ejecuta el servidor del backend:
npm start

El backend estará disponible en http://localhost:5000.


#### **Frontend:**

1. Navega a la carpeta del frontend:

```bash
cd frontend

2.Instala las dependencias del frontend:
npm install

3.Ejecuta el servidor de desarrollo del frontend:
npm start

4. Acceder a la aplicación
Una vez que tanto el frontend como el backend estén corriendo, puedes acceder a la aplicación en tu navegador en http://localhost:3000.


