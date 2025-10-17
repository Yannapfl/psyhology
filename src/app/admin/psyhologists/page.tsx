"use client";

import LayoutAdmin from "@/components/Layout/LayoutAdmin/LayoutAdmin";
import "../../../components/Layout/Layout.css";
import { useMemo, useState } from "react";
import ModalAddPsy from "@/components/Modals/ModalAddPsy";
import Select from "@/components/Dropdown/Dropdown";
import Input from "@/components/Input/Input";
import PsyTable from "@/components/PsyTable/PsyTable";

export default function ClientsPage() {
  const [openAddModal, setOpenAddModal] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [country, setCountry] = useState("");
  const [internationalAcc, setInternationalAcc] = useState("");
  const [tariff, setTariff] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [readyStatus, setReadyStatus] = useState("");
  
  const hasFilters = useMemo(
    () =>
      !!(
        search.trim() ||
        status ||
        country ||
        internationalAcc ||
        tariff ||
        dateStart ||
        readyStatus
      ),
    [search, status, country, internationalAcc, tariff, dateStart, readyStatus]
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
    setCountry("");
    setInternationalAcc("");
    setTariff("");
    setDateStart("");
    setReadyStatus("");
  };

  return (
    <LayoutAdmin>
      <div className="content-admin">
        <div className="header-page">
          <div className="title-page-admin">
            <h1>Психологи</h1>
            <h1 style={{ color: "#949494" }}>120</h1>
          </div>
          <button onClick={() => setOpenAddModal(true)}>
            + Новый психолог
          </button>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-search"
          placeholder="Поиск"
          style={controlStyle(!!search.trim())}
        />

        <div className="filters-group" style={{ width: "95%" }}>
          <Select
            style={controlStyle(!!country)}
            name=""
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            options={["Россия", "Казахстан", "Беларусь"]}
            placeholderOption="Страна"
          />

          <Select
            style={controlStyle(!!internationalAcc)}
            name=""
            value={internationalAcc}
            onChange={(e) => setInternationalAcc(e.target.value)}
            options={["Есть", "Нет"]}
            placeholderOption="Счет заграницей"
          />

          <Select
            style={controlStyle(!!tariff)}
            name=""
            value={tariff}
            onChange={(e) => setTariff(e.target.value)}
            options={["Premium", "Базовый"]}
            placeholderOption="Тариф"
          />

          <Input
            placeholder="Дата старта"
            name="date"
            type="date"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
            style={controlStyle(!!dateStart)}
          />

          <Select
            style={controlStyle(!!status)}
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={["Завершил", "В процессе"]}
            placeholderOption="Статус обучения"
          />

          <Select
            style={controlStyle(!!readyStatus)}
            name=""
            value={readyStatus}
            onChange={(e) => setReadyStatus(e.target.value)}
            options={["Все распределены", "Ожидает распределения"]}
            placeholderOption="Статус готовности"
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
            title={hasFilters ? "Сбросить выбранные фильтры" : "Нет активных фильтров"}
          >
            Очистить фильтр
          </button>
        </div>

        <PsyTable
          search={search}
          country={country}
          internationalAcc={internationalAcc}
          tariff={tariff}
          dateStart={dateStart}
          status={status}
          readyStatus={readyStatus}
        />

        {openAddModal && (
          <ModalAddPsy onClose={() => setOpenAddModal(false)} cohortId={1} />
        )}
      </div>
    </LayoutAdmin>
  );
}
