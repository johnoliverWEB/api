const db = require("../../models");
const Customer = db.Customer;
const EmailService = require("../../services/email-service");

exports.pay = (req, res) => {

    // let email = {
    //     name: req.body.name,
    //     subject: "Pedido finalizado",
    //     content: `Hola ${req.body.name}, acabas de finalizar tu pedido!`
    // }

    // new EmailService("gmail").sendEmail(email, req.body.email );
    // // Instancias (new, en email service) el servicio en el primer parámetro preparas el email y en el segundo defines a quién se lo envías.

    Customer.create(req.body)
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
