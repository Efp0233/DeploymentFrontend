import { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";

const EditarPerfil = () => {
    const {auth, ActualizarPerfil} = useAuth();
    const [Perfil, setPerfil] = useState({});
    const [alerta, setAlerta] = useState({});

    useEffect(() => {
       setPerfil(auth);
    }, [auth]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {nombre, email} = Perfil;

        if([nombre, email].includes('')){
            setAlerta({
                msg :'email y nombre son obligatorios',
                error: true
            })
            return;    
        }

        const resultado = await ActualizarPerfil(Perfil);
        setAlerta(resultado);
       
    }

    const { msg } = alerta;
  return (
    <>
        <AdminNav/>
        <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica Tu {''} <span className="text-indigo-600 font-bold">Informacion Aqui</span></p>
        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                {msg && <Alerta alerta={alerta}/>}
                <form onSubmit={handleSubmit} >
                   <div className="my-3">
                        <label htmlFor="" className="uppercase font-bold text-gray-600">Nombre</label>
                        <input type="text" name="Nombre" className="border w-full p-2 mt-5 bg-gray-50 rounded-lg" value={Perfil.nombre || ''}
                        onChange={e => setPerfil({...Perfil, [e.target.name] : e.target.value})}
                    />
                  
                   </div>
                    <div className="my-3">
                        <label htmlFor="" className="uppercase font-bold text-gray-600">Sitio Web</label>
                        <input type="text" name="web" className="border w-full p-2 mt-5 bg-gray-50 rounded-lg" value={Perfil.web || ''}
                        onChange={e => setPerfil({...Perfil, [e.target.name] : e.target.value})}/>
                    </div>
                    <div className="my-3">
                        <label htmlFor="" className="uppercase font-bold text-gray-600">Telefono</label>
                        <input type="text" name="telefono" className="border w-full p-2 mt-5 bg-gray-50 rounded-lg" value={Perfil.telefono || ''}
                        onChange={e => setPerfil({...Perfil, [e.target.name] : e.target.value})}/>
                    </div> 
                    <div className="my-3">
                        <label htmlFor="" className="uppercase font-bold text-gray-600">Email</label>
                        <input type="email" name="email" className="border w-full p-2 mt-5 bg-gray-50 rounded-lg" value={Perfil.email || ''}
                        onChange={e => setPerfil({...Perfil, [e.target.name] : e.target.value})}/>
                    </div>
                    <input type="submit" value="Guardar Cambios" className="bg-indigo-700 text-white px-10 py-3 font-bold rounded-lg uppercase w-full mt-5"  />
                </form>
            </div>
        </div>
    </>
    
  )
}

export default EditarPerfil;