var jwt = require('jsonwebtoken');



const validationUser = ((req, res, next) => {
    const token = req.headers['authorization'];
    // console.log(token)
    
    if (token) {
        const jwtClient = token.split(" ")[1];
        jwt.verify(jwtClient, process.env.KEY_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(401).json({ "msg": 'Token inválida o expiró' });
            } else {                
                req.decoded = decoded;
                next();
            }
        });
    
    } else {
        res.status(401).json({
            "msg": 'Token no proveída, debes registrarte o iniciar sesion'
        });
    }
});

const validationAdmin = ((req, res, next) => {
    if (req.decoded.role_id != 1) {
        return res.status(401).json({'msg': 'Acceso denegado'})
    }
    req.decoded = req.decoded;
    next();
})

exports.validationUser = validationUser;
exports.validationAdmin = validationAdmin;