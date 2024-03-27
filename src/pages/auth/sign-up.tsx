import { registerUser } from '@/api/register'
import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

const signUpForm = z.object({
    nome: z.string(),
    telefone: z.string(),
    senha: z.string(),
    confirmarSenha: z.string(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp(){
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<SignUpForm>()

    const { mutateAsync: registerUserFn } = useMutation({
        mutationFn: registerUser
    })

    async function handleSignUp(data: SignUpForm) {
        try {
            if(data.nome.length > 45){
                toast.error('O seu nome é muito grande! Por gentileza, abrevie algum sobrenome.')
                return false;
            }
            if(data.telefone.length > 45){
                toast.error('O seu telefone é muito grande! Tente outro telefone.')
                return false;
            }
            if(data.senha !== data.confirmarSenha){
                toast.error('As senhas não conferem.')
                return false;
            }

            await registerUserFn({
                nome: data.nome,
                telefone: data.telefone,
                senha: data.senha,
            })
            

            toast.success('Cadastro realizado com sucesso!', {
                action: {
                    label: 'Login',
                    onClick: () => navigate(`/sign-in?telefone=${data.telefone}`)
                }
            })
        }
        catch {
            toast.error('Erro ao realizar o cadastro.')
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
                <form onSubmit={handleSubmit(handleSignUp)} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='nome'>Nome completo</Label>
                        <Input 
                            id='nome' 
                            type='text' 
                            {...register('nome')}
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='telefone'>Seu e-mail</Label>
                        <Input
                            id='telefone' 
                            type='telefone' 
                            {...register('telefone')}

                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='senha'>Sua senha</Label>
                        <Input 
                            id='senha' 
                            type='password' 
                            
                            {...register('senha')}
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='senha'>Confirme sua senha</Label>
                        <Input 
                            id='senhaConfirma' 
                            type='password' 
                            {...register('confirmarSenha')}
                        />
                    </div>

                    <Button disabled={isSubmitting} className='w-full'>
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