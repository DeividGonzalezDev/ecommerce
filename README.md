#  Proyecto de E-commerce con Next.js y Sanity
Este es un proyecto de e-commerce construido con el framework de React, Next.js, y con un backend creado con Sanity, un sistema de gestión de contenido basado en la nube. El objetivo principal de este proyecto es mostrar cómo se puede crear una aplicación de comercio electrónico moderna y escalable utilizando estas herramientas.

## Requisitos
Antes de poder ejecutar este proyecto, deberá tener instalado lo siguiente:

- Node.js
- npm

## Instalación
Para instalar este proyecto en su máquina local, siga estos pasos:

    git clone https://github.com/DeividGonzalezDev/ecommerce.git
    npm install



Ejecute el comando `npm run dev` para iniciar el servidor de desarrollo.

## Uso
Una vez que el servidor esté en funcionamiento, puede visitar la página de inicio de la aplicación en http://localhost:3000.

#### Nota:
*Para poder recibir pagos y administrar su backend con Sanity deberá crear un fichero `.env` y setear las siguiente variables:*
```javascript
NEXT_PUBLIC_SANITY_TOKEN='Tu clave de Sanity' //indispensable para el funcionamiento de la web app
PUBLIC_MERCADOPAGO_KEY= 'Tu clave pública de Mercado Pago'
SECRET_MERCADOPAGO_KEY='Tu Token Privado de Mercado Pago'
```


### La aplicación tiene las siguientes funcionalidades:

- Catálogo de productos
- Página de detalles del producto
- Carrito de compras
- Página de pago
- Historial de pedidos* (próximamente)*

Puede utilizar estas funcionalidades para explorar y realizar compras en la tienda. Los pedidos realizados en la tienda se almacenarán en el backend de Sanity, donde puede consultarlos y administrarlos.

## Contribución
Si desea contribuir a este proyecto, puede hacer lo siguiente:

- Cree un fork del repositorio.
- Cree una nueva rama en su fork.
- Haga sus cambios en la nueva rama.
- Cree una solicitud de extracción en el repositorio principal.

## Créditos
Este proyecto fue construido por ***Deivid González.***

<img src="https://avatars.githubusercontent.com/u/105879580?v=4" alt="Deivid Profile" width="150" style='border-radius:50%'>