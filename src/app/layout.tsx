import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { RoleProvider } from "@/contexts/RoleContext";
import { AuthProvider } from "@/contexts/AuthContext";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Психологи и люди",
  description: "Psy and people"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={montserrat.className}>
        <RoleProvider>
          <AuthProvider>
{children}
            </AuthProvider>
        </RoleProvider>
      </body>
    </html>
  );
}
