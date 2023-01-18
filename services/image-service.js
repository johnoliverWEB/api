const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const db = require("../models");
const OriginalImage = db.OriginalImage;
const ImageConfiguration = db.ImageConfiguration;
const ResizeImage = db.ResizeImage;

// Cuando hayas creado el eelemento se gvenerará la redimensión. Porque necesitas la ID del elemento del que generas la imagen (slider), a fin de asociar las imágenes al mismo.

module.exports = class ImageService {

    constructor(entity, entityId) {
        this.entity = entity;
        this.entityId = entityId;
    }

    uploadImage = images => {

        for (let key in images) {
            // Esto es para pdoer recorrer todas las imágenes

            images[key].forEach(image => {

                if(image.fieldname.includes('[]')){
                    image.fieldname = image.fieldname.replace('[]', '');
                }

//                 //  LA foto original me la guiardas en la ruta que especifica (linea segunda)
                let oldPath = path.join(__dirname, `../storage/tmp/${image.originalname}`);
                let newPath = path.join(__dirname, `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/original/${image.originalname}`);    
                let newDir = path.dirname(newPath);

//                 // Coge la variable new path y utliza la funcion path dirname para que devuelva todas las carpetas hasta original, sin incluir el nombre del archivo. Para que utilizanodo la variable mkdir se cree una carpeta o varias (images, slidder, etc.)

                fs.mkdir(newDir, { recursive: true }, (err) => {

                    if (err) throw err;

// // Rename mueve el archivo de una carpeta temporal (oldpath) a una nueva (el original)
                    fs.rename(oldPath, newPath, (err) => {
                        if (err) throw err;
                    });

                    sharp(newPath)
                    .metadata()
                    .then(metadata => {
                        //Ahora usa widthPx y heightPx para crear el objeto OriginalImage
                        return OriginalImage.create({
                            path: `/storage/images/${this.entity}/${this.entityId}/${image.fieldname}/original/${image.originalname}`,
                            entity: this.entity,
                            entityId: this.entityId,
                            fileName: image.originalname,
                            languageAlias: "es",
                            content: image.fieldname,
                            mimetype: image.mimetype,
                            sizeBytes: image.size,
                            widthPx: metadata.width,
                            heightPx: metadata.height
                        });

                    }).then( originalImage => {

                        if (!fs.existsSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/thumbnail`))){
                            fs.mkdirSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/thumbnail`));	
                        }
    
                        if (!fs.existsSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/mobile`))){
                            fs.mkdirSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/mobile`));	
                        }
    
                        if (!fs.existsSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/desktop`))){
                            fs.mkdirSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/desktop`));	
                        }
                        
                        // Aquí viene el momento en que se utiliza el resdidreccionamiento. Llamas a Sharp, dices donde se encuentra la imagen original (newpath y kla redimensiona y convierte en formato webp, y dice donde quieres guardar la imagen resultante /en este caso en thumbail, or ultimo se notifica)
                        // Aqui tendremos que hacer una consulta en images-configuration
    
                        ImageConfiguration.findAll({
                            where: { entity: this.entity, content: image.fieldname }
                        }).then( configurations => {
                            // Como estamos llamando na una libreria externa, tenemos que emplear then.
                            for (const config of configurations) {
                                
                                sharp(newPath)
                                .resize(config.widthPx, config.heightPx)
                                .toFormat(config.extensionConversion)
                                .toFile(path.join(__dirname, `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/${config.grid}/${path.parse(image.filename).name}.${config.extensionConversion}`))
                                .then( resizedImage => {
    
                                    ResizeImage.create({
                                        OriginalImageId: originalImage.id,
                                        ImageConfigurationId: config.id,
                                        title: "hola",
                                        alt: "hola",
                                        path: `/storage/images/${this.entity}/${this.entityId}/${image.fieldname}/${config.grid}/${path.parse(image.filename).name}.${config.extensionConversion}`,
                                        entity: this.entity,
                                        entityId: this.entityId,
                                        languageAlias: "es",
                                        fileName: image.originalname,
                                        content: image.fieldname,
                                        mimeType: `image/${config.extensionConversion}`,
                                        grid: config.grid,
                                        sizeBytes: resizedImage.size,
                                        widthPx: resizedImage.width,
                                        heightPx: resizedImage.height,
                                        quality: config.quality,
                                    });
    
                                    console.log(`La imagen ${image.originalname} ha sido redimensionada`);
        
                                    // Al finalizar la redimension dentro del bucle, aqui hay que registrar en images-resized que se ha guardado una imagen redimensionada
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                            }
                        }).catch((err) => {
                            console.log(err);
                        });
                    }).catch((err) => {
                        console.log(err);
                    });
                });
            });
        }
    }
}