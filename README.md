# vue-ecommerce online
 * https://main--superlative-heliotrope-367b3c.netlify.app/

# vue-ecommerce

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```


### PRE-PROCESSORS SCSS: 

```sh
npm install sass sass-loader@^12 fibers -D
```

### AXIOS to FETCH API: 

```sh
npm install axios
```

### Decisiones de diseño
Componentes y Vistas:
Los componentes están organizados en las carpetas components y views, siguiendo las mejores prácticas de Vue.
Se han creado componentes reutilizables como footerComponent, headerComponent, shoppingCartComponent, etc.
Las vistas principales como ProductCards, ProductDetails, y ShoppingCart están definidas en archivos separados para facilitar la gestión y el mantenimiento del código.

Estilos y Diseño:
Se han utilizado variables SCSS (_variables.scss) para mantener una consistencia en los estilos y facilitar su mantenimiento.
La elección del color se basa en una paleta de colores de Color Hunt para garantizar una estética atractiva y coherente en toda la aplicación.
Las imágenes son de Undraw y los iconos son de Bootstrap 5, elegidos por su disponibilidad gratuita y calidad.
La fuente se elige de Google Fonts para una mejor legibilidad y estética del texto en la aplicación.

Funcionalidad:
La aplicación es una tienda de comercio electrónico con funcionalidades completas como filtros, paginación, visualización de detalles de productos, y gestión del carrito de compras.
Se ha incluido la capacidad de cambiar el tema de la página principal para adaptarse a las preferencias del usuario.
En el proyecto de la aplicación web de comercio electrónico, se han tomado varias decisiones de diseño para mejorar la experiencia del usuario y la estética general del sitio. 

*  Cartas de productos con estilos de Bootstrap 5.3: Utilizar cartas para mostrar los productos proporciona una presentación organizada y atractiva de los artículos disponibles. Al aprovechar los estilos de Bootstrap 5.3, se garantiza una apariencia coherente y compatible en diferentes dispositivos y navegadores.
*  Carrito de compras en la esquina superior derecha: Colocar el carrito de compras en una ubicación destacada, como la esquina superior derecha del encabezado, facilita su acceso para los usuarios. La capacidad de hacer clic en el carrito y ver los elementos agregados de manera rápida y conveniente mejora la usabilidad del sitio.
*  Paginación con estilos de Bootstrap 5.3: La paginación es fundamental para sitios con grandes cantidades de productos, ya que permite a los usuarios navegar por los resultados de búsqueda de manera eficiente. Al implementar la paginación con estilos de Bootstrap 5.3, se garantiza una apariencia limpia y moderna que se integra bien con el diseño general del sitio.
*  Manejo de iconos: El uso de iconos proporciona una forma visualmente atractiva de comunicar información y funcionalidad a los usuarios. Al integrar un conjunto coherente de iconos en todo el sitio, se mejora la comprensión y la navegación del usuario. Se pueden usar bibliotecas de iconos como Font Awesome o Material Icons para una amplia selección de opciones y estilos.

### Breve descripción de la estructura del proyecto

El proyecto utiliza Vue.js v3 como framework de frontend para construir una aplicación web interactiva y dinámica. Vite se utiliza como el entorno de desarrollo para la compilación y el servidor de desarrollo en tiempo real.

El proyecto generalmente seguiría un patrón común de desarrollo de aplicaciones web modernas, con directorios para almacenar el código fuente, los recursos estáticos, las pruebas, etc. Se puede utilizar una arquitectura basada en componentes, donde cada componente de Vue.js representa una parte de la interfaz de usuario y la lógica asociada

El proyecto utiliza Vue.js v3 como framework de frontend para construir una aplicación web interactiva y dinámica. Vite se utiliza como el entorno de desarrollo para la compilación y el servidor de desarrollo en tiempo real.

La estructura del proyecto generalmente seguiría un patrón común de desarrollo de aplicaciones web modernas, con directorios para almacenar el código fuente, los recursos estáticos, las pruebas, etc. Se puede utilizar una arquitectura basada en componentes, donde cada componente de Vue.js representa una parte de la interfaz de usuario y la lógica asociada.

Los archivos principales del proyecto pueden incluir:

* Directorio src: Aquí es donde se encuentra el código fuente de la aplicación Vue.js. Puede contener subdirectorios para componentes, rutas, servicios, etc.

* Archivo package.json: Este archivo contiene la configuración del proyecto, incluidas las dependencias, los scripts de construcción y las configuraciones de Vite.

* Archivo vite.config.js: Este archivo configura Vite y puede contener ajustes específicos para el entorno de desarrollo y producción, como la configuración del servidor, la optimización del código, etc.

* Directorio public: Este directorio puede contener recursos estáticos como imágenes, archivos CSS, fuentes, etc. Estos archivos están disponibles públicamente y pueden ser referenciados desde la aplicación.

* Directorio tests: Aquí se pueden almacenar las pruebas unitarias y de integración para la aplicación.

El proyecto aprovecha las características de Vue.js v3, como el sistema de composición, la reactividad mejorada y el enlace declarativo,

### Guía de pruebas: 
Las pruebas no pudieron ser implementadas debido a errores :/ en la integración de las librerías con JEST  sin embargo se encuentra en una rama: testing

  
