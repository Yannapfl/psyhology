import "./Modals.css";
import Image from "next/image";
import close from "../../../public/icons/Close.svg";

export default function ModalSureCreateCohort({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {

  const handleSubmit = () => {
    onSuccess();
  };

  const handleReturn = () => {
    onClose();
    onSuccess();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 style={{ margin: 0 }}>Вы уверены что хотите создать новый поток?</h2>
          <button className="close-button" onClick={onClose}>
            <Image src={close} alt="close" width={24} />
          </button>
        </div>

        <h5 className="modal-description" style={{marginBottom: '16px'}}>
         Все данные в разделах (Клиенты, Психологи, Жалобы, Замены) будут обновлены на данные нового потока. Данные предыдущего потока останутся доступными в разделе «Все потоки».
        </h5>        

        <div className="button-group">
          <button className="btn-red" onClick={handleReturn}>
            ОТМЕНА
          </button>
          <button className="btn" onClick={handleSubmit}>
            ДА
          </button>
        </div>
      </div>
    </div>
  );
}
