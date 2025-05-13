import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import Tema from "../../../models/Tema"
import { buscar, deletar } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarTema() {

    const navigate = useNavigate()

    const [tema, setTema] = useState<Tema>({} as Tema)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', "info")
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarTema() {
        setIsLoading(true)

        try {
            await deletar(`/temas/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta('Tema apagado com sucesso', "sucesso")

        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao deletar o tema.', "erro")
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/temas")
    }

    return (
        <div className="container w-full max-w-lg mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-20">
            <p className="text-center font-semibold mb-4 text-2xl sm:text-3xl lg:text-4xl text-white">
                Você tem certeza de que deseja apagar o tema a seguir?
            </p>
            <div className="border flex flex-col rounded-2xl overflow-hidden justify-between bg-slate-700 shadow-lg">
                <p className="p-6 sm:p-8 text-xl sm:text-2xl lg:text-3xl text-center text-white h-full">
                    {tema.descricao}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-6 sm:mb-10 px-4">
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 w-full sm:w-auto"
                        onClick={retornar}
                    >
                        Não
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 w-full sm:w-auto"
                        onClick={deletarTema}
                    >
                        {isLoading ? (
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            />
                        ) : (
                            <span>Sim</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeletarTema