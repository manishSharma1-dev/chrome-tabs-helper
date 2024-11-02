import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar  } from "@/components/app-sidebar"

export default function DashboardLayout(
    { children } : { children : React.ReactNode }
) {
    return (
        
        <>
        <SidebarProvider>
            <AppSidebar />
            <main className="flex gap-2 w-full">
            <SidebarTrigger />
            {children}
            </main>
        </SidebarProvider>
    </>

    )
}