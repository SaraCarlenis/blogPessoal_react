import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom"
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import axios from "axios";
import { ClipLoader } from "react-spinners";

function Cadastro() {

  // Objeto responsável por: Redireccionar o usuário para uma outra rota
  const navigate = useNavigate();

  // Estado responsável por controlar o loader (animação de carregamento)
  const [isLoading, setIsloading] = useState<boolean>(false);

  // Estado responsável por guardar os dados do usuario
  // que serão persistidos (gravados) no banco de dados da minha API
  const [usuario, setUsuario] =useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
  })

  // Estado responsável por guardar a senha digitada no campo confirmar senha
  const [confirmarSenha, setConfirmarSenha] = useState<string>('');

  // Tratar do efeito colateral do sucesso do cadastro
  // Redirecionar para a pag de Login
  useEffect( () => {
    if (usuario.id !== 0){
      retornar();
    }
  }), [usuario]

  //Função responsável por atualizar o estado usuário
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    }) 
  }
  // Função responsável por atualizar o estado confirmar senha
  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
    setConfirmarSenha(e.target.value)
  }

  // Função responsavél por enviar uma requisição do tipo POST
  // com os dados do usuário
  async function cadastrarNovoUsuario(e: SyntheticEvent<HTMLFormElement>){

    // Impede o envio automático do formulário
    e.preventDefault();

    // Validação da senha digitada
    if (confirmarSenha !== usuario.senha || usuario.senha.length < 8){
      alert("Senhas não conferem e/ou não possuem pelo menos 8 caracteres");
      setUsuario({...usuario, senha: ''});
      setConfirmarSenha('');
      return;
    }


    // Mudar estado do carregamento (animações na tela)
    setIsloading(true);
    
    // Depois que valida a senha, começa o processo do envio da requisição
    try{

      await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
      alert("Usuário cadastrado com sucesso!");
    }catch(error){
      if(axios.isAxiosError(error) && error.response){
        alert(`Erro ao cadastrar o usuário: ${error.response.status}`)
      }else{
        alert("Erro ao cadastrar o usuário! Verifique a conexão com a API")
      }
    }finally{
      setIsloading(false)
    }
  }

  function retornar(){
    navigate('/');
  }

  console.log("Confirmando Senha: ", confirmarSenha)
  console.log(JSON.stringify(usuario))

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen
              place-items-center font-bold">
        <div
          className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat
                    w-full min-h-screen bg-cover bg-center"  
    ></div>
    <form className='flex justify-center items-center flex-col w-2/3 gap 3' 
      onSubmit={cadastrarNovoUsuario}
      >
    <h2 className='text-slate-900 text-5xl'>Cadastrar </h2>
    <div className="flex flex-col w-full">
      <label htmlFor="nome">Nome</label>
      <input 
        type="text"
        id="nome"
        name="nome"
        placeholder="Nome"
        className="border-2 border-slate-700 rounded p-2"
        value={usuario.nome}
        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
      
      />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="usuario">Usuario</label>
        <input
        type="text"
        id="usuario"
        name="usuario"
        placeholder="Usuario"
        className="border-2 border-slate-700 rounded p-2"
        value={usuario.usuario}
        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}

        />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="foto">Foto</label>
          <input
          type="text"
          id="foto"
          name="foto"
          placeholder="Foto"
          className="border-2 border-slate-700 rounded p-2"
          value={usuario.foto}
          onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}

          />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Senha"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.senha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}

          />
        </div>
        <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
            type="password"
            id="confirmarSenha"
            name="confirmarSenha"
            placeholder="Confirmar Senha"
            className="border-2 border-slate-700 rounded p-2"
            value={confirmarSenha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}

          />
        </div>
        <div className="flex justify-around w-full gap-8">
          <button
            type='reset'
            className='rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2'
            onClick={retornar}
          >
            Cancelar
          </button>
          <button
            type='submit'
            className='rounded text-white bg-indigo-400
                      hover:bg-indigo-900 w-1/2 py-2 flex justify-center'
              >

            {/* Fazendo renderização condicional (adiciona animação girando quando o cadastro for com sucesso) */}
            {
              isLoading ? (
                <ClipLoader
									color="#ffffff"
									size={24}
								/>
              ):(
                <span>Cadastrar</span>
              )
            }
            
          </button>
        </div>
      </form>
    </div>
  </>
  )
}

export default Cadastro