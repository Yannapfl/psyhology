import './Modals.css';
import Image from "next/image";
import close from "../../../public/icons/Close.svg";

export default function ModalSuccess({ onClose, onComplant }: { onClose: () => void;
    onComplant: () => void
 }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 style={{ margin: 0 }}>Запрос на замену отправлен</h2>
          <button className="close-button" onClick={onClose}>
            <Image src={close} alt="close" width={24} />
          </button>
        </div>
        <h5 className="modal-description">
          Мы учли ваш запрос, и новый специалист будет назначен в ближайшее время. Вы получите уведомление, как только мы подберём подходящего психолога.
        </h5>
        <button style={{ margin: '32px 0 24px 0'}} className="btn" onClick={onClose}>Понятно</button>

        <button className="btn-text" onClick={onComplant} >
          Пожаловаться на психолога
        </button>
      </div>
    </div>
  );
}
