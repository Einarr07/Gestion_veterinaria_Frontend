import { useContext, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import Mensaje from "../Alertas/Mensaje";

const FormularioPerfil = () => {
    const { auth, actualizarPerfil } = useContext(AuthContext);
    const [mensaje, setMensaje] = useState({});
    const [form, setform] = useState({
        id: auth._id,
        nombre: auth.nombre || "",
        apellido: auth.apellido || "",
        direccion: auth.direccion || "",
        telefono: auth.telefono || "",
        email: auth.email || "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(form).includes("")) {
            setMensaje({ respuesta: "Todos los campos deben ser ingresados", tipo: false });
            setTimeout(() => {
                setMensaje({});
            }, 3000);
            return;
        }
        const resultado = await actualizarPerfil(form);
        setMensaje(resultado);

        // Recargar la página después de 3 segundos
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    };

    const handleChange = (e) => {
        // Validar la longitud máxima para los campos de dirección, correo, nombre y apellido
        const maxLengths = {
            direccion: 60,
            email: 50,
            nombre: 30,
            apellido: 30
        };
        
        if (e.target.name === "direccion" || e.target.name === "email" || e.target.name === "nombre" || e.target.name === "apellido") {
            const trimmedValue = e.target.value.slice(0, maxLengths[e.target.name]);
            setform({
                ...form,
                [e.target.name]: trimmedValue
            });
        } else if (e.target.name === "telefono") {
            // Validar que solo se permitan números en el campo de teléfono
            const numericValue = e.target.value.replace(/\D/g, ''); // Remover caracteres no numéricos
            // Limitar la entrada a exactamente 10 números
            const limitedValue = numericValue.slice(0, 10);
            setform({
                ...form,
                [e.target.name]: limitedValue
            });
        } else {
            setform({
                ...form,
                [e.target.name]: e.target.value
            });
        }
    }
    
    

    return (
        <form onSubmit={handleSubmit}>
            {Object.keys(mensaje).length > 0 && (
                <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
            )}

            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre'
                    name='nombre'
                    value={form.nombre}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='apellido'
                    className='text-gray-700 uppercase font-bold text-sm'>Apellido: </label>
                <input
                    id='apellido'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='apellido'
                    name='apellido'
                    value={form.apellido}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='direccion'
                    className='text-gray-700 uppercase font-bold text-sm'>Dirección: </label>
                <input
                    id='direccion'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='direccion'
                    name='direccion'
                    value={form.direccion}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='telefono'
                    className='text-gray-700 uppercase font-bold text-sm'>Teléfono: </label>
                <input
                    id='telefono'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='telefono'
                    name='telefono'
                    value={form.telefono}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='email'
                    className='text-gray-700 uppercase font-bold text-sm'>Correo electrónico: </label>
                <input
                    id='email'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='email'
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className='bg-gray-800 w-full p-3 
        text-slate-300 uppercase font-bold rounded-lg 
        hover:bg-gray-600 cursor-pointer transition-all'
                value='Actualizar' />

        </form>
    )
}

export default FormularioPerfil