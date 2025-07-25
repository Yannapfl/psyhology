'use client'

import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import Image from "next/image";
import profile from '../../../public/icons/profile.svg'

import arrowDown from '../../../public/icons/arrow_down.svg'; 
import arrowUp from '../../../public/icons/arrow_up.svg'; 
import './PsyTable.css'

const psychologists = [
  {
    id: 1,
    name: 'Беловицкая Ольга',
    phone: '+7 702 456 78 90',
    telegram: '@mynick',
    email: 'mymail@gmail.com',
    education: 'Прикладная психология и коучинг',
    country: 'Казахстан',
    tariff: 'Базовый',
    clients: [
      {
        id: 101,
        name: 'Диана Карим',
        phone: '993726128393',
        telegram: '@fidilina',
        status: 'Вышел из проекта',
        comment: 'Причина выхода клиента...',
        tariff: 'Premium',
        startDate: '21.07.2025',
        learningStatus: 'В процессе',
        readiness: 'Ожидает распределения',
        distributed: 0,
        needed: 4,
        changes: 1,
        reason: '-',
      },
    ],
  },
];

export default function ExpandableTable() {
    const [currentPage, setCurrentPage] = useState(1);
      const perPage = 10;
      const totalPages = Math.ceil(psychologists.length / perPage);
      const pageData = psychologists.slice((currentPage - 1) * perPage, currentPage * perPage);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
    <table className="exp-table">
      <thead>
        <tr>
          <th>Психолог</th>
          <th>Номер телефона</th>
          <th>Ник телеграм</th>
          <th>Почта</th>
          <th>Образование</th>
          <th>Страна</th>
          <th>Тариф</th>
        </tr>
      </thead>
      <tbody>
        {pageData.map((psy) => (
          <>
            <tr key={psy.id} className="psy-row">
              <td>
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
                <div className="td-image">
                    <Image src={profile} alt="profile" width={28} />
                    {psy.name}
                </div>
                
              </td>
              <td>{psy.phone}</td>
              <td>{psy.telegram}</td>
              <td>{psy.email}</td>
              <td>{psy.education}</td>
              <td>{psy.country}</td>
              <td>{psy.tariff}</td>
            </tr>

            {expandedId === psy.id && psy.clients.map((client, idx) => (
              <tr key={client.id} className="client-row">
                <td>{idx + 1}. {client.name}</td>
                <td>{client.phone}</td>
                <td>{client.telegram}</td>
                <td>{client.tariff}</td>
                <td>{client.startDate}</td>
                <td>
                  <span className={`status-tag ${statusColor(client.learningStatus)}`}>{client.learningStatus}</span>
                </td>
                <td>
                  <span className={`status-tag ${statusColor(client.readiness)}`}>{client.readiness}</span>
                </td>
              </tr>
            ))}
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

function statusColor(status: string): string {
  if (status.includes('Заверш')) return 'green';
  if (status.includes('Ожидает') || status.includes('В ожидании')) return 'yellow';
  if (status.includes('Вышел')) return 'red';
  return 'default';
}
