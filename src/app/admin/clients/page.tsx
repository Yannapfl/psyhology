"use client";

import LayoutAdmin from "@/components/Layout/LayoutAdmin/LayoutAdmin";
import "../../../components/Layout/Layout.css";
import { useState } from "react";
import ModalAddClient from "@/components/Modals/ModalAddClient";
import Select from "@/components/Dropdown/Dropdown";
import ClientsTable from "@/components/ClientsTable/ClientsTable";

export default function ClientsPage() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [search, setSearch] = useState("");
  const [ status, setStatus] = useState('');

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

        <div className="filters-group" style={{ width: '35%'}}>
          <Select
            style={{ padding: "10px 12px" , marginBottom: 0, fontSize: '14px', color: '#A3B3ADB2'}}
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={["Распределен", "В ожидании", "Вышел из проекта"]}
            placeholderOption="Статус распределения"
          />
          <button className="filter-button">Очистить фильтр</button>
        </div>

        <ClientsTable id={1} />

        {openAddModal && (
          <ModalAddClient onClose={() => setOpenAddModal(false)} />
        )}
      </div>
    </LayoutAdmin>
  );
}
