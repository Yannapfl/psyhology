import './Input.css'

type InputProps = {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  style?: React.CSSProperties;
};

export default function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  style,
}: InputProps) {
  return (
    <div className="input-block">
      <label className='input-label' htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='custom-input'
        style= {style}
      />
    </div>
  );
}
