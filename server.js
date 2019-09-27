const express = require('express');

const app = express();

const productsApi = require('./routes/products');

//body-parser
app.use(express.json());


//routes
productsApi(app);

app.get('/',function (req, res, next){
    res.send({Hola : "tlp2"})
});

app.listen(5700, function (){
    console.log('Escuchando por http://localhost:5700')
});

