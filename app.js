const express = require('express');
const app = express();
const port = 3000;
const seqielize = require('./conexion');

//Routes
const usersRoutes = require('./routers/users.routes')

//Middleware
app.use(express.json());

//Routes use
app.use('/api/v1/users', usersRoutes);


//Server
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});

exports.app = app;
