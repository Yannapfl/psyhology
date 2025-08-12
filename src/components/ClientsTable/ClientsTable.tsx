"use client";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import "./ClientsTable.css";
import Image from "next/image";
import profile from "../../../public/icons/profile.svg";
import ModalEditClient from "../Modals/ModalEditClient";
import api from "@/utils/api";

export type Client = {
  ID: number;
  FirstName: string;
  LastName: string;
  Phone2call: string;
  Name4telegram: string;
  DistributionStatus: "Распределён" | "В ожидании" | "Вышел из проекта";
  Remark: string;
};

const statuses: Record<Client["DistributionStatus"], string> = {
  Распределён: "status-green",
  "В ожидании": "status-yellow",
  "Вышел из проекта": "status-red",
};

type Props = {
  id?: number | string;
};

export default function ClientsTable({ id }: Props) {
  const [data, setData] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openClient, setOpenClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  const perPage = 10;
  const totalPages = Math.ceil(data.length / perPage) || 1;
  const pageData = data.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  useEffect(() => {
    const abort = new AbortController();

    const fetchClients = async () => {
      try {
        setIsLoading(true);

        const endpoint = id ? `/v1/${id}/clients` : `/v1/1/clients`;

        const res = await api.get<Client[]>(endpoint, { signal: abort.signal });
        setData(res.data);
        setCurrentPage(1);
      } catch (err: unknown) {
        const name = (err as { name?: string })?.name;
        if (name === "CanceledError" || name === "AbortError") {
          return;
        }
        console.error("Ошибка загрузки клиентов:", err);
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
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Клиент</th>
            <th>Номер телефона</th>
            <th>Ник телеграм</th>
            <th>Статус распределения</th>
            <th>Примечание</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((row) => (
            <tr key={row.ID} onClick={() => {
                setSelectedClientId(row.ID);
                setOpenClient(true);
              }}>
              <td className="td-image">
                <Image src={profile} alt="profile" width={28} />
                {row.FirstName} {row.LastName}
              </td>
              <td>{row.Phone2call}</td>
              <td>{row.Name4telegram}</td>
              <td>
                <span className={`status ${statuses[row.DistributionStatus]}`}>
                  {row.DistributionStatus}
                </span>
              </td>
              <td>{row.Remark}</td>
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
        onPageChange={(page: number) => setCurrentPage(page)}
      />

      {openClient && selectedClientId !== null && (
        <ModalEditClient
          onClose={() => {
            setOpenClient(false);
            setSelectedClientId(null);
          }}
          clientId={selectedClientId}
        />
      )}
    </div>
  );
}
