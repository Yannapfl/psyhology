"use client";

import ComplaintTable from "@/components/ComplaintTable/ComplaintTable";
import Select from "@/components/Dropdown/Dropdown";
import Input from "@/components/Input/Input";
import LayoutAdmin from "@/components/Layout/LayoutAdmin/LayoutAdmin";
import { useState } from "react";

export default function Complains() {
  const [search, setSearch] = useState("");
  const [today, setToday] = useState(false);
  const [initiator, setInitiator] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  return (
    <LayoutAdmin>
      <div className="content-admin">
        <div className="header-page">
          <div className="title-page-admin">
            <h1>Жалобы</h1>
            <h1 style={{ color: "#949494" }}>120</h1>
          </div>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-search"
          placeholder="Поиск"
        />

        <div className="filters-group" style={{ width: "80%" }}>
          <div className="custom-checkbox" onClick={() => setToday(!today)}>
            <input
              type="checkbox"
              checked={today}
              onChange={() => setToday(!today)}
            />
            <label>Только за сегодня</label>
          </div>

          <Select
            style={{
              padding: "10px 12px",
              marginBottom: 0,
              fontSize: "14px",
              color: "#A3B3ADB2",
            }}
            name=""
            value={initiator}
            onChange={(e) => setInitiator(e.target.value)}
            options={["Психолог", "Клиент"]}
            placeholderOption="Инициатор"
          />

          <Select
            style={{
              padding: "10px 12px",
              marginBottom: 0,
              fontSize: "14px",
              color: "#A3B3ADB2",
            }}
            name=""
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={["Обработаны", "Новая"]}
            placeholderOption="Статус заявки"
          />

          <Input
            placeholder="Дата жалобы"
            name="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              padding: "10px 12px",
              marginBottom: 0,
              fontSize: "14px",
              color: "#A3B3ADB2",
            }}
          />

          <button className="filter-button">Очистить фильтр</button>
        </div>

        <ComplaintTable />
      </div>
    </LayoutAdmin>
  );
}
