import "../ChangePsy/ChangePsy.css";
import Image from "next/image";
import info from "../../../public/icons/Info.svg";
import download from "../../../public/icons/Import.svg";
import profile from "../../../public/icons/profile.svg";
import infoBlue from "../../../public/icons/blue_info.svg";
import { useState } from "react";
import { usePsy } from "@/contexts/PsyContext";
import UserIcon from "../../../public/icons/iconsComponent/UserIcon";
import ModalChangeClient from "../Modals/ModalChangeClient";

export default function ChangeClient() {
  const [clientStatus, setClientStatus] = useState<"Активный" | "Заменен">(
    "Активный"
  );
  const [activeModal, setActiveModal] = useState(false);

  const { psyInfo } = usePsy();

  if (psyInfo === null) {
    return (
      <div className="psy-empty" style={{ margin: '7em 12em', width: '70%'}}>
      <UserIcon width={64} style={{ color: '#949494'}}/>
      <h2>У вас нет клиентов на замену</h2>
    </div>
    )
  }

  return (
    <div className="change-psy">
      <div className="title-change-psy">
        <div className="count-changes">
          <h2 style={{ fontSize: "16px" }}>Количество замен: 1</h2>
          <div className="tooltip-wrapper">
            <Image src={info} alt="info" width={20} height={20} />
            <div className="tooltip-text">
              Вы можете заменить клиента 4 раза. Скачайте регламент замен, чтобы узнать подробности.
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
            <h3 style={{ fontWeight: "600" }}>Мария Зосим</h3>
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
          <h5 style={{ fontWeight: "500", margin: "0" }}>
            Замена возможна до или после первой сессии, но не более 4 раз за всё время участия. Скачайте регламент замен, чтобы узнать подробности.
          </h5>
        </div>
        <button onClick={() => {setActiveModal(true)
            setClientStatus("Заменен")
        } }>заменить</button>
      </div>

      {activeModal && (
       <ModalChangeClient 
        onClose={() => setActiveModal(false)}
        />
      )}
    </div>
  );
}
