"use client";

import Pagination from "../Pagination/Pagination";
import Image from "next/image";
import profile from "../../../public/icons/profile.svg";
import { useEffect, useState } from "react";

import { statusColor } from "@/utils/statusColor";
import { Complaince } from "@/types/ApiTypes";
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

export default function ComplaintTable({ id }: Props) {
  const [data, setData] = useState<Complaince[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const perPage = 10;
  const totalPages = Math.ceil(data.length / perPage) || 1;
  const pageData = data.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  useEffect(() => {
    const abort = new AbortController();

    const fetchComplaints = async () => {
      try {
        setIsLoading(true);
        const endpoint = id ? `/v1/${id}/complaints` : `/v1/1/complaints`;
        const res = await api.get<Complaince[]>(endpoint, {
          signal: abort.signal,
        });
        setData(res.data);
        setCurrentPage(1);
      } catch (err: unknown) {
        const name = (err as { name?: string })?.name;
        if (name !== "CanceledError" && name !== "AbortError") {
          console.error("Ошибка загрузки жалоб:", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchComplaints();
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
            <th>Статус жалобы</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((change) => (
            <tr key={change.ID} className="psy-row">
              <td>{change.FiledRole === "client" ? "Клиент" : "Психолог"}</td>

              <td>
                <div className="td-image" style={{ whiteSpace: "nowrap" }}>
                  <Image src={profile} alt="profile" width={28} />
                  {change.PsychologistID}
                </div>
              </td>

              <td>
                <div className="td-image" style={{ whiteSpace: "nowrap" }}>
                  <Image src={profile} alt="profile" width={28} />
                  {change.ClientID}
                </div>
              </td>

              <td>
                <DateCell iso={change.CreatedAt} />
              </td>

              <td>
                <span
                  className={`status-tag ${statusColor(
                    change.ComplainceStatus
                  )}`}
                >
                  {change.ComplainceStatus}
                </span>
              </td>
            </tr>
          ))}

          {pageData.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: 16 }}>
                Данных нет
              </td>
            </tr>
          )}
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
