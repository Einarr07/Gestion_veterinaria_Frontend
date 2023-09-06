import { useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Mensaje from "./Alertas/Mensaje";
import DataTable from 'react-data-table-component';

const Tabla = () => {
    
    const handleDelete = async (id) => {
        try {
            const confirmar = window.confirm("Vas a registrar la salida de un paciente, ¿Estás seguro de realizar esta acción?");
            if (confirmar) {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/eliminar/${id}`;
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                };
                const data = {
                    salida: new Date().toString()
                };
                await axios.delete(url, { headers, data });
                listarPacientes();
                toast.success("Paciente eliminado exitosamente"); // Muestra una notificación de éxito
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Hubo un error al eliminar el paciente"); // Muestra una notificación de error
        }
    }
    

    // Definir las columnas para DataTable
    const columns = [
        {
            name: 'N°',
            selector: (row, index) => index + 1,
            //sortable: true,
        },
        {
            name: 'Nombre',
            selector: 'nombre',
            sortable: true,
        },
        {
            name: 'Propietario',
            selector: 'propietario',
            sortable: true,
        },
        {
            name: 'Correo',
            selector: 'email',
            sortable: true,
        },
        {
            name: 'Celular',
            selector: 'celular',
            sortable: true,
        },
        {
            name: 'Estado',
            cell: row => (
                <span className={`bg-${row.estado ? 'blue-100 text-green-500' : 'gray-100 text-gray-500'} text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300`}>
                    {row.estado ? 'activo' : 'inactivo'}
                </span>
            ),
        },

        {
            name: 'Acciones',
            cell: row => (
                <>
                    <MdInfo
                        className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                        onClick={() => navigate(`/dashboard/visualizar/${row._id}`)}
                    />
                    <MdNoteAdd
                        className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                        onClick={() => navigate(`/dashboard/actualizar/${row._id}`)}
                    />
                    <MdDeleteForever
                        className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                        onClick={() => { handleDelete(row._id) }}
                    />
                </>
            ),
        },
    ];

    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate()
    const [pacientes, setPacientes] = useState([])

    const listarPacientes = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/pacientes`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setPacientes(respuesta.data, ...pacientes)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        listarPacientes()
    }, [])

    const filteredPacientes = pacientes.filter((paciente) =>
    (paciente.nombre ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (paciente.propietario ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (paciente.email ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (paciente.celular ?? "").toLowerCase().includes(searchQuery.toLowerCase())
);



    return (
        <>
            <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                    padding: '10px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
                    outline: 'none',
                    width: '100%',
                    maxWidth: '400px',
                    margin: '0 auto 20px',
                }}
            />
            {filteredPacientes.length === 0 ? (
                <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
            ) : (
                <DataTable
                    title="Lista de Pacientes"
                    columns={columns}
                    data={filteredPacientes}
                    highlightOnHover
                    striped
                    responsive
                    pagination

                />
            )}
        </>

    )
}

export default Tabla