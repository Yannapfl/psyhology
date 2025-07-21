import { useState } from "react";
import "./PshologyBar";
import Switcher from "../Switcher/Switcher";
import ActivePsy from "../ActivePsy/ActivePsy";
import ChangePsy from "../ChangePsy/ChangePsy";
import InfoChange from "../InfoChange/InfoChange";

export default function PsyhologyBar() {
  const [active, setActive] = useState(0);

  return (
    <div className="clients-bar application">
      <h1>Мой психолог</h1>
      <Switcher
        tabs={[`АКТИВНЫЙ`, `ЗАМЕНА ПСИХОЛОГА`]}
        activeIndex={active}
        onChange={setActive}
      />

      <div className="active-block">
        {active === 0 ? (
          <>
          <ActivePsy />
          <InfoChange />
          </>
            

        ) : (
            <ChangePsy />
        )
    
    }
      </div>
    </div>
  );
}
