import { BarChartIcon, BookText, Home, MenuIcon, ShoppingBag, UtensilsCrossed } from "lucide-react";

import { AccountMenu } from "./accountMenu";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme/theme-toggle";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

export function Header(){
    return (
        <div className="border-b">
            <div className="flex h-16 items-center gap-2 sm:gap-6 px-2 sm:px-6">
                <ShoppingBag className="h-6 w-6" />

                <Separator orientation="vertical" className="h-6" />

                <nav className="hidden sm:flex items-center space-x-4 lg:space-x-6">
                    <NavLink to="/">
                        <Home className="h-4 w-4" />
                        Início
                    </NavLink>
                    <NavLink to="/orders">
                        <UtensilsCrossed className="h-4 w-4" />
                        Pedidos
                    </NavLink>
                    <NavLink to="/dashboard">
                        <BarChartIcon className="h-4 w-4" />
                        Dashboard
                    </NavLink>
                    <NavLink to="/add/product">
                        <BookText className="h-4 w-4" />
                        Produtos
                    </NavLink>
                </nav>
                <nav className="flex sm:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2 select-none">
                                <MenuIcon className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel className="flex flex-col">
                                Menu
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <NavLink to="/">
                                        <Home className="h-4 w-4" />
                                        Início
                                    </NavLink>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <NavLink to="/dashboard">
                                        <BarChartIcon className="h-4 w-4" />
                                        Dashboard
                                    </NavLink>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <NavLink to="/orders">
                                        <UtensilsCrossed className="h-4 w-4" />
                                        Pedidos
                                    </NavLink>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <NavLink to="/add/product">
                                        <BookText className="h-4 w-4" />
                                        Produtos
                                    </NavLink>
                                </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </nav>

                <div className="ml-auto flex items-center gap-2">
                    <ThemeToggle />
                    <AccountMenu />
                </div>
            </div>
        </div>
    )
}