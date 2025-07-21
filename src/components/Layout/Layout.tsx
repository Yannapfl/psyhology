import './Layout.css'
import { ReactNode } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

type LayoutProps = {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="layout">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}