import './MultiSelectGroup.css';

type Props = {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  maxSelectable?: number;
};

export default function MultiSelectGroup({
  label,
  options,
  selected,
  onChange,
  maxSelectable = 99,
}: Props) {

  
  const toggleOption = (option: string) => {
  const isSelected = selected.includes(option);

  if (maxSelectable === 1) {
    if (!isSelected) {
      onChange([option]);
    }
  } else {
    if (isSelected) {
      onChange(selected.filter((o) => o !== option));
    } else if (selected.length < maxSelectable) {
      onChange([...selected, option]);
    }
  }
};

  return (
    <div className="multi-select-group">
      <h4>{label}</h4>
      <div className="multi-select-options">
        {options.map((option) => (
          <div
            key={option}
            className={`multi-select-option ${selected.includes(option) ? 'active' : ''} ${maxSelectable === 1 ? 'radio-select' : ''}`}
            onClick={() => toggleOption(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}
