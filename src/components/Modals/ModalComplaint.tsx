import { useState } from "react";
import "./Modals.css";
import Image from "next/image";
import close from "../../../public/icons/Close.svg";

export default function ModalComplaint({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
     if (text.trim() === "") {
      alert("Пожалуйста, опишите ситуацию перед отправкой жалобы.");
      return;
    }
    alert(text);
  };

  const handleReturn = () => {
    onClose();
    onSuccess();
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
          Если у вас возникли трудности в общении с психологом или вы
          столкнулись с нарушением правил, вы можете оставить жалобу. Мы
          внимательно рассмотрим каждое обращение.
        </h5>
<div className="radio-group">
<h3 style={{ fontWeight: "600", marginBottom: "4px" }}>Опишите ситуацию как можно подробнее</h3>
        <textarea
          name="complaint"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Комментарий"
          rows={4}
          className="textarea-reason"
        />

</div>
        

        <div className="button-group">
          <button className="btn-light-green" onClick={handleReturn}>
            НАЗАД
          </button>
          <button className="btn" onClick={handleSubmit}>
            ОТПРАВИТЬ ЖАЛОБУ
          </button>
        </div>
      </div>
    </div>
  );
}
