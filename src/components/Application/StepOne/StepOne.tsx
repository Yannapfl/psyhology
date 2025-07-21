import { FormData } from "@/types/FormData";
import moment from "moment-timezone";
import "./StepOne.css";
//import api from "@/utils/api";

type Props = {
  formData: Pick<FormData, "country" | "timezone">;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
};

export default function StepOne({ formData, setFormData, onNext }: Props) {
  const timezones = moment.tz.names();

  const handleChange = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

 // const handleSubmit = async () => {
  //try {
   // await api.post("/v1/users/profile/preferences", {
   //   common: {
   //     country: formData.country,
    //  time_zone: formData.timezone,
    //  }
  //  });
  //  onNext();
  //} catch (error) {
  //  console.error("Ошибка при отправке данных:", error);
 // }
//};

const handleSubmit = () => {
  onNext();
}


  return (
    <div className="step-one">


      <label className="form-label">
        В какой стране вы проживаете?
        <select
          value={formData.country}
          onChange={(e) => handleChange("country", e.target.value)}
          className="form-select"
        >
          <option value="">Выберите страну</option>
          <option value="Россия">Россия</option>
          <option value="Казахстан">Казахстан</option>
        </select>
      </label>

      <label className="form-label">
        В каком часовом поясе вы?
        <select
          value={formData.timezone}
          onChange={(e) => handleChange("timezone", e.target.value)}
          className="form-select"
        >
          <option value="">Выберите часовой пояс</option>
          {timezones.map((tz) => {
            const offset = moment.tz(tz).utcOffset();
            const sign = offset >= 0 ? "+" : "-";
            const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
            const minutes = String(Math.abs(offset) % 60).padStart(2, "0");
            return (
              <option key={tz} value={tz}>
                (UTC{sign}{hours}:{minutes}) {tz}
              </option>
            );
          })}
        </select>
      </label>

      <button
        className="form-button"
        onClick={handleSubmit}
        disabled={!formData.country || !formData.timezone}
      >
        Далее
      </button>
    </div>
  );
}
