import { useNavigate, useLocation } from "react-router-dom"; // Adicionado useLocation
import CardPostagens from "../cardpostagens/CardPostagens";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import CardTeste from "../cardpostagens/CardTeste";
import Tema from "../../../models/Tema";

function ListaPostagens() {
    const navigate = useNavigate();
    const location = useLocation(); // Hook para obter a rota atual
    const [postagens, setPostagens] = useState<Postagem[]>([]);
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;
    const [temas, setTemas] = useState<Tema[]>([]);
    const [tema, setTema] = useState<Tema>({ id: 0, descricao: "" });
    const [temaSelecionado, setTemaSelecionado] = useState<string>('');

    async function buscarTemaPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes("403")) {
                handleLogout();
            }
        }
    }

    async function buscarPostagens() {
        try {
            await buscar('/postagens', setPostagens, {
                headers: {
                    Authorization: token,
                },
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', "warning");
            navigate('/');
        }
    }, [token]);

    useEffect(() => {
        buscarPostagens();
    }, [postagens.length]);

    useEffect(() => {
        async function buscarTemas() {
            try {
                await buscar('/temas', setTemas, {
                    headers: { Authorization: token },
                });
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                }
            }
        }
        buscarTemas();
    }, []);

    function handleTemaChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setTemaSelecionado(e.target.value);
    }

    const postagensFiltradas = temaSelecionado
        ? postagens.filter((postagem) => postagem.tema?.id?.toString() === temaSelecionado)
        : postagens;

    // Temas que possuem pelo menos uma postagem
    const temasComPostagem = temas.filter((tema) =>
        postagens.some((postagem) => postagem.tema?.id === tema.id)
    );

    return (
        <>
            {postagens.length === 0 && (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            
            <div
                className={`flex flex-col items-center w-full my-4 ${
                    location.pathname === "/home" ? "" : "mt-14"
                }`}
            >
                
                <form
                    action=""
                    className="flex flex-col w-full max-w-4xl mb-4 lg:mr-36 lg:items-end"
                >
                    <div className="flex flex-row items-center gap-2">
                        <label
                            htmlFor="tema"
                            className="text-indigo-400 text-lg font-bold whitespace-nowrap ml-[1px] lg:ml-0 px-2 py-1 drop-shadow"
                        >
                            Filtrar por tema:
                        </label>
                        <select
                            name="tema"
                            id="tema"
                            className="border-2 w-3/5 lg:w-2/3 border-gray-500 bg-slate-700 text-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={temaSelecionado}
                            onChange={handleTemaChange}
                        >
                            <option value="">Todos os temas</option>
                            {temasComPostagem.map((tema) => (
                                <option key={tema.id} value={tema.id}>
                                    {tema.descricao}
                                </option>
                            ))}
                        </select>
                    </div>
                </form>
                <div className="w-full max-w-4xl">
                    {postagensFiltradas
                        .slice()
                        .reverse()
                        .map((postagem) => (
                            <CardPostagens key={postagem.id} postagem={postagem} />
                        ))}
                </div>
            </div>
        </>
    );
}

export default ListaPostagens;