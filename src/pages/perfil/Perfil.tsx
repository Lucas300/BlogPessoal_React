import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import { ToastAlerta } from '../../utils/ToastAlerta'

function Perfil() {

    const navigate = useNavigate()

    const { usuario } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token === "") {
            ToastAlerta('Você precisa estar logado','info')
            navigate("/")
        }
    }, [usuario.token])

    return (
        <div className='pr-[20px] ml-[10px] md:mx-auto m-4 rounded-2xl w-full md:w-2/3 overflow-hidden mt-24'>

            <img 
                className='w-full h-40 md:h-72 object-cover border-b-8 border-white rounded-t-2xl' 
                src="https://blog.ead.unipar.br/wp-content/uploads/2021/03/ti.jpg" 
                alt="Capa do Perfil" />

            <img 
                className='rounded-full w-40 md:w-56 mx-auto mt-[-5rem] md:mt-[-8rem] border-8 border-white relative z-10' 
                src={usuario.foto} alt={`Foto de perfil de ${usuario.nome}`} />

            <div 
                className="rounded-b-2xl relative mt-[-3rem] md:mt-[-6rem] h-56 md:h-72 flex flex-col 
                    bg-slate-900 text-white text-xl md:text-2xl items-center justify-center"
            >
                <p>Nome: {usuario.nome} </p>
                <p className='text-center'>Email: {usuario.usuario}</p>
            </div>

        </div>
    )
}

export default Perfil