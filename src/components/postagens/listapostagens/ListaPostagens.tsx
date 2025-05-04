import { useNavigate } from "react-router-dom";
import CardPostagens from "../cardpostagens/CardPostagens";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { BlogCard } from "../cardpostagens/CardTeste";

function ListaPostagens() {

    const navigate = useNavigate();

    const [postagens, setPostagens] = useState<Postagem[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarPostagens() {
        try {
            await buscar('/postagens', setPostagens, {
                headers: {
                    Authorization: token,
                },
            })

        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', "warning")
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarPostagens()
    }, [postagens.length])

    return (
        <>
            {/* {postagens.length === 0 && (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col mx-2">
                    <div className='container mx-auto my-4 
                        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                    >
                        {postagens.map((postagem) => (
                            <CardPostagens key={postagem.id} postagem={postagem} />
                        ))}
                    </div>
                </div>
            </div> */}
            <div className="flex justify-center w-full my-4">
                <div className="w-full max-w-4xl ">
                    <BlogCard
                        author="Lucas Daniel"
                        date="30/04/2025 15:47"
                        imageUrl="https://totalip.com.br/wp-content/uploads/2023/08/A-tecnologia-impulsiona-o-futuro-do-Brasil.png.webp"
                        title="Por Que Você Ainda Não Foi Chamado para Entrevistas?"
                        tag="Mentalidade de Crescimento"
                        subtitle="Os Erros Invisíveis no Seu Perfil Que Estão Travando Sua Carreira Tech"
                        paragraphs={[
                            "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sdasda lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sdasda lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sdasda lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        ]}
                        pointTitle="Seu currículo não mostra o que você realmente sabe fazer"
                        pointText="Um erro comum entre profissionais tech é listar ferramentas sem contextualizar..."
                    />
                    <div className="my-4" />
                    <BlogCard
                        author="Lucas Daniel"
                        date="30/04/2025 15:47"
                        imageUrl="https://totalip.com.br/wp-content/uploads/2023/08/A-tecnologia-impulsiona-o-futuro-do-Brasil.png.webp"
                        title="Por Que Você Ainda Não Foi Chamado para Entrevistas?"
                        tag="Mentalidade de Crescimento"
                        subtitle="Os Erros Invisíveis no Seu Perfil Que Estão Travando Sua Carreira Tech"
                        paragraphs={[
                            "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sdasda lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sdasda lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sdasda lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        ]}
                        pointTitle="Seu currículo não mostra o que você realmente sabe fazer"
                        pointText="Um erro comum entre profissionais tech é listar ferramentas sem contextualizar..."
                    />

                </div>
            </div>
        </>
    );
}

export default ListaPostagens;