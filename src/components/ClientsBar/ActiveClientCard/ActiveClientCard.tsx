import './ActiveClientCard.css';
import Image from "next/image";
import profile from '../../../../public/icons/profile.svg'

type ActiveClientCardProps = {
  name: string;
  callPhone: string;
  whatsappPhone: string;
  telegram?: string;
  status?: 'Активный' | 'Неактивный';
};

export default function ActiveClientCard({
  name,
  callPhone,
  whatsappPhone,
  telegram,
  status = 'Активный',
}: ActiveClientCardProps) {
  return (
    <div className="client-card">
      <div className="card-header">
        <Image
            src={profile}
            alt="clients"
            width={41}
          />
        <div className="name">{name}</div>
        <div className="status">{status}</div>
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid #747D6F33' }}/>
      <div className="card-content">
        <div className="column">
          <h6>Номер телефона для звонка</h6>
          <span>{callPhone}</span>
        </div>
        <div className="column">
          <h6>Номер телефона WhatsApp</h6>
          <span>{whatsappPhone}</span>
        </div>
        {telegram && (
          <div className="column">
            <h6>Никнейм Telegram</h6>
            <span>{telegram}</span>
          </div>
        )}
      </div>
    </div>
  );
}
