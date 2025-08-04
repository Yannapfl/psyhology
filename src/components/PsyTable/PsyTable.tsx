"use client";

import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import Image from "next/image";
import profile from "../../../public/icons/profile.svg";

import arrowDown from "../../../public/icons/arrow_down.svg";
import arrowUp from "../../../public/icons/arrow_up.svg";
import "./PsyTable.css";
import { statusColor } from "@/utils/statusColor";

const psychologists = [
  {
    id: 1,
    name: "Беловицкая Ольга",
    phone: "+7 702 456 78 90",
    telegram: "@mynick",
    email: "mymail@gmail.com",
    education: "Прикладная психология и коучинг",
    country: "Казахстан",
    internationalAcc: true,
    tariff: "Базовый",
    startDate: "21.07.2025",
    educationStatus: "Завершен",
    countClients: 8,
    needClients: 8,
    readyStatus: "Все распределены",
    changeCount: 0,
    comments: "-",
    clients: [
      {
        id: 101,
        name: "Диана Карим",
        phone: "993726128393",
        telegram: "@fidilina",
        status: "Вышел из проекта",
        comment: "Причина выхода клиента...",
      },
      {
        id: 102,
        name: "Айнур Багеева",
        phone: "993726128393",
        telegram: "@fidilina",
        status: "Распредел",
        comment: "",
      },
      {
        id: 103,
        name: "Диана Карим",
        phone: "993726128393",
        telegram: "@fidilina",
        status: "Возварт",
        comment: "Причина выхода клиента...",
      },
    ],
  },
];

export default function ExpandableTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const totalPages = Math.ceil(psychologists.length / perPage);
  const pageData = psychologists.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

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
                      {psy.name}
                    </div>
                  </div>
                </td>
                <td style={{ textWrap: "nowrap" }}>{psy.phone}</td>
                <td style={{ textWrap: "nowrap" }}>{psy.telegram}</td>
                <td style={{ textWrap: "nowrap" }}>{psy.email}</td>
                <td>{psy.education}</td>
                <td>{psy.country}</td>
                <td>{psy.internationalAcc == true ? "Есть" : "Нет"}</td>
                <td>
                  <span className={`status-tag ${statusColor(psy.tariff)}`}>
                    {psy.tariff}
                  </span>
                </td>
                <td>{psy.startDate}</td>
                <td>
                  <span
                    className={`status-tag ${statusColor(psy.educationStatus)}`}
                  >
                    {psy.educationStatus}
                  </span>
                </td>
                <td>{psy.countClients}</td>
                <td>{psy.needClients}</td>
                <td>
                  <span
                    className={`status-tag ${statusColor(psy.readyStatus)}`}
                  >
                    {psy.readyStatus}
                  </span>
                </td>
                <td>{psy.changeCount}</td>
                <td>{psy.comments}</td>
              </tr>

              {expandedId === psy.id && (
                <tr className="expanded-row">
                  <td colSpan={25}>
                    <div className="clients-list-block">
                      <h5 style={{ fontSize: '12px', fontWeight: '600', margin: ' 0 0 0 16px'}}>Клиенты</h5>

                      {psy.clients.map((client, idx) => (
                        <tr key={client.id} className="client-row">
                          <td>
                            {idx + 1}. {client.name}
                          </td>
                          <td>{client.phone}</td>
                          <td>{client.telegram}</td>
                          <td>
                            <span
                              className={`status-tag ${statusColor(
                                client.status
                              )}`}
                            >
                              {client.status}
                            </span>
                          </td>
                          <td style={{ width: '70%'}}>{client.comment}</td>
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

