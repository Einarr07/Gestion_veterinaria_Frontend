import logoDarkMode from '../assets/dark.png'
import logoFacebook from '../assets/facebook.png'
import logoGithub from '../assets/github.png'
import logoLinkedind from '../assets/linkedin.png'
import logoRocket from '../assets/rocket.webp'
import logoCode from '../assets/code.png'
import logoConsulting from '../assets/consulting.png'
import logoDesign from '../assets/design.png'
import logoWeb1 from '../assets/web1.png'
import logoWeb2 from '../assets/web2.png'
import logoWeb3 from '../assets/web3.png'
import logoWeb4 from '../assets/web4.png'
import logoWeb5 from '../assets/web5.png'
import logoWeb6 from '../assets/web6.png'
import { useState } from 'react'
import {Link} from 'react-router-dom'


export const LandinPage = () => {
    const [darkMode, setdarkMode] = useState(false)
    return (
        <div className={darkMode ? "dark" :""}>

            <main className='bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-800'>
                <section>
                    <nav className='p-10 mb-12 flex justify-between'>
                        <h1 className='text-2xl font-bold dark:text-white'>VETERINARIA</h1>
                        <ul className='flex items-center'>
                            <li><img onClick={()=>setdarkMode(!darkMode)} className='cursor-pointer' src={logoDarkMode} alt="logo" width={40} height={40}/></li>
                            <li><Link to="/login" className='bg-gray-600 text-slate-400 px-6 py-2 rounded-full ml-8 hover:bg-gray-900 hover:text-white' href="#">Iniciar sesión</Link></li>
                        </ul>
                    </nav>

                    <div className='text-center'>
                        <h2 className='text-5xl py-2 text-teal-600 font-medium md:text-6xl'>Proyecto EPN</h2>
                        <h3 className='text-2xl py-2 md:text-3xl dark:text-white'>Bienvenidos</h3>
                        <p className='text-md py-5 leading-8 text-gray-800 md:text-xl max-w-lg mx-auto dark:text-white'>Nuestro compromiso es cuidar de las mascotas y animales de compañía con la máxima dedicación y profesionalismo. Brindamos atención médica y cariño a nuestros amigos peludos</p>
                    </div>
                    
                    <div className='relative mx-auto  bg-gradient-to-b from-indigo-400 rounded-full w-80 h-80 mt-12 overflow-hidden md:w-96 md:h-96 dark:border-4 border-teal-300'>
                        <img src="https://res.cloudinary.com/dh7xuwoyg/image/upload/v1693981643/veterinaria_EPN/principal_mraqqf.png" alt="logo-rocket" />
                    </div>
                </section>

                <section>

                    <div className='md:flex md:flex-wrap lg:flex lg:justify-center gap-10'>
                        <div className='text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 dark:bg-slate-100'>
                            <img className='mx-auto' src="https://res.cloudinary.com/dh7xuwoyg/image/upload/v1693981639/veterinaria_EPN/mision_s9lgti.png" alt="" />
                            <h3 className='text-lg font-medium pt-8 pb-2'>Nuestra Misión</h3>
                            <p className='py-4 text-teal-600'>Nuestra misión es promover la salud y el bienestar animal a través de la atención médica de alta calidad y la educación. Nos esforzamos por fomentar una relación de confianza entre los propietarios y sus mascotas, brindando servicio médico avanzado y consejos expertos</p>
                        </div>
                        <div className='text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 dark:bg-slate-100'>
                            <img className='mx-auto' src="https://res.cloudinary.com/dh7xuwoyg/image/upload/v1693981648/veterinaria_EPN/ofertas_ifcpig.png" alt="" />
                            <h3 className='text-lg font-medium pt-8 pb-2'>Lo que ofrecemos</h3>
                            <p className='py-4 text-teal-600'>Contamos con servicios 24 horas</p>
                            <p className='text-gray-800 py-1'>Consultas veterinarias</p>
                            <p className='text-gray-800 py-1'>Vacunación y control de enfermedades</p>
                            <p className='text-gray-800 py-1'>Cirugías generales y especializadas</p>
                            <p className='text-gray-800 py-1'>Atención de emergencia</p>
                            <p className='text-gray-800 py-1'>Asesoramiento nutricionalia</p>
                            <p className='text-gray-800 py-1'>Programación de prevención de enfermedadesia</p>
                        </div>
                        <div className='text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 dark:bg-slate-300'>
                            <img className='mx-auto' src={logoConsulting} alt="" />
                            <h3 className='text-lg font-medium pt-8 pb-2'>Contactos</h3>
                            <p className='py-4 text-teal-600'>Estamos aquí para servirte y cuidar de tus seres queridos, Si necesitas uan cita o tienes alguna pregunsta, no dudes en ponerte en contacto con nosotros. Estamos emocionados de formar parte detu viaje en el cuidado de tus mascotas</p>
                            <p className='text-gray-800 py-1'>(+62) 8939123</p>
                            <p className='text-gray-800 py-1'>agenciacnEPN@gmail.com</p>
                        </div>
                        
                    </div>
                </section>

            </main>

        </div>
    )
}
