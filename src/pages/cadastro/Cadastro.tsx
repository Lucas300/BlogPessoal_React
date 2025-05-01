import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Usuario from '../../models/Usuario';
import { cadastrarUsuario } from '../../services/Service';

function Cadastro() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [confirmaSenha, setConfirmaSenha] = useState<string>('');
    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    });

    useEffect(() => {
        if (usuario.id !== 0) {
            retornar();
        }
    }, [usuario]);

    function retornar() {
        navigate('/login');
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmaSenha(e.target.value);
    }

    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
            setIsLoading(true);

            try {
                await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
                alert('Usuário cadastrado com sucesso!');
            } catch (error) {
                alert('Erro ao cadastrar o usuário!');
            }
        } else {
            alert('Dados do usuário inconsistentes! Verifique as informações do cadastro.');
            setUsuario({ ...usuario, senha: '' });
            setConfirmaSenha('');
        }

        setIsLoading(false);
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <form
                className="bg-[#2a2a2a] p-8 rounded-lg shadow-lg w-full max-w-md text-white"
                onSubmit={cadastrarNovoUsuario}
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Crie sua conta</h2>
                <div className="mb-4">
                    
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        placeholder="Nome"
                        value={usuario.nome}
                        onChange={atualizarEstado}
                        className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    
                    <input
                        type="text"
                        id="usuario"
                        name="usuario"
                        placeholder="Usuário"
                        value={usuario.usuario}
                        onChange={atualizarEstado}
                        className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    
                    <input
                        type="text"
                        id="foto"
                        name="foto"
                        placeholder="Foto"
                        value={usuario.foto}
                        onChange={atualizarEstado}
                        className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        placeholder="Senha"
                        value={usuario.senha}
                        onChange={atualizarEstado}
                        className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    
                    <input
                        type="password"
                        id="confirmarSenha"
                        name="confirmarSenha"
                        placeholder="Confirmar Senha"
                        value={confirmaSenha}
                        onChange={handleConfirmarSenha}
                        className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 rounded text-white font-bold transition bg-[#007bff] hover:bg-[#0056b3]"
                >
                    {isLoading ? 'Carregando...' : 'Cadastrar'}
                </button>
                <div
                    className="w-full py-3 mt-4 rounded transition text-white font-bold text-center"
                >
                    <p className="text-sm">
                        Já tem uma conta?{' '}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Logar
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Cadastro;
