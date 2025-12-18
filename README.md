# Perfulandia SPA 

Proyecto semestral de **Perfulandia SPA**, una plataforma digital-first que permite a los clientes explorar fragancias y gestionar sus pedidos en un entorno moderno y eficiente. Este prototipo implementa un esqueleto funcional utilizando **React**, **React Bootstrap** y pruebas unitarias con **Jest**.

## Requisitos del Proyecto Implementados

### 1. Páginas con Rutas (React Router)
La aplicación cuenta con un sistema de navegación completo que incluye las siguientes rutas:
* **Home (`/`)**: Página principal con carrusel informativo.
* **Catálogo de Perfumes (`/perfumes`)**: Listado general de productos.
* **Detalle de Producto (`/perfumes/:id`)**: Información específica de cada fragancia.
* **Autenticación (`/login` y `/register`)**: Gestión de acceso para usuarios y administradores.
* **Carrito y Pago (`/cart` y `/checkout`)**: Flujo completo de compra.
* **Perfil (`/profile`)**: Ruta privada para usuarios autenticados.
* **Panel Admin (`/admin/perfumes`)**: Ruta protegida para la gestión de inventario.

### 2. Componentes de React Bootstrap
Se diseñó la interfaz utilizando componentes de la librería **React Bootstrap** para asegurar un diseño responsivo y profesional:
* **NavBar**: Barra de navegación dinámica con integración de carrito y estado de sesión.
* **Carousel**: Banner interactivo en la página de inicio para destacar promociones.
* **CartDrawer**: Un componente de tipo "Drawer" para visualizar el carrito de compras sin abandonar la página actual.

### 3. Gestión de Estado y Context (State/Context)
Se implementaron dos contextos globales para manejar variables y funciones de la aplicación:
* **AuthContext**: Maneja el estado de autenticación (`token`, `isAdmin`), permitiendo controlar el acceso a rutas privadas y personalizar la experiencia del usuario.
* **CartContext**: Gestiona una variable de estado (`cart`) y funciones críticas como `addToCart`, `removeFromCart` y `updateQty`. También calcula automáticamente los totales (subtotal, IVA del 19% y envío).

### 4. Tests Unitarios (Jest)
Se implementaron un total de **7 tests unitarios** distribuidos en 3 páginas para validar la robustez del código:
* **Home.test.jsx**: Verifica el renderizado del carrusel y la estructura de contenedores Bootstrap.
* **Login.test.jsx**: Valida el montaje del formulario, la detección de errores en campos obligatorios y la simulación de inicio de sesión exitoso.
* **Perfumes.test.jsx**: Comprueba la carga de productos y el funcionamiento de los filtros por categoría.

## Tecnologías y Scripts

Este proyecto fue creado con **Create React App**.

* **Iniciar la App**: `npm start`
* **Ejecutar Tests**: `npm test`
* **Construir para Producción**: `npm run build`
