import { useRef, useEffect, useState } from 'react';
import './Switcher.css';

type SwitcherProps = {
  tabs: string[];
  activeIndex: number;
  onChange: (index: number) => void;
};

export default function Switcher({ tabs, activeIndex, onChange }: SwitcherProps) {
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeTab = tabRefs.current[activeIndex];
    if (activeTab) {
      setUnderlineStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
      });
    }
  }, [activeIndex, tabs]);

  return (
    <div className="switcher-container">
      <div className="switcher">
        {tabs.map((tab, index) => (
          <div
            key={index}
            ref={(el) => { tabRefs.current[index] = el; }}
            className={`tab ${activeIndex === index ? 'active' : ''}`}
            onClick={() => onChange(index)}
          >
            {tab}
          </div>
        ))}
        <div className="underline" style={underlineStyle} />
      </div>
    </div>
  );
}
