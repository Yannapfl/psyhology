"use client";

import StepOne from "@/components/Application/StepOne/StepOne";
import ApplicationClient from "@/components/ApplicationClient/ApplicationClient";
import Layout from "@/components/Layout/Layout";
import StepSwitcher from "@/components/StepSwitcher/StepSwitcher";
import { AppRoutes } from "@/constants/AppRoutes";
import { FormData } from "@/types/FormData";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ApplcationClientPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    country: "",
    timezone: "",
    specificRequests: [],
    schedule: [],
    paymentMethod: "",
    gender: "",
    language: "",
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
        psychologist_type: formData.gender,
        schedule_id: formData.schedule[0] || "",
        specific_topic_ids: formData.specificRequests.map(Number),
      }
    };

    const response = await api.post("/v1/profile/preferences", payload);
    console.log("Отправлено успешно", response.data);
    alert("Форма успешно отправлена!");
    router.push(AppRoutes.homeclient)

  } catch (error) {
    console.error("Ошибка при отправке:", error);
    alert("Ошибка при отправке формы");
  }
};


  const isStepOneComplete = formData.country && formData.timezone;

  return (
    <Layout>
      <div style={{ width: "80%", margin: "0 auto" }}>
        <StepSwitcher activeStep={step} />
        {step === 1 && (
          <StepOne
            formData={formData}
            setFormData={setFormData}
            onNext={() => isStepOneComplete && setStep(2)}
          />
        )}
        {step === 2 && (
          <ApplicationClient
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
