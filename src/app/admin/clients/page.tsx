"use client";

import LayoutAdmin from "@/components/Layout/LayoutAdmin/LayoutAdmin";
import "../../../components/Layout/Layout.css";
import { useEffect, useMemo, useState } from "react";
import ModalAddClient from "@/components/Modals/ModalAddClient";
import Select from "@/components/Dropdown/Dropdown";
import ClientsTable from "@/components/ClientsTable/ClientsTable";
import api from "@/utils/api";
import { Cohort } from "@/types/CohortTypes";

export default function ClientsPage() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [cohort, setCohort] = useState<Cohort | null>(null);

  const hasFilters = useMemo(
    () => !!(search.trim() || status),
    [search, status]
  );

  const baseControlStyle: React.CSSProperties = {
    padding: "10px 12px",
    marginBottom: 0,
    fontSize: "14px",
  };

  const controlStyle = (hasValue: boolean): React.CSSProperties => ({
    ...baseControlStyle,
    color: hasValue ? "#000000" : "#A3B3ADB2",
  });

  const clearFilters = () => {
    setSearch("");
    setStatus("");
  };

  useEffect(() => {
    const fetchCohort = async () => {
      try {
        const response = await api.get(`v1/cohorts/${1}`);
        setCohort(response.data);
      } catch (error) {
        console.error("Ошибка загрузки потока", error);
      }
    };
    fetchCohort();
  }, []);

  if (!cohort) return <div>Загрузка...</div>;

  return (
    <LayoutAdmin>
      <div className="content-admin">
        <div className="header-page">
          <div className="title-page-admin">
            <h1>Клиенты</h1>
            <h1 style={{ color: "#949494" }}>120</h1>
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
            style={controlStyle(!!status)}
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[
              "Распределён",
              "В ожидании",
              "Вышел из проекта",
              "Возврат",
            ]}
            placeholderOption="Статус распределения"
          />
          <button
            className="filter-button"
            onClick={clearFilters}
            disabled={!hasFilters}
            style={{
              backgroundColor: hasFilters ? "#10603C" : "#e6e6e6",
              color: hasFilters ? "#ffffff" : "#9e9e9e",
              cursor: hasFilters ? "pointer" : "not-allowed",
              transition: "background-color 0.2s ease, color 0.2s ease",
            }}
          >
            Очистить фильтр
          </button>
        </div>

        <ClientsTable id={1} search={search.trim()} status={status.trim()}/>

        {openAddModal && (
          <ModalAddClient onClose={() => setOpenAddModal(false)} />
        )}
      </div>
    </LayoutAdmin>
  );
}
