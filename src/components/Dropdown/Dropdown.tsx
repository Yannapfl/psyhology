'use client';

import '../../components/Input/Input.css';
import Image from 'next/image';
import arrow from '../../../public/icons/arrow_select.svg';
import { useState } from 'react';

type SelectProps = {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  placeholderOption?: string;
  style?: React.CSSProperties;
};

export default function Select({
  style,
  label,
  name,
  value,
  onChange,
  options,
  placeholderOption = 'Выберите вариант',
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="input-block">
      {label && <label className="input-label" htmlFor={name}>{label}</label>}

      <div
        className="custom-select-wrapper"
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
      >
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="custom-input custom-select"
          style={style}
        >
          <option value="" disabled>
            {placeholderOption}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <Image
          src={arrow}
          alt="arrow"
          className={`custom-arrow ${isOpen ? 'rotate' : ''}`}
          width={20}
        />
      </div>
    </div>
  );
}
