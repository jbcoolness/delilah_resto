const sequelize = require("../conexion.js");


const createOrders = async (req, res) => {
    const {user_id, payment_type, orders_products} =  req.body;
    // console.log(orders_products[0].product_id)
    console.log(orders_products.length);   

    // Optenemos los ids de los productos de la orden
    const getIdOrdersProducts = (orders_products) => {
        let idProducts = [];
        orders_products.forEach(p => {
            idProducts.push(p.product_id)
        });
        return idProducts.toString();
    }
    const ids = getIdOrdersProducts(orders_products)
    console.log(ids);

    // Sacamos el Total del valor de la orden o pedido
    // const totalOrder = async (orders_products)=> {
    //     let total = 0
    //     for (let p = 0; p < orders_products.length; p++) {
    //         try {
    //             const priceProduct = await sequelize.query(`SELECT price FROM products WHERE product_id = ${orders_products[p].product_id}`,
    //             { type: sequelize.QueryTypes.SELECT });

    //             // console.log(priceProduct[0].price);
    //             total = total + (parseFloat(priceProduct[0].price) * parseInt(orders_products[p].quantity));                
                
    //         } catch (error) {
    //             console.log(error)                
    //         }
    //     }
    //     return total;    
    // }
    // const price = await totalOrder(orders_products)
    // console.log(price);

    // Creamos o hacemos el insert de la orden sin el valor del precio total
    try {
        const resultCreateOrder = await sequelize.query(`INSERT INTO orders (user_id, payment_type_id, state_id) 
            VALUES (${user_id}, ${payment_type}, 1)`,
            { type: sequelize.QueryTypes.INSERT });
        console.log(resultCreateOrder[0]);

        // Guardamos los productos solicitados en la tabla orders_products con la order_id acabado de generar
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
                console.log(`se generó un error en el insert de orders_products ${error}`)                
            }
        }

        // sacamos el valor total de la orden generada
        const priceOrder = await sequelize.query(`SELECT SUM(p.price * o.quantity) AS price_total FROM orders_products o 
            LEFT JOIN products p USING (product_id) WHERE p.product_id in (${ids}) AND order_id = ${resultCreateOrder[0]}`,
            { type: sequelize.QueryTypes.SELECT });
        console.log(parseFloat(priceOrder[0].price_total));

        // Actualizamos o insertamos el valor total de la orden generada
        const insertPriceTotalOrder = await sequelize.query(`UPDATE orders SET price = ${parseFloat(priceOrder[0].price_total)}
            WHERE order_id = ${resultCreateOrder[0]}`,
            { type: sequelize.QueryTypes.INSERT });
        console.log(insertPriceTotalOrder);

        res.status(201).json({
            "msg":true,
            "data": "¡Recibimos tu pedido!, puedes seguir tu pedido para saber el estado en que se encuentra"
        })

    } catch (error) {
        console.log(`se genreró un error en el insert de orders ${error}`)
    }   
    
    // res.status(201).json({
    //     "msg":true,
    //     "data": "Respuesta desde el Create order"
    // })
    
};

const getOrders = async (req, res) => {

}


module.exports = { createOrders, getOrders };