import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { DialogClose, DialogContent, DialogFooter, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/get-profile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { updateProfile } from "@/api/update-profile";
import { toast } from "sonner";

const profileSchema =z.object({
    usuarioId: z.string(),
    nome: z.string().min(1),
    telefone: z.string(),
})

type ProfileSchema = z.infer<typeof profileSchema>

export function ProfileDialog() {
    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,

    })

    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<ProfileSchema>({
        resolver: zodResolver(profileSchema),   
        values: {
            usuarioId: profile?.usuarioId || '',
            nome: profile?.nome || '',
            telefone: profile?.telefone || ''
        }
    })

    const {mutateAsync: updateProfileFn} = useMutation({
        mutationFn: updateProfile,
    })

    async function handleUpdateProfile(data: ProfileSchema) {
        try {
            await updateProfileFn({
                usuarioId: parseInt(data.usuarioId),
                nome: data.nome,
                telefone: data.telefone,
            }) 

            toast.success('Perfil atualizado com sucesso!')
        } catch {
            toast.error('Falha ao atualizar o perfil, tente novamente!')
        }
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Perfil</DialogTitle>
                <DialogDescription>
                    Atualize as informações do seu cadastro
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(handleUpdateProfile)}>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nome">
                            Nome
                        </Label>
                        <Input 
                            className="col-span-3" 
                            id="nome" 
                            {...register('nome')} 
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="telefone">
                            Telefone
                        </Label>
                        <Input 
                            className="col-span-3" 
                            id="telefone" 
                            {...register('telefone')} 
                        />
                    </div>

                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost" type="button">
                        Cancelar
                        </Button>
                    </DialogClose>
                    <Button type="submit" variant="default" disabled={isSubmitting}>
                        Salvar
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}