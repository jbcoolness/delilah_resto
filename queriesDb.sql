# creacion de la base de datos
create database dalilah_resto;

# seleccionar la base de datos a trabajar
use dalilah_resto;

# CONSULTAS REFERENTES AL MODELO DE USUARIOS
# *** Creacionde las tablas ***
create table roles (
	role_id int not null,
	role varchar(30) not null,
	primary key(role_id)
);

create table users (
	user_id int not null auto_increment,
	user varchar(30) not null,
	full_name varchar(50) not null,
	email varchar(50) not null,
	phone varchar(20) not null,
	address varchar(100) not null,
	password varchar(20) not null,
	role_id int,
	primary key(user_id), 
	foreign key(role_id) references roles(role_id)
);

# *** Insercion de los datos de los roles de usuarios ***
insert into roles values (1, 'admin'), (2, 'client');

# *** Insercion de los datos del Usuario Administrador ***
insert into users (	`user`, full_name, email, phone, address, password, role_id)
    values ('admin', 'Administrator', 'admin@gmail.com', '0000', '0000', 'admin123', 1);

# CONSULTAS REFERENTES AL MODELO DE PRODUCTOS
# *** Creacion de la tabla de producto ***
create table products (
	product_id int not null auto_increment,
	product_name varchar(50),
	description varchar(120),
	image varchar(120),
	price decimal,
	primary key(product_id)
);

# *** Creacion de la tabla de states  de los productos***
create table states (
	state_id int not null,
	state varchar(20),
	primary key(state_id)
);

# *** Insercion de los datos de los estados de los posibles productos ***
insert into states 
    values (1, 'nuevo'), (2, 'confirmado'), (3, 'preparando'), (4, 'enviando'), (5, 'entregando'), (6, 'cancelado');

# *** Creacion de la tabla de Forma de pago ***
create table payment_type (
	payment_type_id int not null,
	payment_type varchar(20),
	primary key(payment_type_id)
);

# *** Insercion de los datos para los posibles medio de pago ***
insert into payment_type values (1, 'efectivo'), (2, 'tarjeta');


# *** Creacion de la tabla de orders ***
create table orders (
	order_id int not null auto_increment,
	user_id int,
	date_order timestamp default current_timestamp() not null,
	payment_type_id int,
	price decimal,
	state_id int,
	primary key(order_id)
);

# *** Creacion de la tabla de orders_products ***
create table orders_products (
	order_product_id int not null auto_increment,
	order_id int,	
	product_id int,
	quantity int,
	price decimal,	
	primary key(order_product_id),
	foreign key(order_id) references orders(order_id),
	foreign key(product_id) references products(product_id)
);
