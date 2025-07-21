export interface PsychologistResponse {
  user: {
    id: number;
    created_at: string;
    updated_at: string;
    first_name: string;
    last_name: string;
    email: string;
    date_of_birth: string;
    phone2call: string;
    phone2whatsapp: string;
    name4telegram: string;
    city: string;
  };
  description: '',
  educations: {
    ID: number;
    Name: string;
    Department: string;
  }[];
  therapy_methods: {
    ID: number;
    Title: string;
  }[];
  started_at: string;
  ended_at: string;
  gender: {
    ID: number;
    Title: string;
  };
}
