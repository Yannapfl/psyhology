import { useEffect, useState } from "react";
import CheckboxGroup from "@/components/CheckboxGroup/CheckboxGroup";
import MultiSelectGroup from "@/components/MultiSelectGroup/MultiSelectGroup";
import { FormDataPsy } from "@/types/FormData";
import "./StepTwo.css";
import api from "@/utils/api";

type Props = {
  formData: FormDataPsy;
  setFormData: React.Dispatch<React.SetStateAction<FormDataPsy>>;
  onBack: () => void;
  onSubmit: () => void;
};

type Topic = {
  ID: number;
  Title: string;
};

type Method = {
  ID: number;
  Title: string;
};

export default function StepTwo({
  formData,
  setFormData,
  onBack,
  onSubmit,
}: Props) {
  const [error, setError] = useState<string | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [methods, setMethods] = useState<Method[]>([]);

  const handleSingleValue = <
    K extends keyof Pick<FormDataPsy, "language" | "paymentMethod">
  >(
    key: K,
    value: string[]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value[0] ?? "" }));
  };

  const handleMultiValue = <
  K extends keyof Pick<FormDataPsy, "schedule" | "specificRequests" | "therapyMethods">
>(
  key: K,
  value: string[]
) => {
  setFormData((prev) => {
    if (key === "specificRequests" || key === "therapyMethods") {
      const parsed = value.map((v) => parseInt(v, 10));
      return { ...prev, [key]: parsed as FormDataPsy[K] };
    } else {
      return { ...prev, [key]: value as FormDataPsy[K] };
    }
  });
};


  const handleCheckbox = (
    key: keyof Pick<FormDataPsy, "specificRequests" | "therapyMethods">,
    value: string | number
  ) => {
    const id = typeof value === "string" ? parseInt(value, 10) : value;

    setFormData((prev) => {
      const list = prev[key] ?? [];

      return {
        ...prev,
        [key]: list.includes(id)
          ? list.filter((item) => item !== id)
          : [...list, id],
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topicsRes, methodsRes] = await Promise.all([
          api.get("/v1/topics"),
          api.get("/v1/therapy-methods"),
        ]);

        setTopics(topicsRes.data?.data || topicsRes.data || []);
        setMethods(methodsRes.data?.data || methodsRes.data || []);
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = () => {
    if (
      !formData.language ||
      !formData.paymentMethod ||
      !formData.country ||
      !formData.timezone ||
      formData.schedule.length === 0 ||
      formData.specificRequests.length === 0 ||
      formData.therapyMethods?.length === 0
    ) {
      setError("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    setError(null);
    onSubmit();
  };

  return (
    <div className="step-two">
      <CheckboxGroup
        label="Специфические запросы"
        options={topics.map((topic) => ({
          label: topic.Title,
          value: topic.ID,
        }))}
        values={formData.specificRequests || []}
        onChange={(id) => handleCheckbox("specificRequests", id)}
      />

      <CheckboxGroup
        label="Психотерапевтический подход"
        options={methods.map((method) => ({
          label: method.Title,
          value: method.ID,
        }))}
        values={formData.therapyMethods || []}
        onChange={(id) => handleCheckbox("therapyMethods", id)}
      />

      <MultiSelectGroup
        label="Знание языка"
        options={["Казахский", "Русский"]}
        selected={formData.language ? [formData.language] : []}
        onChange={(val) => handleSingleValue("language", val)}
        maxSelectable={2}
      />

      <MultiSelectGroup
        label="Пожелания по графику"
        options={[
          "Любое время",
          "Будние дни днём",
          "Будние дни вечером",
          "Выходные днём",
          "Выходные вечером",
          "Нестабильный график",
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
