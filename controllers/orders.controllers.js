const sequelize = require("../conexion.js");


const createOrders = async (req, res) => {
    const {user_id, payment_type, orders_products} =  req.body;
    // console.log(orders_products[0].product_id)
    console.log(orders_products.length);

    // Generamos la fecha actual
    const dateNow = ()=> {
        let date_ob = new Date();

        // adjust 0 before single digit date
        let date = `0${date_ob.getDate()}`.slice(-2);

        // current month
        let month = `0${(date_ob.getMonth() + 1)}`.slice(-2);

        // current year
        let year = date_ob.getFullYear();

        // current hours
        let hours = `0${date_ob.getHours()}`.slice(-2);

        // current minutes
        let minutes = `0${date_ob.getMinutes()}`.slice(-2);

        // current seconds
        let seconds = `0${date_ob.getSeconds()}`.slice(-2);

        // prints date & time in YYYY-MM-DD HH:MM:SS format
        return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    }
    const dateOrder = dateNow();
    console.log(dateOrder);
    
    // Sacamos el Total del valor de la orden o pedido
    const totalOrder = async (orders_products)=> {
        let total = 0
        for (let p = 0; p < orders_products.length; p++) {
            try {
                const priceProduct = await sequelize.query(`SELECT price FROM products WHERE product_id = ${orders_products[p].product_id}`,
                { type: sequelize.QueryTypes.SELECT });

                // console.log(priceProduct[0].price);
                total = total + (parseFloat(priceProduct[0].price) * parseInt(orders_products[p].quantity));                
                
            } catch (error) {
                console.log(error)                
            }
        }
        return total;    
    }
    const price = await totalOrder(orders_products)
    console.log(price);

    // Creamos o hacemos el insert de la orden
    try {
        const resultCreateOrder = await sequelize.query(`INSERT INTO orders (user_id, date_order, payment_type_id, price, state_id) 
        VALUES (${user_id}, '${dateOrder}', ${payment_type}, ${price}, 1)`,
            { type: sequelize.QueryTypes.INSERT });

        console.log(resultCreateOrder[0])

        // Guardamos los productos solicitados en la tabla orders_products con la orden_id acabada de generar
        for (let p = 0; p < orders_products.length; p++) {
            try {
                const priceProduct = await sequelize.query(`SELECT price FROM products 
                WHERE product_id = ${orders_products[p].product_id}`,
                { type: sequelize.QueryTypes.SELECT });

                const resultInsertOrderProduct =  await sequelize.query(`INSERT INTO orders_products(order_id, product_id, quantity, price)
                VALUES (${resultCreateOrder[0]}, ${orders_products[p].product_id}, ${orders_products[p].quantity}, 
                    ${parseFloat(priceProduct[0].price)})`,
                    { type: sequelize.QueryTypes.SELECT });

                    console.log(resultInsertOrderProduct)
            } catch (error) {
                console.log(`se genreró un error en el insert de orders_products ${error}`)                
            }
        }

        res.status(201).json({
            "msg":true,
            "data": "¡Recibimos tu pedido!, puedes seguir tu pedido para saber el estado en que se encuentra"
        })
    } catch (error) {
        console.log(`se genreró un error en el insert de orders ${error}`)
    }   
    
};


module.exports = { createOrders };