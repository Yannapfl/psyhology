'use client';

import './Modals.css';
import Image from 'next/image';
import close from '../../../public/icons/Close.svg';
import { useEffect, useMemo, useState } from 'react';
import Input from '../Input/Input';
import Select from '../Dropdown/Dropdown';
import Switcher from '../Switcher/Switcher';
import api from '@/utils/api';

type Mode = 'create' | 'edit';

type Props = {
  onClose: () => void;
  onSaved?: () => void;
  cohortId: number | string;
  psychologistId?: number;
  mode?: Mode;
};

type TopicDTO = { ID: number; Title?: string };
type MethodDTO = { ID: number; Title?: string };

type BackendGetResponse = {
  psychologist: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone2call: string;
    phone2whatsapp: string;
    name4telegram: string;
    city: string;
    gender: string;
    start_at: string; // ISO
    remark: string;
    plan: string;
    readiness_status: string;
    cohort_id: number;
    international_account: boolean;
    education: string;
    education_status: string;
    country: string;
    number_clients_able2serve: number;
    number_current_clients: number;
    amount_of_replacements: number;
    description: string;
    clients: unknown[];
    topics: TopicDTO[] | null;
    therapy_methods: MethodDTO[] | null;
    access2materials_deadline: string;
    materials: string;
  };
  preferences: {
    common: {
      country: string;
      time_zone: string;
      description: string;
    };
    personal: {
      created_at: string;
      updated_at: string;
      therapy_experience: boolean;
      psychologist_type: string;
      schedule: string;
      has_foreign_card: boolean;
      topics: TopicDTO[] | null;         
      therapy_methods: MethodDTO[] | null;
    };
  };
};

type FormState = {

  firstName: string;
  lastName: string;
  phoneCall: string;
  phoneWhatsApp: string;
  phoneTelegram: string;
  email: string;
  education: string;
  educationStatus: string;
  country: string;
  city: string;
  gender: string;
  internationalAcc: string; 
  tariff: string;
  startedAt: string;      
  limitClients: string;
  haveClients: string;
  readyStatus: string;
  changesCount: string;
  comments: string;

  prefCountry: string;
  prefTimeZone: string;
  prefDescription: string;
  therapyExperience: string; 
  psychologistType: string;
  schedule: string;
  hasForeignCard: string;    
  topicsTitles: string[];  
  methodIds: number[];       
  methodTitlesFromResp: string[]; 
};

const toDateInput = (iso?: string) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const yesNo = (b?: boolean) => (b ? 'Да' : 'Нет');

export default function ModalEditPsy({
  onClose,
  onSaved,
  cohortId,
  psychologistId,
  mode = 'edit',
}: Props) {
  const isEdit = mode === 'edit';

  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(isEdit);
  const [distributionStatuses, setDistributionStatuses] = useState<string[]>([]);
  const [methodDict, setMethodDict] = useState<MethodDTO[]>([]); 

  const [formData, setFormData] = useState<FormState>({
    firstName: '',
    lastName: '',
    phoneCall: '',
    phoneWhatsApp: '',
    phoneTelegram: '',
    email: '',
    education: '',
    educationStatus: '',
    country: '',
    city: '',
    gender: '',
    internationalAcc: '',
    tariff: '',
    startedAt: '',
    limitClients: '',
    haveClients: '',
    readyStatus: '',
    changesCount: '',
    comments: '',

    prefCountry: '',
    prefTimeZone: 'Asia/Almaty',
    prefDescription: '',
    therapyExperience: '',
    psychologistType: '',
    schedule: '',
    hasForeignCard: '',
    topicsTitles: [],
    methodIds: [],
    methodTitlesFromResp: [],
  });


  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<string[]>('/v1/enums/psychologist-distribution-statuses');
        setDistributionStatuses(res.data);
      } catch (e) {
        console.error('Ошибка при загрузке статусов', e);
      }
    })();
  }, []);

type ApiMethod = { id: number; title: string };
type MethodDTO = { ID: number; Title: string };

useEffect(() => {
  (async () => {
    try {
      const { data } = await api.get<ApiMethod[]>('/v1/therapy-methods');

      const normalized: MethodDTO[] = (data ?? []).map((m) => ({
        ID: m.id,
        Title: m.title ?? '',
      }));

      setMethodDict(normalized.filter((m) => Number.isFinite(m.ID) && m.Title.trim().length > 0));
    } catch (e: unknown) {
      console.error('Ошибка загрузки /v1/therapy-methods', e);
    }
  })();
}, []);



  useEffect(() => {
    if (!isEdit || !psychologistId) return;
    const abort = new AbortController();

    (async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get<BackendGetResponse>(
          `/v1/${cohortId}/psychologists/${psychologistId}`,
          { signal: abort.signal }
        );

        const { psychologist: p, preferences: pref } = data;
        const topicsTitles =
          (pref.personal?.topics ?? p.topics ?? [])
            ?.map((t) => t?.Title)
            ?.filter(Boolean) as string[] || [];
        const methodIds =
          (pref.personal?.therapy_methods ?? p.therapy_methods ?? [])
            ?.map((m) => Number(m?.ID))
            ?.filter((n) => !Number.isNaN(n)) || [];

        const methodTitlesFromResp =
          (pref.personal?.therapy_methods ?? p.therapy_methods ?? [])
            ?.map((m) => m?.Title)
            ?.filter(Boolean) as string[] || [];

        setFormData({
          firstName: p.first_name ?? '',
          lastName: p.last_name ?? '',
          phoneCall: p.phone2call ?? '',
          phoneWhatsApp: p.phone2whatsapp ?? '',
          phoneTelegram: p.name4telegram ?? '',
          email: p.email ?? '',
          education: p.education ?? '',
          educationStatus: p.education_status ?? '',
          country: p.country ?? '',
          city: p.city ?? '',
          gender: p.gender ?? '',
          internationalAcc: p.international_account ? 'Есть' : 'Нет',
          tariff: p.plan ?? '',
          startedAt: toDateInput(p.start_at),
          limitClients: String(p.number_clients_able2serve ?? ''),
          haveClients: String(p.number_current_clients ?? ''),
          readyStatus: p.readiness_status ?? '',
          changesCount: String(p.amount_of_replacements ?? ''),
          comments: p.remark ?? '',

          prefCountry: pref.common?.country ?? '',
          prefTimeZone: pref.common?.time_zone ?? 'Asia/Almaty',
          prefDescription: pref.common?.description ?? '',

          therapyExperience: yesNo(pref.personal?.therapy_experience),
          psychologistType: pref.personal?.psychologist_type ?? '',
          schedule: pref.personal?.schedule ?? '',
          hasForeignCard: yesNo(pref.personal?.has_foreign_card),

          topicsTitles,
          methodIds,
          methodTitlesFromResp,
        });
      } catch (e) {
        if (e && typeof e === 'object' && 'name' in e) {
          const name = String((e as { name?: string }).name);
          if (name === 'CanceledError' || name === 'AbortError') return;
        }
        console.error('Ошибка загрузки психолога', e);
      } finally {
        setIsLoading(false);
      }
    })();

    return () => abort.abort();
  }, [cohortId, isEdit, psychologistId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as { name: keyof FormState; value: string };
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const methodTitlesToShow = useMemo(() => {
    if (formData.methodTitlesFromResp.length) return formData.methodTitlesFromResp;
    if (!formData.methodIds.length || !methodDict.length) return [];
    const dictMap = new Map(methodDict.map((m) => [m.ID, m.Title || '']));
    return formData.methodIds.map((id) => dictMap.get(id) || String(id));
  }, [formData.methodIds, formData.methodTitlesFromResp, methodDict]);


  const payload = useMemo(() => {
    return {
      psychologist: {
        email: formData.email || '',
        first_name: formData.firstName || '',
        last_name: formData.lastName || '',
        phone2call: formData.phoneCall || '',
        phone2whatsapp: formData.phoneWhatsApp || '',
        name4telegram: formData.phoneTelegram || '',
        city: formData.city || '',
        gender: formData.gender || '',
        start_at: formData.startedAt ? new Date(formData.startedAt).toISOString() : '',
        remark: formData.comments ?? '',
        plan: formData.tariff || '',
        readiness_status: formData.readyStatus || '',
        cohort_id: Number(cohortId),
        international_account: formData.internationalAcc === 'Есть',
        education: formData.education || '',
        education_status: formData.educationStatus || '',
        country: formData.country || '',
        number_clients_able2serve: parseInt(formData.limitClients) || 0,
        number_current_clients: parseInt(formData.haveClients) || 0,
        amount_of_replacements: parseInt(formData.changesCount) || 0,
        description: '',
    
      },

    };
  }, [cohortId, formData]);

  const handleSubmit = async () => {
    try {
      if (isEdit && psychologistId) {
        await api.put(`/v1/${cohortId}/psychologists/${psychologistId}`, payload);
      } else {
        await api.post(`/v1/${cohortId}/psychologists`, payload);
      }
      onSaved?.();
    } catch (e) {
      console.error('Ошибка при сохранении психолога:', e);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ width: '760px'}}>
        <div className="modal-header">
          <h2 style={{ margin: 0 }}>
            {isEdit ? 'Редактирование психолога' : 'Создание психолога'}
          </h2>
          <button className="close-button" onClick={onClose}>
            <Image src={close} alt="close" width={24} />
          </button>
        </div>

        <div className="modal-admin">
          <div className="switcher">
            <Switcher
              tabs={['ПСИХОЛОГ', 'АНКЕТА']}
              activeIndex={active}
              onChange={setActive}
            />
          </div>

          {isLoading ? (
            <div style={{ padding: 24 }}>Загрузка данных…</div>
          ) : (
            <div className="flex-between__modal">
              {active === 0 ? (
                <div>
                  <div className="two-flexbox">
                    <Input name="firstName" placeholder="Имя" value={formData.firstName} onChange={handleChange} />
                    <Input name="lastName" placeholder="Фамилия" value={formData.lastName} onChange={handleChange} />
                  </div>

                  <div className="two-flexbox">
                    <Input name="phoneCall" placeholder="Телефон (звонки)" value={formData.phoneCall} onChange={handleChange} />
                    <Input name="phoneWhatsApp" placeholder="Телефон (WhatsApp)" value={formData.phoneWhatsApp} onChange={handleChange} />
                  </div>

                  <div className="two-flexbox">
                    <Input name="phoneTelegram" placeholder="Ник Telegram" value={formData.phoneTelegram} onChange={handleChange} />
                    <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                  </div>

                  <div className="two-flexbox">
                    <Input name="education" placeholder="Образование" value={formData.education} onChange={handleChange} />
                    <Select name="educationStatus" value={formData.educationStatus} onChange={handleChange} options={['В процессе', 'Завершил']} placeholderOption="Статус обучения" />
                  </div>

                  <div className="two-flexbox">
                    <Select name="country" value={formData.country} onChange={handleChange} options={['Казахстан', 'Россия', 'Киргизия', 'Узбекистан', 'Беларусь']} placeholderOption="Страна (анкета)" />
                    <Input name="city" placeholder="Город" value={formData.city} onChange={handleChange} />
                  </div>

                  <div className="two-flexbox">
                    <Select name="gender" value={formData.gender} onChange={handleChange} options={['Мужчина', 'Женщина']} placeholderOption="Пол" />
                    <Select name="internationalAcc" value={formData.internationalAcc} onChange={handleChange} options={['Есть', 'Нет']} placeholderOption="Счёт за границей" />
                  </div>

                  <div className="two-flexbox">
                    <Select name="tariff" value={formData.tariff} onChange={handleChange} options={['Базовый', 'Premium']} placeholderOption="Тариф" />
                    <Input name="startedAt" type="date" placeholder="Дата старта" value={formData.startedAt} onChange={handleChange} />
                  </div>

                  <div className="two-flexbox">
                    <Input name="limitClients" placeholder="Нужно клиентов" value={formData.limitClients} onChange={handleChange} />
                    <Input name="haveClients" placeholder="Распределено клиентов" value={formData.haveClients} onChange={handleChange} />
                  </div>

                  <div className="two-flexbox">
                    <Select name="readyStatus" value={formData.readyStatus} onChange={handleChange} options={distributionStatuses} placeholderOption="Готовность" />
                    <Input name="changesCount" placeholder="Количество замен" value={formData.changesCount} onChange={handleChange} />
                  </div>

                  <textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Примечания"
                    rows={4}
                    className="textarea-reason"
                    style={{ marginBottom: '16px' }}
                  />
                </div>
              ) : (
                // -------- АНКЕТА (READ ONLY) --------
                <div className="client-block-wrapper">
                  <div className="client-row-form">
                    <div className="client-item">
                      <div className="label">Страна (preferences.common)</div>
                      <div className="value">{formData.prefCountry || '—'}</div>
                    </div>
                    <div className="client-item">
                      <div className="label">Часовой пояс</div>
                      <div className="value">{formData.prefTimeZone || '—'}</div>
                    </div>
                  </div>

                  <div className="client-row-form">
                    <div className="client-item" style={{ gridColumn: '1 / -1' }}>
                      <div className="label">Описание</div>
                      <div className="value">{formData.prefDescription || '—'}</div>
                    </div>
                  </div>

                  <div className="client-row-form">
                    <div className="client-item">
                      <div className="label">Опыт личной терапии</div>
                      <div className="value">{formData.therapyExperience || '—'}</div>
                    </div>
                    <div className="client-item">
                      <div className="label">Тип психолога</div>
                      <div className="value">{formData.psychologistType || '—'}</div>
                    </div>
                    <div className="client-item">
                      <div className="label">График</div>
                      <div className="value">{formData.schedule || '—'}</div>
                    </div>
                    <div className="client-item">
                      <div className="label">Иностранная карта</div>
                      <div className="value">{formData.hasForeignCard || '—'}</div>
                    </div>
                  </div>

                  <div className="client-row-form">
                    <div className="client-item" style={{ gridColumn: '1 / -1' }}>
                      <div className="label">Темы</div>
                      <div className="value">
                        {formData.topicsTitles.length ? formData.topicsTitles.join(', ') : '—'}
                      </div>
                    </div>
                  </div>

                  <div className="client-row-form">
                    <div className="client-item" style={{ gridColumn: '1 / -1' }}>
                      <div className="label">Методы терапии</div>
                      <div className="value">
                        {methodTitlesToShow.length ? methodTitlesToShow.join(', ') : '—'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="button-group" style={{ margin: 'auto 0 16px 0' }}>
                <button className="btn-light-green" onClick={onClose}>
                  ОТМЕНА
                </button>
                <button className="btn" onClick={handleSubmit} disabled={isLoading}>
                  СОХРАНИТЬ
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
