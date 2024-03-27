import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { DialogContent, DialogFooter, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/get-profile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";

const profileSchema =z.object({
    nome: z.string().min(1),
    email: z.string(),
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
    } = useForm<ProfileSchema>({
        resolver: zodResolver(profileSchema),   
        values: {
            nome: profile?.nome || '',
            email: profile?.email || ''
        }
    })

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Perfil</DialogTitle>
                <DialogDescription>
                    Atualize as informações do seu cadastro
                </DialogDescription>
            </DialogHeader>
            <form>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nome">
                            Nome
                        </Label>
                        <Input className="col-span-3" id="nome" {...register('nome')} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email">
                            Email
                        </Label>
                        <Input className="col-span-3" id="email"  {...register('email')} />
                    </div>

                </div>
                <DialogFooter>
                    <Button type="button" variant={"destructive"}>Cancelar</Button>
                    <Button type="submit" variant={"default"}>Salvar</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}