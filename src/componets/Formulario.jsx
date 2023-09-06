import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthProvider";
import axios from 'axios';
import Mensaje from "./Alertas/Mensaje";
import { useForm, Controller } from "react-hook-form";

export const Formulario = ({ paciente }) => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState({});

    // Configuración de React Hook Form
    const { control, handleSubmit, formState: { errors } } = useForm();

    // Obtiene la fecha actual en el formato requerido por el campo de fecha
    const obtenerFechaActual = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Los meses comienzan desde 0
        let dd = today.getDate();

        if (mm < 10) {
            mm = `0${mm}`;
        }

        if (dd < 10) {
            dd = `0${dd}`;
        }

        return `${yyyy}-${mm}-${dd}`;
    };

    const onSubmit = async (data) => {
        try {
            if (paciente?._id) {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/actualizar/${paciente?._id}`;
                const options = {
                    headers: {
                        method: 'PUT',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                await axios.put(url, data, options);
                navigate('/dashboard/listar');
            } else {
                const token = localStorage.getItem('token');
                data.id = auth._id;
                const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/registro`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                await axios.post(url, data, options);
                navigate('/dashboard/listar');
            }
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
            setTimeout(() => {
                setMensaje({});
            }, 3000);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

            <div>
                <label
                    htmlFor='nombre:'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre de la mascota: </label>
                <Controller
                    name='nombre'
                    control={control}
                    defaultValue={paciente?.nombre ?? ""}
                    rules={{
                        required: 'Este campo es requerido',
                        minLength: {
                            value: 3, // Valor mínimo de letras
                            message: 'Mínimo 3 letras son requeridas'
                        },
                        maxLength: {
                            value: 30, // Valor máximo de letras
                            message: 'Máximo 30 letras son permitidas'
                        },
                        pattern: {
                            value: /^[A-Za-z]+$/,
                            message: 'Ingrese solo letras sin espacios ni caracteres especiales'
                        }
                    }}
                    render={({ field }) => (
                        <input
                            id='nombre'
                            type="text"
                            className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.nombre ? 'border-red-500' : ''}`}
                            placeholder='nombre de la mascota'
                            {...field}
                        />
                    )}
                />
                {errors.nombre && <p className='text-red-500 text-sm'>{errors.nombre.message}</p>}
            </div>

            <div>
                <label
                    htmlFor='propietario'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre del propietario: </label>
                <Controller
                    name='propietario'
                    control={control}
                    defaultValue={paciente?.propietario ?? ""}
                    rules={{
                        required: 'Este campo es requerido',
                        minLength: {
                            value: 3, // Mínimo 3 caracteres
                            message: 'Mínimo 3 caracteres son requeridos'
                        },
                        maxLength: {
                            value: 30, // Máximo 30 caracteres
                            message: 'Máximo 30 caracteres son permitidos'
                        },
                        pattern: {
                            value: /^[A-Za-z\s]+$/, // Acepta letras y espacios
                            message: 'Ingrese solo letras sin caracteres especiales'
                        }
                    }}
                    render={({ field }) => (
                        <input
                            id='propietario'
                            type="text"
                            className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.propietario ? 'border-red-500' : ''}`}
                            placeholder='nombre del propietario'
                            {...field}
                        />
                    )}
                />
                {errors.nombre && <p className='text-red-500 text-sm'>{errors.nombre.message}</p>}
            </div>

            <div>
                <label
                    htmlFor='email:'
                    className='text-gray-700 uppercase font-bold text-sm'>Correo electrónico: </label>
                <Controller
                    name='email'
                    control={control}
                    defaultValue={paciente?.email ?? ""}
                    rules={{
                        required: 'Este campo es requerido',
                        pattern: {
                            value: /^[A-Za-z0-9+_.-]+@(.+)$/,
                            message: 'Ingrese un correo electrónico válido'
                        }
                    }}
                    render={({ field }) => (
                        <input
                            id='email'
                            type="email"
                            className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.email ? 'border-red-500' : ''}`}
                            placeholder='correo electrónico del propietario'
                            {...field}
                        />
                    )}
                />
                {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
            </div>
            <div>
                <label
                    htmlFor='celular:'
                    className='text-gray-700 uppercase font-bold text-sm'>Celular: </label>
                <Controller
                    name='celular'
                    control={control}
                    defaultValue={paciente?.celular ?? ""}
                    rules={{
                        required: 'Este campo es requerido',
                        pattern: {
                            value: /^\d{10}$/,
                            message: 'Ingrese exactamente 10 dígitos numéricos'
                        }
                    }}
                    render={({ field }) => (
                        <input
                            id='celular'
                            type="text"
                            className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.celular ? 'border-red-500' : ''}`}
                            placeholder='celular del propietario'
                            {...field}
                        />
                    )}
                />
                {errors.celular && <p className='text-red-500 text-sm'>{errors.celular.message}</p>}
            </div>

            <div>
                <label
                    htmlFor='convencional:'
                    className='text-gray-700 uppercase font-bold text-sm'>Convencional: </label>
                <Controller
                    name='convencional'
                    control={control}
                    defaultValue={paciente?.convencional ?? ""}
                    rules={{
                        required: 'Este campo es requerido',
                        pattern: {
                            value: /^\d{9}$/,
                            message: 'Ingrese exactamente 9 dígitos numéricos'
                        }
                    }}
                    render={({ field }) => (
                        <input
                            id='convencional'
                            type="text"
                            className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.convencional ? 'border-red-500' : ''}`}
                            placeholder='convencional del propietario'
                            {...field}
                        />
                    )}
                />
                {errors.convencional && <p className='text-red-500 text-sm'>{errors.convencional.message}</p>}
            </div>

            <div>
                <label
                    htmlFor='salida:'
                    className='text-gray-700 uppercase font-bold text-sm'>Fecha de salida: </label>
                <Controller
                    name='salida'
                    control={control}
                    defaultValue={paciente?.salida ?? ""}
                    rules={{ required: 'Este campo es requerido' }}
                    render={({ field }) => (
                        <input
                            id='salida'
                            type="date"
                            className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.salida ? 'border-red-500' : ''}`}
                            placeholder='salida'
                            min={obtenerFechaActual()} // Configura la fecha mínima como la fecha actual
                            {...field}
                        />
                    )}
                />
                {errors.salida && <p className='text-red-500 text-sm'>{errors.salida.message}</p>}
            </div>

            <div>
                <label
                    htmlFor='sintomas:'
                    className='text-gray-700 uppercase font-bold text-sm'>Síntomas: </label>
                <Controller
                    name='sintomas'
                    control={control}
                    defaultValue={paciente?.sintomas ?? ""}
                    rules={{
                        required: 'Este campo es requerido',
                        maxLength: {
                            value: 500, // Máximo 500 caracteres
                            message: 'Máximo 500 caracteres son permitidos'
                        }
                    }}
                    render={({ field }) => (
                        <textarea
                            id='sintomas'
                            className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${errors.sintomas ? 'border-red-500' : ''}`}
                            placeholder='Ingrese los síntomas de la mascota'
                            {...field}
                        />
                    )}
                />
                {errors.sintomas && <p className='text-red-500 text-sm'>{errors.sintomas.message}</p>}
            </div>

            <input
                type="submit"
                className='bg-gray-600 w-full p-3 
                    text-slate-300 uppercase font-bold rounded-lg 
                    hover:bg-gray-900 cursor-pointer transition-all'
                value={paciente?._id ? 'Actualizar paciente' : 'Registrar paciente'} />

        </form>
    )
}