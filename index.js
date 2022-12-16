const express = require("express");
const cors = require("cors");
const fs = require('fs'); 
const app = express();
const db = require("./models");
// APP es EXPRESS y db SEQUELIZE

var corsOptions = {
    origin: ['http://localhost:8081', 'http://127.0.0.1:5500', 'http://127.0.0.1:5501']
    // Cors permite conexion de máquinas que se encuentran en dominios diferentes. Aquí utilizas cors y le dices que permitiras conexiones a este servidor solo xe estas maquinas
    // Las dos ulimas son liveserver
};

// Configuras el funcionamieento de Express
app.use(cors(corsOptions));
// A la librería cors pasas las opciones.
app.use(express.json({limit: "10mb", extended: true}));
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Son dos partes de los mismo, habilita recibir llamadas a través de url y jasons para intercambiar datos

var routePath="./routes/";
// Le acabas de decir donde se encuentran tus rutas y lo guardas en su variable routePath.

fs.readdirSync(routePath).forEach(function(file) {
    require(routePath + file)(app);
    // // FS es una libreria nativa de node.js, para tratar con carpetas y archivos. Aquñi le pides que lea una carpeta en concreto, de modo que haces un blkcue
    // sobre todos los archivos haga un bucle, los reccorre y para cada uno de ellos compone un require.
});



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto ${PORT}.`);
});

