const db = require("../../models");
const ResizeImage = db.ResizeImage;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.title || !req.body.alt || !req.body.path || !req.body.entity || !req.body.entityId || !req.body.languageAlias || !req.body.fileName || !req.body.content || !req.body.mymeType || !req.body.grid || !req.body.sizeBytes || !req.body.widthPx || !req.body.heightPx || !req.body.quality) {
        res.status(400).send({
            message: "Faltan campos por rellenar."
        });

        return;
    }

    const resizeimage = {
        title: req.body.title, 
        alt: req.body.alt, 
        path: req.body.path, 
        entity: req.body.entity,
        entityId: req.body.entityId,
        languageAlias: req.body.languageAlias,
        fileName: req.body.fileName,
        content: req.body.content,
        mymeType: req.body.mymeType,
        grid: req.body.grid,
        sizeBytes: req.body.sizeBytes,
        widthPx: req.body.widthPx,
        heightPx: req.body.heightPx,
        quality: req.body.quality
    };

    ResizeImage.create(resizeimage).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al insertar el dato."
        });
    });
};

exports.findAll = (req, res) => {

    let whereStatement = {};

    if(req.query.type) 
   
        whereStatement.type = {[Op.substring]: req.query.type};
    
       
    if(req.query.valid)
        whereStatement.valid = {[Op.substring]: req.query.valid};
   

    let condition = Object.keys(whereStatement).length > 0 ? {[Op.and]: [whereStatement]} : {};

    ResizeImage.findAll({ where: condition }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al recuperar los datos."
        });
    });
};


exports.findOne = (req, res) => {

    const id = req.params.id;


    ResizeImage.findByPk(id).then(data => {
        

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

    const id = req.params.id;

    ResizeImage.update(req.body, {
 
        where: { id: id }
      
    }).then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "El elemento ha sido actualizado correctamente."
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

    ResizeImage.destroy({
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