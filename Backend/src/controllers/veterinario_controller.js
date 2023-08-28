// Importar el modelo veterinario
import Veterinario from "../models/Veterinario.js"
import generarJWT from "../helpers/crearJWT.js"
import mongoose from "mongoose";
import { sendMailToUser, sendMailToRecoveryPassword } from "../config/nodemailer.js"

const login = async(req,res)=>{
    // Capturar los datos de requets
    const {email,password} = req.body
    // Validación de campos vacios
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    // Obtener el usuario en base al mail
    const veterinarioBDD = await Veterinario.findOne({email}).select("-status -__v -token -updatedAt -createdAt")
    // Validación de la cuenta del email
    if(veterinarioBDD?.confirmEmail===false) return res.status(403).json({msg:"Lo sentimos, debe verificar su cuenta"})
    // Validar si existe el usuario
    if(!veterinarioBDD) return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    // Validar si el password del request es el mismo de la BDD
    const verificarPassword = await veterinarioBDD.matchPassword(password)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password no es el correcto"})
    const token = generarJWT(veterinarioBDD._id)
    // Desestructurar la info del usuario
    const {nombre,apellido,direccion,telefono,_id} = veterinarioBDD
    // Presentar datos
    res.status(200).json({
        token,
        nombre,
        apellido,
        direccion,
        telefono,
        _id,
        email:veterinarioBDD.email
    })
}
const perfil =(req,res)=>{
    delete req.veterinarioBDD.token
    delete req.veterinarioBDD.confirmEmail
    delete req.veterinarioBDD.createdAt
    delete req.veterinarioBDD.updatedAt
    delete req.veterinarioBDD.__v
    res.status(200).json(req.veterinarioBDD)
}
const registro = async (req,res)=>{
    // Caputara los datos del body de la petición
    const {email,password} = req.body
    // Validación de los campos vacíos
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    // Verificar la existencia del Mail
    const verificarEmailBDD = await Veterinario.findOne({email})
    if(verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
    // Crear la instacia del modelo
    const nuevoVeterinario = new Veterinario(req.body)
    // Encriptar el password del usuario
    nuevoVeterinario.password = await nuevoVeterinario.encrypPassword(password)
    // Crear el token del usuario
    const token = nuevoVeterinario.crearToken()
    // Invocar la función para el envío del correo
    await sendMailToUser(email,token)
    // Guardar en BDD
    await nuevoVeterinario.save()
    // Respuesta al usuario
    res.status(200).json({msg:"Revisa tu correo electrónico para confirmar tu cuenta"})
}
const confirmEmail = async (req,res)=>{
    // Validar el token del correo
    if(!(req.params.token)) return res.status(400).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    // Verificar si en base al token existe ese usuario
    const veterinarioBDD = await Veterinario.findOne({token:req.params.token})
    // VALIDAR SI EL TOKEN YA FUE SETEADO A NULL
    if(!veterinarioBDD?.token) return res.status(404).json({msg:"La cuenta ya ha sido confirmada"})
    // Setear a null el token
    veterinarioBDD.token = null
    // Cambiar a true la confirmación de la cuenta
    veterinarioBDD.confirmEmail=true
    // Guardar en la BDD
    await veterinarioBDD.save()
    // Presentar mensaje al usuario
    res.status(200).json({msg:"Token confirmado, ya puedes iniciar sesión"}) 
}
const listarVeterinarios = (req,res)=>{
    res.status(200).json({res:'lista de veterinarios registrados'})
}
const detalleVeterinario = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, debe ser un id válido`});
    const veterinarioBDD = await Veterinario.findById(id).select("-password")
    if(!veterinarioBDD) return res.status(404).json({msg:`Lo sentimos, no existe el veterinario ${id}`})
    res.status(200).json({msg:veterinarioBDD})
}
const actualizarPerfil = async (req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, debe ser un id válido`});
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const veterinarioBDD = await Veterinario.findById(id)
    if(!veterinarioBDD) return res.status(404).json({msg:`Lo sentimos, no existe el veterinario ${id}`})
    if (veterinarioBDD.email !=  req.body.email)
    {
        const veterinarioBDDMail = await Veterinario.findOne({email:req.body.email})
        if (veterinarioBDDMail)
        {
            return res.status(404).json({msg:`Lo sentimos, el existe ya se encuentra registrado`})  
        }
    }
		veterinarioBDD.nombre = req.body.nombre || veterinarioBDD?.nombre
    veterinarioBDD.apellido = req.body.apellido  || veterinarioBDD?.apellido
    veterinarioBDD.direccion = req.body.direccion ||  veterinarioBDD?.direccion
    veterinarioBDD.telefono = req.body.telefono || veterinarioBDD?.telefono
    veterinarioBDD.email = req.body.email || veterinarioBDD?.email
    await veterinarioBDD.save()
    res.status(200).json({msg:"Perfil actualizado correctamente"})
}
const actualizarPassword = async (req,res)=>{
    const veterinarioBDD = await Veterinario.findById(req.veterinarioBDD._id)
    if(!veterinarioBDD) return res.status(404).json({msg:`Lo sentimos, no existe el veterinario ${id}`})
    const verificarPassword = await veterinarioBDD.matchPassword(req.body.passwordactual)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password actual no es el correcto"})
    veterinarioBDD.password = await veterinarioBDD.encrypPassword(req.body.passwordnuevo)
    await veterinarioBDD.save()
    res.status(200).json({msg:"Password actualizado correctamente"})
}
const recuperarPassword = async(req,res)=>{
    const {email} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const veterinarioBDD = await Veterinario.findOne({email})
    if(!veterinarioBDD) return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    const token = veterinarioBDD.crearToken()
    veterinarioBDD.token=token
    await sendMailToRecoveryPassword(email,token)
    await veterinarioBDD.save()
    res.status(200).json({msg:"Revisa tu correo electrónico para reestablecer tu cuenta"})
}
const comprobarTokenPasword = async (req,res)=>{
    if(!(req.params.token)) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    const veterinarioBDD = await Veterinario.findOne({token:req.params.token})
    if(veterinarioBDD?.token !== req.params.token) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    await veterinarioBDD.save()
    res.status(200).json({msg:"Token confirmado, ya puedes crear tu nuevo password"}) 
}
const nuevoPassword = async (req,res)=>{
    const{password,confirmpassword} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if(password != confirmpassword) return res.status(404).json({msg:"Lo sentimos, los passwords no coinciden"})
    const veterinarioBDD = await Veterinario.findOne({token:req.params.token})
    if(veterinarioBDD?.token !== req.params.token) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    veterinarioBDD.token = null
    veterinarioBDD.password = await veterinarioBDD.encrypPassword(password)
    await veterinarioBDD.save()
    res.status(200).json({msg:"Felicitaciones, ya puedes iniciar sesión con tu nuevo password"}) 
}

// Exportación nombrada
export {
    login,
    perfil,
    registro,
    confirmEmail,
    listarVeterinarios,
    detalleVeterinario,
    actualizarPerfil,
    actualizarPassword,
	recuperarPassword,
    comprobarTokenPasword,
	nuevoPassword
}