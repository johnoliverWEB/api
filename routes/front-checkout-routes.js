module.exports = (app, upload) => {

    const router = require("express").Router();
   
    const controller = require("../controllers/front/checkout-controller.js");

    router.post("/", controller.pay);
   
    app.use('/api/front/checkout', router);
    // Cada vez que alguien llame a esta url por este metodo get llamarás a findAll
    // Para cualquier panel de administraion basta con sustituir el enlace de arriba y este de abajo
};