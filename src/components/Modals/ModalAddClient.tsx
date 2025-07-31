import "./Modals.css";
import Image from "next/image";
import close from "../../../public/icons/Close.svg";
import { useState } from "react";
import Input from "../Input/Input";
import Select from "../Dropdown/Dropdown";
import api from "@/utils/api";

export default function ModalAddClient({ onClose }: { onClose: () => void }) {
  const [crm, setCrm] = useState("");
  const cohortId = 1;
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
    gender: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    console.log("Изменение:", name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        distribution_status: formData.status,
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        name4telegram: formData.phoneTelegram,
        phone2call: formData.phoneCall,
        phone2whatsapp: formData.phoneWhatsApp,
        psychologist_id: 0,
        remark: formData.comments,
        gender: formData.gender,
      };

      const response = await api.post(`/v1/${cohortId}/clients`, payload);
      console.log("Клиент создан:", response.data);
      onClose();
    } catch (error) {
      console.error("Ошибка при создании клиента:", error);
    }
  };

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
              style={{ padding: "16px" }}
            />
            <Input
              placeholder="Фамилия"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              style={{ padding: "16px" }}
            />
          </div>
          <div className="two-flexbox">
            <Input
              placeholder="Номер телефона для звонка"
              name="phoneCall"
              value={formData.phoneCall}
              onChange={handleChange}
              style={{ padding: "16px" }}
            />
            <Input
              placeholder="Номер телефона WhatsApp"
              name="phoneWhatsApp"
              value={formData.phoneWhatsApp}
              onChange={handleChange}
              style={{ padding: "16px" }}
            />
          </div>
          <div className="two-flexbox">
            <Input
              placeholder="Никнейм Telegram"
              name="phoneTelegram"
              value={formData.phoneTelegram}
              onChange={handleChange}
              style={{ padding: "16px" }}
            />
            <Input
              placeholder="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              style={{ padding: "16px" }}
            />
          </div>
          <div className="two-flexbox">
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={["Распределен", "В ожидании", "Вышел из проекта"]}
              placeholderOption="Статус распределения"
            />
            <Select
              name="psyhology"
              value={formData.psyhology}
              onChange={handleChange}
              options={["Psy1", "Psy2"]}
              placeholderOption="Психолог"
            />
          </div>
          <Select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            options={["Мужчина", "Женщина"]}
            placeholderOption="Выберете пол"
          />
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
