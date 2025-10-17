'use client'

import "./Modals.css";
import Image from "next/image";
import close from "../../../public/icons/Close.svg";
import { useEffect, useState } from "react";
import Input from "../Input/Input";
import Select from "../Dropdown/Dropdown";
import api from "@/utils/api";

type Props = {
  onClose: () => void;
  cohortId: number | string;
}

export default function ModalAddPsy({ onClose, cohortId }: Props) {
  const [crm, setCrm] = useState("");
  const [distributionStatuses, setDistributionStatuses] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneCall: "",
    phoneWhatsApp: "",
    phoneTelegram: "",
    email: "",
    education: "",
    country: "",
    internationalAcc: "",
    tariff: "",
    startedAt: "",
    limitClients: "",
    haveClients: "",
    educationStatus: "",
    readyStatus: "",
    changesCount: "",
    gender: "",
    comments: "",
    distributionStatus: "",
  });

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const res = await api.get("/v1/enums/psychologist-distribution-statuses");
        setDistributionStatuses(res.data); 
      } catch (error) {
        console.error("Ошибка при загрузке статусов распределения:", error);
      }
    };
    fetchStatuses();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        amount_of_replacements: parseInt(formData.changesCount) || 0,
        country: formData.country,
        education: formData.education,
        education_status: formData.educationStatus,
        email: formData.email,
        first_name: formData.firstName,
        gender: formData.gender,
        international_account: formData.internationalAcc === "Есть",
        last_name: formData.lastName,
        name4telegram: formData.phoneTelegram,
        number_clients_able2serve: parseInt(formData.limitClients) || 0,
        number_current_clients: parseInt(formData.haveClients) || 0,
        phone2call: formData.phoneCall,
        phone2whatsapp: formData.phoneWhatsApp,
        plan: formData.tariff,
        readiness_status: formData.readyStatus,
        remark: formData.comments,
        start_at: new Date(formData.startedAt).toISOString(),
        distribution_status: formData.distributionStatus,
      };

      const res = await api.post(`/v1/${cohortId}/psychologists`, payload);
      console.log("Психолог успешно создан", res.data);
      onClose();
    } catch (error) {
      console.log(formData.startedAt)
      console.error("Ошибка при создании психолога:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ width: "712px" }}>
        <div className="modal-header" style={{ marginBottom: "40px" }}>
          <h2 style={{ margin: 0 }}>Создание психолога</h2>
          <button className="close-button" onClick={onClose}>
            <Image src={close} alt="close" width={24} />
          </button>
        </div>

        <div className="modal-admin">
          <div className="modal-crm">
            <input
              type="text"
              name="crm"
              value={crm}
              onChange={(e) => setCrm(e.target.value)}
              placeholder="Amo CRM ID"
            />
            <button className="btn-light-green">Подтянуть данные</button>
          </div>

          <div className="two-flexbox">
            <Input name="firstName" placeholder="Имя" value={formData.firstName} onChange={handleChange} style={{ padding: "16px" }} />
            <Input name="lastName" placeholder="Фамилия" value={formData.lastName} onChange={handleChange} style={{ padding: "16px" }} />
          </div>

          <div className="two-flexbox">
            <Input name="phoneCall" placeholder="Номер телефона для звонка" value={formData.phoneCall} onChange={handleChange} style={{ padding: "16px" }} />
            <Input name="phoneWhatsApp" placeholder="Номер WhatsApp" value={formData.phoneWhatsApp} onChange={handleChange} style={{ padding: "16px" }} />
          </div>

          <div className="two-flexbox">
            <Input name="phoneTelegram" placeholder="Ник Telegram" value={formData.phoneTelegram} onChange={handleChange} style={{ padding: "16px" }} />
            <Input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} style={{ padding: "16px" }} />
          </div>

          <div className="two-flexbox">
            <Input name="education" placeholder="Образование" value={formData.education} onChange={handleChange} style={{ padding: "16px" }} />
            <Select name="country" value={formData.country} onChange={handleChange} options={["Россия", "Казахстан", "Беларусь"]} placeholderOption="Страна" />
          </div>

          <div className="two-flexbox">
            <Select name="gender" value={formData.gender} onChange={handleChange} options={["Мужчина", "Женщина"]} placeholderOption="Пол" />
            <Select name="internationalAcc" value={formData.internationalAcc} onChange={handleChange} options={["Есть", "Нет"]} placeholderOption="Счет заграницей" />
          </div>

          <div className="two-flexbox">
            <Select name="tariff" value={formData.tariff} onChange={handleChange} options={["Базовый", "Premium"]} placeholderOption="Тариф" />
             <Input name="startedAt" placeholder="Дата старта" type="date" value={formData.startedAt} onChange={handleChange} style={{ padding: "16px" }} />
          </div>

          <div className="two-flexbox">
            <Select name="educationStatus" value={formData.educationStatus} onChange={handleChange} options={["В процессе", "Завершил"]} placeholderOption="Статус обучения" />
            <Input name="limitClients" placeholder="Нужно клиентов" value={formData.limitClients} onChange={handleChange} style={{ padding: "16px" }} />
          </div>

          <div className="two-flexbox">
            <Input name="haveClients" placeholder="Распределено клиентов" type="number" value={formData.haveClients} onChange={handleChange} style={{ padding: "16px" }} />
            <Select name="readyStatus" value={formData.readyStatus} onChange={handleChange} options={distributionStatuses} placeholderOption="Готовность" />
          </div>

          <div className="two-flexbox">
            <Input name="changesCount" placeholder="Количество замен" type="number" value={formData.changesCount} onChange={handleChange} style={{ padding: "16px" }} />
            <div></div>
          </div>

          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Примечания"
            rows={4}
            className="textarea-reason"
            style={{ marginBottom: "16px" }}
          />
        </div>

        <div className="button-group">
          <button className="btn-light-green" onClick={onClose}>ОТМЕНА</button>
          <button className="btn" onClick={handleSubmit}>СОХРАНИТЬ</button>
        </div>
      </div>
    </div>
  );
}
