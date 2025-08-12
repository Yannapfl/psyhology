import "./Profile.css";
import Image from "next/image";
import profileForm from "../../../../public/icons/profileForm.svg";
import { useAuth } from "@/contexts/AuthContext";

type ProfileProps = {
  onClick: () => void;
};

export default function Profile({ onClick }: ProfileProps) {
  const { user } = useAuth();

  const firstName = user?.first_name ?? "";
  const lastName = user?.last_name ?? "";
  const phoneCall = user?.phone2call ?? "";

  return (
    <div className="profile" onClick={onClick}>
      <Image src={profileForm} alt="profile icon" width={54} />
      <div className="fullname-profile">
        <h2>{firstName}</h2>
        <h2>{lastName}</h2>
      </div>
      <h5>{phoneCall}</h5>
    </div>
  );
}
