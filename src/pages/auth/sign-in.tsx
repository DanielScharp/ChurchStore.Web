import { Button } from '@/components/ui/button'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Helmet } from 'react-helmet-async'
import { useMutation } from '@tanstack/react-query'
import { signIn } from '@/api/sign-in'
import { z } from 'zod'
import { toast } from 'sonner'
import Cookies from 'js-cookie';

const signInForm = z.object({
    email: z.string().email(),
    senha: z.string(),
})
  
type SignInForm = z.infer<typeof signInForm>

export function SignIn(){
    const [searchParams] = useSearchParams()

    const navigate = useNavigate();

    const {
      register,
      handleSubmit,
      formState: { isSubmitting },
    } = useForm<SignInForm>({
      defaultValues: {
        email: searchParams.get('email') ?? '',
      },
    })

    const {mutateAsync: authenticate } = useMutation({
        mutationFn: signIn
    })


  async function handleSignIn(data: SignInForm) {
    try {
        const result = await authenticate({ email: data.email, senha: data.senha });
        
        localStorage.setItem('email', data.email);
        Cookies.set('token', result.data);

        navigate('/')

        toast.success('Bem vindo!')
    } catch (error) {
      toast.error('Credenciais inválidas.')
    }
  }

    return(
        <>
            <Helmet title='Login' />
            <div className='p-8'>
                <Button variant="ghost" asChild className='absolute right-8 top-8'>
                    <Link to="/sign-up">
                        Cadastrar
                    </Link>
                </Button>
                <div className='w-[350px] mb-3 flex flex-col justify-center gap-6'>
                    <div className='flex flex-col gap-2 text-center'>
                        <h1 className='text-2xl font-semibold tracking-tight'>
                            Acessar painel
                        </h1>
                        <p className='text-sm text-muted-foreground'>
                            Acompanhe suas vendas pelo painel do parceiro!
                        </p>
                    </div>
                </div>
                <form  onSubmit={handleSubmit(handleSignIn)} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='email'>Seu e-mail</Label>
                        <Input 
                            id='email' 
                            type='email'
                            {...register('email')} 
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

                    <Button disabled={isSubmitting}  className='w-full'>
                        Acessar painel
                    </Button>
                </form>
            </div>
        </>
    )
}