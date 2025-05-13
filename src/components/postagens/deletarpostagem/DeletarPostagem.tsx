import { useState, useContext, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import Postagem from "../../../models/Postagem"
import { buscar, deletar } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"
import { ToastAlerta } from "../../../utils/ToastAlerta"
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react"

function DeletarPostagem() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
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

    async function deletarPostagem() {
        setIsLoading(true)

        try {
            await deletar(`/postagens/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta('Postagem apagada com sucesso', "sucesso")

        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            } else {
                ToastAlerta('Erro ao deletar a postagem.', "erro")
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/home")
    }

    return (
        <div className="container w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-20 mb-10">
            <p className="text-center font-semibold mb-6 text-white text-2xl sm:text-3xl lg:text-4xl">
                Você tem certeza de que deseja apagar a postagem a seguir?
            </p>

            <div className="flex flex-col rounded-2xl overflow-hidden justify-between bg-gray-900 shadow-lg border border-gray-700">
                <div className="p-6 sm:p-8 space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                        {postagem.titulo || "Título não disponível"}
                    </h3>
                    <p className="text-gray-400 text-sm sm:text-base">
                        #{postagem.tema?.descricao || "Tema não disponível"}
                    </p>

                    <div className="bg-gray-800 p-4 rounded-lg mt-2">
                        {postagem.texto ? (
                            postagem.texto.split("\n").map((p, idx) => (
                                <p key={idx} className="text-gray-200 mb-2">
                                    {p}
                                </p>
                            ))
                        ) : (
                            <p className="text-gray-400">Texto não disponível</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
                <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 w-full sm:w-auto"
                    onClick={retornar}
                >
                    Não
                </button>
                <button
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 w-full sm:w-auto flex justify-center items-center"
                    onClick={deletarPostagem}
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
    )
}

export default DeletarPostagem