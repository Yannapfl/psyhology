// src/components/ChangeClient/ChangeClient.tsx
"use client";

import "../ChangePsy/ChangePsy.css";
import Image from "next/image";
import info from "../../../public/icons/Info.svg";
import download from "../../../public/icons/Import.svg";
import profile from "../../../public/icons/profile.svg";
import infoBlue from "../../../public/icons/blue_info.svg";
import { useMemo, useState } from "react";
import UserIcon from "../../../public/icons/iconsComponent/UserIcon";
import ModalChangeClient from "../Modals/ModalChangeClient";
import { useCurrentPsychologist } from "@/hooks/useCurrentPsy";

export default function ChangeClient() {
  const [clientStatus, setClientStatus] = useState<"Активный" | "Заменен">("Активный");
  const [activeModal, setActiveModal] = useState(false);

  const { data: psyInfo, loading, error } = useCurrentPsychologist();

  const fullName = useMemo(() => {
    if (!psyInfo) return "";
    return [psyInfo.first_name?.trim(), psyInfo.last_name?.trim()].filter(Boolean).join(" ");
  }, [psyInfo]);

  const replacements = psyInfo?.amount_of_replacements ?? 0;
  const canReplace = replacements > 0;

  if (loading) {
    return (
      <div className="change-psy">
        <div className="title-change-psy">
          <div className="count-changes">
            <h2 style={{ fontSize: 16 }}>Количество замен: …</h2>
            <div className="tooltip-wrapper">
              <Image src={info} alt="info" width={20} height={20} />
              <div className="tooltip-text">Загружаем информацию…</div>
            </div>
          </div>
          <a href="/files/reglament.pdf" download className="button-download">
            Регламент замен
            <Image src={download} alt="download" width={20} />
          </a>
        </div>
        <div className="first-psy-block skeleton" />
      </div>
    );
  }

  if (psyInfo === null) {
    return (
      <div className="psy-empty" style={{ margin: "7em 12em", width: "70%" }}>
        <UserIcon width={64} style={{ color: "#949494" }} />
        <h2>У вас нет клиентов на замену</h2>
        {error && <p className="error-text">{error}</p>}
      </div>
    );
  }

  if (!psyInfo) return null;

  return (
    <div className="change-psy">
      <div className="title-change-psy">
        <div className="count-changes">
          <h2 style={{ fontSize: 16 }}>Количество замен: {replacements}</h2>
          <div className="tooltip-wrapper">
            <Image src={info} alt="info" width={20} height={20} />
            <div className="tooltip-text">
              Вы можете заменить клиента {replacements} раз(а). Скачайте регламент замен, чтобы узнать подробности.
            </div>
          </div>
        </div>
        <a href="/files/reglament.pdf" download className="button-download">
          Регламент замен
          <Image src={download} alt="download" width={20} />
        </a>
      </div>

      <div className="first-psy-block">
        <div className="title-status-psy">
          <div className="psy-profile-change">
            <Image src={profile} alt="profile" width={40} />
            <h3 style={{ fontWeight: 600 }}>{fullName || "Ваш психолог"}</h3>
          </div>
          <div className="status-psy">
            {clientStatus === "Активный" ? (
              <div className="green-status">{clientStatus}</div>
            ) : (
              <div className="red-status">{clientStatus}</div>
            )}
          </div>
        </div>

        <hr style={{ color: "#747D6F33", opacity: "20%" }} />

        <div className="info-blue-block">
          <Image src={infoBlue} alt="info" width={32} />
          <h5 style={{ fontWeight: 500, margin: 0 }}>
            Замена возможна до или после первой сессии, но не более установленного лимита. Скачайте регламент замен, чтобы узнать подробности.
          </h5>
        </div>

        <button
          onClick={() => {
            if (!canReplace) return;
            setActiveModal(true);
            setClientStatus("Заменен");
          }}
          disabled={!canReplace}
          className={!canReplace ? "btn-disabled" : ""}
          aria-disabled={!canReplace}
          title={canReplace ? "" : "Доступных замен нет"}
        >
          заменить
        </button>
      </div>

      {activeModal && (
        <ModalChangeClient onClose={() => setActiveModal(false)} />
      )}
    </div>
  );
}
