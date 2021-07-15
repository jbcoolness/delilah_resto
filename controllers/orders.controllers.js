// const { QueryTypes } = require("sequelize/types");
const sequelize = require("../conexion.js");


const createOrders = async (req, res) => {
    const {user_id, payment_type, orders_products} =  req.body;
    console.log(orders_products.length);   

    // Optenemos los ids de los productos de la orden
    // const getIdOrdersProducts = (orders_products) => {
    //     
    //     orders_products.forEach(p => {
    //         idProducts.push(p.product_id)
    //     });
    //     return idProducts.toString();
    // }
    // const ids = getIdOrdersProducts(orders_products)
    // console.log(ids);
    let idsProducts = [];
    let valuesOrderProducts = '';
    let priceTotal = 0;
    try {
        const resultCreateOrder = await sequelize.query(`INSERT INTO orders (user_id, payment_type_id, state_id) 
            VALUES (${user_id}, ${payment_type}, 1)`,
            { type: sequelize.QueryTypes.INSERT });
        console.log(resultCreateOrder[0]);

        // Guardamos los productos solicitados en la tabla orders_products con la order_id acabado de generar
        for (let p = 0; p < orders_products.length; p++) {
            idsProducts.push(orders_products[p].product_id)

            try {
                const priceProduct = await sequelize.query(`SELECT price FROM products 
                    WHERE product_id = ${orders_products[p].product_id}`,
                    { type: sequelize.QueryTypes.SELECT });
                console.log(priceProduct[0])

                valuesOrderProducts = valuesOrderProducts + `(${resultCreateOrder[0]}, ${orders_products[p].product_id}, ${orders_products[p].quantity}, ${parseFloat(priceProduct[0].price)}),`
                // const resultInsertOrderProduct =  await sequelize.query(`INSERT INTO orders_products(order_id, product_id, quantity, price)
                // VALUES (${resultCreateOrder[0]}, ${orders_products[p].product_id}, ${orders_products[p].quantity}, 
                //     ${parseFloat(priceProduct[0].price)})`,
                //     { type: sequelize.QueryTypes.INSERT });
                // console.log(resultInsertOrderProduct)

                priceTotal = priceTotal + (parseFloat(priceProduct[0].price) * parseInt(orders_products[p].quantity))
                console.log(priceTotal)

            } catch (error) {
                console.log(error)                
                res.status(400).json({
                    "msg":false,
                    "data": "Hay inconvenientes para tomar su orden, favor rectifique el pedido"
                })
            }
        }
        
        // Insertamos los productos en orders_prodcuts
        let valuesOP = valuesOrderProducts.slice(0, -1)
        console.log(valuesOP)
        const resultInsertOrderProduct =  await sequelize.query(`INSERT INTO orders_products(order_id, product_id, quantity, price)
                VALUES ${valuesOP};`,
                    { type: sequelize.QueryTypes.INSERT });
                console.log(resultInsertOrderProduct)

        // sacamos el valor total de la orden generada
        // const priceOrder = await sequelize.query(`SELECT SUM(p.price * o.quantity) AS price_total FROM orders_products o 
        //     LEFT JOIN products p USING (product_id) WHERE p.product_id in (${ids}) AND order_id = ${resultCreateOrder[0]}`,
        //     { type: sequelize.QueryTypes.SELECT });
        // console.log(parseFloat(priceOrder[0].price_total));

        // Actualizamos o insertamos el valor total de la orden generada
        const insertPriceTotalOrder = await sequelize.query(`UPDATE orders SET price = ${priceTotal}
            WHERE order_id = ${resultCreateOrder[0]}`,
            { type: sequelize.QueryTypes.INSERT });
        console.log(insertPriceTotalOrder);

        res.status(201).json({
            "msg":true,
            "data": "¡Recibimos tu pedido!, puedes seguir tu pedido para saber el estado en que se encuentra"
        })

    } catch (error) {
        console.log(`se genreró un error en el insert de orders ${error}`)
        res.status(400).json({
            "msg":false,
            "data": "Hay inconvenientes para tomar su orden, favor rectifique el pedido"
        })
        
    }   
    
    // res.status(201).json({
    //     "msg":true,
    //     "data": "Respuesta desde el Create order"
    // })
    
};

const getOrders = async (req, res) => {
    console.log(req.decoded)
    if(req.decoded.role_id == 1) {
        try {
            const result = await sequelize.query(`SELECT o.order_id, s.state, o.date_order, p.product_name, 
                                op.quantity, pt.payment_type, o.price price_order, u.user_id, u.full_name, u.address 
                                FROM orders o 
                                LEFT JOIN orders_products op USING (order_id)
                                LEFT JOIN states s USING (state_id)
                                LEFT JOIN payment_type pt USING (payment_type_id)
                                LEFT JOIN users u USING (user_id)
                                LEFT JOIN products p USING (product_id);`,
                                {type:sequelize.QueryTypes.SELECT});
            // console.log(result)
    
            res.status(200).json({
                "msg": true,
                "data": result
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                'msg': false,
                "data": error
            })
        }

    }else {
        try {
            const result = await sequelize.query(`SELECT o.order_id, s.state, o.date_order, p.product_name, 
                                op.quantity, pt.payment_type, o.price price_order, u.full_name, u.address 
                                FROM orders o 
                                LEFT JOIN orders_products op USING (order_id)
                                LEFT JOIN states s USING (state_id)
                                LEFT JOIN payment_type pt USING (payment_type_id)
                                LEFT JOIN users u USING (user_id)
                                LEFT JOIN products p USING (product_id)
                                WHERE u.user_id = ${req.decoded.user_id};`,
                                {type:sequelize.QueryTypes.SELECT});
            // console.log(result)
    
            res.status(200).json({
                "msg": true,
                "data": result
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                'msg': false,
                "data": error
            })
        }
    }    

}
const getIdOrdersAdmin = async (req, res) => {
    try {
        const result = await sequelize.query(`SELECT o.order_id, s.state, o.date_order, p.product_name, 
                            op.quantity, pt.payment_type, o.price price_order, u.user_id, u.full_name, u.address 
                            FROM orders o 
                            LEFT JOIN orders_products op USING (order_id)
                            LEFT JOIN states s USING (state_id)
                            LEFT JOIN payment_type pt USING (payment_type_id)
                            LEFT JOIN users u USING (user_id)
                            LEFT JOIN products p USING (product_id)
                            WHERE u.user_id = ${req.params.user}
                            AND o.order_id = ${req.params.order};`,
                            {type:sequelize.QueryTypes.SELECT});
            
        if(result.length < 1) {
            return res.status(404).json({
                    "msg": false,
                    "data": "Orden no encontrada o no relacionado con el usuario"
            })
        }else {
            return res.status(200).json({
                    "msg": true,
                    "data": result
            })
        }
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            'msg': false,
            "data": error
        })
    }
}

const getIdOrdersClient = async (req, res) => {
    console.log(req.decoded)
    
    try {
        const result = await sequelize.query(`SELECT o.order_id, s.state, o.date_order, p.product_name, 
                            op.quantity, pt.payment_type, o.price price_order, u.full_name, u.address 
                            FROM orders o 
                            LEFT JOIN orders_products op USING (order_id)
                            LEFT JOIN states s USING (state_id)
                            LEFT JOIN payment_type pt USING (payment_type_id)
                            LEFT JOIN users u USING (user_id)
                            LEFT JOIN products p USING (product_id)
                            WHERE u.user_id = ${req.decoded.user_id}
                            AND o.order_id = ${req.params.id};`,
                            {type:sequelize.QueryTypes.SELECT});
            
        if(result.length < 1) {
            return res.status(404).json({
                    "msg": false,
                    "data": "Orden no encontrada o no relacionado con tu usuario"
            })
        }else {
            return res.status(200).json({
                    "msg": true,
                    "data": result
            })
        }
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            'msg': false,
            "data": error
        })
    }
}

const updateOrders = async (req, res) => {
    const {newStateId} =  req.body;

    try {
        const resultUpdate = await sequelize.query(`UPDATE orders 
                            SET state_id = ${newStateId} WHERE order_id = ${req.params.id}`,
                            { type: sequelize.QueryTypes.INSERT });
        console.log(resultUpdate[1]);

        if (resultUpdate[1] < 1) {
            res.status(404).json({
                "msg": false,
                "data": "No hubo cambios o coincidencia en la orden"
            })
        } else {
            res.status(201).json({
                "msg": true,
                "data": "Estado de la orden actualizado correctamente"
            })
        }
    } catch (error) {
        
    }

}




module.exports = { createOrders, getOrders, getIdOrdersClient, getIdOrdersAdmin, updateOrders };