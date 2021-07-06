const express = require('express');
const app = express();
// const jwt = require('jsonwebtoken');
const port = 3000;
const seqielize = require('./conexion');

//Routes
const usersRoutes = require('./routers/users.routes');
const productsRoutes = require('./routers/products.routes');
const ordersRoutes = require('./routers/orders.routes');

// Global Middleware
app.use(express.json());


// Routes use
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/orders', ordersRoutes);


// Server
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
