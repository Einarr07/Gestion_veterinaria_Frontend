import jwt from 'jsonwebtoken'
import Veterinario from '../models/Veterinario.js'

// Definir la función para validar el jwt
const verificarAutenticacion = async (req,res,next)=>{
// validacion del jwt
    // req.body
    // req.params
    // req.headers.authorization
if(!req.headers.authorization) return res.status(404).json({msg:"Lo sentimos, debes proprocionar un token"})    
    // obtener el jwt
    const {authorization} = req.headers
    try {
        // Obtener solo el token y verificar el mismo
        const {id} = jwt.verify(authorization.split(' ')[1],process.env.JWT_SECRET)
        // Obtener el ususario en base el ID
        req.veterinarioBDD = await Veterinario.findById(id).lean().select("-password")
        // Next
        next()
    } catch (error) {
        // Mandar mensajes de error
        const e = new Error("Formato del token no válido")
        return res.status(404).json({msg:e.message})
    }
}

export default verificarAutenticacion