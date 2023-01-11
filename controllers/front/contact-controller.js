const EmailService = require("../../services/email-service");

exports.sendEmail = (req, res) => {

    let email = {
        subject: "Nuevo mensaje de un usuario",
        content: `Hola, acabas de recibir un formulario desde tu web de parte de ${req.body.name} y lo que ha escrito es "${req.body.message}". Su correo electrónico es ${req.body.email}`
    }

    new EmailService("gmail").sendEmail(email, "johnoliverts@gmail.com, carlossedagambin@gmail.com");
    // Instancias (new, en email service) el servicio en el primer parámetro preparas el email y en el segundo defines a quién se lo envías.

    res.status(200).send({"message":"ok"});
      
}
