import { ClientHeader } from "@/components/client-header"
import { Outlet } from "react-router-dom"

export function ClientHeaderLayout() {
    return (
        <div className="flex min-h-screen flex-col antialiased">
            <ClientHeader />

            <div className="flex flex-1 flex-col gap-4 p-4 md:p-8 pt-6">
                <Outlet />
            </div>
        </div>
    )
}