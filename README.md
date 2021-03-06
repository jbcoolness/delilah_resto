# _DELILAH RESTÓ_ :stew: :spaghetti:

### Objetivo:
Este proyecto plantea la creación de un sistema (backend - API) de pedidos online para un restaurante.

### Condiciones solicitadas por el cliente :white_check_mark:
1. Poder registrar un nuevo usuario.
2. Un usuario debe poder listar todos los productos disponibles.
3. Un usuario debe poder generar un nuevo pedido al restaurante con un listado de platos que desea.
4. El usuario con roles de administrador debe poder actualizar el estado del pedido.
5. Un usuario con rol de administrador debe poder realizar las acciones de creación, edición y eliminación de recursos de productos (CRUD de productos).
6. Un usuario sin roles de administrador no debe poder crear, editar o eliminar un producto, ni editar o eliminar un pedido. Tampoco debe poder acceder a información de otros usuarios.

### Acciones de Usuario tipo Admin :bowtie:
- Login o registro de identificación en el sistema
- Obtener listado de platos o productos disponibles
- Agregar o registrar nuevo usuario con rol de administrador
- Agregar platos o productos
- Eliminar platos o productos
- Eliminar Usuario
- Actualizar platos o productos
- Obtener listado de todas las ordenes que haya en el sistema
- Obtener el detalle de una orden relacionada a un usuario o cliente
- Obtener listado de todas los usuarios que haya registrados en el sistema
- Actualizar el estado de una orden

### Acciones de Usuario tipo Client :smiley:
- Login o registro de identificación en el sistema
- Obtener listado de platos o productos disponibles
- Obtener listado de solo sus ordenes registradas en el sistema
- Obtener el detalle de una orden relacionada solo con su usuario
- Obtener los datos o detalles de su registro como usuario

## Indicaciones de uso o puesta en marcha de la API :computer:

1. clonar o copiar el proyecto: :floppy_disk:
    - En la terminal, cmd, consola o linea de comando: 
```sh
git clone https://github.com/jbcoolness/delilah_resto.git
```

2. Instalando dependencias: :sparkle:
    - Dentro de la ruta del proyecto 
```sh
npm i
```

3. Crear la Base de datos :open_file_folder:
    - Dentro del repositorio hay un archivo de nombre `queriesDb.sql` donde puedes encontrar todas las consultas de manera secuencial que te ayudaran a crear la base de datos y tablas, salvaguardando el respectivo modelo con sus PRIMARY KEYS y FOREING KEYS de cada una.   

    [:link: Diagrama E/R](https://drive.google.com/file/d/1kTeHU2fdENABD8Fr7yYi6NEFreaet8Wr/view?usp=sharing)

4. Variables de entorno :abcd:
    - Es necesario crear un archivo de nombre `.env` donde se almacenaran todas las variables que contengan informacion sensible o de importancia tales como datos de acceso a la base de datos, token, etc. En el repositorio hay un archivo de nombre `.envExample` para tomar de muestra como debemos llamar las variables antes mencionadas.
        - Ejemplo:
            - USER = _usuario de la base de datos_
            - PASSWORD = _contraseña de la base de datos_
            - HOST = _host o direccion de la base de datos_
            - PORT = _puerto en el cual tenemos acceso a la base de datos_
            - DB = _nombre de la base de datos_
            - KEY_TOKEN = _string o cadena de texto con el cual se generará y decodificará nuestro token de acceso_
            - EXPIRES = _Tiempo de duracion o validez del token generado para los usuarios_

5. Iniciar el Servidor :rocket:
    - Dentro de la ruta del proyecto podemos iniciar o ejecutar el proyecto de tres maneras, en nuestra consola de comandos, tipear cualquiera de estos comandos:
```sh
node app.js
nodemon app.js
npm start
```
6. Para entender el funcionamiento de la API dispusimos dos opciones:
    1. Dirigirte a la ruta o endpoint de nuestro proyecto **/api/v1/docs/** donde internamente se encuentra la respectiva documentacion del servicio.
    2. Ir la sitio web del [Editor de Swagger](https://editor.swagger.io/) y pegar toda la informacion que se encuentra en el archivo `spec.yml` de nuestro reporsitorio donde de manera externa suministrará de igual forma tal documentacion.

7. Rutas o Endpoints :link:
    ### PRODUCTS
    - **GET** /api/v1/products/ :bookmark_tabs:
        - body: vacío
        - header: vacío
        - descripcion: Nos devuelve el listado de todos los productos registrados en la base de datos

    - **POST** /api/v1/products/ :white_check_mark:
        - body: {`product_name`, `description`, `image`, `price`}
        - header: {`token`} de rol de adminitrador
        - descripcion: registra o crea un nuevo producto con los datos relacionados en el body

    - **PUT** /api/v1/products/:id :recycle:
        - body: {`product_name`, `description`, `image`, `price`}
        - header: {`token`} de rol de adminitrador
        - descripcion: actualiza el producto relacionado con el `product_id` suministrado como parametro con los datos indicados en el body

    - **DELETE** /api/v1/products/:id :negative_squared_cross_mark:
        - body: vacío
        - header: {`token`} de rol de adminitrador
        - descripcion: elimina el producto relacionado con el `product_id` suministrado como parametro

    ### USERS
    - **GET** /api/v1/users/ :bookmark_tabs:
        - body: vacío
        - header: {`token`} de rol de adminitrador o cliente
        - descripcion: Nos devuelve el listado de todos los usuarios registrados en la base de datos si tiene perfil de Admin, pero si es cliente solo muestra la informacion del usuario que la está solicitando 

    - **POST** /api/v1/users/register/ :white_check_mark:
        - body: {`user`, `full_name`, `email`, `phone`, `address`, `password`}
        - header: vacío
        - descripcion: registra o crea un nuevo usuario con los datos relacionados en el body

    - **POST** /api/v1/users/register_admin/ :white_check_mark:
        - body: {`user`, `full_name`, `email`, `phone`, `address`, `password`}
        - header: {`token`} de rol de adminitrador
        - descripcion: registra o crea un nuevo usuario con roles de administrador, mediante los datos relacionados en el body

    - **POST** /api/v1/users/login/ :white_check_mark:
        - body: {`user_email`, `password`}
        - header: vacío
        - descripcion: Logea o proporciona acceso al usuario validando la informacion en la base de datos, digitando ya sea su usuario o email y la contraseña
    - **DELETE** /api/v1/users/:id :negative_squared_cross_mark:
        - body: vacío
        - header: {`token`} de rol de adminitrador
        - descripcion: elimina el usuario relacionado con el `user_id` suministrado como parametro

    ### ORDERS
    - **POST** /api/v1/orders/ :white_check_mark:
        - body: {`user_id`, `payment_type`, `orders_products`, `price`}
        - header: {`token`} de rol de cliente
        - descripcion: Crea una orden por parte de ese usuario en la base de datos, con la solicitud o orden relacionado en los campos de body

    - **GET** /api/v1/orders/ :bookmark_tabs:
        - body: vacío
        - header: {`token`} de rol de adminitrador o cliente
        - descripcion: Nos devuelve el listado de todas las ordenes registradas en la base de datos si el solicitante se logeo con rol de administrador, si tiene rol de cliente solo le devolverá las ordenes relacionadas a ese usuario

    - **GET** /api/v1/orders/:id :bookmark_tabs:
        - body: vacío
        - header: {`token`} de rol de cliente
        - descripcion: Nos devuelve el detalle de la orden relacionada al id de `order_id` anexado como parametro de ese usuario cliente que está logeado o solicitando el recurso

    - **PATCH** /api/v1/orders/:id :recycle:
        - body: {`newStateId`}
        - header: {`token`} de rol de adminitrador
        - descripcion: Actualiza el estado de la orden relacionada con el id de `order_id` suministrado por parametro 

    - **DELETE** /api/v1/orders/:id :negative_squared_cross_mark:
        - body: vacío
        - header: {`token`} de rol de adminitrador
        - descripcion: Elimina la orden relacionada con el id de `order_id` suministrado por parametro

    - **GET** /api/v1/orders/:user/:order :bookmark_tabs:
        - body: vacío
        - header: {`token`} de rol de adminitrador
        - descripcion: nos devuelve el detalle de la orden de `order_id` relacionado con el usuario user de `user_id` suministrados como parametro en su restectivo orden indicado en la ruta.