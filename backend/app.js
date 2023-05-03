const express = require("express")
const morgan = require("morgan")
const { register, login } = require("./routes/register")
const profile = require("./routes/profile/index")


const app = express()


//configuraciones de la ui de swagger
//pendiente




//middlewares
app.use(express.urlencoded({extends:false}))
app.use(express.json())
app.use(morgan("dev"))
//app.use("/api-doc", SwaggerUI.serve, SwaggerUI.setup(swaggerJSDoc(swaggerOptions)))

// API rutas principales
// @todo: Almancenar el password de forma segura  ✔
app.post('/api/v1/sign-up', register);   
// @todo: generar un token jwt seguro para la sesión del usuario    ✔
//con ese token pueden ver su perfil y actualizar sus datos como username y password, falta eliminarla
app.post('/api/v1/login', login);
// @todo: completar las rutas de profile   view: ✔    update: ✔
app.use('/api/v1/profile', profile);

app.get('/', (req, res) => {
  res.send('Platzi laboratio Autenticación con Node.js');
});


module.exports= {app}