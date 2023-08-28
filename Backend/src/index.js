import app from './server.js';
import connection from './database.js';


connection()
// Ejecutar el servidor por medio del puerto
app.listen(app.get('port'),()=>{
    console.log(`Servidor activo en http://localhost:${app.get('port')}`);
})