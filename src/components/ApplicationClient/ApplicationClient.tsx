import '../Application/StepTwo/StepTwo.css'

import { FormData } from "@/types/FormData";
import CheckboxGroup from "../CheckboxGroup/CheckboxGroup";
import MultiSelectGroup from "../MultiSelectGroup/MultiSelectGroup";
import "./ApplicationClient";

type Props = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onBack: () => void;
};

export default function ApplicationClient({
  formData,
  setFormData,
  onBack,
}: Props) {
  const handleCheckbox = (
    field: keyof Pick<
      FormData,
      | "conditions"
      | "relationships"
      | "work"
      | "lifeEvents"
      | "specificRequests"
      | "therapyApproach"
    >,
    value: string
  ) => {
    setFormData((prev) => {
      const list = prev[field];
      return {
        ...prev,
        [field]: list.includes(value)
          ? list.filter((item) => item !== value)
          : [...list, value],
      };
    });
  };

  const handleRadio = <
    K extends keyof Pick<FormData, "schedule" | "paymentMethod">
  >(
    key: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="step-two">
        <MultiSelectGroup
        label="Был ли у вас опыт в терапии?"
        options={["Да", "Нет"]}
        selected={formData.paymentMethod ? [formData.paymentMethod] : []}
        onChange={(val) =>
          setFormData((prev) => ({ ...prev, paymentMethod: val[0] ?? "" }))
        }
        maxSelectable={1}
      />

      <CheckboxGroup
        label="Какой у Вас запрос?"
        options={[
          "Стресс",
          "Нестабильная самооценка",
          "Перепады настроения",
          "Упадок сил",
          "Приступы страха и тревоги",
          "Раздражительность",
          "Депрессия",
          "Детские травмы",
          "Плохое настроение",
          "Неуверенность в себе",
          "РПП",
        ]}
        values={formData.conditions}
        onChange={(val) => handleCheckbox("conditions", val)}
      />
      <MultiSelectGroup
        label="С кем комфортнее работать?"
        options={["Мужчина", "Женщина", "Не имеет значения"]}
        selected={formData.paymentMethod ? [formData.paymentMethod] : []}
        onChange={(val) =>
          setFormData((prev) => ({ ...prev, paymentMethod: val[0] ?? "" }))
        }
        maxSelectable={1}
      />

      <CheckboxGroup
        label="Специфические запросы"
        options={[
          "ЛГБТК+",
          "Клинические запросы",
          "Детско-родительские отношения",
          "Депрессия",
          "Травматичный опыт",
          "Психологическое насилие",
        ]}
        values={formData.specificRequests}
        onChange={(val) => handleCheckbox("specificRequests", val)}
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
        onChange={(val) => handleRadio("schedule", val)}
      />
      <MultiSelectGroup
        label="Наличие зарубежных карт"
        options={["Да", "Нет"]}
        selected={formData.paymentMethod ? [formData.paymentMethod] : []}
        onChange={(val) =>
          setFormData((prev) => ({ ...prev, paymentMethod: val[0] ?? "" }))
        }
        maxSelectable={1}
      />
      <div className="grid-button-group">
        <div></div>
        <div className="button-group">
          <button type="button" className="btn-light-green" onClick={onBack}>
            НАЗАД
          </button>
          <button type="submit" className="btn-save">
            СОХРАНИТЬ
          </button>
        </div>
      </div>
    </div>
  );
}
