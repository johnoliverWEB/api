module.exports = app => {

    const router = require("express").Router();
   
    const controller = require("../controllers/front/checkout-data-controller.js");

    router.post("/", controller.sendEmail);
   
    app.use('/api/front/checkoutdata', router);
    // Cada vez que alguien llame a esta url por este metodo get llamarás a findAll
    // Para cualquier panel de administraion basta con sustituir el enlace de arriba y este de abajo
};