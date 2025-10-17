"use client";

import { useEffect, useState, Fragment } from "react";
import Pagination from "../Pagination/Pagination";
import Image from "next/image";
import profile from "../../../public/icons/profile.svg";
import arrowDown from "../../../public/icons/arrow_down.svg";
import arrowUp from "../../../public/icons/arrow_up.svg";
import "./PsyTable.css";
import { statusColor } from "@/utils/statusColor";
import api from "@/utils/api";
import formatDate from "@/utils/formatDate";

type Props = {
  id?: number | string;


  search?: string;           // fullname
  country?: string;          // country
  internationalAcc?: string; // international_account: "Есть"/"Нет" или "true"/"false"
  tariff?: string;           // plan
  dateStart?: string;        // start_date: YYYY-MM-DD
  status?: string;           // education_status
  readyStatus?: string;      // readiness_status
};


interface ClientDTO {
  id: number;
  first_name: string;
  last_name: string;
  phone2call: string;
  name4telegram: string;
  distribution_status: string;
  comment: string;
}


interface PsychologistDTO {
  id: number;
  first_name: string;
  last_name: string;
  phone2call: string;
  name4telegram: string;
  email: string;
  education: string;
  country: string;
  international_account: boolean;
  plan: string;
  start_at: string;
  education_status: string;
  number_current_clients: number;
  number_clients_able2serve: number;
  readiness_status: string;
  amount_of_replacements: number;
  remark: string;
  clients: ClientDTO[];
}

type PsychologistListDTO = PsychologistDTO[];

export default function PsyTable({
  id,
  search = "",
  country = "",
  internationalAcc = "",
  tariff = "",
  dateStart = "",
  status = "",
  readyStatus = "",
}: Props) {
  const [data, setData] = useState<PsychologistListDTO>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const totalPages = Math.ceil(data.length / perPage);
  const pageData = data.slice((currentPage - 1) * perPage, currentPage * perPage);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (rowId: number) => {
    setExpandedId(expandedId === rowId ? null : rowId);
  };

  const normalizeInternationalAcc = (val: string): string => {
    if (!val) return "";
    const v = val.toLowerCase();
    if (v === "есть") return "true";
    if (v === "нет") return "false";
    return val;
  };

  useEffect(() => {
    const abort = new AbortController();

    const fetchPsys = async (): Promise<void> => {
      try {
        setIsLoading(true);

        const endpoint = id ? `/v1/${id}/psychologists` : `/v1/1/psychologists`;

        const params: Record<string, string> = {};
        if (search.trim()) params.fullname = search.trim();
        if (country) params.country = country;
        if (internationalAcc) params.international_account = normalizeInternationalAcc(internationalAcc);
        if (tariff) params.plan = tariff;
        if (dateStart) params.start_date = dateStart;
        if (status) params.education_status = status;
        if (readyStatus) params.readiness_status = readyStatus;

        const res = await api.get<PsychologistListDTO>(endpoint, {
          signal: abort.signal,
          params,
        });

        setData(res.data);
        setCurrentPage(1);
      } catch (err) {
        if (err && typeof err === "object" && "name" in err) {
          const name = String((err as { name?: string }).name);
          if (name === "CanceledError" || name === "AbortError") return;
        }
        console.error("Ошибка загрузки психологов:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPsys();
    return () => abort.abort();
  }, [id, search, country, internationalAcc, tariff, dateStart, status, readyStatus]);

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
            <Fragment key={psy.id}>
              <tr className="psy-row">
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
                    <div className="td-image" style={{ textWrap: "nowrap" }}>
                      <Image src={profile} alt="profile" width={28} />
                      {psy.last_name} {psy.first_name}
                    </div>
                  </div>
                </td>

                <td style={{ textWrap: "nowrap"  }}>{psy.phone2call}</td>
                <td style={{ textWrap: "nowrap"}}>{psy.name4telegram}</td>
                <td style={{ textWrap: "nowrap"  }}>{psy.email}</td>
                <td>{psy.education}</td>
                <td>{psy.country}</td>
                <td>{psy.international_account ? "Есть" : "Нет"}</td>
                <td>
                  <span className={`status-tag ${statusColor(psy.plan)}`}>
                    {psy.plan}
                  </span>
                </td>
                <td>{formatDate(psy.start_at)}</td>
                <td>
                  <span className={`status-tag ${statusColor(psy.education_status)}`}>
                    {psy.education_status}
                  </span>
                </td>
                <td>{psy.number_current_clients}</td>
                <td>{psy.number_clients_able2serve}</td>
                <td>
                  <span className={`status-tag ${statusColor(psy.readiness_status)}`}>
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
                      <h5
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          margin: "0 0 0 16px",
                        }}
                      >
                        Клиенты
                      </h5>

                      {psy.clients.map((client, idx) => (
                        <tr key={client.id} className="client-row">
                          <td>
                            {idx + 1}. {client.last_name} {client.first_name}
                          </td>
                          <td>{client.phone2call}</td>
                          <td>{client.name4telegram}</td>
                          <td>
                            <span
                              className={`status-tag ${statusColor(client.distribution_status)}`}
                            >
                              {client.distribution_status}
                            </span>
                          </td>
                          <td style={{ width: "45%" }}>{client.comment}</td>
                        </tr>
                      ))}
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
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
