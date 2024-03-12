import { Home, UtensilsCrossed , ShoppingBag, BarChartIcon, BookText } from "lucide-react";

import { NavLink } from "./nav-link";
import { Separator } from "./ui/separator";
import { ThemeToggle } from "./theme/theme-toggle";
import { AccountMenu } from "./accountMenu";

export function Header(){
    return (
        <div className="border-b">
            <div className="flex h-16 items-center gap-6 px-6">
                <ShoppingBag className="h-6 w-6" />

                <Separator orientation="vertical" className="h-6" />

                <nav className="flex items-center space-x-4 lg:space-x-6">
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

                <div className="ml-auto flex items-center gap-2">
                    <ThemeToggle />
                    <AccountMenu />
                </div>
            </div>
        </div>
    )
}