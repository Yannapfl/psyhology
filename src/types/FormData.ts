export type FormDataClient = {
  country: string;
  timezone: string;
  gender: string;
  language: string;
  specificRequests: number[];
  schedule: string[];
  paymentMethod: string;
};

export type FormDataPsy = {
  country: string;
  timezone: string;
  language: string;
  specificRequests: number[];
  schedule: string[];
  paymentMethod: string;
  description: string;
  therapyMethods: number[];
}