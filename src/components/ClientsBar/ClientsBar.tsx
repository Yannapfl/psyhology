import { useState } from "react";
import Switcher from "../Switcher/Switcher";
import "./ClientsBar.css";
import ActiveClientCard from "./ActiveClientCard/ActiveClientCard";
import ChangeClient from "../ChangeClient/ChangeClient";

export default function ClientsBar() {
  const [active, setActive] = useState(0);

  return (
    <div className="clients-bar application">
      <h1>Мои клиенты</h1>
      <Switcher
        tabs={[`АКТИВНЫЙ ()`, `ЗАМЕНА КЛИЕНТА`]}
        activeIndex={active}
        onChange={setActive}
      />
      <div className="active-block">
        {active === 0 ? (
          <div className="active-cleints">
            <ActiveClientCard
              name="Мария Зосим"
              callPhone="+7 (707) 890-12-34"
              whatsappPhone="+7 (707) 890-12-34"
              telegram="@mynick"
            />
            <ActiveClientCard
              name="Мария Зосим"
              callPhone="+7 (707) 890-12-34"
              whatsappPhone="+7 (707) 890-12-34"
              telegram="@mynick"
            />
            <ActiveClientCard
              name="Мария Зосим"
              callPhone="+7 (707) 890-12-34"
              whatsappPhone="+7 (707) 890-12-34"
              telegram="@mynick"
            />
          </div>
        ) : (
          <ChangeClient />
        )}
      </div>
    </div>
  );
}
