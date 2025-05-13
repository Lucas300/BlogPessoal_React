import { useNavigate, useLocation } from "react-router-dom"; // Adicionado useLocation
import CardPostagens from "../cardpostagens/CardPostagens";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import CardTeste from "../cardpostagens/CardTeste";

function ListaPostagens() {
    const navigate = useNavigate();
    const location = useLocation(); // Hook para obter a rota atual
    const [postagens, setPostagens] = useState<Postagem[]>([]);
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

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
                className={`flex justify-center w-full my-4 ${
                    location.pathname === "/home" ? "" : "mt-14"
                }`}
            >
                <div className="w-full max-w-4xl">
                    {postagens
                        .slice() // Cria uma cópia do array para evitar mutações
                        .reverse() // Inverte a ordem das postagens
                        .map((postagem) => (
                            <CardPostagens key={postagem.id} postagem={postagem} />
                        ))}
                </div>
            </div>
        </>
    );
}

export default ListaPostagens;