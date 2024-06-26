import { api } from '../services/api';
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useRef, FormEvent, useEffect } from 'react';
import { RiLockPasswordFill, RiUser6Fill  } from "react-icons/ri";

export default function Login() {

  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const rememberMeRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => { // Verifica se o usuário já está logado, se estiver, redireciona para a página de perfil
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    if (token && id) {
      getLogin(id, token, navigate);
    }
  }, []);

  async function getLogin(id: string, token: string, navigate: any) {
    try {
      const response = await api.get(`/login?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const userData = response.data;
      console.log(userData);
      navigate('/profile', { state: { userID: id } });
    } catch (error) {
      alert((error as any).response.data.message);
    }
  }

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    if (!emailRef.current || !passwordRef.current) {
      alert('Preencha todos os campos');
      return;
    }
    try {
      const response = await api.post('/login', {
        email: emailRef.current?.value,
        password: passwordRef.current?.value
      });
      const fetchData = response.data;
      const token = fetchData.data.token;
      const id = fetchData.data.id;
      localStorage.clear();
      sessionStorage.clear();
      if (rememberMeRef.current?.checked) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }
      getLogin(id, token, navigate);
    } catch (error) {
      alert((error as any).response.data.message);
    }
  }
  
  return(
    <div className='w-full min-h-screen bg-gray-900 flex justify-center items-center px-4'>
      <main className='my-10 w-2/4 lg:w-1/4'>
        <h1 className='text-4xl text-center text-white tracking-wide'>LOGIN</h1>
        <form className='flex flex-col my-6 bg-white  p-4 rounded shadow-md' onSubmit={handleLogin}>
          <div className='relative'>
            <input 
            className='w-full mb-5 p-2 outline-none border-b-2 border-gray-300'
            type="email" 
            placeholder="Email" 
            ref={emailRef}
            autoComplete='email'
            />
            <RiUser6Fill className='absolute text-black top-3 right-0' size={20}/>
          </div>
          <div className='relative'>
            <input 
            className='w-full mb-5 p-2 outline-none border-b-2 border-gray-300'
            type="password" 
            placeholder="Senha" 
            ref={passwordRef}
            autoComplete='current-password'
            />
            <RiLockPasswordFill className='absolute text-black top-3 right-0' size={20}/>
          </div>
          <label className='flex items-center mb-5'>
            <input 
              type='checkbox' 
              className='mr-2'
              ref={rememberMeRef}
            />
            Lembre-se de mim
          </label>
          <input 
          className='w-full mb-5 p-2 outline-none bg-indigo-500 font-medium text-white cursor-pointer hover:scale-105 hover:bg-indigo-600-500 duration-200 rounded-sm'
          id='submit' 
          type='submit' 
          value='Login'
          />
          <Outlet />
          <label> 
            Ainda nao possui uma conta?
            <Link className='text-blue-500 ml-1' to={'signup'}> 
            Registre-se! 
            </Link>
          </label>
        </form>
      </main>
    </div>
  )
}