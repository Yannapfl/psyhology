import "./Profile.css";
import Image from "next/image";
import profileForm from "../../../../public/icons/profileForm.svg";
import { useEffect, useState } from "react";
import api from "@/utils/api";

type ProfileProps = {
  onClick: () => void;
};

export default function Profile({ onClick }: ProfileProps) {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phoneCall: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
        try {
            const response = await api.get("/v1/profile");
            const data = response.data;

            setProfileData({
                firstName: data.first_name || "",
                lastName: data.last_name || "",
                phoneCall: data.phone2call || "",
            })
        } catch (error) {
            console.error("Ошибка при загрузке профиля:", error);
        }
    }

    fetchProfile();
  }, [])

  return (
    <div className="profile" onClick={onClick}>
      <Image src={profileForm} alt="profile icon" width={54} />
      <div className="fullname-profile">
        <h2>{profileData.firstName}</h2>
        <h2>{profileData.lastName}</h2>
      </div>
      <h5>{profileData.phoneCall}</h5>
    </div>
  );
}
