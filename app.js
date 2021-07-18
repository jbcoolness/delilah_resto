const express = require('express');
const app = express();
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./spec.yml');
const port = 3000;


//Routes
const usersRoutes = require('./routers/users.routes');
const productsRoutes = require('./routers/products.routes');
const ordersRoutes = require('./routers/orders.routes');

// Global Middleware
app.use(express.json());
app.use(cors());


// Routes use
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/orders', ordersRoutes);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Server
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
