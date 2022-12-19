module.exports = app => {

    const router = require("express").Router();
   
    const controller = require("../controllers/admin/sale-errors-controller.js");


    router.post("/", controller.create);
    router.get("/", controller.findAll);  
    router.get("/:id", controller.findOne);  
    router.put("/:id", controller.update);  
    router.delete("/:id", controller.delete);
  
    app.use('/api/admin/sale-error', router);
    // Cada vez que alguien llame a esta url por este metodo get llamarás a findAll
    // Para cuaaluquiier panel de administraion basta con sustituir el enlace de arriba y este de abajo
};