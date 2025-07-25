"use client";

import "./LoginModal.css";
import styles from "../../app/page.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppRoutes } from "@/constants/AppRoutes";
import { useAuth } from "@/contexts/AuthContext";
import eye from "../../../public/icons/eye.svg";
import closeEye from "../../../public/icons/cross_eye.svg";

type LoginModalProps = {
  role: "client" | "psychologist";
};

export default function LoginModal({ role }: LoginModalProps) {
  const router = useRouter();
  const { signIn } = useAuth();
  const titleModal =
    role === "client"
      ? "Войдите, чтобы продолжить свои консультации"
      : "Войдите, чтобы начать работу с клиентами";
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [checkedAuthMemory, setCheckedAuthMemory] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!role) {
      router.push(AppRoutes.start);
    }
  }, [role, router]);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    await signIn({ email: login, password });

    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const roleName = parsedUser?.role;

    switch (roleName) {
      case "admin":
      case "manager":
        router.push(AppRoutes.clients); 
        break;
      case "psychologist":
        router.push(AppRoutes.homepsyhology);
        break;
      case "client":
      default:
        router.push(AppRoutes.homeclient);
    }
  } catch {
    console.error("Ошибка при входе");
  }
};


  if (!role) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div>
        <h2>Вход в систему</h2>
        <h4>{titleModal}</h4>
      </div>
      <div className={styles.line}></div>
      <form className="form-login" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label className="label-input">Логин</label>
          <input
            type="login"
            placeholder="Логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
<div className="input-wrapper password-wrapper">
          <label className="label-input">Пароль</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-password-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Image
                src={showPassword ? closeEye : eye}
                alt="Toggle password visibility"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
        <div className="auth-options">
          <div className="auth-memory-input">
            <input
              type="checkbox"
              checked={checkedAuthMemory}
              onChange={() => setCheckedAuthMemory(!checkedAuthMemory)}
              className={`checkbox-squared ${
                checkedAuthMemory ? "checked" : ""
              }`}
            />
            <p>Запомнить меня</p>
          </div>

          <a href="###" className="a-login">Забыли пароль?</a>
        </div>
        <div className="button-group">
          <button
            className="btn-light-green"
            onClick={() => router.push(AppRoutes.start)}
          >
            Назад
          </button>
          <button type="submit">Войти</button>
        </div>
      </form>
    </div>
  );
}
