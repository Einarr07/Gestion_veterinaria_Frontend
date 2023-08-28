import jwt from "jsonwebtoken";
// Definir la función para generar el token
const generarJWT = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1d"})
}
// Exportación por default de la función
export default  generarJWT