import CheckboxGroup from "@/components/CheckboxGroup/CheckboxGroup";
import { FormData } from "@/types/FormData";
import "./StepTwo.css";
import MultiSelectGroup from "@/components/MultiSelectGroup/MultiSelectGroup";

type Props = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onBack: () => void;
};


export default function StepTwo({ formData, setFormData, onBack }: Props) {
  const handleCheckbox = (
    field: keyof Pick<FormData, "conditions" | "relationships" | "work" | "lifeEvents" | "specificRequests" | "therapyApproach">,
    value: string
  ) => {
    setFormData(prev => {
      const list = prev[field];
      return {
        ...prev,
        [field]: list.includes(value)
          ? list.filter(item => item !== value)
          : [...list, value],
      };
    });
  };

  const handleRadio = <K extends keyof Pick<FormData, "schedule" | "paymentMethod">>(
    key: K,
    value: FormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="step-two">

      <CheckboxGroup label="Состояние клиента" options={['Стресс', 'Нестабильная самооценка', 'Перепады настроения', 'Упадок сил', 'Приступы страха и тревоги', 'Раздражительность', 'Депрессия', 'Детские травмы', 'Плохое настроение', 'Неуверенность в себе', 'РПП']} values={formData.conditions} onChange={(val) => handleCheckbox('conditions', val)} />
      <CheckboxGroup label="Отношения" options={['Стресс', 'Нестабильная самооценка', 'Перепады настроения', 'Упадок сил', 'Приступы страха и тревоги', 'Раздражительность']} values={formData.relationships} onChange={(val) => handleCheckbox('relationships', val)} />
      <CheckboxGroup label="Работа, учёба" options={['Стресс', 'Нестабильная самооценка', 'Перепады настроения', 'Упадок сил', 'Приступы страха и тревоги', 'Раздражительность']} values={formData.work} onChange={(val) => handleCheckbox('work', val)} />
      <CheckboxGroup label="События в жизни" options={['Стресс', 'Нестабильная самооценка', 'Перепады настроения', 'Упадок сил', 'Приступы страха и тревоги', 'Раздражительность']} values={formData.lifeEvents} onChange={(val) => handleCheckbox('lifeEvents', val)} />
      <CheckboxGroup label="Специфические запросы" options={['ЛГБТК+', 'Клинические запросы', 'Детско-родительские отношения', 'Депрессия', 'Травматичный опыт', 'Психологическое насилие']} values={formData.specificRequests} onChange={(val) => handleCheckbox('specificRequests', val)} />
      <CheckboxGroup label="Психотерапевтический подход" options={['КПТ', 'Гештальт', 'Транзактный анализ', 'Семейная терапия', 'Гипноз', 'ДПДГ']} values={formData.therapyApproach} onChange={(val) => handleCheckbox('therapyApproach', val)} />

      <MultiSelectGroup label="Пожелания по графику" options={['Любое время', 'Будние дни днём', 'Будние дни вечером', 'Выходные днём', 'Выходные вечером', 'Нестабильный график']}  selected={formData.schedule} onChange={(val) => handleRadio("schedule", val)} />
      <MultiSelectGroup
  label="Способ оплаты"
  options={['Kaspi QR/оплата', 'Робокасса', 'Цифробанк']}
  selected={formData.paymentMethod ? [formData.paymentMethod] : []}
  onChange={(val) =>
    setFormData(prev => ({ ...prev, paymentMethod: val[0] ?? "" }))
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
