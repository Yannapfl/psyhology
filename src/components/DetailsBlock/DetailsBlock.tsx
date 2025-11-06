import './DetailsBlock.css';

type DetailsBlockProps = {
  country: string;
  timezone: string;
  specialRequest: string;
  schedule: string;
  internationalAcc: boolean;
  psySex: string;
};

export default function DetailsBlock({
  country,
  timezone,
  specialRequest,
  schedule,
  internationalAcc,
  psySex,
}: DetailsBlockProps) {
  return (
    <div className="client-block-wrapper">
      <div className="client-row-form">
        <div className="client-item">
          <div className="label">Страна проживания</div>
          <div className="value">{country}</div>
        </div>
        <div className="client-item">
          <div className="label">Часовой пояс</div>
          <div className="value">{timezone}</div>
        </div>
      </div>

      <div className="client-row-form">
        <div className="client-item">
          <div className="label">Специфические запросы</div>
          <div className="value">{specialRequest}</div>
        </div>
        <div className="client-item">
          <div className="label">Пожелания по графику</div>
          <div className="value">{schedule}</div>
        </div>
        <div className="client-item">
          <div className="label">Наличие зарубежных карт</div>
          <div className="value">{internationalAcc ? "Есть" : "Нет"}</div>
        </div>
        <div className="client-item">
          <div className="label">Комфортно работать с</div>
          <div className="value">{psySex}</div>
        </div>
      </div>
    </div>
  );
}
