import "./StepSwitcher.css";

type Props = {
  activeStep: number;
};

export default function StepSwitcher({ activeStep }: Props) {
  return (
    <div className="step-switcher">
      <div className="step">
        <span className={activeStep === 1 ? "active" : ""}>1. Общие вопросы</span>
        <div className={`line ${activeStep === 1 ? "line-active" : "line-inactive"}`} />
      </div>
      <div className="step">
        <span className={activeStep === 2 ? "active" : ""}>2. Личные вопросы</span>
        <div className={`line ${activeStep === 2 ? "line-active" : "line-inactive"}`} />
      </div>
    </div>
  );
}
