import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ThemeToggleButton } from "@/components/theme-toggle-button"

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main>
          <ThemeToggleButton classes="fixed right-7 bottom-5"/>
          <header className={`flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 w-full`}>
            <div className="flex items-center justify-between w-full">
              <SidebarTrigger className="ml-2" />
            </div>
          </header>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
