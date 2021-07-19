# creacion de la base de datos
create database dalilah_resto;

# seleccionar la base de datos a trabajar
use dalilah_resto;

# CONSULTAS REFERENTES AL MODELO DE USUARIOS
# *** Creacionde las tablas ***
CREATE TABLE `roles` (
	`role_id` int(11) NOT NULL,
	`role` varchar(30) NOT NULL,
	PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `users` (
	`user_id` int(11) NOT NULL AUTO_INCREMENT,
	`user` varchar(30) NOT NULL,
	`full_name` varchar(50) NOT NULL,
	`email` varchar(50) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`address` varchar(100) NOT NULL,
	`password` varchar(20) NOT NULL,
	`role_id` int(11) DEFAULT NULL,
	PRIMARY KEY (`user_id`),
	KEY `role_id` (`role_id`),
	CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

# *** Insercion de los datos de los roles de usuarios ***
insert into roles values (1, 'admin'), (2, 'client');

# *** Insercion de los datos del Usuario Administrador ***
# NOTA IMPORTANTE: Con los datos de este usuario es que debemos ingresar y crear los productos
insert into users (	`user`, full_name, email, phone, address, password, role_id)
    values ('admin', 'Administrator', 'admin@gmail.com', '0000', '0000', 'admin123', 1);

# CONSULTAS REFERENTES AL MODELO DE PRODUCTOS
# *** Creacion de la tabla de producto ***
CREATE TABLE `products` (
	`product_id` int(11) NOT NULL AUTO_INCREMENT,
	`product_name` varchar(50) DEFAULT NULL,
	`description` varchar(120) DEFAULT NULL,
	`image` varchar(120) DEFAULT NULL,
	`price` decimal(10,0) DEFAULT NULL,
	PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

# *** Creacion de la tabla de states  de los productos***
CREATE TABLE `states` (
	`state_id` int(11) NOT NULL,
	`state` varchar(20) DEFAULT NULL,
	PRIMARY KEY (`state_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


# *** Insercion de los datos de los estados de los posibles productos ***
insert into states 
    values (1, 'nuevo'), (2, 'confirmado'), (3, 'preparando'), (4, 'enviando'), (5, 'entregando'), (6, 'cancelado');

# *** Creacion de la tabla de Forma de pago ***
CREATE TABLE `payment_type` (
	`payment_type_id` int(11) NOT NULL,
	`payment_type` varchar(20) DEFAULT NULL,
	PRIMARY KEY (`payment_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# *** Insercion de los datos para los posibles medio de pago ***
insert into payment_type values (1, 'efectivo'), (2, 'tarjeta');


# *** Creacion de la tabla de orders ***
CREATE TABLE `orders` (
	`order_id` int(11) NOT NULL AUTO_INCREMENT,
	`user_id` int(11) DEFAULT NULL,
	`date_order` timestamp NOT NULL DEFAULT current_timestamp(),
	`payment_type_id` int(11) NOT NULL,
	`price` decimal(10,0) DEFAULT NULL,
	`state_id` int(11) DEFAULT NULL,
	PRIMARY KEY (`order_id`),
	KEY `user_id` (`user_id`),
	KEY `state_id` (`state_id`),
	KEY `payment_type_id` (`payment_type_id`),
	CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
	CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`state_id`) REFERENCES `states` (`state_id`),
	CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`payment_type_id`) REFERENCES `payment_type` (`payment_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

# *** Creacion de la tabla de orders_products ***
CREATE TABLE `orders_products` (
	`order_product_id` int(11) NOT NULL AUTO_INCREMENT,
	`order_id` int(11) DEFAULT NULL,
	`product_id` int(11) DEFAULT NULL,
	`quantity` int(11) DEFAULT NULL,
	`price` decimal(10,0) DEFAULT NULL,
	PRIMARY KEY (`order_product_id`),
	KEY `order_id` (`order_id`),
	KEY `product_id` (`product_id`),
	CONSTRAINT `orders_products_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
	CONSTRAINT `orders_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
