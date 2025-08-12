"use client";

import Pagination from "../Pagination/Pagination";
import Image from "next/image";
import profile from "../../../public/icons/profile.svg";
import { useEffect, useState } from "react";
import { statusColor } from "@/utils/statusColor";
import { Replacement } from "@/types/ApiTypes";
import api from "@/utils/api";
import { formatDateTimeParts } from "@/utils/formatDateParts";

type Props = {
  id?: number | string;
};

const DateCell = ({ iso }: { iso: string }) => {
  const { date, time } = formatDateTimeParts(iso, "Asia/Almaty");
  return (
    <div style={ { textWrap: 'wrap'}}>
      {date} <div className="time-muted">{time}</div>
    </div>
  );
};

export default function ChangesTable({ id }: Props) {
  const [data, setData] = useState<Replacement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const totalPages = Math.ceil(data.length / perPage);
  const pageData = data.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  useEffect(() => {
    const abort = new AbortController();

    const fetchReplacements = async () => {
      try {
        setIsLoading(true);

        const endpoint = id ? `/v1/${id}/replacements` : `/v1/1/replacements`;

        const res = await api.get<Replacement[]>(endpoint, { signal: abort.signal });
        setData(res.data);
        setCurrentPage(1);
      } catch (err: unknown) {
        const name = (err as { name?: string })?.name;
        if (name === "CanceledError" || name === "AbortError") {
          return;
        }
        console.error("Ошибка загрузки замен:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReplacements();
    return () => abort.abort();
  }, [id]);

  if (isLoading) {
    return <div className="table-wrapper">Загрузка...</div>;
  }

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
              <tr key={change.ID} className="psy-row">
                <td>{change.RequestedRole === 'client' ? 'Клиент' : 'Психолог'}</td>
                <td>
                  <div className="td-image" style={{ textWrap: "nowrap" }}>
                    <Image src={profile} alt="profile" width={28} />
                    {change.PsychologistID}
                  </div>
                </td>
                <td>
                  <div className="td-image" style={{ textWrap: "nowrap" }}>
                    <Image src={profile} alt="profile" width={28} />
                    {change.ClientID}
                  </div>
                </td>

                <td><DateCell iso={change.CreatedAt} /></td>
                <td>{change.AmountOfSessions}</td>
                <td style={{ width: "30%" }}>{change.Reason2replace}</td>
                <td>{change.Complaince === true ? 'Есть' : 'Нет'}</td>

                <td>
                  <span className={`status-tag ${statusColor(change.ReplacementStatus)}`}>
                    {change.ReplacementStatus}
                  </span>
                </td>
                <td>
                  <span
                    className={`status-tag ${statusColor(change.ConfirmationStatus)}`}
                  >
                    {change.ConfirmationStatus}
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
  );
}
