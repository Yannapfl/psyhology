"use client";

import CohortBlock from "@/components/CohortBlock/CohortBlock";
import LayoutAdmin from "@/components/Layout/LayoutAdmin/LayoutAdmin";
import ModalAddPsy from "@/components/Modals/ModalAddPsy";
import { Cohort } from "@/types/CohortTypes";
import api from "@/utils/api";
import { useEffect, useState } from "react";

export default function Flows() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [cohorts, setCohorts] = useState<Cohort[]>([]);

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

  return (
    <LayoutAdmin>
      <div className="content-admin">
        <div className="header-page">
          <div className="title-page-admin">
            <h1>Все потоки</h1>
            <h1 style={{ color: "#949494" }}>120</h1>
          </div>
          <button onClick={() => setOpenAddModal(true)}>+ Новый поток</button>
        </div>

        <div className="cohorts-page">
            {cohorts.map((cohort) => (
                <CohortBlock cohort={cohort} key={cohort.ID} />
            ))}
        </div>

        {openAddModal && <ModalAddPsy onClose={() => setOpenAddModal(false)} />}
      </div>
    </LayoutAdmin>
  );
}
