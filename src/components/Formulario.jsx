import { useState, useEffect } from "react";
import Alerta from "./Alerta"
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [id, setId] = useState(null);

    const [alerta, setAlerta] = useState({});
    const {guardarPaciente, paciente} = usePacientes();

    useEffect(() => {
        if(Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
            setId(paciente._id);
        }
    }, [paciente]);
   


    const handleSubmit = (e) => {
        e.preventDefault();
        // Validar formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return;
        }
       
        guardarPaciente({nombre, propietario, email, fecha, sintomas, id});
        setAlerta({
            msg: 'Guardado Correctamente',
            error: false
        });
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
        setId(null);
        

    }

    const { msg } = alerta;

  return (
    <>
    <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>
    <p className="text-center text-gray-600 font-bold text-lg mb-10">
        Añade Tus Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
    </p>



    <form className="bg-white py-10 px-5 mb-10 lg:mb-5 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <div className="mb-5">
            <label htmlFor="mascota" className="text-gray-700 uppercase font-bold">Nombre De Mascota</label>
            <input 
                type="text" 
                placeholder="Nombre De La Mascota"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">Nombre De Propietario</label>
            <input 
                type="text" 
                placeholder="Nombre Del Propietario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                value={propietario}
                onChange={e => setPropietario(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label htmlFor="email" className="text-gray-700 uppercase font-bold">Email</label>
            <input 
                type="email" 
                placeholder="Email Del Propietario"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">Fecha Alta</label>
            <input 
                type="date" 
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                value={fecha}
                onChange={e => setFecha(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold">Sintomas</label>
            <textarea 
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                placeholder="Describe los Sintomas"
                value={sintomas}
                onChange={e => setSintomas(e.target.value)}
            />
        </div>
        <input 
            type="submit"
            value={id ? 'Guardar Cambios' : 'Agregar Paciente'}
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
        />
    </form>
    {msg && <Alerta alerta={alerta}/>}
    </>
  )
}

export default Formulario