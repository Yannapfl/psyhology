
export type Complaint = {
    id: number;
  initiator: string;
  psychologist: string;
  client: string;
  date: string;
  sessions: number;
  reason: string;
  complaint: string;
  status: string;
  confirmation: string;
};

export const changesTableMock = [
  {
    id: 1,
    initiator: "Клиент",
    psychologist: "Беловицкая Ольга",
    client: "Беловицкая Ольга",
    date: "19.01.2023 11:24",
    sessions: 2,
    reason: "Консультации оказались неэффективными",
    complaint: "Есть",
    status: "Обработана",
    confirmation: "Подтверждено",
  },
  {
    id: 2,
    initiator: "Психолог",
    psychologist: "Беловицкая Ольга",
    client: "Беловицкая Ольга",
    date: "19.01.2023 11:24",
    sessions: 2,
    reason: "Консультации оказались неэффективными",
    complaint: "Нет",
    status: "Обработана",
    confirmation: "В ожидании",
  },
  {
    id: 3,
    initiator: "Клиент",
    psychologist: "Беловицкая Ольга",
    client: "Беловицкая Ольга",
    date: "19.01.2023 11:24",
    sessions: 2,
    reason: "Консультации оказались неэффективными",
    complaint: "Нет",
    status: "Обработана",
    confirmation: "Не подтверждено",
  },
];
