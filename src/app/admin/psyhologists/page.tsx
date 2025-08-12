"use client";

import LayoutAdmin from "@/components/Layout/LayoutAdmin/LayoutAdmin";
import "../../../components/Layout/Layout.css";
import { useState } from "react";
import ModalAddPsy from "@/components/Modals/ModalAddPsy";
import Select from "@/components/Dropdown/Dropdown";
import Input from "@/components/Input/Input";
import PsyTable from "@/components/PsyTable/PsyTable";

export default function ClientsPage() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [search, setSearch] = useState("");
  const [ status, setStatus] = useState('');
  const [country, setCountry] = useState('');
   const [internationalAcc, setInternationalAcc] = useState('');
    const [tariff, setTariff] = useState('');
     const [dateStart, setDateStart] = useState('');
      const [readyStatus, setReadyStatus] = useState('');



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
        />

        <div className="filters-group" style={{ width: '95%'}}>
          <Select
            style={{
              padding: "10px 12px",
              marginBottom: 0,
              fontSize: "14px",
              color: "#A3B3ADB2",
            }}
            name=""
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            options={["Россия", "Казахстан", "Беларусь"]}
            placeholderOption="Страна"
          />

          <Select
            style={{
              padding: "10px 12px",
              marginBottom: 0,
              fontSize: "14px",
              color: "#A3B3ADB2",
            }}
            name=""
            value={internationalAcc}
            onChange={(e) => setInternationalAcc(e.target.value)}
            options={["Есть", "Нет"]}
            placeholderOption="Счет заграницей"
          />

          <Select
            style={{
              padding: "10px 12px",
              marginBottom: 0,
              fontSize: "14px",
              color: "#A3B3ADB2",
            }}
            name=""
            value={tariff}
            onChange={(e) => setTariff(e.target.value)}
            options={["Premim", "Базовый"]}
            placeholderOption="Тариф"
          />

          <Input placeholder="Дата старта"
            name="date"
            type="date"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
            style={{padding: "10px 12px",
              marginBottom: 0,
              fontSize: "14px",
              color: "#A3B3ADB2",}}
            />

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
            options={["Завершил", "В процессе"]}
            placeholderOption="Статус обучения"
          />

            <Select
            style={{
              padding: "10px 12px",
              marginBottom: 0,
              fontSize: "14px",
              color: "#A3B3ADB2",
            }}
            name=""
            value={readyStatus}
            onChange={(e) => setReadyStatus(e.target.value)}
            options={["Все распределены", "Ожидает распределения"]}
            placeholderOption="Статус готовности"
          />

          
          <button className="filter-button">Очистить фильтр</button>
        </div>

        <PsyTable />

        {openAddModal && <ModalAddPsy onClose={() => setOpenAddModal(false)} cohortId={1} />}
      </div>
    </LayoutAdmin>
  );
}
