import { useEffect, useState } from "react";
import CheckboxGroup from "@/components/CheckboxGroup/CheckboxGroup";
import MultiSelectGroup from "@/components/MultiSelectGroup/MultiSelectGroup";
import { FormData } from "@/types/FormData";
import "../Application/StepTwo/StepTwo.css";
import api from "@/utils/api";

type Props = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onBack: () => void;
  onSubmit: () => void;
};

type Topic = {
  ID: number;
  Title: string;
};

export default function ApplicationClient({
  formData,
  setFormData,
  onBack,
  onSubmit,
}: Props) {
  const [error, setError] = useState<string | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
  const fetchTopics = async () => {
    try {
      const response = await api.get("/v1/topics");
      setTopics(response.data);
      console.log(response.data)
    } catch (err) {
      console.error("Ошибка при загрузке тем:", err);
    }
  };

  fetchTopics();
}, []);


  const handleSingleValue = <
    K extends keyof Pick<FormData, "gender" | "language" | "paymentMethod">
  >(
    key: K,
    value: string[]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value[0] ?? "" }));
  };

  const handleMultiValue = <
    K extends keyof Pick<FormData, "schedule" | "specificRequests">
  >(
    key: K,
    value: string[]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckbox = (
  key: keyof Pick<FormData, "specificRequests">,
  value: string | number
) => {
  const id = typeof value === "string" ? parseInt(value, 10) : value;

  setFormData((prev) => {
    const list = prev[key];
    return {
      ...prev,
      [key]: list.includes(id)
        ? list.filter((item) => item !== id)
        : [...list, id],
    };
  });
};



  const handleSubmit = () => {
    if (
      !formData.gender ||
      !formData.language ||
      !formData.paymentMethod ||
      !formData.country ||
      !formData.timezone ||
      formData.schedule.length === 0 ||
      formData.specificRequests.length === 0
    ) {
      setError("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    setError(null);
    onSubmit();
  };

  return (
    <div className="step-two">
      <MultiSelectGroup
        label="С кем комфортнее работать?"
        options={["Мужчина", "Женщина", "Не имеет значения"]}
        selected={formData.gender ? [formData.gender] : []}
        onChange={(val) => handleSingleValue("gender", val)}
        maxSelectable={1}
      />

      <MultiSelectGroup
        label="На каком языке удобнее общаться?"
        options={["Казахский", "Русский", "Не имеет значения"]}
        selected={formData.language ? [formData.language] : []}
        onChange={(val) => handleSingleValue("language", val)}
        maxSelectable={1}
      />

      <CheckboxGroup
  label="Специфические запросы"
  options={topics.map((topic) => ({
    label: topic.Title,
    value: topic.ID,
  }))}
  values={formData.specificRequests}
  onChange={(id) => handleCheckbox("specificRequests", id)}
/>


      <MultiSelectGroup
        label="Пожелания по графику"
        options={[
          "Любое время",
  "Будние дни днем",
  "Будние дни вечером",
  "Выходные дни днем",
  "Выходные дни вечером",
  "Нестабильный график"
        ]}
        selected={formData.schedule}
        onChange={(val) => handleMultiValue("schedule", val)}
      />

      <MultiSelectGroup
        label="Есть ли зарубежные карты"
        options={["Да", "Нет"]}
        selected={formData.paymentMethod ? [formData.paymentMethod] : []}
        onChange={(val) => handleSingleValue("paymentMethod", val)}
        maxSelectable={1}
      />

      {error && <p className="error-message">{error}</p>}

      <div className="grid-button-group">
        <div></div>
        <div className="button-group">
          <button type="button" className="btn-light-green" onClick={onBack}>
            НАЗАД
          </button>
          <button type="button" className="btn-save" onClick={handleSubmit}>
            СОХРАНИТЬ
          </button>
        </div>
      </div>
    </div>
  );
}
