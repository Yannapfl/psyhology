"use client";

import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import Image from "next/image";
import profile from "../../../public/icons/profile.svg";

import arrowDown from "../../../public/icons/arrow_down.svg";
import arrowUp from "../../../public/icons/arrow_up.svg";
import "./PsyTable.css";
import { statusColor } from "@/utils/statusColor";
import { PsychologistList } from "@/types/ApiTypes";
import api from "@/utils/api";
import formatDate from "@/utils/formatDate";

type Props = {
  id?: number | string;
};

export default function PsyTable({ id } : Props) {
  const [ data, setData ] = useState<PsychologistList>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const totalPages = Math.ceil(data.length / perPage);
  const pageData = data.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

    useEffect(() => {
    const abort = new AbortController();

    const fetchClients = async () => {
      try {
        setIsLoading(true);

        const endpoint = id ? `/v1/${id}/psychologists` : `/v1/1/psychologists`;

        const res = await api.get<PsychologistList>(endpoint, { signal: abort.signal });
        setData(res.data);
        setCurrentPage(1);
      } catch (err: unknown) {
        const name = (err as { name?: string })?.name;
        if (name === "CanceledError" || name === "AbortError") {
          return;
        }
        console.error("Ошибка загрузки психологов:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
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
            <th>Психолог</th>
            <th>Номер телефона</th>
            <th>Ник телеграм</th>
            <th>Почта</th>
            <th>Образование</th>
            <th>Страна</th>
            <th>Счет заграницей</th>
            <th>Тариф</th>
            <th>Дата старта</th>
            <th>Статус обучения</th>
            <th>Распределено клиентов</th>
            <th>Нужно клиентов</th>
            <th>Статус готовности</th>
            <th>Количество замен</th>
            <th>Примечания</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((psy) => (
            <>
              <tr key={psy.id} className="psy-row">
                <td>
                  <div className="td-with-button">
                    <button
                      className="expand-btn btn-text"
                      onClick={() => toggleExpand(psy.id)}
                    >
                      <Image
                        src={expandedId === psy.id ? arrowUp : arrowDown}
                        alt="toggle"
                        width={16}
                      />
                    </button>
                    <div className="td-image" style={{textWrap: 'nowrap'}}>
                      <Image src={profile} alt="profile" width={28} />
                      {psy.last_name} {psy.first_name}
                    </div>
                  </div>
                </td>
                <td style={{ textWrap: "nowrap" }}>{psy.phone2call}</td>
                <td style={{ textWrap: "nowrap" }}>{psy.name4telegram}</td>
                <td style={{ textWrap: "nowrap" }}>{psy.email}</td>
                <td>{psy.education}</td>
                <td>{psy.country}</td>
                <td>{psy.international_account == true ? "Есть" : "Нет"}</td>
                <td>
                  <span className={`status-tag ${statusColor(psy.plan)}`}>
                    {psy.plan}
                  </span>
                </td>
                <td>{formatDate(psy.start_at)}</td>
                <td>
                  <span
                    className={`status-tag ${statusColor(psy.education_status)}`}
                  >
                    {psy.education_status}
                  </span>
                </td>
                <td>{psy.number_current_clients}</td>
                <td>{psy.number_clients_able2serve}</td>
                <td>
                  <span
                    className={`status-tag ${statusColor(psy.readiness_status)}`}
                  >
                    {psy.readiness_status}
                  </span>
                </td>
                <td>{psy.amount_of_replacements}</td>
                <td>{psy.remark}</td>
              </tr>

              {expandedId === psy.id && (
                <tr className="expanded-row">
                  <td colSpan={25}>
                    <div className="clients-list-block">
                      <h5 style={{ fontSize: '12px', fontWeight: '600', margin: ' 0 0 0 16px'}}>Клиенты</h5>

                      {psy.clients.map((client, idx) => (
                        <tr key={client.id} className="client-row">
                          <td>
                            {idx + 1}. {client.last_name} {client.first_name}
                          </td>
                          <td>{client.phone2call}</td>
                          <td>{client.name4telegram}</td>
                          <td>
                            <span
                              className={`status-tag ${statusColor(
                                client.distributionStatus
                              )}`}
                            >
                              {client.distributionStatus}
                            </span>
                          </td>
                          <td style={{ width: '45%'}}>{client.remark}</td>
                        </tr>
                      ))}
                    </div>
                  </td>
                </tr>
              )}
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

