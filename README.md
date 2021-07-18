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

### Acciones de Usuario tipo Admin
- Login o registro de identificación en el sistema
- Obtener listado de platos o productos disponibles
- Agregar platos o productos
- Eliminar platos o productos
- Actualizar platos o productos
- Obtener listado de todas las ordenes que haya en el sistema
- Obtener el detalle de una orden relacionada a un usuario o cliente
- Obtener listado de todas los usuarios que haya registrados en el sistema
- Actualizar el estado de una orden

### Acciones de Usuario tipo Client
- Login o registro de identificación en el sistema
- Obtener listado de platos o productos disponibles
- Obtener listado de solo sus ordenes registradas en el sistema
- Obtener el detalle de una orden relacionada solo con su usuario
- Obtener los datos o detalles de su registro como usuario

## Indicaciones de uso o puesta en marcha de la API :computer:

1. clonar o copiar el proyecto: :floppy_disk:

    En la terminal, cmd, consola o linea de comando: 
```sh
git clone https://github.com/jbcoolness/delilah_resto.git
```

2. Instalando dependencias: :sparkle:
    Dentro de la ruta del proyecto 
```sh
npm i
```

3. Crear la Base de datos :open_file_folder:
    - Dentro del repositorio hay un archivo de nombre `queriesDb.sql` donde puedes encontrar todas las consultas de manera secuencial que te ayudaran a crear la base de datos y tablas, salvaguardando el respectivo modelo con sus PRIMARY KEYS y FOREING KEYS de cada una.

4. Variables de entorno :abcd:
    - Es necesario crear un archivo de nombre `.env` donde se almacenaran todas las variables que contengan informacion sensible o de importancia tales como datos de acceso a la base de datos, token, etc. En el repositorio hay un archivo de nombre `.envExample` para tomar de muestra como debemos llamar las variables antes mencionadas.
        - Ejemplo:
            USER = _usuario de la base de datos_
            PASSWORD = _contraseña de la base de datos_
            HOST = _host o direccion de la base de datos_
            PORT = _puerto en el cual tenemos acceso a la base de datos_
            DB = _nombre de la base de datos_
            KEY_TOKEN = _string o cadena de texto con el cual se generará y decodificará nuestro token de acceso_
            EXPIRES = _Tiempo de duracion o validez del token generado para los usuarios_

5. Iniciar el Servidor
    Dentro de la ruta del proyecto podemos iniciar o ejecutar el proyecto de dos maneras, en nuestra consola de comandos, tipear cualquiera de estos dos comandos:
```sh
node app.js
nodemon app.js
```