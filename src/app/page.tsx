'use client';

import styles from "./page.module.css";
import Image from "next/image";
import logo from "../../public/icons/Logo.svg";
import UserIcon from "../../public/icons/iconsComponent/UserIcon";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppRoutes } from "@/constants/AppRoutes";
import { useRole } from "@/contexts/RoleContext";

export default function Home() {
  const [checkedClient, setCheckedClient] = useState(false);
  const [checkedPsyhology, setCheckedPsyhology] = useState(false);
  const router = useRouter();
  const { setRole } = useRole()

  const handleClick = () => {
    if ((checkedClient === false) && (checkedPsyhology === false)) {
      alert('Выберете роль');
      return;
    }
    setRole(checkedClient? 'client' : 'psychologist');

  router.push(AppRoutes.login);
};

  return (
    <div className={styles.page}>
      <main>
        <div>
          <Image
            src={logo}
            alt="logo"
            style={{ display: "block", margin: "24px auto" }}
          />
          <div className={styles.modal}>
            <div>
              <h2>Выберите свою роль</h2>
              <h4>Уточните вашу роль, чтобы перейти к авторизации</h4>
            </div>
            <div className={styles.line}></div>
            <div>
              <div className={styles.flexboxtwo}>
                <div
                  className={`${styles.selectmodule} ${ checkedClient ? styles['module-active'] : '' }`}
                  onClick={() => {
                    setCheckedPsyhology(false);
                    setCheckedClient(!checkedClient);
                  }}
                >
                  <div className={styles.imageSelect}>
                    <UserIcon  
                        style={{ color: checkedClient ? '#10603C' : '' }}
                    />
                    <div className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        checked={checkedClient}
                        onChange={() => {
                          setCheckedPsyhology(false);
                          setCheckedClient(!checkedClient);
                        }}
                        className={`${styles["checkbox-circle"]} ${
                          checkedClient ? styles["checked"] : ""
                        }`}
                      />
                    </div>
                  </div>
                  <h2>Я клиент</h2>
                  <h5>Прохожу консультации и работаю с психологом</h5>
                </div>
                <div
                  className={`${styles.selectmodule} ${ checkedPsyhology ? styles['module-active'] : '' }`}
                  onClick={() => {
                    setCheckedPsyhology(!checkedPsyhology);
                    setCheckedClient(false);
                  }}
                >
                  <div className={styles.imageSelect}>
                    <UserIcon style={{ color: checkedPsyhology ? '#10603C' : '' }} />
                    <div className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        checked={checkedPsyhology}
                        onChange={() => {
                          setCheckedPsyhology(!checkedPsyhology);
                          setCheckedClient(false);
                        }}
                        className={`${styles["checkbox-circle"]} ${
                          checkedPsyhology ? styles["checked"] : ""
                        }`}
                      />
                    </div>
                  </div>
                  <h2>Я психолог</h2>
                  <h5>Работаю с клиентами и провожу сессии</h5>
                </div>
              </div>
            </div>
            <button className={styles.btn} onClick={handleClick}>ДАЛЕЕ</button>
          </div>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
