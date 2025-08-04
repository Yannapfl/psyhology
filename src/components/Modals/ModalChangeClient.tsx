import "./Modals.css";
import { useState } from "react";
import Image from "next/image";
import close from "../../../public/icons/Close.svg";

export default function ModalChangeClient({ onClose,
}: {
  onClose: () => void;
}) {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [countSessions, setCountSessions] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedReason(e.target.value);
  };

  const handleSubmit = () => {
    alert(selectedReason);
  };


  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 style={{ margin: 0 }}>Заменить клиента</h2>
          <button className="close-button" onClick={onClose}>
            <Image src={close} alt="close" width={24} />
          </button>
        </div>

        <h5 className="modal-description">
          Если клиент вам не подошел, вы можете сменить его — такая возможность доступна только 1 раз. Пожалуйста, учитывайте, что количество замен ограничено.
        </h5>

        <div className="input-count-sessions">
            <label>Сколько сессий прошло?</label>
            <input type='number' value={countSessions} onChange={(e) => setCountSessions(Number(e.target.value))}></input>
        </div>

        <div className="radio-group">
          <h3 style={{ fontWeight: "600", marginBottom: "4px" }}>
            Выберите причину отмены
          </h3>

          <label>
            <input
              type="radio"
              className="radio-box"
              name="reason"
              value="Несовпадение графиков"
              onChange={handleChange}
            />
            Несовпадение графиков
          </label>

          <label>
            <input
              type="radio"
              name="reason"
              value="Неудобный способ оплаты"
              onChange={handleChange}
            />{" "}
            Неудобный способ оплаты
          </label>
          <label>
            <input
              type="radio"
              name="reason"
              value="Отсутствие контакта с психологом"
              onChange={handleChange}
            />{" "}
            Отсутствие контакта с психологом
          </label>
          <label>
            <input
              type="radio"
              name="reason"
              value="Консультации оказались неэффективными"
              onChange={handleChange}
            />{" "}
            Консультации оказались неэффективными
          </label>
          <label>
            <input
              type="radio"
              name="reason"
              value="Метод работы психолога не подошел"
              onChange={handleChange}
            />{" "}
            Метод работы психолога не подошел
          </label>
          <label>
            <input
              type="radio"
              name="reason"
              value="Языковой барьер"
              onChange={handleChange}
            />{" "}
            Языковой барьер
          </label>
        </div>

        <div className="button-group">
          <button className="btn-light-green " onClick={onClose}>
            ОТМЕНА
          </button>
          <button className="btn" onClick={handleSubmit}>
            ЗАМЕНИТЬ
          </button>
        </div>
      </div>

    </div>
  );
}
