import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Logo, UserDropdownMenu } from "@/components/navbar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="sticky top-0 z-10 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
          <div className="flex items-center gap-4">
            <ModeToggle />
            <UserDropdownMenu />
          </div>
        </div>
      </header>
      <main className="flex min-h-screen w-screen">
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
          <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
      </main>
    </>
  );
}
