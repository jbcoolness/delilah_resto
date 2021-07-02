const sequelize = require('../conexion.js');
const jwt = require('jsonwebtoken');

const createProducts = async(req, res) => {

};

const getProducts = async(req, res) => {
    res.status(200).json({'msg': 'Lista de products'})
};

const updateProducts = async(req, res) => {
    
};

const deleteProducts = async(req, res) => {
    
};

module.exports = {createProducts, getProducts, updateProducts, deleteProducts}