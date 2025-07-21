import { useState } from "react";
import "./CheckboxGroup.css";
import Image from "next/image";
import arrow from "../../../public/icons/arrow_checkbox.svg";

type Props = {
  label: string;
  options: string[];
  values: string[];
  onChange: (value: string) => void;
};

const MAX_VISIBLE = 6;

export default function CheckboxGroup({
  label,
  options,
  values,
  onChange,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const visibleOptions = expanded ? options : options.slice(0, MAX_VISIBLE);
  const hiddenCount = options.length - MAX_VISIBLE;

  return (
    <div style={{   marginBottom: '32px'}} className="checkbox-block">
      <div className="checkbox-group">
        <h4>{label}</h4>
        <div className="checkbox-grid">
          {visibleOptions.map((option) => (
            <label key={option} className="checkbox-item">
              <input
                type="checkbox"
                checked={values.includes(option)}
                onChange={() => onChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {hiddenCount > 0 && (
        <div className="hidden-count">
          <div />
          <button
            type="button"
            className="expand-button"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                Свернуть{" "}
                <Image
                  src={arrow}
                  alt="arrow up"
                  width={12}
                  height={12}
                  className="arrow-up"
                />
              </>
            ) : (
              <>
                Ещё {hiddenCount}{" "}
                <Image src={arrow} alt="arrow down" width={12} height={12} />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
