import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/services/api'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'


export function SignUp(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    async function cadastar(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        const data = {
            nome, email, senha
        };

        const response = await api.post('api/usuarios/cadastrar', data);
        alert(response)
        
        try {
            navigate('/sign-in')
        }
        catch(error) {
            alert('o cadastro falhou ' + (error))
        }
    }

    return(
        <>
            <Helmet title='Cadastro' />
            <div className='p-8'>
                <Button variant="ghost" asChild className='absolute right-8 top-8'>
                    <Link to="/sign-in">
                        Fazer login
                    </Link>
                </Button>
                <div className='flex flex-col justify-center gap-6'>
                    <div className='flex flex-col gap-2 text-center'>
                        <h1 className='text-2xl font-semibold tracking-tight'>
                            Criar conta grátis
                        </h1>
                        <p className='text-sm text-muted-foreground'>
                            Seja um parceiro e comece suas vendas!
                        </p>
                    </div>
                </div>
                <form onSubmit={cadastar} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='nome'>Nome completo</Label>
                        <Input 
                            id='nome' 
                            type='text' 
                            value={nome}
                            onChange={e=>setNome(e.target.value)}
                        />
                    </div>
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
                        <Label htmlFor='senha'>Sua senha</Label>
                        <Input 
                            id='senha' 
                            type='password' 
                            value={senha}
                            onChange={e=>setSenha(e.target.value)}
                        />
                    </div>

                    <Button type='submit' className='w-full'>
                        Finalizar cadastro
                    </Button>

                    <p className='px-6 text-center text-sm leading-relaxed text-muted-foreground'>
                        Ao continuar, você concorda com nossos <a className='underline underline-offset-4' href="#">Termos de serviço</a> e <a className='underline underline-offset-4' href="#">políticas de privacidade</a>.
                    </p>
                </form>
            </div>
        </>
    )
}