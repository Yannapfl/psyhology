import { Role } from "./AuthTypes";

type ApiClient = {
  city: string;
  cohortID: number;
  comment: string;
  distributionStatus: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  name4telegram: string;
  phone2call: string;
  phone2whatsapp: string;
  plan: string;
  psychologistID: number;
  Remark: string;
};

type ApiPreferences = {
  common: {
    country: string;
    description: string;
    time_zone: string;
  };
  personal: {
    created_at: string;
    has_foreign_card: boolean;
    psychologist_type: string;  
    schedule: string;
    therapy_experience: boolean;
    therapy_methods: { id: number; title: string }[];
    topics: { id: number; title: string }[];
    updated_at: string;
  };
};

export type ClientResponse = {
  client: ApiClient;
  preferences: ApiPreferences;
};


export type PsychologistClient = {
  city: string;
  cohort_id: number;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  name4telegram: string;
  phone2call: string;
  phone2whatsapp: string;
  role: string;
  distribution_status: string;
  comment: string;
};

export type TherapyMethod = {
  id: number;
  title: string;
};

export type Topic = {
  id: number;
  title: string;
};

export type Psychologist = {
  amount_of_replacements: number;
  city: string;
  clients: PsychologistClient[];
  cohort_id: number;
  country: string;
  description: string;
  education: string;
  education_status: string;
  email: string;
  first_name: string;
  gender: string;
  id: number;
  international_account: boolean;
  last_name: string;
  name4telegram: string;
  number_clients_able2serve: number;
  number_current_clients: number;
  phone2call: string;
  phone2whatsapp: string;
  plan: string;
  readiness_status: string;
  remark: string;
  start_at: string; 
  therapy_methods: TherapyMethod[] | null;
  topics: Topic[] | null;
};

export type PsychologistList = Psychologist[];

export interface Replacement {
  AmountOfSessions: number;
  ClientID: number;
  CohortID: number;
  Complaince: boolean;
  ConfirmationStatus: string;  
  CreatedAt: string;         
  ID: number;
  OtherReason: string;
  PsychologistID: number;
  Reason2replace: string;   
  ReplacementStatus: string; 
  RequestedRole: Role;
  UpdatedAt: string;  
}

export interface Complaince {
  ID: number;
  CreatedAt: string;     
  UpdatedAt: string;        
  ClientID: number;
  PsychologistID: number;
  FiledRole: Role;
  RequestID: number;
  CohortID: number;
  Description: string;
  ComplainceStatus: string; 
}
