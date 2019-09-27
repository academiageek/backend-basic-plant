const express = require('express');
const ProductsService = require('../services/products');

function productsApi (app){

    const router = express.Router();

    app.use('/api/products', router);

    const productsService = new ProductsService();

    router.get('/', async function (req, res, next){
        try{

            const { tags } = req.query;

            const products = await productsService.getProducts({tags});

            res.send({
                data: products,
                message: 'products listed'
            })
        }catch(err){
            next(err);
        }
        
    })

}

module.exports = productsApi;