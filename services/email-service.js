const nodemailer = require('nodemailer');
// nodemailer es apra gestion de correos
// hay que instalar algunas librerías. Nodemailer, googleapis. Dentro de la terminal API, npm install (siguiendo criterios de selección npmjs.com a más descargas mejor)
const { google } = require("googleapis");
// Esto es para conectarse a los servicios de google, a fin de que con client ID y SECRET, así como refresh token, genera el access token automáticamente (expira a los 35 min)
const OAuth2 = google.auth.OAuth2;
// Detrás de esta librería hay millones de cosas que podemos hacer, 
const dotenv = require('dotenv').config();
const process = require('process');
// La forma correcta de traer un modelo es la que sigue:
const db = require("../models");
const SentEmails = db.SentEmails;


module.exports = class EmailService {
    // Exports module indica que puede ser llamado desde otra parte del código
// Una clase se contiene tres elementos: constructor, métodos y propiedades
    constructor(type) {
        // El constructor puede recibir parámetros para que la configuración de la clase sea diferente o actúe de una u otra forma.
        // El constructor es una función que arrancará en cuanto llames al archivo. Normalmente aquí preparas una serie de configuraciones
        // Para llamar a email service en controller llamas al archivo const Email SErvice = require ("...)
        // Luego en el controller metes new EmailService("gmail").sendEmail(email, customer);
        // Los métodos son otras funciones a las que se pueden llamar desde dentro de una clase determinada (privado) o desde fuera de la misma (público)
        if(type === 'smtp') {

            this.email = process.env.EMAIL; 

            this.transport = nodemailer.createTransport({
                pool: true,
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                secureConnection: true,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD,
                },
                tls: {
                    ciphers:'SSLv3'
                }
            });

        } 
        
        else if(type === 'gmail') {

            this.email = process.env.GOOGLE_EMAIL; 
// Esto son las propiedades o atributos de la clase. Básicamente, utiliza variables dentro del objeto a las que puedes acceder dentro de cualquiera de los métodos.
// Una vez que en el constructor declaras una propiedad, en cualquier parte de la clase puedes escribir la propiedad para enganchar su valor o modificarlo. Las propiedades pueden recoger diferentes estados.
            this.transport = nodemailer.createTransport({
                // This email equivale a tu correo electrónico y transport equivale a una conexión a tu gmail.
                // El constructor no ha hecho nada más, lo que hace es preparar una configuración para que a partir de este momento puedas enviar correos.
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: process.env.GOOGLE_EMAIL,
                    clientId: process.env.GOOGLE_CLIENT_ID,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
                    accessToken: this.getAccessToken()
                    // Este conjunto es un objeto clave -valor. el valor de la calve accesToken será el resultado del método this-getAccesToken()
                }
            });
        }
    }
  
    getAccessToken() {
// Esto es un método: coge el token. Enlazando con el objeto anterior.
        const myOAuth2Client = new OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            "https://developers.google.com/oauthplayground"
        )

        myOAuth2Client.setCredentials({
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN
        });

        const myAccessToken = myOAuth2Client.getAccessToken();

        return myAccessToken;
    }

    sendEmail(email, destination = this.email) {

// Este es otro método: una función destinada a que se mande el email
        const mailOptions = {
            from: this.email, 
            name: email.name,
            to: destination,
            subject: email.subject,
            html: email.content
        }

        this.transport.sendMail(mailOptions, function (err, result) {
            if (err) {
                console.log(err);
            
            } else {
                
                // Recurrimos a let para no anular el resto de solicitudes (req.body)

                let sentEmailsData = {
                
                    // Las denominaciones deben coincidir con el name asignado en el html e ir vinculadas a las variables asignadas
                    name: email.name,
                    email: destination,
                    message: email.content,
                };

                SentEmails.create(sentEmailsData)
                    .then(() => {
                        console.log("Email registrado en la tabla sent-emails");
                    })
                    .catch((err) => {
                        console.log("Error al registrar el email en la tabla sent-emails:", err);
                    }
                );
            }
        });
    }
}

