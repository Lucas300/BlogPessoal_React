import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import UsuarioLogin from '../../models/UsuarioLogin';
import { RotatingLines } from 'react-loader-spinner';
import ProgressBarMensagem from './ProgressBarMensagem';

function Login() {
    const navigate = useNavigate();
    const { usuario, handleLogin, isLoading } = useContext(AuthContext);

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {
            usuario:'recrutador@visitante.com',
            senha:'123456789',

        } as UsuarioLogin
    );

    const [showPassword, setShowPassword] = useState(false); // Estado para alternar a visibilidade da senha
    const [mensagem, setMensagem] = useState<string>("Este projeto está hospedado em um serviço gratuito, então o carregamento inicial pode demorar alguns segundos.");

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home');
        }
    }, [usuario]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value,
        });
    }

    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        handleLogin(usuarioLogin);
    }

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    return (
        
        <div
            className="bg-cover bg-center min-h-screen w-full flex items-center justify-center"
            style={{
                backgroundImage:
                    "url('https://wallpapers.com/images/featured/fundo-de-gradiente-azul-07xqmk2r9n9vmxli.jpg')",
            }}
        >
            <div className="absolute  left-0 w-full h-full pt-6 mt-10 mb-10 ">
                {mensagem && (
                    <ProgressBarMensagem
                        mensagem={mensagem}
                        tempo={10000}
                        onClose={() => setMensagem("")}
                    />
                )}
            </div>
            
            <div className="w-full max-w-md mt-16">
                
                <form
                    className="bg-[#1a1a1a] p-8 rounded-lg shadow-lg w-full text-white text-center relative -mt-16"
                    style={{
                        transform: "scale(0.75)", // Reduz o tamanho do formulário em 20%
                        transformOrigin: "center", // Centraliza a escala
                    }}
                    onSubmit={login}
                >
                    <h2 className="text-2xl font-bold mb-6">Logar</h2>
                    <div className="mb-4 text-left">
                        <label
                            htmlFor="usuario"
                            className="block text-sm font-medium text-gray-400 mb-2"
                        >
                            Usuário
                        </label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuário"
                            value={usuarioLogin.usuario}
                            onChange={atualizarEstado}
                            className="w-full p-3 rounded border border-gray-700 bg-[#2a2a2a] text-white font-bold placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4 text-left relative">
                        <label
                            htmlFor="senha"
                            className="block text-sm font-medium text-gray-400 mb-2"
                        >
                            Senha
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            value={usuarioLogin.senha}
                            onChange={atualizarEstado}
                            className="w-full p-3 rounded border border-gray-700 bg-[#2a2a2a] text-white font-bold placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-10 text-gray-400 hover:text-gray-200"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold transition flex items-center justify-center"
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
                            "Entrar"
                        )}
                    </button>
                    <p className="mt-4 text-sm text-gray-400">
                        Ainda não tem uma conta?{" "}
                        <Link to="/cadastro" className="text-blue-500 hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
