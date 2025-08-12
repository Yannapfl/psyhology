"use client";

import { useState } from "react";
import "./Modals.css";
import Image from "next/image";
import close from "../../../public/icons/Close.svg";
import Input from "../Input/Input";

export default function ModalAddCohort({
  onClose,
  onNext,
}: {
  onClose: () => void;
  onNext: (data: { name: string; startDate: string; endDate: string }) => void;
}) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = () => {
  if (!name || !startDate || !endDate) {
    alert("Пожалуйста, заполните все поля.");
    return;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (end < start) {
    alert("Дата окончания не может быть раньше даты начала.");
    return;
  }

  onNext({ name, startDate, endDate });
};


  return (
    <div className="modal-overlay">
      <div className="modal" style={{ width: "712px" }}>
        <div className="modal-header" style={{ marginBottom: "40px" }}>
          <h2 style={{ margin: 0 }}>Создание потока</h2>
          <button className="close-button" onClick={onClose}>
            <Image src={close} alt="close" width={24} />
          </button>
        </div>
        <div className="modal-admin">
          <Input name="name" placeholder="Название потока" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: "16px" }} />
          <div className="two-flexbox">
            <Input type='date' name="startDate" placeholder="Дата начала" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ padding: "16px" }} />
            <Input type='date' name="endDate" placeholder="Дата завершения" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ padding: "16px" }} />
          </div>
        </div>

        <div className="button-group">
          <button className="btn-light-green" onClick={onClose}>ОТМЕНА</button>
          <button className="btn" onClick={handleSubmit}>СОЗДАТЬ</button>
        </div>
      </div>
    </div>
  );
}

