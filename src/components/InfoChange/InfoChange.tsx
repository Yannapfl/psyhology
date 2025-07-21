import './InfoChange.css'
import Image from "next/image";
import infoBlue from "../../../public/icons/blue_info.svg";

export default function InfoChange() {
  return (
    <div className="info-blue-block fixed-position">
        <Image src={infoBlue} alt="info" width={32} />
      <h5 style={{ fontWeight: "500", margin: "0" }}>
        В течение 5 дней после подбора с вами свяжется подобранный специалист. Пожалуйста, следите за почтой и входящими звонками — психолог может написать или позвонить для уточнения деталей.<br /><br /> Если этого не случится, напишите менеджеру.
      </h5>
    </div>
  )
}
