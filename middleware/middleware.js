var jwt = require('jsonwebtoken');



const validationAdmin = ((req, res, next) => {
    const token = req.headers['authorization'];
    console.log(token)
    
    if (token) {
        const jwtClient = token.split(" ")[1];
        jwt.verify(jwtClient, process.env.KEY_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(401).json({ "msg": 'Token inválida' });
            } else {
                console.log(decoded);
                if (decoded.role_id != 1) {
                    return res.status(401).json({'msg': 'Acceso denegado'})
                }
                req.decoded = decoded;
                next();
            }
        });
    
    } else {
        res.status(401).json({
            "msg": 'Token no proveída, debes iniciar sesion'
        });
    }
});

const validationToken = ((req, res, next) => {
    const token = req.headers['authorization'];
    console.log(token)

    if (token) {
        const jwtClient = token.split(" ")[1];
        jwt.verify(jwtClient, process.env.KEY_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(401).json({ "msg": 'Token inválido o expirado' });
            }else {
                req.decoded = decoded;
                next();
            }
        })
    }else {
        res.status(401).json({
            "msg": 'Token no proveída, debes iniciar sesion'
        });
    }
})

exports.validationAdmin = validationAdmin;
exports.validationToken = validationToken;