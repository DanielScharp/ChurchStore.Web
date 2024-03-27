import { Home, ShoppingBag } from "lucide-react";
import { NavLink } from "./nav-link";

import { Separator } from "./ui/separator";
import { ThemeToggle } from "./theme/theme-toggle";
import { AccountMenu } from "./accountMenu";

export function ClientHeader(){
    return (
        <div className="border-b">
            <div className="flex h-10 md:h-16 items-center gap-2 md:gap-6 px-2 md:px-6">
                <NavLink to="/bag">
                    <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" />
                </NavLink>

                <Separator orientation="vertical" className="h-6" />
                <NavLink to="/">
                    <Home className="h-5 w-5 md:h-6 md:w-6" />
                    Início
                </NavLink>

                <div className="ml-auto flex items-center gap-2">
                    <ThemeToggle />
                    <AccountMenu />
                </div>
            </div>
        </div>
    )
}