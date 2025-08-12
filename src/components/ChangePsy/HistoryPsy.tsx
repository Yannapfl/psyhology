'use client'

import Image from "next/image";
import profile from "../../../public/icons/profile.svg";

type Props = {
    fullName: string,
    psyStatus: string,
}

export default function HistoryPsy( {fullName, psyStatus}: Props) {
    return (
        <div className="first-psy-block">
             <div className="title-status-psy">
          <div className="psy-profile-change">
            <Image src={profile} alt="profile" width={40} />
            <h3 style={{ fontWeight: 600 }}>{fullName}</h3>
          </div>
          <div className="status-psy">
              <div className="red-status">{psyStatus}</div>
          </div>
        </div>
        </div>
    )
}