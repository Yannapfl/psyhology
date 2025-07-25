'use client'
import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import "./ClientsTable.css";
import Image from "next/image";
import profile from '../../../public/icons/profile.svg'
import ModalEditClient from "../Modals/ModalEditClient";
import { mockClient1 } from "@/mocks/mocksClients";

const data = Array.from({ length: 150 }, (_, i) => ({
  name: "Беловицкая Ольга",
  phone: "+7 702 456 78 90",
  telegram: "@mynick",
  date: "19.01.2023",
  status:
    i === 4
      ? "Вышел из проекта"
      : i === 3
      ? "В ожидании"
      : "Распределён",
  note: "Казахстан, но живет в Чехии",
}));

const statuses: Record<string, string> = {
  "Распределён": "status-green",
  "В ожидании": "status-yellow",
  "Вышел из проекта": "status-red",
};

export default function ClientsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const totalPages = Math.ceil(data.length / perPage);
  const pageData = data.slice((currentPage - 1) * perPage, currentPage * perPage);
  const [openClient, setOpenClient ] = useState(false);

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Клиент</th>
            <th>Номер телефона</th>
            <th>Ник телеграм</th>
            <th>Дата</th>
            <th>Статус распределения</th>
            <th>Примечание</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((row, index) => (
            <tr key={index} onClick={() => setOpenClient(true)}>
              <td className="td-image">
                <Image src={profile} alt="profile" width={28} />
                {row.name}
                </td>
              <td>{row.phone}</td>
              <td>{row.telegram}</td>
              <td>{row.date}</td>
              <td><span className={`status ${statuses[row.status]}`}>{row.status}</span></td>
              <td>{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {openClient && (
        <ModalEditClient onClose={() => setOpenClient(false)} initialData={mockClient1} />
      )}
    </div>
  );
}
