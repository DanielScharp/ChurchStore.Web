import { ShoppingBag } from "lucide-react";
import { NavLink } from "./nav-link";

import { Separator } from "./ui/separator";
import { ThemeToggle } from "./theme/theme-toggle";
import { AccountMenu } from "./accountMenu";

export function ClientHeader(){
    return (
        <div className="border-b">
            <div className="flex h-16 items-center gap-6 px-6">
                <NavLink to="/">
                    <ShoppingBag className="h-6 w-6" />
                </NavLink>

                <Separator orientation="vertical" className="h-6" />

                <div className="ml-auto flex items-center gap-2">
                    <ThemeToggle />
                    <AccountMenu />
                </div>
            </div>
        </div>
    )
}