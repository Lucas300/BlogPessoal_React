import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Usuario from '../../models/Usuario';
import { cadastrarUsuario } from '../../services/Service';
import { ToastAlerta } from '../../utils/ToastAlerta';

function Cadastro() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmaSenha, setConfirmaSenha] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
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

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);

      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
        ToastAlerta("Usuário cadastrado com sucesso!","success");
      } catch (error) {
        ToastAlerta('Erro ao cadastrar o usuário!',"error");
      }
    } else {
      ToastAlerta('Dados do usuário inconsistentes! Verifique as informações do cadastro.',"warning");
      setUsuario({ ...usuario, senha: '' });
      setConfirmaSenha('');
    }

    setIsLoading(false);
  }

  return (
    <div className='' >
      <div className="bg-cover bg-center min-h-screen w-full flex items-center justify-center" style={{ backgroundImage: "url('https://img.freepik.com/fotos-gratis/fundo-de-papel-de-parede-colorido-embacado-artistico_58702-8303.jpg?semt=ais_hybrid&w=740')" }}>
        <form
          className="bg-[#1a1a1a] p-8 rounded-lg shadow-lg w-full max-w-md text-white"
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
              className="w-full p-3 rounded border border-[#333] bg-[#2a2a2a] text-white font-bold placeholder-[#666] focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full p-3 rounded border border-[#333] bg-[#2a2a2a] text-white font-bold placeholder-[#666] focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full p-3 rounded border border-[#333] bg-[#2a2a2a] text-white font-bold placeholder-[#666] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="senha"
              name="senha"
              placeholder="Senha"
              value={usuario.senha}
              onChange={atualizarEstado}
              className="w-full p-3 rounded border border-[#333] bg-[#2a2a2a] text-white font-bold placeholder-[#666] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              value={confirmaSenha}
              onChange={handleConfirmarSenha}
              className="w-full p-3 rounded border border-[#333] bg-[#2a2a2a] text-white font-bold placeholder-[#666] focus:outline-none focus:ring-2 focus:ring-blue-500"
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
    </div>
  );
}

export default Cadastro;
