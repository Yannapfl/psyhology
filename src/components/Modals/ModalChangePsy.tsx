import "./Modals.css";
import { useMemo, useState } from "react";
import Image from "next/image";
import close from "../../../public/icons/Close.svg";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/utils/api";

type Props = {
  onClose: () => void;
  onComplaint: () => void;
  onSuccess: () => void;
};

const REASONS = [
  "Несовпадение графиков",
  "Неудобный способ оплаты",
  "Отсутствие контакта с психологом",
  "Консультации оказались неэффективными",
  "Метод работы психолога не подошел",
  "Языковой барьер",
  "Другая причина",
] as const;

export default function ModalChangePsy({
  onClose,
  onComplaint,
  onSuccess,
}: Props) {
  const { user } = useAuth();
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [otherReason, setOtherReason] = useState<string>("");
   const [countSessions, setCountSessions] = useState('');
  const isOther = selectedReason === "Другая причина";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedReason(e.target.value);
  };

   const isValid = useMemo(() => {
    const sessionsOk = !!countSessions && Number(countSessions) > 0;
    const reasonText = isOther ? otherReason.trim() : (selectedReason ?? "").trim();
    const reasonOk = reasonText.length > 0;
    return sessionsOk && reasonOk;
  }, [countSessions, selectedReason, otherReason, isOther]);

  const handleSubmit = async () => {
    if (!isValid) return;
 
    const payload = {
      amount_of_sessions: Number(countSessions),
      client_id: user?.id,
      reason2replace: selectedReason === null ? "" : selectedReason, 
      other_reason: isOther ? otherReason.trim() : "",             
    };

    try {
      await api.post(`v1/replacements`, payload);
      onSuccess();
    } catch (error) {
      console.error('Ошибка отправка формы замены', error)
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 style={{ margin: 0 }}>Заменить психолога</h2>
          <button className="close-button" onClick={onClose}>
            <Image src={close} alt="close" width={24} />
          </button>
        </div>

        <h5 className="modal-description">
          Если специалист вам не подошел, вы можете заменить его — такая
          возможность доступна только 1 раз. Пожалуйста, учитывайте, что
          количество замен ограничено.
        </h5>

        <div className="input-count-sessions">
            <input type='number' value={countSessions} onChange={(e) => setCountSessions((e.target.value))} placeholder="Сколько сессий уже прошло?"></input>
        </div>

        <div className="radio-group">
          <h3 style={{ fontWeight: "600", marginBottom: "4px" }}>
            Выберите причину отмены
          </h3>

          {REASONS.map((reason) => (
            <label key={reason}>
              <input
                type="radio"
                name="reason"
                value={reason}
                onChange={handleChange}
              />
              {reason}
            </label>
          ))}

          {isOther && (
            <textarea
              placeholder="Опишите вашу причину"
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              className="textarea-reason"
            />
          )}
        </div>

        <div className="button-group">
          <button className="btn-light-green" onClick={onClose}>
            ОТМЕНА
          </button>
          <button className="btn" onClick={handleSubmit}>
            ЗАМЕНИТЬ
          </button>
        </div>

        <button className="btn-text" onClick={onComplaint}>
          Пожаловаться на психолога
        </button>
      </div>
    </div>
  );
}
