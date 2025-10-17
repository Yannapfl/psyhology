import "./Navigation.css";
import Profile from "./Profile/Profile";
import Image from "next/image";
import profile from "../../../public/icons/greyUser.svg";
import heart from "../../../public/icons/heart.svg";
import settings from "../../../public/icons/settings.svg";
import { useRole } from "@/contexts/RoleContext";
import application from '../../../public/icons/application.svg'

type NavigationProps = {
  setSection: (section: "application" | "relationship" | "settings" | "support") => void;
  currentSection: "application" | "relationship" | "settings" | "support";
};

export default function Navigation({
  setSection,
  currentSection,
}: NavigationProps) {
  const { role } = useRole();

  const relationshipSection =
    role === "client" ? "Мой психолог" : "Мои клиенты";

  return (
    <div className="navigation-bar">
      <Profile onClick={() => setSection("application")} />
      <div className="navigation">
        <div
          className={`nav-links ${
            currentSection === "application" ? "active-link-high" : ""
          } link-bottom`}
          onClick={() => setSection("application")}
        >
          <Image
            src={settings}
            alt="application"
            width={24}
            className={currentSection === "application" ? "white-icon" : ""}
          />
          <h3>Мои данные</h3>
        </div>

        <div className="nav-full-divider"></div>

        <div
          className={`nav-links ${
            currentSection === "relationship" ? "active-link-middle" : ""
          } link-high`}
          onClick={() => setSection("relationship")}
        >
          <Image
            src={profile}
            alt="clients"
            width={24}
            className={currentSection === "relationship" ? "white-icon" : ""}
          />
          <h3>{relationshipSection}</h3>
        </div>

        <div className="nav-full-divider"></div>

        <div
          className={`nav-links ${
            currentSection === "support" ? "active-link-middle" : ""
          } link-high`}
          onClick={() => setSection("support")}
        >
          <Image
            src={heart}
            alt="support"
            width={20}
            className={currentSection === "support" ? "white-icon" : "grey-icon"}
          />
          <h3>Служба заботы</h3>
        </div>

        <div className="nav-full-divider"></div>

        <div
          className={`nav-links ${
            currentSection === "settings" ? "active-link-bottom" : ""
          } link-bottom`}
          onClick={() => setSection("settings")}
        >
          <Image
            src={application}
            alt="app"
            width={24}
            className={currentSection === "settings" ? "white-icon" : ""}
          />
          <h3>Анкета</h3>
        </div>
      </div>
    </div>
  );
}
