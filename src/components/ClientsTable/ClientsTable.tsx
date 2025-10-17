"use client";
import { useEffect, useMemo, useState } from "react";
import Pagination from "../Pagination/Pagination";
import "./ClientsTable.css";
import Image from "next/image";
import profile from "../../../public/icons/profile.svg";
import ModalEditClient from "../Modals/ModalEditClient";
import api from "@/utils/api";
import { statusColor } from "@/utils/statusColor";

export type Client = {
  id: number;
  first_names: string;
  last_name: string;
  phone2call: string;
  name4telegram: string;
  distribution_status: string;
  remark: string;
};

type Props = {
  id?: number | string;
  search?: string; 
  status?: string; 
};

const getStatusClass = (status: string) => {
  return statusColor(status);
};

export default function ClientsTable({ id, search = "", status = "" }: Props) {
  const [data, setData] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openClient, setOpenClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  const perPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, id]);

  const pageData = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    const end = currentPage * perPage;
    return data.slice(start, end);
  }, [data, currentPage]);

  const totalPages = Math.ceil(data.length / perPage) || 1;

  useEffect(() => {
    const abort = new AbortController();

    const fetchClients = async () => {
      try {
        setIsLoading(true);

        const endpoint = id ? `/v1/${id}/clients` : `/v1/1/clients`;
        const params: Record<string, string> = {};

        const fullname = search.trim();
        const distribution_status = status.trim();

        if (fullname.length > 0) params.fullname = fullname;
        if (distribution_status.length > 0) params.distribution_status = distribution_status;

        const res = await api.get<Client[]>(endpoint, {
          signal: abort.signal,
          params,
        });
console.log("RAW", res.data);
console.log("norm", Array.isArray(res.data));
        setData(Array.isArray(res.data) ? res.data : []);
        
      } catch (err: unknown) {
        const name = (err as { name?: string })?.name;
        if (name === "CanceledError" || name === "AbortError") return;
        console.error("Ошибка загрузки клиентов:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
    return () => abort.abort();
  }, [id, search, status]);

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
            <tr
              key={row.id}
              onClick={() => {
                setSelectedClientId(row.id);
                setOpenClient(true);
              }}
            >
              <td className="td-image">
                <Image src={profile} alt="profile" width={28} />
                {row.first_names} {row.last_name}
              </td>
              <td>{row.phone2call}</td>
              <td>{row.name4telegram}</td>
              <td>
                <span className={`status ${getStatusClass(row.distribution_status)}`}>
                  {row.distribution_status}
                </span>
              </td>
              <td>{row.remark}</td>
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
