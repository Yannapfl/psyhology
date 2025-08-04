import moment from "moment-timezone";
import "./StepOne.css";
import "../../MultiSelectGroup/MultiSelectGroup.css";
import { useRole } from "@/contexts/RoleContext";
import { useCallback } from "react";

const countries = ["Беларусь", "Казахстан", "Кыргызстан", "Россия", "Узбекистан"];

const timezones = moment.tz.names().map((tz) => {
  const offset = moment.tz(tz).utcOffset();
  const sign = offset >= 0 ? "+" : "-";
  const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
  const minutes = String(Math.abs(offset) % 60).padStart(2, "0");
  return {
    label: `(UTC${sign}${hours}:${minutes}) ${tz}`,
    value: tz,
  };
});

interface Props<T extends { country: string; timezone: string }> {
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  onNext: () => void;
}

export default function StepOne<T extends { country: string; timezone: string; description?: string }>({
  formData,
  setFormData,
  onNext,
}: Props<T>) {
  const { role } = useRole();

  const handleChange = useCallback(
    <K extends keyof T>(key: K, value: T[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    [setFormData]
  );

  const handleSubmit = () => {
    const isValid =
      formData.country &&
      formData.timezone &&
      (role !== "psychologist" || (formData.description?.trim() ?? "") !== "");

    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="step-one">
      <div className="multi-select-group" style={{ gap: "16px" }}>
        <h4>В какой стране вы проживаете?</h4>
        <select
          value={formData.country}
          onChange={(e) => handleChange("country", e.target.value as T[keyof T])}
          className="form-select"
        >
          <option value="">Выберите страну</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <h4>В каком часовом поясе вы?</h4>
        <select
          value={formData.timezone}
          onChange={(e) => handleChange("timezone", e.target.value as T[keyof T])}
          className="form-select"
        >
          <option value="">Выберите часовой пояс</option>
          {timezones.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {role === "psychologist" && (
        <div className="description-application">
          <div className="multi-select-group" style={{ gap: "16px" }}>
            <div className="multi-select-title">
              <h4>Информация о себе</h4>
              <h5>Расскажите о себе — это поможет клиенту лучше вас узнать.</h5>
            </div>
            <textarea
              value={formData.description ?? ""}
              onChange={(e) => handleChange("description", e.target.value as T[keyof T])}
              className="form-select"
              style={{ alignItems: "flex-start", padding: "18px 16px", width: "95%" }}
              placeholder="О себе"
            />
          </div>
        </div>
      )}

      <div className="grid-button-group" style={{ width: "100%" }}>
        <div></div>
        <div className="button-group">
          <button
            className="btn-save"
            style={{ width: "30%" }}
            onClick={handleSubmit}
            disabled={
              !formData.country ||
              !formData.timezone ||
              (role === "psychologist" && (formData.description?.trim() ?? "") === "")
            }
          >
            Далее
          </button>
        </div>
      </div>
    </div>
  );
}
