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
                <div className="container mx-auto flex justify-between items-center py-3 px-5">
                    <Link to="/home" className="text-xl font-bold md:ml-20 lg:ml-20">
                        Blog Pessoal
                    </Link>
                    <button
                        className="md:hidden text-white"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={22} /> : <List size={22} />}
                    </button>
                    <div
                        className={`${
                            menuOpen ? "flex" : "hidden"
                        } md:flex flex-col md:flex-row gap-3 items-center absolute md:static font-bold top-14 left-0 w-full md:w-auto bg-black md:bg-transparent z-50 md:z-auto p-3 md:p-0`}
                    >
                        <Link to="/" onClick={() => setMenuOpen(!menuOpen)} className="hover:underline text-sm">
                            Postagens
                        </Link>
                        <Link to="/temas" onClick={() => setMenuOpen(!menuOpen)} className="hover:underline text-sm">
                            Temas
                        </Link>
                        <Link to="/cadastrartema" onClick={() => setMenuOpen(!menuOpen)} className="hover:underline text-sm">
                            Cadastrar tema
                        </Link>
                        <Link to="/perfil" onClick={() => setMenuOpen(!menuOpen)} className="hover:underline text-sm">
                            Perfil
                        </Link>
                        <Link
                            to=""
                            onClick={logout}
                            className="text-white bg-red-700 hover:bg-red-800 py-1 px-3 rounded text-sm"
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
                <div className="container mx-auto flex justify-between items-center py-3 px-5 ">
                    <Link to="/" className="text-xl font-bold md:ml-20 lg:ml-20">
                        Blog Pessoal
                    </Link>
                    <button
                        className="md:hidden text-white"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={22} /> : <List size={22} />}
                    </button>
                    <div
                        className={`${
                            menuOpen ? "flex" : "hidden"
                        } md:flex flex-col md:flex-row gap-3 items-center absolute md:static top-14 left-0 w-full md:w-auto bg-black md:bg-transparent z-50 md:z-auto p-3 md:p-0`}
                    >
                        {(location.pathname === "/login" || location.pathname === "/") && (
                            <Link to="/cadastro" className="hover:underline">
                                <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold py-2 px-6 text-xs rounded-xl shadow-md h-9 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out md:mr-16 lg:mr-16">
                                
                                    Ainda Não Tem Conta?
                                </button>
                            </Link>
                        )}
                        {location.pathname === "/cadastro" && (
                            <Link to="/login" className="hover:underline">
                                <button className="bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 text-white py-2 px-4 text-xs rounded-xl font-bold shadow-md h-9 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out md:mr-16 lg:mr-16">
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