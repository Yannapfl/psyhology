import "./Modals.css";
import Image from "next/image";
import close from "../../../public/icons/Close.svg";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { AppRoutes } from "@/constants/AppRoutes";

export default function ModalExit({ onClose }: { onClose: () => void }) {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await signOut();
      onClose();
      router.push(AppRoutes.start);
    } catch (e) {
      console.error("Ошибка при выходе", e);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 style={{ margin: 0 }}>Выход</h2>
          <button className="close-button" onClick={onClose}>
            <Image src={close} alt="close" width={24} />
          </button>
        </div>

        <h3 className="modal-description">Вы действитетльно хотите выйти?</h3>

        <div className="button-group" style={{ marginTop: '32px'}}>
          <button className="btn-light-green " onClick={onClose}>
            ОТМЕНА
          </button>
          <button className="btn btn-red" onClick={handleSubmit}>
            ВЫЙТИ
          </button>
        </div>
      </div>
    </div>
  );
}
