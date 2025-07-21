'use client';

import StepOne from "@/components/Application/StepOne/StepOne";
import ApplicationClient from "@/components/ApplicationClient/ApplicationClient";
import Layout from "@/components/Layout/Layout";
import StepSwitcher from "@/components/StepSwitcher/StepSwitcher";
import { FormData } from "@/types/FormData";
import { useState } from "react"

export default function ApplcationClientPage() {
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
              <ApplicationClient 
              formData={formData}
            setFormData={setFormData}
            onBack={() => setStep(1)}
              />
            )}
          </div>
        </Layout>
      );
}