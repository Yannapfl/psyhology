export type FormClientApi = {
    client: {
    remark: string;
    plan: string;
    cohort_id: number;
    psychologist_id: number;
    distribution_status: string;
    comment: string;
    id: number;
    email: string;
    first_names: string;
    last_name: string;
    phone2call: string;
    phone2whatsapp: string;
    name4telegram: string;
    city: string;
    access2materials_deadline: string;
    materials: string;
  };
  preferences: {
    common: {
      country: string;
      time_zone: string;
      description: string;
    };
    personal: {
      created_at: string;
      updated_at: string;
      therapy_experience: boolean;
      psychologist_type: string;
      schedule: string;
      has_foreign_card: boolean;
      topics: string[] | null;
      therapy_methods: string[] | null;
    };
  };
}

export const apiToForm = (data: FormClientApi)=> {
  const c = data.client;
  const p = data.preferences;

  return {
    first_names: c.first_names ?? "",
    last_name: c.last_name ?? "",
    birthDate: "", 
    phoneCall: c.phone2call ?? "",
    phoneWhatsApp: c.phone2whatsapp ?? "",
    phoneTelegram: c.name4telegram ?? "",
    email: c.email ?? "",
    psyhology: c.psychologist_id ? String(c.psychologist_id) : "",
    distribution_status: c.distribution_status ?? "",
    comments: c.comment ?? "",
    country: p?.common?.country ?? "",
    timezone: p?.common?.time_zone ?? "",
    specialRequest: p?.common?.description ?? "",
    schedule: p?.personal?.schedule ?? "",
    internationalAcc: Boolean(p?.personal?.has_foreign_card),
    psySex: p?.personal?.psychologist_type ?? "",
  };
};
