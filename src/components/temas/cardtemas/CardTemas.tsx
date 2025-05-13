import { Link } from "react-router-dom";
import Tema from "../../../models/Tema";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

interface CardTemasProps {
    tema: Tema;
}

function CardTemas({ tema }: CardTemasProps) {
    const { usuario } = useContext(AuthContext);

    return (
        <div className="border mx-2 flex flex-row items-center rounded-2xl overflow-hidden justify-between bg-slate-800 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
            {/* Conteúdo do card */}
            <div className="flex flex-col flex-grow p-6">
                <header className="text-black font-bold text-3xl text-center mb-2">
                    Tema
                </header>
                <p className="text-2xl text-white text-center font-bold ">{tema.descricao}</p>
            </div>

            {/* Botões na lateral */}
            <div className="flex flex-col items-center gap-2 p-4">
                {/* Botão Editar */}
                <Link
                    to={`/editartema/${tema.id}`}
                    className="w-10 h-10 bg-indigo-500 hover:bg-indigo-700 text-white flex items-center justify-center rounded-full transition duration-300"
                    title="Editar Tema"
                >
                    ✏️
                </Link>

                {/* Botão Deletar */}
                <Link
                    to={`/deletartema/${tema.id}`}
                    className="w-10 h-10 bg-red-500 hover:bg-red-700 text-white flex items-center justify-center rounded-full transition duration-300"
                    title="Deletar Tema"
                >
                    🗑️
                </Link>
            </div>
        </div>
    );
}

export default CardTemas;