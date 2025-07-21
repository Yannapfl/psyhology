import * as React from "react";

const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
<svg
    xmlns="http://www.w3.org/2000/svg"
    width="52"
    height="53"
    fill="none"
    viewBox="0 0 52 53"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="4.333"
      d="M42.743 44.802c-.988-2.764-3.164-5.207-6.191-6.949S29.816 35.167 26 35.167s-7.525.944-10.552 2.686-5.203 4.185-6.19 6.95"
    ></path>
    <circle
      cx="26"
      cy="17.833"
      r="8.667"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="4.333"
    ></circle>
  </svg>
);

export default UserIcon;
