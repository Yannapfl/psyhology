import "./Modals.css";
import Image from "next/image";
import close from "../../../public/icons/Close.svg";
import { useState } from "react";
import Input from "../Input/Input";
import Select from "../Dropdown/Dropdown";

export default function ModalAddPsy({ onClose }: { onClose: () => void }) {
  const [crm, setCrm] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    phoneCall: "",
    phoneWhatsApp: "",
    phoneTelegram: "",
    email: "",
    psyhology: "",
    status: "",
    comments: "",
    education: '',
    country: '',
    internationalAcc: '',
    tariff: '',
    startedAt: '',
    limitClients: '',
    haveClients: '',
    readyStatus: '',
    changesCount: ''
  });

  const handleChange = (
   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    alert('Клиент успешно создан');
    onClose();
  }

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
          <Input
            placeholder="Имя"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            style={{padding: '16px'}}
          />
          <Input
            placeholder="Фамилия"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            style={{padding: '16px'}}
          />
        </div>
        <div className="two-flexbox">
          <Input
            placeholder="Номер телефона для звонка"
            name="phoneCall"
            value={formData.phoneCall}
            onChange={handleChange}
            style={{padding: '16px'}}
          />
          <Input
            placeholder="Номер телефона WhatsApp"
            name="phoneWhatsApp"
            value={formData.phoneWhatsApp}
            onChange={handleChange}
            style={{padding: '16px'}}
          />
        </div>
        <div className="two-flexbox">
          <Input
            placeholder="Никнейм Telegram"
            name="phoneTelegram"
            value={formData.phoneTelegram}
            onChange={handleChange}
            style={{padding: '16px'}}
          />
          <Input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            style={{padding: '16px'}}
          />
        </div>
        <div className="two-flexbox">
          <Input
            placeholder="Образование"
            name="education"
            value={formData.education}
            onChange={handleChange}
            style={{padding: '16px'}}
          />
          <Select
          style={{padding: '16px'}}
            name="country"
            value={formData.country}
            onChange={handleChange}
            options={["Россия", "Казахстан", "Беларусь"]}
            placeholderOption="Страна"
          />
        </div>
        <div className="two-flexbox">
          <Select
          style={{padding: '16px'}}
            name="internationalAcc"
            value={formData.internationalAcc}
            onChange={handleChange}
            options={["Есть", "Неn"]}
            placeholderOption="Счет заграницей"
          />
          <Select
          style={{padding: '16px'}}
            name="tariff"
            value={formData.tariff}
            onChange={handleChange}
            options={["Базовый", "Premium"]}
            placeholderOption="Тариф"
          />
        </div>
        <div className="two-flexbox">
          <Input
            placeholder="Дата старта"
            name="startedAt"
            value={formData.startedAt}
            onChange={handleChange}
            style={{padding: '16px'}}
            type='date'
          />
          <Select
          style={{padding: '16px'}}
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={["Готов", "Не готов"]}
            placeholderOption="Статус обучения"
          />
        </div>
         <div className="two-flexbox">
          <Input
            placeholder="Нужно клиентов"
            name="limitclients"
            value={formData.limitClients}
            onChange={handleChange}
            style={{padding: '16px'}}
          />
          <Input
            placeholder="Распределено клиентов"
            name="haveclients"
            type="number"
            value={formData.haveClients}
            onChange={handleChange}
            style={{padding: '16px'}}
          />
        </div>
        <div className="two-flexbox">
          <Select
          style={{padding: '16px'}}
            name="status"
            value={formData.readyStatus}
            onChange={handleChange}
            options={["Готов", "Не готов"]}
            placeholderOption="Статус готовности"
          />
          <Input
            placeholder="Количество замен"
            name="changescount"
            value={formData.changesCount}
            onChange={handleChange}
            style={{padding: '16px'}}
            type='number'
          />
        </div>
        <textarea 
        name="complaint"
          value={formData.comments}
          onChange={handleChange}
          placeholder="Примечания"
          rows={4}
          className="textarea-reason"
          style={{ marginBottom: '16px'}}
          />
        </div>
        <div className="button-group">
          <button className="btn-light-green " onClick={onClose}>
            ОТМЕНА
          </button>
          <button className="btn" onClick={handleSubmit}>
            СОХРАНИТЬ
          </button>
        </div>

      </div>
    </div>
  );
}
