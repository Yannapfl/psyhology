"use client";

import { useState } from "react";
import Layout from "@/components/Layout/Layout";
import StepOne from "@/components/Application/StepOne/StepOne";
import StepTwo from "@/components/Application/StepTwo/StepTwo";
import { FormData } from "@/types/FormData";
import StepSwitcher from "@/components/StepSwitcher/StepSwitcher";


export default function ApplicationPsychology() {
  const [step, setStep] = useState(1);
   const [formData, setFormData] = useState<FormData>({
    country: "",
    timezone: "",
    conditions: [],
    relationships: [],
    work: [],
    lifeEvents: [],
    specificRequests: [],
    therapyApproach: [],
    schedule: [],
    paymentMethod: "",
  });

  const isStepOneComplete = formData.country && formData.timezone;

  return (
    <Layout>
      <div style={{ width: '80%', margin: '0 auto'}}>
        <StepSwitcher activeStep={step} />
        {step === 1 && (
          <StepOne
            formData={formData}
            setFormData={setFormData}
            onNext={() => isStepOneComplete && setStep(2)}
          />
        )}
        {step === 2 && (
          <StepTwo
            formData={formData}
            setFormData={setFormData}
            onBack={() => setStep(1)}
          />
        )}
      </div>
    </Layout>
  );
}
