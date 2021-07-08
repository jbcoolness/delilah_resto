const sequelize = require('../conexion.js');
var jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    const { user, full_name, email, phone, address, password} = req.body;
    // let dataInsertUser = [`${user}`, `${full_name}`, `${email}`, `${phone}`, `${address}`, `${password}`];
    // console.log(dataInsertUser)

    try {
        const resultInsertUser = await sequelize.query(`INSERT INTO users(user, full_name, email, phone, address, password, role_id) VALUES ('${user}', '${full_name}', '${email}', '${phone}', '${address}', '${password}', 2);`,
        { type: sequelize.QueryTypes.INSERT });
        console.log(resultInsertUser);

        res.status(201).json({
            'msg': true,
            'data': `Registrado usuario: ${user} con exito`
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            'msg': false,
            'data': `Se ha producido un error en el procedimiento`
        })
    }
};

const loginUser = async (req, res) => {
    
    const { user_email, password} = req.body;    
    try {
        console.log(user_email)        
        const result = await sequelize.query(`select * from users u where (email = '${user_email}' or user = '${user_email}') and password = '${password}' limit 1;`,
        { type: sequelize.QueryTypes.SELECT });
        console.log(result)
        if (result == '') {
            res.status(400).json( {
                'msg': false,
                'data': 'Usuario no encontrado, favor validar los datos'
            })
        } else {
            const jwtToken = jwt.sign({'user_id': result[0].user_id, 'role_id':result[0].role_id}, 
                                        process.env.KEY_TOKEN, { expiresIn: process.env.EXPIRES });

            res.status(200).json( {
                'msg': true,
                'data': `Bienvenido ${result[0].full_name}`,
                'token': jwtToken
            })
        }
        
        } catch (error) {
            console.log(error)
            res.status(400).json( {
                'msg': false,
                'data': error
            })
        }
        
};

const getUser = async (req, res) => {
    try {
        const result = await sequelize.query('SELECT * FROM users', 
        {type:sequelize.QueryTypes.SELECT})
        console.log(result)
        res.status(200).json({
            'msg': true,
            'data':result
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            'msg': false,
            data: error
        })
    }
}

const updateUser = async (req, res) => {

}


module.exports = {registerUser, loginUser, getUser, updateUser}