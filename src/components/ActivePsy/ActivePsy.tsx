import { useState } from "react";
import "./ActivePsy.css";
import Image from "next/image";
import profile from "../../../public/icons/profile.svg";
import arrow from '../../../public/icons/arrow_checkbox.svg'
import UserIcon from "../../../public/icons/iconsComponent/UserIcon";
import { usePsy } from "@/contexts/PsyContext";

export default function ActivePsy() {
  const [expanded, setExpanded] = useState(false);
  const  { psyInfo, loading } = usePsy();

   if (loading) return <div>Загрузка...</div>;


  const fullName = psyInfo
  ? `${psyInfo.user.first_name || ""} ${psyInfo.user.last_name || ""}`
  : "Загрузка...";


  const description = psyInfo
    ? `${psyInfo.description || "описание не указано"}`
    : "";

if (psyInfo === null) {
  return (
    <div className="psy-empty">
      <UserIcon width={64} style={{ color: '#949494'}}/>
      <h2>Мы ищем вам психолога</h2>
      <h3>Мы подбираем для вас наиболее подходящего специалиста. Это может занять до 3 дней. Благодарим за ожидание!Мы подбираем для вас наиболее подходящего специалиста. Это может занять до 3 дней. Благодарим за ожидание!</h3>
    </div>
  );
}


  return (
    <div className="psy-card">
      <div className="psy-profile">
        <Image src={profile} alt="clients" width={140} />
        <h2>{fullName}</h2>
      </div>
      <div className="psy-info">
        <h3 style={{ fontWeight: "600", margin: '0 0 10px 0' }}>Информация о психологе</h3>
        <h3 className={`description ${expanded ? "expanded" : ""}`}>{description}</h3>

        <div className="show-more" onClick={() => setExpanded((prev) => !prev)}>
  {expanded ? "СВЕРНУТЬ" : "ЕЩЕ 1"}
  <Image
    src={arrow}
    alt="arrow"
    className={`arrow-icon ${expanded ? 'rotated' : ''}`}
    width={12}
    height={12}
  />
</div>

      </div>
    </div>
  );
}
