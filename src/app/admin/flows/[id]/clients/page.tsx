"use client";

import Select from "@/components/Dropdown/Dropdown";
import LayoutAdmin from "@/components/Layout/LayoutAdmin/LayoutAdmin";
import ModalAddClient from "@/components/Modals/ModalAddClient";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Cohort } from "@/types/CohortTypes";
import { useParams } from "next/navigation";
import api from "@/utils/api";
import ClientsTable from "@/components/ClientsTable/ClientsTable";

export default function CleintsFlow() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const { id } = useParams<{ id: string }>();

  const [cohort, setCohort] = useState<Cohort | null>(null);

  useEffect(() => {
    const fetchCohort = async () => {
      try {
        const response = await api.get(`v1/cohorts/${id}`);
        setCohort(response.data);
      } catch (error) {
        console.error("Ошибка загрузки потока", error);
      }
    };

    fetchCohort();
  }, [id]);

  if (!cohort) return <div>Загрузка...</div>;

  return (
    <LayoutAdmin>
      <div className="content-admin">
        <div className="path-page">
          <Link href="/admin/flows">
            <h6>Все потоки</h6>
          </Link>
          <h6>/</h6>
          <Link href={`/admin/flows/${id}`}>
          <h6>{cohort.Name}</h6></Link>
          <h6>/</h6>
          <h6>Клиенты</h6>
        </div>
        <div className="header-page">
          <div className="title-page-admin">
            <h1>Клиенты</h1>
            <h1 style={{ color: "#949494" }}>{cohort.AmountOfClients}</h1>
          </div>
          <button onClick={() => setOpenAddModal(true)}>+ Новый клиент</button>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-search"
          placeholder="Поиск"
        />

        <div className="filters-group" style={{ width: "35%" }}>
          <Select
            style={{
              padding: "10px 12px",
              marginBottom: 0,
              fontSize: "14px",
              color: "#A3B3ADB2",
            }}
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={["Распределен", "В ожидании", "Вышел из проекта"]}
            placeholderOption="Статус распределения"
          />
          <button className="filter-button">Очистить фильтр</button>
        </div>

        <ClientsTable id={id} />

        {openAddModal && (
          <ModalAddClient onClose={() => setOpenAddModal(false)} />
        )}
      </div>
    </LayoutAdmin>
  );
}
