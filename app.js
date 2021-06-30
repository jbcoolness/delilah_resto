const express = require('express');
const app = express();
// const jwt = require('jsonwebtoken');
const port = 3000;
const seqielize = require('./conexion');

//Routes
const usersRoutes = require('./routers/users.routes')

// Middleware
app.use(express.json());
// valida si se está logiando con correo electrónico
// const isEmail = (req, res, next) => {
//     expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//     if ( !expr.test(req.body.email) ) { req.isEmail = false } else { req.isEmail = true };
//     next()
// }

// Routes use
app.use('/api/v1/users', usersRoutes);


// Server
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
