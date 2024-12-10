import { AppSidebar } from "@/components/app-sidebar";
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
    <main className="h-screen w-screen">
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </main>
  );
}
