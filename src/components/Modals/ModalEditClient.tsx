'use client';

import './Modals.css';
import Image from 'next/image';
import close from '../../../public/icons/Close.svg';
import { useEffect, useState } from 'react';
import Input from '../Input/Input';
import Select from '../Dropdown/Dropdown';
import Switcher from '../Switcher/Switcher';
import DetailsBlock from '../DetailsBlock/DetailsBlock';
import api from '@/utils/api';

import { FormClient } from '@/types/FormClient';
import { FormClientApi, apiToForm } from '@/utils/apiToClientForm';

type Props = { onClose: () => void; clientId: number | string };

const cohortId = 1;

export default function ModalEditClient({ onClose, clientId }: Props) {
  const [crm, setCrm] = useState('');
  const [active, setActive] = useState(0);

  const [formData, setFormData] = useState<FormClient>({
    first_names: '',
    last_name: '',
    birthDate: '',
    phoneCall: '',
    phoneWhatsApp: '',
    phoneTelegram: '',
    email: '',
    psyhology: '',
    distribution_status: '',
    comments: '',
    country: '',
    timezone: '',
    specialRequest: '',
    schedule: '',
    internationalAcc: false,
    psySex: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get<FormClientApi>(`/v1/${cohortId}/clients/${clientId}`);
        setFormData(apiToForm(data));
      } catch (error) {
        console.error('Ошибка загрузки данных пользователя', error);
      }
    })();
  }, [clientId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        access2materials_deadline: undefined as unknown as string,
        city: undefined as unknown as string,                  
        distribution_status: formData.distribution_status || undefined,
        email: formData.email || undefined,
        first_name: formData.first_names || undefined,            
        last_name: formData.last_name || undefined,
        materials: undefined as unknown as string,               
        name4telegram: formData.phoneTelegram || undefined,
        phone2call: formData.phoneCall || undefined,
        phone2whatsapp: formData.phoneWhatsApp || undefined,
        psychologist_id: formData.psyhology ? Number(formData.psyhology) : 0,
        remark: formData.comments ?? '',
      };

      await api.put(`/v1/${cohortId}/clients/${clientId}`, payload);

      alert('Клиент успешно сохранён');
      onClose();
    } catch (e) {
      console.error('Ошибка сохранения клиента', e);
      alert('Не удалось сохранить клиента');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ width: '712px', height: '700px' }}>
        <div className="modal-header">
          <h2 style={{ margin: 0 }}>
            {formData.last_name || '—'} {formData.first_names || '—'}
          </h2>
          <button className="close-button" onClick={onClose}>
            <Image src={close} alt="close" width={24} />
          </button>
        </div>

        <div className="modal-admin">
          <div className="switcher">
            <Switcher tabs={['ДАННЫЕ КЛИЕНТА', 'АНКЕТА']} activeIndex={active} onChange={setActive} />
          </div>

          <div className="flex-between__modal">
            {active === 0 ? (
              <div>
                <div className="modal-crm">
                  <input
                    type="text"
                    name="crm"
                    value={crm}
                    onChange={(e) => setCrm(e.target.value)}
                    placeholder="CRM ID"
                  />
                  <button className="btn-light-green">Подтянуть данные</button>
                </div>

                <div className="two-flexbox">
                  <Input
                    placeholder="Имя"
                    name="first_names"
                    value={formData.first_names}
                    onChange={handleChange}
                    style={{ padding: '16px' }}
                  />
                  <Input
                    placeholder="Фамилия"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    style={{ padding: '16px' }}
                  />
                </div>

                <div className="two-flexbox">
                  <Input
                    placeholder="Номер телефона для звонка"
                    name="phoneCall"
                    value={formData.phoneCall}
                    onChange={handleChange}
                    style={{ padding: '16px' }}
                  />
                  <Input
                    placeholder="Номер телефона WhatsApp"
                    name="phoneWhatsApp"
                    value={formData.phoneWhatsApp}
                    onChange={handleChange}
                    style={{ padding: '16px' }}
                  />
                </div>

                <div className="two-flexbox">
                  <Input
                    placeholder="Никнейм Telegram"
                    name="phoneTelegram"
                    value={formData.phoneTelegram}
                    onChange={handleChange}
                    style={{ padding: '16px' }}
                  />
                  <Input
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ padding: '16px' }}
                  />
                </div>

                <div className="two-flexbox">
                  <Select
                    style={{ padding: '16px' }}
                    name="distribution_status"
                    value={formData.distribution_status}
                    onChange={handleChange}
                    options={['Распределён', 'В ожидании', 'Вышел из проекта', 'Возврат']}
                    placeholderOption="Статус распределения"
                  />
                  <Select
                    style={{ padding: '16px' }}
                    name="psyhology"
                    value={formData.psyhology}
                    onChange={handleChange}
                    options={['Psy1', 'Psy2']}
                    placeholderOption="Психолог"
                  />
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
              <DetailsBlock
                country={formData.country}
                timezone={formData.timezone}
                specialRequest={formData.specialRequest}
                schedule={formData.schedule}
                internationalAcc={formData.internationalAcc}
                psySex={formData.psySex}
              />
            )}

            <div className="button-group" style={{ margin: 'auto 0 16px 0' }}>
              <button className="btn-light-green" onClick={onClose}>
                ОТМЕНА
              </button>
              <button className="btn" onClick={handleSubmit}>
                СОХРАНИТЬ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
