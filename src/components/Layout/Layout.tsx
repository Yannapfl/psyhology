import './Layout.css'
import { ReactNode } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import HeaderMobile from './HeaderMobile/HeaderMobile';

type LayoutProps = { children: ReactNode; }

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <HeaderMobile />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
