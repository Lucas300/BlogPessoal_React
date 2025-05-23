import { GithubLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";
import React, { useContext } from "react";
import Postagem from "../../../models/Postagem";
import { AuthContext } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";

interface CardPostagensProps {
  postagem: Postagem;
}

function CardPostagens({ postagem }: CardPostagensProps) {
  const { usuario } = useContext(AuthContext);

  const link = '	https://picsum.photos/600/300'

  return (
    <div className="bg-gray-900 text-white max-w-3xl mx-2 lg:mx-auto mb-10 rounded-lg shadow-lg overflow-hidden border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        
        <div className="flex items-center gap-4">
          {/* Imagem de perfil */}
          {postagem.usuario?.foto ? (
            <img
              src={postagem.usuario.foto}
              alt="Perfil"
              className="w-14 h-14 rounded-full object-cover border border-gray-600"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white">
              ?
            </div>
          )}
          <div>
            <h2 className="font-semibold text-lg">{postagem.usuario?.nome || "Usuário desconhecido"}</h2>
            <p className="text-sm text-gray-400">
              {postagem.data
                ? new Intl.DateTimeFormat(undefined, {
                    dateStyle: "full",
                    timeStyle: "medium",
                  }).format(new Date(postagem.data))
                : "Data não disponível"}
            </p>
          </div>
        </div>
        {/* Redes sociais */}
        <div className="flex gap-4">
          {postagem.linkedin && (
            <a
              href={postagem.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 transition"
            >
              <LinkedinLogo size={32} weight="bold" />
            </a>
          )}
          {postagem.github && (
            <a
              href={postagem.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-gray-400 transition"
            >
              <GithubLogo size={32} weight="bold" />
            </a>
          )}
        </div>
      </div>

      {/* Image */}
      <div className="relative">
        {postagem.imagem ? (
          <img src={postagem.imagem} alt="Capa" className="w-full h-56 object-cover" />
        ) : (
          <div className="w-full h-56 bg-gray-700 flex items-center justify-center text-white">
            Imagem não disponível 
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        <h3 className="text-2xl font-bold">{postagem.titulo || "Título não disponível"}</h3>
        <p className="text-gray-400 text-sm">#{postagem.tema?.descricao || "Tema não disponível"}</p>

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
      {
                postagem.usuario?.id === usuario.id ? (
                    <div className="flex">
                        <Link to={`/editarpostagem/${postagem.id}`}
                            className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 
        flex items-center justify-center py-2'>
                            <button>Editar</button>
                        </Link>
                        <Link to={`/deletarpostagem/${postagem.id}`}
                            className='text-white bg-red-400 
        hover:bg-red-700 w-full flex items-center justify-center'>
                            <button>Deletar</button>
                        </Link>
                    </div>
                ) : (
                    <h2 style={{ marginLeft: '10px',paddingBottom:'10px' ,textAlign: 'center' }}>só <span style={{ color: '#008000' }}>{postagem.usuario?.nome}</span> pode editar esse post</h2>
                )
            }
    </div>
  );
}

export default CardPostagens;