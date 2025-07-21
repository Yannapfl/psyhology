import "./Modals.css";
import Image from "next/image";
import close from "../../../public/icons/Close.svg";
import { useState } from "react";
import Input from "../Input/Input";
import Select from "../Dropdown/Dropdown";

export default function ModalAddClient({ onClose }: { onClose: () => void }) {
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
          <h2 style={{ margin: 0 }}>Создание клиента</h2>
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
          <Select
          style={{padding: '16px'}}
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={["Распределен", "В ожидании", "Вышел из проекта"]}
            placeholderOption="Статус распределения"
          />
          <Select
          style={{padding: '16px'}}
            name="psyhology"
            value={formData.psyhology}
            onChange={handleChange}
            options={["Psy1", "Psy2"]}
            placeholderOption="Психолог"
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
