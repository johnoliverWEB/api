module.exports = app => {

    const router = require("express").Router();
    // Usamos una función de la librería expres para crear rutas.
    const controller = require("../controllers/admin/faqs-controller.js");
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
  
    app.use('/api/admin/faqs', router);
    // Cada vez que alguien llame a esta url por este metodo get llamarás a findAll
    // Para cuaaluquiier panel de administraion basta con sustituir el enlace de arriba y este de abajo
    // Tú, ten presente que debes loguearte en el login de la web desde el navegador y después cambiar la url al panel de administración
    // para que tengas el token en la Session Storage y así queden los campos que introduzcas registrados en postman y navicat.
};