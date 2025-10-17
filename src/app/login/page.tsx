'use client';

import styles from "../page.module.css";
import logo from "../../../public/icons/Logo.svg";
import Image from "next/image";
import LoginModal from "@/components/LoginModal/LoginModal";
import { useRole } from "@/contexts/RoleContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppRoutes } from "@/constants/AppRoutes";

export default function LoginPage() {
  const { role, isHydrated } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated) return;
    if (!role) router.push(AppRoutes.start);
  }, [isHydrated, role, router]);

  if (!isHydrated) return null;

  return (
    <div className={styles.page}>
      <main>
        <Image src={logo} alt="logo" style={{ display: "block", margin: "24px auto" }} />
        {role && <LoginModal role={role} />}
      </main>
    </div>
  );
}
