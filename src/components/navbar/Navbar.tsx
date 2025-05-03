import { ReactNode, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation(); // Hook para obter a rota atual
    const { usuario, handleLogout } = useContext(AuthContext);

    function logout() {
        handleLogout();
        ToastAlerta("O Usuário foi desconectado com sucesso!", "info");
        navigate("/");
    }

    let component: ReactNode;

    if (usuario.token !== "") {
        // Navbar para usuários logados
        component = (
            <div className="w-full bg-black text-white flex justify-center py-4">
                <div className="container flex justify-between text-lg">
                    <Link to="/home" className="text-2xl font-bold">
                        Blog Pessoal
                    </Link>
                    <div className="flex gap-4">
                        <Link to="/postagens" className="hover:underline">
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
                        <Link to="" onClick={logout} className="hover:underline">
                            Sair
                        </Link>
                    </div>
                </div>
            </div>
        );
    } else {
        // Navbar para usuários deslogados
        component = (
            <div className="w-full bg-black text-white flex justify-center py-4">
                <div className="container flex justify-between items-center text-lg">
                    <Link to="/" className="text-2xl font-bold">
                        Blog Pessoal
                    </Link>
                    <div className="flex gap-4">
                        {(location.pathname === "/login" || location.pathname === "/") && (
                            <Link to="/cadastro" className="hover:underline">
                                <button className="bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
                                    Ainda não tem uma conta?
                                </button>
                            </Link>
                        )}
                        {location.pathname === "/cadastro" && (
                            <Link to="/login" className="hover:underline">
                                <button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
                                    Já tem uma conta?
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