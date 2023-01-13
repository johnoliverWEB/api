const db = require("../../models");
const Customers = db.Customers;
const EmailService = require("../../services/email-service");

exports.sendEmail = (req, res) => {

    let email = {
        name: req.body.name,
        subject: "Nuevo mensaje de un usuario",
        content: `Hola, acabas de recibir un formulario desde tu web de parte de ${req.body.name} y lo que ha escrito es "${req.body.message}". Su correo electrónico es ${req.body.email}`
    }

    new EmailService("gmail").sendEmail(email);
    // Instancias (new, en email service) el servicio en el primer parámetro preparas el email y en el segundo defines a quién se lo envías.

    Customers.create(req.body)
    .then(data => {
        res.status(200).send({
            message: "Datos insertados correctamente"
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al insertar el dato."
        });
    });      
}
