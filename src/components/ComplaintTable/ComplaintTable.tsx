"use client";

import Pagination from "../Pagination/Pagination";
import Image from "next/image";
import profile from "../../../public/icons/profile.svg";
import { useState } from "react";

import { statusColor } from "@/utils/statusColor";
import { complaintTableMock } from "@/mocks/mocksComplaintTable";

export default function ComplaintTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const totalPages = Math.ceil(complaintTableMock.length / perPage);
  const pageData = complaintTableMock.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <>
      <table className="exp-table psy-table">
        <thead>
          <tr>
            <th>Инициатор</th>
            <th>Психолог</th>
            <th>Клиент</th>
            <th>Дата и время</th>
            <th>Статус жалобы</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((change) => (
              <tr key={change.id} className="psy-row">
                <td>{change.initiator}</td>
                <td>
                  <div className="td-image" style={{ textWrap: "nowrap" }}>
                    <Image src={profile} alt="profile" width={28} />
                    {change.psychologist}
                  </div>
                </td>
                <td>
                  <div className="td-image" style={{ textWrap: "nowrap" }}>
                    <Image src={profile} alt="profile" width={28} />
                    {change.client}
                  </div>
                </td>

                <td style={{ textWrap: 'wrap'}}>{change.date}</td>

                <td>
                  <span
                    className={`status-tag ${statusColor(
                      change.complaintStatus
                    )}`}
                  >
                    {change.complaintStatus}
                  </span>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}
