import { Building, ChevronDown, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/get-profile";
import { Skeleton } from "./ui/skeleton";
import { ProfileDialog } from "./profile-dialog";
import { Dialog, DialogTrigger } from "./ui/dialog";

export function AccountMenu() {
    const { data: profile, isLoading: isLoadingUser } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,

    })

    const navigate = useNavigate();

    async function Disconnect() {
        navigate('/sign-in')
    }

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 select-none">
                        ChurchStore
                        <ChevronDown className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="flex flex-col">
                        {isLoadingUser ? (
                            <div className="space-y-1.5">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        ) : (
                            <>
                                <span className="mb-1">
                                    {profile?.nome}   
                                </span>
                                <span className="text-xs font-normal text-muted-foreground">
                                    {profile?.telefone}
                                </span>
                                </>
                        )}
                        
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DialogTrigger asChild>
                        <DropdownMenuItem>
                            <Building className="w-4 h-4 mr-2" />
                            <span>Perfil da loja</span>
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuItem className="text-rose-500 dark:text-rose-400 cursor-pointer" onClick={Disconnect}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sair</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <ProfileDialog />
        </Dialog>
    )
}