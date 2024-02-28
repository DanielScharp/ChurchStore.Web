import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'


export function SignUp(){
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
                <form className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='managerName'>Nome completo</Label>
                        <Input 
                            id='managerName' 
                            type='text' 
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='email'>Seu e-mail</Label>
                        <Input id='email' type='email' />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='phone'>Seu celular</Label>
                        <Input id='phone' type='tel' />
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