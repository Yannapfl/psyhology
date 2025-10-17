import './Modals.css';
import Image from "next/image";
import close from "../../../public/icons/Close.svg";
import api from '@/utils/api';

export default function ModalRequestChange ({ onClose , id, title, message, recipient_id } : { 
    onClose: () => void; 
    id?: number;
    title?: string;
    message?: string;
    recipient_id?: number;
}) {
    const handleSubmit = async () => {    
    try {
      await api.put(`/v1/replacements/${id}/confirm`, {
      })
      onClose();
    } catch (error) {
      console.error('Ошибка отправки', error)
    }
  };

  const handleDeny = async () => {    
    try {
      await api.put(`/v1/replacements/${id}/deny`, {
      })
      onClose();
    } catch (error) {
      console.error('Ошибка отправки', error)
    }
  };

    return (
        <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 style={{ margin: 0 }}>{title}</h2>
          <button className="close-button" onClick={onClose}>
            <Image src={close} alt="close" width={24} />
          </button>
        </div>

        <h5 className="modal-description">
          Ваш психолог хочет завершить работу после {recipient_id} сессий.
        </h5>
        <h5 className="modal-description">
          Причина: {message}.
        </h5>
<h5 style={{ fontWeight: "600", marginBottom: "4px" }}>Подтвердите, что вы действительно прошли указанное количество сессий с этим психологом.</h5>
        
        

        <div className="button-group">
          <button className="btn-red" onClick={handleDeny}>
            НЕТ, ОТКЛОНЯЮ
          </button>
          <button className="btn" onClick={handleSubmit}>
           ДА, ПОДТВЕРЖДАЮ
          </button>
        </div>
      </div>
    </div>
  );
}