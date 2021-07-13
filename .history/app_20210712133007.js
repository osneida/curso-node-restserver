require('dotenv').config();



const app = express()
 

 
app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ', process.env.PORT);
})