"use client";

import "./Flow.css";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LayoutAdmin from "@/components/Layout/LayoutAdmin/LayoutAdmin";
import Image from "next/image";
import pencil from "../../../../../public/icons/green_pencil.svg";
import api from "@/utils/api";
import { Cohort } from "@/types/CohortTypes";
import Link from "next/link";
import { AppRoutes } from "@/constants/AppRoutes";

export default function CurrentFlowPage() {
  const { id } = useParams();
  const [cohort, setCohort] = useState<Cohort | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCohort = async () => {
      try {
        const response = await api.get(`v1/cohorts/${id}`);
        setCohort(response.data);
      } catch (error) {
        console.error("Ошибка загрузки потока", error);
      }
    };

    fetchCohort();
  }, [id]);

  if (!cohort) return <div>Загрузка...</div>;

  return (
    <LayoutAdmin>
      <div className="content-admin flow">
        <div className="header-page">
          <div className="path-page">
            <Link href="/admin/flows">
              <h6>Все потоки</h6>
            </Link>
            <h6>/</h6>
            <h6>{cohort.Name}</h6>
          </div>
          <div className="title-page-admin">
            <h1>{cohort.Name}</h1>
            <button className="btn-light-green">
              <Image src={pencil} alt="pencil" />
              Редактировать
            </button>
          </div>
        </div>
        <div className="sections-buttons">
          <button className="btn-section" onClick={() => router.push(AppRoutes.flowByIdClients(cohort.ID))}>
            Клиенты ({cohort.AmountOfClients})
          </button>
          <button className="btn-section" onClick={() => router.push(AppRoutes.flowByIdPsychologists(cohort.ID))}>
            Психологи ({cohort.AmountOfPsychologists})
          </button>
          <button className="btn-section" onClick={() => router.push(AppRoutes.flowByIdReplacements(cohort.ID))} >
            Замены ({cohort.AmountOfReplacements})
          </button>
          <button className="btn-section" onClick={() => router.push(AppRoutes.flowByIdComplaint(cohort.ID))}>
            Жалобы ({cohort.AmountOfComplaints})
          </button>
        </div>
      </div>
    </LayoutAdmin>
  );
}
