const sequelize = require('../conexion.js');
const jwt = require('jsonwebtoken');

const createProducts = async(req, res) => {
    const { product_name, description, image, price} = req.body;

    try {
        const resultCreateProduct = await sequelize.query(`INSERT INTO products(product_name, description, image, price) VALUES('${product_name}', '${description}', '${image}', ${price});`, 
        { type: sequelize.QueryTypes.INSER });
        console.log(resultCreateProduct);

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
        const resulGetProducts = await sequelize.query('SELECT * FROM products;',
        { type:sequelize.QueryTypes.SELECT });
        console.log(resulGetProducts);
        
        res.status(200).json({
            'msg': true,
            'data': resulGetProducts[0]
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
    
};

const deleteProducts = async(req, res) => {
    
};

module.exports = {createProducts, getProducts, updateProducts, deleteProducts}