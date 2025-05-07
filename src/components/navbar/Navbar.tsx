import { ReactNode, useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { List, X } from "@phosphor-icons/react";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { usuario, handleLogout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar o menu responsivo

    function logout() {
        handleLogout();
        ToastAlerta("O Usuário foi desconectado com sucesso!", "success");
        navigate("/");
    }

    let component: ReactNode;

    if (usuario.token !== "") {
        // Navbar para usuários logados
        component = (
            <div className="w-full bg-black text-white fixed top-0 left-0 z-50">
                <div className="container mx-auto flex justify-between items-center py-4 px-6">
                    <Link to="/home" className="text-2xl font-bold">
                        Blog Pessoal
                    </Link>
                    <button
                        className="md:hidden text-white"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={28} /> : <List size={28} />}
                    </button>
                    <div
                        className={`${
                            menuOpen ? "flex" : "hidden"
                        } md:flex flex-col md:flex-row gap-4 items-center absolute md:static font-bold top-16 left-0 w-full md:w-auto bg-black md:bg-transparent z-50 md:z-auto p-4 md:p-0`}
                    >
                        <Link to="/" className="hover:underline">
                            Postagens
                        </Link>
                        <Link to="/temas" className="hover:underline">
                            Temas
                        </Link>
                        <Link to="/cadastrartema" className="hover:underline">
                            Cadastrar tema
                        </Link>
                        <Link to="/perfil" className="hover:underline">
                            Perfil
                        </Link>
                        <Link
                            to=""
                            onClick={logout}
                            className=" text-white bg-red-700 hover-bg-red-800 py-2 px-4 rounded"
                        >
                            Sair
                        </Link>
                    </div>
                </div>
            </div>
        );
    } else {
        // Navbar para usuários deslogados
        component = (
            <div className="w-full bg-black text-white fixed top-0 left-0 z-50">
                <div className="container mx-auto flex justify-between items-center py-4 px-6">
                    <Link to="/" className="text-2xl font-bold">
                        Blog Pessoal
                    </Link>
                    <button
                        className="md:hidden text-white"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={28} /> : <List size={28} />}
                    </button>
                    <div
                        className={`${
                            menuOpen ? "flex" : "hidden"
                        } md:flex flex-col md:flex-row gap-4 items-center absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent z-50 md:z-auto p-4 md:p-0`}
                    >
                        {(location.pathname === "/login" || location.pathname === "/") && (
                            <Link to="/cadastro" className="hover:underline">
                                <button className="bg-gradient-to-r bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
                                    Ainda Não Tem Conta?
                                </button>
                            </Link>
                        )}
                        {location.pathname === "/cadastro" && (
                            <Link to="/login" className="hover:underline">
                                <button className="bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
                                    Já Tem Conta?
                                </button>
                            </Link>
                            
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return <>{component}</>;
}

export default Navbar;