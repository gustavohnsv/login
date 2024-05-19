import { Outlet, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useRef, FormEvent } from 'react';

export default function SignUp() {
    
    const navigate = useNavigate();

    const nameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

    async function handleSign(event: FormEvent) {
        event.preventDefault();
        if (!nameRef.current || !emailRef.current || !passwordRef.current || !confirmPasswordRef.current) {
            alert('Preencha todos os campos');
            return;
        }
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            alert('As senhas não coincidem');
            return;
        }
        try {
            const response = await api.post('/user', {
                email: emailRef.current?.value,
                password: passwordRef.current?.value,
                name: nameRef.current?.value,
                photoID: Math.floor(Math.random() * 11)
            });
            console.log(response.data);
            nameRef.current.value = '';
            emailRef.current.value = '';
            passwordRef.current.value = '';
            confirmPasswordRef.current.value = '';
            alert("Cadastrado com sucesso!");
            navigate('/');
            
        } catch (error) {
            alert((error as any).response.data.message);
        }
    }

    return(
        <div className='w-full min-h-screen bg-gray-900 flex justify-center items-center px-4'>
            <main className='my-10 w-2/4 lg:w-1/4'>
                <h1 className='text-4xl text-center text-white tracking-wide'>SIGN UP</h1>
                <form className='flex flex-col my-6 bg-white  p-4 rounded shadow-md' onSubmit={handleSign}>
                    <div className='mt-2 mb-2'>
                        <input 
                            className='w-full mb-5 p-2 outline-none border-b-2 border-gray-300'
                            type="text" 
                            placeholder="Nome" 
                            ref={nameRef}
                        />
                        <input 
                            className='w-full mb-5 p-2 outline-none border-b-2 border-gray-300'
                            type="email" 
                            placeholder="Email" 
                            ref={emailRef}
                        />
                        <input 
                            className='w-full mb-5 p-2 outline-none border-b-2 border-gray-300'
                            type="password" 
                            placeholder="Senha" 
                            ref={passwordRef}
                        />
                        <input 
                            className='w-full mb-5 p-2 outline-none border-b-2 border-gray-300'
                            type="password" 
                            placeholder="Confirme sua senha" 
                            ref={confirmPasswordRef}
                        />
                    </div>
                    <input 
                    className='w-full mb-5 p-2 outline-none bg-green-500 font-medium text-white cursor-pointer hover:scale-105 hover:bg-indigo-600-500 duration-200 rounded-sm'
                    id='submit' 
                    type='submit' 
                    value='Cadastrar'
                    />
                    <Outlet />
                    <label> 
                        Já tem uma conta?
                        <Link className='text-blue-500 ml-1' to={'/'}> 
                        Faça login!
                        </Link>
                    </label>
                </form>
            </main>
        </div>
    )
}