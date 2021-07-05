const sequelize = require('../conexion.js');
const jwt = require('jsonwebtoken');

const createProducts = async(req, res) => {
    const { product_name, description, image, price} = req.body;

    try {
        const resultCreate = await sequelize.query(`INSERT INTO products(product_name, description, image, price) VALUES('${product_name}', '${description}', '${image}', ${price});`, 
        { type: sequelize.QueryTypes.INSER });
        console.log(resultCreate);

        res.status(201).json({
            'msg': true,
            'data': `Creado producto: ${product_name} con exito`
        });
    } catch (error) {
        console.log(error)
        res.status(201).json({
            'msg': false,
            'data': `Se ha producido un error en el procedimiento`
        });
    }

};

const getProducts = async(req, res) => {
    
    try {
        const resultGet = await sequelize.query('SELECT * FROM products;',
        { type:sequelize.QueryTypes.SELECT });
        console.log(resultGet);
        
        res.status(200).json({
            'msg': true,
            'data': resultGet
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            'msg': false,
            'data': `Se ha producido un error en el procedimiento`
        });
    }
};

const updateProducts = async(req, res) => {
    const {product_name, description, image, price} = req.body;

    try {
        const resultUpdate = await sequelize.query (`UPDATE products 
        SET product_name = '${product_name}', description = '${description}', 
        image = '${image}', price = ${price} WHERE product_id = ${req.params.id}`,
        { type: sequelize.QueryTypes.INSERT })
        console.log(resultUpdate[1]);

        if (resultUpdate[1] < 1) {
            res.status(404).json({
                "msg": false,
                "data": "No hubo cambios o coincidencia en el producto"
            })
        } else {
            res.status(201).json({
                "msg": true,
                "data": "Producto actualizado correctamente"
            })
        }
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            'msg': false,
            'data': `Se ha producido un error en el procedimiento`
        });
    }
};

const deleteProducts = async(req, res) => {
    try {
        const resultDelete = await sequelize.query( `DELETE FROM products WHERE product_id = ${req.params.id}`);
        console.log(resultDelete)
        res.status(200).json({
            "msg": true,
            "data": "Resgistro eliminado con exito"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            'msg': false,
            'data': `Se ha producido un error en el procedimiento`
        });
    }
};

module.exports = {createProducts, getProducts, updateProducts, deleteProducts}