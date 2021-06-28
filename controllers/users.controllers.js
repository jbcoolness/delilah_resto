const sequelize = require('../conexion.js');

const registerUser = async (req, res) => {
    const { user, full_name, email, phone, address, password} = req.body;
    // let dataInsertUser = [`${user}`, `${full_name}`, `${email}`, `${phone}`, `${address}`, `${password}`];
    // console.log(dataInsertUser)

    try {
        const resultInsertUser = await sequelize.query(`INSERT INTO users(user, full_name, email, phone, address, password) VALUES ('${user}', '${full_name}', '${email}', '${phone}', '${address}', '${password}');`,
        { type: sequelize.QueryTypes.INSERT })
        const resultInserRol = await sequelize.query("insert into users_roles  values (last_insert_id(), 2);",
        { type: sequelize.QueryTypes.INSERT })

        console.log(resultInsertUser);
        console.log(resultInserRol);
        res.status(201).json({
            'msg': true,
            'usuario': resultInsertUser
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            'msg': false,
            'data': error
        })
    }
};

const validarEmail = (email) => {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !expr.test(email) ) { return false } else { return true };
}

const loginUser = async (req, res) => {
    const { user_email, password} = req.body;
    try {
        console.log(user_email)        
        const result = await sequelize.query(`select * from users u where (email = '${user_email}' or user = '${user_email}') and password = '${password}';`,
        { type: sequelize.QueryTypes.SELECT });
        console.log(result)
        res.status(200).json( {
            'msg': true,
            'data': result
        })
        } catch (error) {
            console.log(error)
            res.status(400).json( {
                'msg': false,
                'data': 'Usuario no encontrado, favor validar informacion'
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


exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getUser = getUser;