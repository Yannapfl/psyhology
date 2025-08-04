"use client";

import { useState } from "react";
import Layout from "@/components/Layout/Layout";
import StepOne from "@/components/Application/StepOne/StepOne";
import StepTwo from "@/components/Application/StepTwo/StepTwo";
import {  FormDataPsy } from "@/types/FormData";
import StepSwitcher from "@/components/StepSwitcher/StepSwitcher";
import { AppRoutes } from "@/constants/AppRoutes";
import { useRouter } from "next/navigation";
import api from "@/utils/api";


export default function ApplicationPsychology() {
  const [step, setStep] = useState(1);
  const router = useRouter();
   const [formData, setFormData] = useState<FormDataPsy>({
    country: "",
    timezone: "",
    specificRequests: [],
    therapyMethods: [],
    schedule: [],
    paymentMethod: "",
    language: '',
    description: "",
  });
  
  
  const handleSubmit = async () => {
  try {
    const payload = {
  common: {
    country: formData.country,
    time_zone: formData.timezone,
  },
  personal: {
    has_foreign_card: formData.paymentMethod === "Да",
    language: formData.language,
    schedule_id: formData.schedule[0] || "",
    specific_topic_ids: [...new Set(formData.specificRequests.map(Number))],
    therapy_methods_ids: [...new Set(formData.therapyMethods.map(Number))],
  }
};


    const response = await api.post("/v1/profile/preferences", payload);
    console.log("Отправлено успешно", response.data);
    alert("Форма успешно отправлена!");
    router.push(AppRoutes.homepsyhology)

  } catch (error) {
    console.error("Ошибка при отправке:", error);
    alert("Ошибка при отправке формы");
  }
};

  return (
    <Layout>
      <div style={{ width: '80%', margin: '0 auto'}}>
        <StepSwitcher activeStep={step} />
        {step === 1 && (
          <StepOne<FormDataPsy>
  formData={formData}
  setFormData={setFormData}
  onNext={() => setStep(2)}
/>

        )}
        {step === 2 && (
          <StepTwo
            formData={formData}
            setFormData={setFormData}
            onBack={() => setStep(1)}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </Layout>
  );
}
