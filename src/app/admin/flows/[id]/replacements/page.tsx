"use client";

import Select from "@/components/Dropdown/Dropdown";
import LayoutAdmin from "@/components/Layout/LayoutAdmin/LayoutAdmin";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/utils/api";
import ChangesTable from "@/components/ChangesTable/ChangesTable";
import { useParams } from "next/navigation";
import { Cohort } from "@/types/CohortTypes";

export default function ReplacementsFlow() {
const [search, setSearch] = useState("");
  const [today, setToday] = useState(false);
  const [initiator, setInitiator] = useState("");
  const [reason, setReason] = useState("");
  const [complaint, setComplaint] = useState("");
  const [status, setStatus] = useState("");

  const [reasons, setReasons] = useState([]);
  const { id } = useParams<{ id: string }>();
  
    const [cohort, setCohort] = useState<Cohort | null>(null);
  

  useEffect(() => {
    const fetch = async () => {
     try {
        const responseReasons = await api.get(`v1/enums/reasons-to-replace`);
        setReasons(responseReasons.data);
        const responseCohort = await api.get(`v1/cohorts/${id}`);
        setCohort(responseCohort.data);
      } catch (error) {
        console.log("Ошибка получения списка причин замен", error);
      }
    };

    fetch();
  }, [id]);

  return (
    <LayoutAdmin>
      <div className="content-admin">
        <div className="path-page">
          <Link href="/admin/flows">
            <h6>Все потоки</h6>
          </Link>
          <h6>/</h6>
          <Link href={`/admin/flows/${id}`}>
          <h6>{cohort?.Name}</h6></Link>
          <h6>/</h6>
          <h6>Замены</h6>
        </div>
        <div className="header-page">
          <div className="title-page-admin">
            <h1>Замены</h1>
            <h1 style={{ color: "#949494" }}>{cohort?.AmountOfReplacements}</h1>
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
        
             <ChangesTable id={id} />
        
      </div>
    </LayoutAdmin>
  );
}
