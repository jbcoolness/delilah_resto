const sequelize = require('../conexion.js');
var jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {    
    const { user, full_name, email, phone, address, password} = req.body;
    if (!user || !full_name || !email || !phone || !address || !password){
        return res.status(404).json({
            'msg': false,
            'data': "Es necesario anexar todos los campos para crear el usuario"
        })

    }
    try {
        const resultInsertUser = await sequelize.query(`INSERT INTO users(user, full_name, email, phone, address, password, role_id) 
                                    VALUES ('${user}', '${full_name}', '${email}', '${phone}', '${address}', '${password}', 2);`,
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

const registerUserAdmin = async (req, res) => {    
    const { user, full_name, email, phone, address, password} = req.body;
    if (!user || !full_name || !email || !phone || !address || !password){
        return res.status(404).json({
            'msg': false,
            'data': "Es necesario anexar todos los campos para crear el usuario"
        })

    }
    try {
        const resultInsertUser = await sequelize.query(`INSERT INTO users(user, full_name, email, phone, address, password, role_id) 
                                    VALUES ('${user}', '${full_name}', '${email}', '${phone}', '${address}', '${password}', 1);`,
        { type: sequelize.QueryTypes.INSERT });
        console.log(resultInsertUser);

        res.status(201).json({
            'msg': true,
            'data': `Registrado usuario: ${user} con rol de Administrador con exito`
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
    if (!user_email || !password){
        return res.status(404).json({
            'msg': false,
            'data': "Es necesario anexar todos los campos para acceder"
        })
    }
    
    try {
        console.log(user_email)        
        const result = await sequelize.query(`select * from users u 
                            where (email = '${user_email}' or user = '${user_email}') 
                            and password = '${password}' limit 1;`,
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
    console.log(req.decoded.role_id)
    if(req.decoded.role_id == 1) {
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
                'data': "ha ocurrido un error"
            })
        }
    } else {
        try {
            const result = await sequelize.query(`SELECT * FROM users 
                                WHERE user_id = ${req.decoded.user_id}`, 
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
                "data": "Ha ocurrido un error"
            })
        }
    }
    
}


const deleteUsers = async(req, res) => {
    if (req.params.id == req.decoded.user_id) {
        res.status(400).json({
            'msg': false,
            'data': `No es posible eliminarse usted mismo`
        });
    }else {
        try {
            const disableFkChecks = await sequelize.query("SET FOREIGN_KEY_CHECKS=0");
            
            const resultDelete = await sequelize.query( `DELETE FROM users 
                                        WHERE user_id = ${req.params.id}`);
            console.log(resultDelete[0].affectedRows)
            if (resultDelete[0].affectedRows < 1) {
                res.status(404).json({
                    'msg': false,
                    'data': "Usuario no encontrado"
                });

            }else {
                res.status(200).json({
                    "msg": true,
                    "data": "Usuario eliminado con exito"
                })
            }        
            const enableFkChecks = await sequelize.query("SET FOREIGN_KEY_CHECKS=1");

        } catch (error) {
            console.log(error)
            res.status(400).json({
                'msg': false,
                'data': `Se ha producido un error en el procedimiento`
            });
        }
    }
};

module.exports = {registerUser, loginUser, registerUserAdmin, getUser, deleteUsers}