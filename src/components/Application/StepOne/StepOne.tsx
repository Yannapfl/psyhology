import { FormData } from "@/types/FormData";
import moment from "moment-timezone";
import "./StepOne.css";
import '../../MultiSelectGroup/MultiSelectGroup.css';

const countries = ['Беларусь', 'Казахстан', 'Кыргызстан', 'Россия', 'Узбекистан'];

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

interface Props {
  formData: Pick<FormData, "country" | "timezone">;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
}

export default function StepOne({ formData, setFormData, onNext }: Props) {
  const handleChange = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (formData.country && formData.timezone) {
      onNext();
    }
  };

  return (
    <div className="step-one">
      <div className="multi-select-group" style={{gap: '16px'}}>
        <h4>В какой стране вы проживаете?</h4>
        <select
          value={formData.country}
          onChange={(e) => handleChange("country", e.target.value)}
          className="form-select"
        >
          <option value="">Выберите страну</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
       <h4>В каком часовом поясе вы?</h4>
        <select
          value={formData.timezone}
          onChange={(e) => handleChange("timezone", e.target.value)}
          className="form-select"
        >
          <option value="">Выберите часовой пояс</option>
          {timezones.map(({ label, value }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>
          <div className="grid-button-group" style={{ width: '100%'}}>
            <div></div>
      <div className="button-group">
        <button className="btn-save" style={{ width: '30%'}} onClick={handleSubmit} disabled={!formData.country || !formData.timezone}>
          Далее
        </button>
      </div>
          </div>

    </div>
  );
}
