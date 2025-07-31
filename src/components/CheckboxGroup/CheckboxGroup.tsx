import { useState } from "react";
import "./CheckboxGroup.css";
import Image from "next/image";
import arrow from "../../../public/icons/arrow_checkbox.svg";

type StringOption = string;
type ObjectOption = { label: string; value: string | number };
type Option = StringOption | ObjectOption;

type Props = {
  label: string;
  options: Option[];
  values: (string | number)[];
  onChange: (value: string | number) => void;
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
    <div style={{ marginBottom: "32px" }} className="checkbox-block">
      <div className="checkbox-group">
        <h4>{label}</h4>
        <div className="checkbox-grid">
          {visibleOptions.map((option) => {
            const label =
              typeof option === "string" ? option : option.label;
            const value =
              typeof option === "string" ? option : option.value;

            return (
              <label key={value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={values.includes(value)}
                  onChange={() => onChange(value)}
                />
                {label}
              </label>
            );
          })}
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
