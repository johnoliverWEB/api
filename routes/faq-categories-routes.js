module.exports = (app, upload) => {

    const router = require("express").Router();
    // Usamos una función de la librería expres para crear rutas.
    const controller = require("../controllers/admin/faq-categories-controller.js");
    // Llamas al controlador que quuieras usar
    const authJwt  = require("../middlewares/auth-jwt.js");

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post("/", [authJwt.verifyUserToken], controller.create);
    router.get("/", [authJwt.verifyUserToken], controller.findAll);  
    router.get("/:id", [authJwt.verifyUserToken], controller.findOne);  
    router.put("/:id", [authJwt.verifyUserToken], controller.update);  
    router.delete("/:id", [authJwt.verifyUserToken], controller.delete);
  
    app.use('/api/admin/faq-categories', router);
    // Cada vez que alguien llame a esta url por este metodo get llamarás a findAll
    // Para cuaaluquiier panel de administraion basta con sustituir el enlace de arriba y este de abajo
};