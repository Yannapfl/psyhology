'use client'

import Pagination from "../Pagination/Pagination";
import Image from "next/image";
import profile from '../../../public/icons/profile.svg'
import { useState } from "react";
import { statusColor } from "@/utils/statusColor";
import { changesTableMock } from "@/mocks/mocksChangesTable";



export default function ChangesTable() {
    const [currentPage, setCurrentPage] = useState(1);
          const perPage = 10;
          const totalPages = Math.ceil(changesTableMock.length / perPage);
          const pageData = changesTableMock.slice((currentPage - 1) * perPage, currentPage * perPage);
    

      return (
         <>
    <table className="exp-table psy-table">
      <thead>
        <tr>
          <th>Инициатор</th>
          <th>Психолог</th>
          <th>Клиент</th>
          <th>Дата и время</th>
          <th>Прошло сессий</th>
          <th>Причина замены</th>
          <th>Жалоба</th>
          <th>Статус замены</th>
          <th>Подтверждение второй стороны</th>

        </tr>
      </thead>
      <tbody>
        {pageData.map((change) => (
          <>
            <tr key={change.id} className="psy-row">
                <td>{change.initiator}</td>
              <td>
                <div className="td-image" style={{textWrap: 'nowrap'}}>
                    <Image src={profile} alt="profile" width={28} />
                    {change.psychologist}
                </div>
                
              </td>
                            <td>
                <div className="td-image" style={{textWrap: 'nowrap'}}>
                    <Image src={profile} alt="profile" width={28} />
                    {change.client}
                </div>
                
              </td>
              
              <td>{change.date}</td>
              <td>{change.sessions}</td>
              <td style={{ width: '30%'}}>{change.reason}</td>
              <td>{change.complaint}</td>

              <td>
                <span className={`status-tag ${statusColor(change.status)}`}>
                    {change.status}
                  </span>
             </td>
              <td>
                <span className={`status-tag ${statusColor(change.confirmation)}`}>
                    {change.confirmation}
                  </span>
                
                </td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
    <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
    </>
    
      )
}
