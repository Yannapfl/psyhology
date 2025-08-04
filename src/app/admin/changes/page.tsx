"use client";

import ChangesTable from "@/components/ChangesTable/ChangesTable";
import Select from "@/components/Dropdown/Dropdown";
import LayoutAdmin from "@/components/Layout/LayoutAdmin/LayoutAdmin";
import api from "@/utils/api";
import { useEffect, useState } from "react";

export default function ChangesPage() {
  const [search, setSearch] = useState("");
  const [today, setToday] = useState(false);
  const [initiator, setInitiator] = useState("");
  const [reason, setReason] = useState("");
  const [complaint, setComplaint] = useState("");
  const [status, setStatus] = useState("");

  const [reasons, setReasons] = useState([]);

  useEffect(() => {
    const fetchReasons = async () => {
     try {
        const response = await api.get(`v1/enums/reasons-to-replace`);
        setReasons(response.data);
      } catch (error) {
        console.log("Ошибка получения списка причин замен", error);
      }
    };

    fetchReasons();
  }, []);

  return (
    <LayoutAdmin>
      <div className="content-admin">
        <div className="header-page">
          <div className="title-page-admin">
            <h1>Замены</h1>
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
              <label>
              Только за сегодня
            </label>
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
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            options={reasons}
            placeholderOption="Причины замены"
          />

          <Select
            style={{
              padding: "10px 12px",
              marginBottom: 0,
              fontSize: "14px",
              color: "#A3B3ADB2",
            }}
            name=""
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            options={["Есть", "Нет"]}
            placeholderOption="Жалоба"
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
            options={["Обработана", "В ожидании"]}
            placeholderOption="Статус заявки"
          />

          <button className="filter-button">Очистить фильтр</button>
        </div>

     <ChangesTable />

      </div>
    </LayoutAdmin>
  );
}
