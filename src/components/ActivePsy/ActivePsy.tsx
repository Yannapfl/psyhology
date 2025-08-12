"use client";

import { useState } from "react";
import "./ActivePsy.css";
import Image from "next/image";
import profile from "../../../public/icons/profile.svg";
import arrow from "../../../public/icons/arrow_checkbox.svg";
import UserIcon from "../../../public/icons/iconsComponent/UserIcon";
import { useCurrentPsychologist } from "@/hooks/useCurrentPsy";

export default function ActivePsy() {
  const [expanded, setExpanded] = useState(false);
  const { data: psyInfo } = useCurrentPsychologist();

  if (psyInfo === null) {
    return (
      <div className="psy-empty">
        <UserIcon width={64} style={{ color: "#949494" }} />
        <h2>Мы ищем вам психолога</h2>
        <h3>
          Мы подбираем для вас наиболее подходящего специалиста. Это может занять до 3 дней.
          Благодарим за ожидание!
        </h3>
      </div>
    );
  }

  const description = psyInfo?.description || "";
  const isLongDescription = description.length > 150;

  return (
    <div className="psy-card">
      <div className="psy-profile">
        <Image src={profile} alt="clients" width={140} />
        <h2>
          {psyInfo?.first_name} {psyInfo?.last_name}
        </h2>
      </div>
      <div className="psy-info">
  
<h3
  className={[
    "description",
    isLongDescription && !expanded ? "clamped" : "",
    expanded ? "expanded" : "",
  ].join(" ").trim()}
>
  {description}
</h3>

{isLongDescription && (
  <div className="show-more" onClick={() => setExpanded((p) => !p)}>
    {expanded ? "СВЕРНУТЬ" : "ЕЩЕ"}
    <Image
      src={arrow}
      alt="arrow"
      className={`arrow-icon ${expanded ? "rotated" : ""}`}
      width={12}
      height={12}
    />
  </div>
)}

      </div>
    </div>
  );
}
