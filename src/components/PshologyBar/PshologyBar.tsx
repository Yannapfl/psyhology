'use client'

import { useEffect, useState } from "react";
import "./PshologyBar";
import Switcher from "../Switcher/Switcher";
import ActivePsy from "../ActivePsy/ActivePsy";
import ChangePsy from "../ChangePsy/ChangePsy";
import InfoChange from "../InfoChange/InfoChange";
import EmptyApplication from "../EmptyApplication/EmptyApplication";
import api from "@/utils/api";

export default function PsyhologyBar() {
  const [active, setActive] = useState(0);
  const [isFilled, setIsFilled] = useState<boolean | null>(null);

  useEffect(() => {
    const checkPreferencesStatus = async () => {
      try {
        const res = await api.get("/v1/profile/preferences/status");
        setIsFilled(res.data.message !== "true");
        console.log(res.data.message, 'status')
      } catch (error) {
        console.error("Ошибка при получении статуса анкеты", error);
        setIsFilled(false);
      }
    };

    checkPreferencesStatus();
  }, []);

  return (
    <div className="clients-bar application">
      <h1>Мой психолог</h1>
      <Switcher
        tabs={["АКТИВНЫЙ", "ЗАМЕНА ПСИХОЛОГА"]}
        activeIndex={active}
        onChange={setActive}
      />

      <div className="active-block">
        {isFilled === null ? null : isFilled ? (
          active === 0 ? (
            <div className="info-active-about-psy">
              <InfoChange />
              <ActivePsy />
              
            </div>
          ) : (
            <>
              <ChangePsy />
            </>
          )
        ) : (

          active === 0 ? (
<>
            <EmptyApplication />
          </>
          ) : (
            <>
            <ChangePsy />
            </>
          )
          
        )}
      </div>
    </div>
  );
}
