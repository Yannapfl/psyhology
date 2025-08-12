import { ClientResponse } from "@/types/ApiTypes";
import { FormClient } from "@/types/FormClient";

export const apiToForm = (r: ClientResponse): FormClient => {
  const { client, preferences } = r;

  return {

    firstName: client.firstName ?? "",
    lastName:  client.lastName ?? "",
    birthDate: "", 
    phoneCall: client.phone2call ?? "",
    phoneWhatsApp: client.phone2whatsapp ?? "",
    phoneTelegram: client.name4telegram ?? "",
    email: client.email ?? "",
    psyhology: String(client.psychologistID ?? ""),

    status:
      client.distributionStatus === "Распределён" ||
      client.distributionStatus === "Распределен"
        ? "Распределён"
        : client.distributionStatus === "В ожидании"
        ? "В ожидании"
        : client.distributionStatus === "Вышел из проекта"
        ? "Вышел из проекта"
        : "",

    comments: client.Remark || client.comment || "",

 
    country: preferences.common?.country ?? "",
    timezone: preferences.common?.time_zone ?? "",
    specialRequest:
      preferences.personal?.topics?.map((t) => t.title).join(", ") ?? "",
    schedule: preferences.personal?.schedule ?? "",
    internationalAcc: !!preferences.personal?.has_foreign_card,
    psySex: preferences.personal?.psychologist_type ?? "",
  };
};
