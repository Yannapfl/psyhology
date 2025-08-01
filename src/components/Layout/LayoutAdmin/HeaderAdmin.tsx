"use client";

import "../Header/Header";
import Image from "next/image";
import logo from "../../../../public/icons/Logo.svg";
import bell from "../../../../public/icons/bell.svg";
import profile from "../../../../public/icons/profile.svg";
import { usePathname, useRouter } from "next/navigation";
import { AppRoutes } from "@/constants/AppRoutes";

export default function HeaderAdmin() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => (pathname === path ? "active-link" : "");

  return (
    <header>
      <div className="navigation-header-left">
        <Image
          src={logo}
          alt="logo"
          height={24}
          style={{ cursor: "pointer" }}
        />
        <div className="navigation-header">
          <a
            className={isActive(AppRoutes.clients)}
            onClick={() => router.push(AppRoutes.clients)}
          >
            Клиенты
          </a>
          <a
            className={isActive(AppRoutes.psyhologists)}
            onClick={() => router.push(AppRoutes.psyhologists)}
          >
            Психологи
          </a>
          <a
            className={isActive(AppRoutes.changes)}
            onClick={() => router.push(AppRoutes.changes)}
          >
            Замены
          </a>
          <a
            className={isActive(AppRoutes.complaints)}
            onClick={() => router.push(AppRoutes.complaints)}
          >
            Жалобы
          </a>
          <a
            className={isActive(AppRoutes.flows)}
            onClick={() => router.push(AppRoutes.flows)}
          >
            Все потоки
          </a>
        </div>
      </div>
      <div className="navigation-header-right">
        <Image src={bell} alt="bell" />
        <Image src={profile} alt="profile" style={{ cursor: "pointer" }} />
      </div>
    </header>
  );
}
