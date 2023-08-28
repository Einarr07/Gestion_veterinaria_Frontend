import React from "react";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import axios from "axios";
import Mensaje from "./Alertas/Mensaje";
import { useForm, Controller } from "react-hook-form";

export const Formulario = ({ paciente }) => {
  const { handleSubmit: onSubmitForm, control, errors } = useForm();
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({});
  const [form, setForm] = useState({
    nombre: paciente?.nombre || "",
    propietario: paciente?.propietario || "",
    email: paciente?.email || "",
    celular: paciente?.celular || "",
    salida: paciente?.salida
      ? new Date(paciente?.salida).toLocaleDateString("en-CA", {
          timeZone: "UTC",
        })
      : "",
    convencional: paciente?.convencional || "",
    sintomas: paciente?.sintomas || "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (paciente?._id) {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/actualizar/${paciente?._id}`;
      const options = {
        headers: {
          method: "PUT",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(url, form, options);
      navigate("/dashboard/listar");
    } else {
      try {
        const token = localStorage.getItem("token");
        form.id = auth._id;
        const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/registro`;
        const options = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.post(url, form, options);
        navigate("/dashboard/listar");
      } catch (error) {
        setMensaje({ respuesta: error.response.data.msg, tipo: false });
        setTimeout(() => {
          setMensaje({});
        }, 3000);
      }
    }
  };

  return (
    <form onSubmit={onSubmitForm(handleFormSubmit)}>
      {Object.keys(mensaje).length > 0 && (
        <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
      )}

      {/* Campo de nombre */}
      <div>
        <label
          htmlFor="nombre"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre de la mascota:
        </label>
        <Controller
          name="nombre"
          control={control}
          defaultValue=""
          rules={{
            required: "Nombre de la mascota es requerido",
            minLength: {
              value: 3,
              message: "El nombre debe tener al menos 3 caracteres",
            },
            pattern: {
              value: /^[A-Za-z\s]+$/, // Expresión regular para letras y espacios en blanco
              message: "El nombre debe contener solo letras y espacios en blanco",
            },
          }}
          render={({ field }) => (
            <div>
              <input
                id="nombre"
                type="text"
                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${
                  errors?.nombre ? "border-red-500" : ""
                }`}
                placeholder="nombre de la mascota"
                {...field}
              />
              {errors?.nombre && (
                <p className="text-red-500">
                {errors.nombre.message === "required" // Verifica si el mensaje es por campo requerido
                  ? "El campo está vacío"
                  : errors.nombre.message}
              </p>
              )}
            </div>
          )}
        />
      </div>
      {console.log(errors)}

      {/* Campo de propietario */}
      <div>
        <label
          htmlFor="propietario"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre del propietario:
        </label>
        <Controller
          name="propietario"
          control={control}
          defaultValue=""
          rules={{
            required: "Nombre del propietario es requerido",
            minLength: {
              value: 3,
              message: "El nombre del propietario debe tener al menos 3 caracteres",
            },
            pattern: {
              value: /^[A-Za-z\s]+$/, // Expresión regular para letras y espacios en blanco
              message: "El nombre debe contener solo letras y espacios en blanco",
            },
          }}
          render={({ field }) => (
            <div>
              <input
                id="propietario"
                type="text"
                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${
                  errors?.propietario ? "border-red-500" : ""
                }`}
                placeholder="nombre del propietario"
                {...field}
              />
              {errors?.propietario && (
                <p className="text-red-500">{errors.propietario.message}</p>
              )}
            </div>
          )}
        />
      </div>

      {/* Campo de email */}
      <div>
        <label
          htmlFor="email"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Email:
        </label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: "Email es requerido",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Dirección de correo electrónico inválida",
            },
          }}
          render={({ field }) => (
            <div>
              <input
                id="email"
                type="email"
                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${
                  errors?.email ? "border-red-500" : ""
                }`}
                placeholder="email del propietario"
                {...field}
              />
              {errors?.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
          )}
        />
      </div>

      {/* Campo de celular */}
      <div>
        <label
          htmlFor="celular"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Celular:
        </label>
        <Controller
          name="celular"
          control={control}
          defaultValue=""
          rules={{
            required: "Número de celular es requerido",
            pattern: {
              value: /^\d+$/,
              message: "Por favor, ingrese solo números",
            },
          }}
          render={({ field }) => (
            <div>
              <input
                id="celular"
                type="number"
                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${
                  errors?.celular ? "border-red-500" : ""
                }`}
                placeholder="celular del propietario"
                {...field}
              />
              {errors?.celular && (
                <p className="text-red-500">{errors.celular.message}</p>
              )}
            </div>
          )}
        />
      </div>

      {/* Campo de convencional */}
      <div>
        <label
          htmlFor="convencional"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Convencional:
        </label>
        <Controller
          name="convencional"
          control={control}
          defaultValue=""
          rules={{
            pattern: {
              value: /^\d+$/,
              message: "Por favor, ingrese solo números",
            },
          }}
          render={({ field }) => (
            <div>
              <input
                id="convencional"
                type="number"
                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${
                  errors?.convencional ? "border-red-500" : ""
                }`}
                placeholder="convencional del propietario"
                {...field}
              />
              {errors?.convencional && (
                <p className="text-red-500">{errors.convencional.message}</p>
              )}
            </div>
          )}
        />
      </div>

      {/* Campo de salida */}
      <div>
        <label
          htmlFor="salida"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Fecha de salida:
        </label>
        <Controller
          name="salida"
          control={control}
          defaultValue=""
          rules={{
            required: "Fecha de salida es requerida",
          }}          
          render={({ field }) => (
            <input
              id="salida"
              type="date"
              className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${
                errors?.salida ? "border-red-500" : ""
              }`}
              placeholder="salida"
              {...field}
            />
          )}
        />
        {errors?.salida && (
          <p className="text-red-500">{errors.salida.message}</p>
        )}
      </div>

      {/* Campo de síntomas */}
      <div>
        <label
          htmlFor="sintomas"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Síntomas:
        </label>
        <textarea
          id="sintomas"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="Ingrese los síntomas de la mascota"
          name="sintomas"
          value={form.sintomas}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-gray-600 w-full p-3 
                 text-slate-300 uppercase font-bold rounded-lg 
                 hover:bg-gray-900 cursor-pointer transition-all"
        value={paciente?._id ? "Actualizar paciente" : "Registrar paciente"}
      />
    </form>
  );
};
