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
```sh
git clone https://github.com/jbcoolness/delilah_resto.git
```
