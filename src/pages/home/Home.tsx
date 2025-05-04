import ListaPostagens from "../../components/postagens/listapostagens/ListaPostagens"
import ModalPostagem from "../../components/postagens/modalpostagem/ModalPostagem"

function Home() {
    return (
        <>
            <div className="bg-cover bg-center flex justify-center bg-slate-600 py-8">
                <div className="container text-white text-center">
                    <div className="flex flex-col gap-4 items-center justify-center">
                        <h2 className="text-5xl font-bold">Seja Bem Vindo/a!</h2>
                        <p className="text-xl">Expresse aqui seus pensamentos e opiniões</p>

                        <div className="flex justify-around gap-4">
                            <ModalPostagem />
                        </div>
                    </div>
                </div>
            </div>

            <ListaPostagens />
        </>
    )
}

export default Home