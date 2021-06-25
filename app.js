const express = require('express');
const app = express();
const port = 3000;
const seqielize = require('./conexion')

app.use(express.json());

// ruta ,  request,  response
app.get('/acamica', (req, res) => {

    res.status(200).json({ msg: "Hola mundo"});
});



app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
