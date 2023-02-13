const db = require("../../models");
// requerimos todos los modelos pidiendo que conste desde DB (jason) e incluyendo la url donde se ubica el archivo models
const Tax = db.Tax;
// De todos los modelos, cogemos el modelo de la tabla tax
const Op = db.Sequelize.Op;
// Llamamos a la librería Sequelize (ORM) para poder hacer consultas con ella

exports.create = (req, res) => {

    Tax.create(req.body).then(data => {
        res.status(200).send(data);
        // Tienes un formulario. Y una tabla en panel.
        // envias un registro y si todo va bien la BBDD te devuelve el dato con su id. se llama AJAX
        // Se repite siempre, solo cambia el nombre del modelo y la variable. Controlador
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al insertar el dato."
        });
    });
};

exports.findAll = (req, res) => {

    let whereStatement = {};

    // este código sirve para todos modificando los datos necesarios
    if(req.query.type) 
    // Aqui preguntyas si tiene un parámentro valido
        whereStatement.type = {[Op.substring]: req.query.type};
        // Si quieres utilizar una variable tienes que emplear la fórmula de arriba
        // esto qeuivale a WHERE valid = "%true%"
       
    if(req.query.valid)
        whereStatement.valid = {[Op.substring]: req.query.valid};
    // Busca en el campo valid donde sea like

    let condition = Object.keys(whereStatement).length > 0 ? {[Op.and]: [whereStatement]} : {};

    Tax.findAll({ where: condition }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al recuperar los datos."
        });
    });
};

exports.findAll = (req, res) => {

    let page = req.query.page || 1;
    let limit = parseInt(req.query.size) || 10;
    let offset = (page - 1) * limit;

    let whereStatement = {};

    for (let key in req.query) {
        if (req.query[key] != "" && key != "page" && key != "size") {
            whereStatement[key] = {[Op.substring]: req.query[key]};
        }
    }

    let condition = Object.keys(whereStatement).length > 0 ? {[Op.and]: [whereStatement]} : {};

    Tax.findAndCountAll({
        where: condition, 
        limit: limit,
        offset: offset,
        order: [['createdAt', 'DESC']]
    })
    .then(result => {

        result.meta = {
            total: result.count,
            pages: Math.ceil(result.count / limit),
            currentPage: page
        };

        res.status(200).send(result);

    }).catch(err => {
        res.status(500).send({
            message: err.errors || "Algún error ha surgido al recuperar los datos."
        });
    });
};

// Puedes traqducir consultas mysql en chatgpt al lenguaje sequelize

exports.findOne = (req, res) => {

    const id = req.params.id;


    Tax.findByPk(id).then(data => {
        // Esto es para encontrar con la id (find by primary key)

        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send({
                message: `No se puede encontrar el elemento con la id=${id}.`
            });
        }

    }).catch(err => {
        res.status(500).send({
            message: "Algún error ha surgido al recuperar la id=" + id
        });
    });
};

exports.update = (req, res) => {
// Actualizar se hace con put y mandas un body, al igual que el post, para actualizar los datos.
    const id = req.params.id;

    Tax.update(req.body, {
        // Lo que haces con cada controlador ers cambiar donde figura Tax (modelo)
        // El unico que cambia es findall y create
        // la base de datos actualiza los datos mediante post
        where: { id: id }
        // Le pides que busque esta id de un registro, para que lo actualice con todos los datos del body
    }).then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "El elemento ha sido actualizado correctamente."
                // si el valor numérico da uno esw porque la tualización se ha realizaco correctamente, si da 0 es que no.
                // Cuando actualizas te devuelve un 1 que quiere decir actualizado o un 0 que quiere decir que no se ha podido actualizar
                // Lo mismo pasa con el destroy -más abajo-
            });
        } else {
            res.status(404).send({
                message: `No se puede actualizar el elemento con la id=${id}. Tal vez no se ha encontrado el elemento o el cuerpo de la petición está vacío.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Algún error ha surgido al actualiazar la id=" + id
        });
    });
};

exports.delete = (req, res) => {

    const id = req.params.id;

    Tax.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "El elemento ha sido borrado correctamente"
            });
        } else {
            res.status(404).send({
                message: `No se puede borrar el elemento con la id=${id}. Tal vez no se ha encontrado el elemento.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Algún error ha surgido al borrar la id=" + id
        });
    });
};