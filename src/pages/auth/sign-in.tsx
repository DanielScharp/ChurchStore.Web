import { api } from '@/services/api'

import {useState} from 'react'

import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Helmet } from 'react-helmet-async'


export function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function login(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        const data = {
            email, password
        };
        const response = await api.get('api/Usuarios/listar');
        alert(response.data)
        return false;
        
        try {

            localStorage.setItem('email', email);
            localStorage.setItem('token', response.data)

            navigate('/Dashboard')
        }
        catch(error) {
            alert('login falhou' + (error))
        }
    }

    return(
        <>
            <Helmet title='Login' />
            <div className='p-8'>
                <Button variant="ghost" asChild className='absolute right-8 top-8'>
                    <Link to="/sign-up">
                        Novo estabelecimento
                    </Link>
                </Button>
                <div className='w-[350px] flex flex-col justify-center gap-6'>
                    <div className='flex flex-col gap-2 text-center'>
                        <h1 className='text-2xl font-semibold tracking-tight'>
                            Acessar painel
                        </h1>
                        <p className='text-sm text-muted-foreground'>
                            Acompanhe suas vendas pelo painel do parceiro!
                        </p>
                    </div>
                </div>
                <form onSubmit={login} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='email'>Seu e-mail</Label>
                        <Input 
                            id='email' 
                            type='email'
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='password'>Sua senha</Label>
                        <Input 
                            id='password' 
                            type='password'
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                        />
                    </div>

                    <Button type='submit' className='w-full'>
                        Acessar painel
                    </Button>
                </form>
            </div>
        </>
    )
}