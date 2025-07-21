"use client";

import styles from "../page.module.css";
import logo from "../../../public/icons/Logo.svg";
import Image from "next/image";
import LoginModal from "@/components/LoginModal/LoginModal";
import { useRole } from "@/contexts/RoleContext";

export default function LoginPage() {
  const { role } = useRole();

  return (
    <div className={styles.page}>
      <main>
        <Image
          src={logo}
          alt="logo"
          style={{ display: "block", margin: "24px auto" }}
        />
        <LoginModal role={role as "client" | "psychologist"} />
      </main>
    </div>
  );
}
