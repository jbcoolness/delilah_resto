const sequelize = require('../conexion.js');

const registerUser = async (req, res) => {
    const { user, full_name, email, phone, address, password} = req.body;
    let dataInsertUser = [`${user}`, `${full_name}`, `${email}`, `${phone}`, `${address}`, `${password}`];
    console.log(dataInsertUser)

    try {
        const result = await sequelize.query("INSERT INTO users(`user`, full_name, email, phone, address, password) VALUES(?, ?, ?, ?, ?, ?);",
        { replacement: dataInsertUser, type: sequelize.QueryTypes.INSERT })
        console.log(result);
        res.status(201).json({
            'msg': true,
            'usuario': result
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            'msg': false,
            'data': error
        })
    }
};

const loginUser = async (req, res) => {

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