"use client";

import { useState, useEffect } from "react";
import Input from "../Input/Input";
import Dropdown from "../Dropdown/Dropdown";
import "./Application.css";
import api from "@/utils/api";


export default function Application() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneCall: "",
    phoneWhatsApp: "",
    phoneTelegram: "",
    email: "",
    city: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/v1/profile");
        const data = response.data;

        setFormData({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          phoneCall: data.phone2call || "",
          phoneWhatsApp: data.phone2whatsapp || "",
          phoneTelegram: data.name4telegram || "",
          email: data.email || "",
          city: data.city || "",
        });
      } catch (error) {
        console.error("Ошибка при загрузке профиля:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="application">
      <h1>Мои данные</h1>
      <form className="form-container">
        <Input label="Имя" name="firstName" value={formData.firstName} onChange={handleChange} />
        <Input label="Фамилия" name="lastName" value={formData.lastName} onChange={handleChange} />
        <Input label="Номер телефона для звонка" name="phoneCall" value={formData.phoneCall} onChange={handleChange} />
        <Input label="Номер телефона WhatsApp" name="phoneWhatsApp" value={formData.phoneWhatsApp} onChange={handleChange} />
        <Input label="Номер телефона Telegram" name="phoneTelegram" value={formData.phoneTelegram} onChange={handleChange} />
        <Input label="Электронная почта" name="email" type="email" value={formData.email} onChange={handleChange} />
        <Dropdown
          style={{paddingTop: '22px'}}
          label="Город"
          name="city"
          value={formData.city}
          onChange={handleChange}
          options={["Алматы", "Астана", "Шымкент"]}
          placeholderOption="Выберите город"
        />

        <div className="button-group">
          <button type="button" className="btn-light-green">
            СБРОСИТЬ
          </button>
          <button type="submit" className="btn-save">
            СОХРАНИТЬ ИЗМЕНЕНИЯ
          </button>
        </div>
      </form>
    </div>
  );
}
