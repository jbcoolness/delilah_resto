var jwt = require('jsonwebtoken');

const validationUser = ((req, res, next) => {
    const token = req.headers['authorization'];

    if (token) {
        const jwtClient = token.split(" ")[1];
        jwt.verify(jwtClient, process.env.KEY_TOKEN, (err, decoded) => {
            console.log(err)
            if (err) {
                return res.status(401).json({ "msg": 'Token inválida o expiró' });            
            } else {
                req.decoded = decoded
                next()
            }
        });
    
    } else {
        res.status(401).json({
            "msg": 'Token no proveída, debes registrarte o iniciar sesion'
        });
    }
});

const validationAdmin = ((req, res, next) => {
    const token = req.headers['authorization'];
    
    if (token) {
        const jwtClient = token.split(" ")[1];
        jwt.verify(jwtClient, process.env.KEY_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(401).json({ "msg": 'Token inválida o expiró' });
            
            } else if (decoded.role_id != 1) {
                return res.status(401).json({'msg': 'Acceso denegado'})
            
            } else {
                req.decoded = decoded
                next()
            }
        });
    
    } else {
        res.status(401).json({
            "msg": 'Token no proveída, debes registrarte o iniciar sesion'
        });
    }
});

const validationClient = ((req, res, next) => {
    const token = req.headers['authorization'];
    
    if (token) {
        const jwtClient = token.split(" ")[1];
        jwt.verify(jwtClient, process.env.KEY_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(401).json({ "msg": 'Token inválida o expiró' });
            
            } else if (decoded.role_id != 2) {
                return res.status(401).json({'msg': 'Acceso denegado'})
            
            } else {
                req.decoded = decoded
                next()
            }
        });
    
    } else {
        res.status(401).json({
            "msg": 'Token no proveída, debes registrarte o iniciar sesion'
        });
    }
});

exports.validationUser = validationUser;
exports.validationClient = validationClient;
exports.validationAdmin = validationAdmin;