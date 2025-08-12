
import type { Psychologist } from "@/hooks/useCurrentPsy";

export const mockPsychologists: Psychologist[] = [
  {
    id: 7,
    email: "another3.psychologist@gmail.com",
    first_name: "Another2",
    last_name: "Psychologist",
    phone2call: "+7 (707) 777-88-11",
    phone2whatsapp: "+7 (707) 777-88-11",
    name4telegram: "@another.psy",
    city: "Баткен",
    gender: "Женщина",
    start_at: "0001-01-01T00:00:00Z",
    remark: "",
    plan: "Базовый",
    readiness_status: "",
    cohort_id: 1,
    international_account: false,
    education: "Баткенский государственный университет (БГУ)",
    education_status: "Завершил",
    country: "",
    number_clients_able2serve: 8,
    number_current_clients: 1,
    amount_of_replacements: 0,
    description: "Another3 Psychologist родилась в Баткен",
    clients: [], 
    topics: [
      { id: 6, title: "Психологическое насилие" },
      { id: 15, title: "Нарушение пищевого поведения" },
    ],
    therapy_methods: [
      { id: 5, title: "Семейная терапия" },
      { id: 6, title: "ДПДГ" },
    ],
  },
];
