"use client";

import CohortBlock from "@/components/CohortBlock/CohortBlock";
import LayoutAdmin from "@/components/Layout/LayoutAdmin/LayoutAdmin";
import ModalAddCohort from "@/components/Modals/ModalAddCohort";
import ModalSureCreateCohort from "@/components/Modals/ModalSureCreateCohort";
import { Cohort } from "@/types/CohortTypes";
import api from "@/utils/api";
import { useEffect, useState } from "react";

export default function Flows() {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [newCohortData, setNewCohortData] = useState({
    name: "",
    startDate: "",
    endDate: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`v1/cohorts`);
        setCohorts(response.data);
      } catch (error) {
        console.log("Ошибка загрузка данных о потоках", error);
      }
    };

    fetchData();
  }, []);

  const handleCreateFlow = async () => {
    try {
      const response = await api.post(`v1/cohorts`, {
        end_at: new Date(newCohortData.endDate).toISOString(),
        name: newCohortData.name,
        start_at: new Date(newCohortData.startDate).toISOString(),
      });
      console.log('Поток создан', response.data)
      setShowConfirmModal(false);
    } catch (error) {
      console.error('Ошибка при создании потока', error)
    }
    
  };

  return (
    <LayoutAdmin>
      <div className="content-admin">
        <div className="header-page">
          <div className="title-page-admin">
            <h1>Все потоки</h1>
            <h1 style={{ color: "#949494" }}>120</h1>
          </div>
          <button onClick={() => setShowAddModal(true)}>+ Новый поток</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          {cohorts.map((cohort) => (
            <CohortBlock cohort={cohort} key={cohort.ID} />
          ))}
        </div>

        {showAddModal && (
          <ModalAddCohort
            onClose={() => setShowAddModal(false)}
            onNext={(data) => {
              setNewCohortData(data);
              setShowAddModal(false);
              setShowConfirmModal(true);
            }}
          />
        )}

        {showConfirmModal && (
          <ModalSureCreateCohort
            onClose={() => setShowConfirmModal(false)}
            onSuccess={handleCreateFlow}
          />
        )}
      </div>
    </LayoutAdmin>
  );
}
