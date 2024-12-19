import Navbar from "@/components/navbar/index";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <footer className="w-full border-t border-border/40 px-4 py-6 text-center md:px-6">
        <p>&copy; 2024 ProjectPro. All rights reserved.</p>
      </footer>
    </>
  );
}
