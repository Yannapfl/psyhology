import React, { useCallback, useEffect, useState } from "react";
import "./NotificationCenter.css";
import Image from "next/image";
import switcher from "../../../public/icons/nc_switch.svg";
import circle from "../../../public/icons/nt_circle.svg";
import ModalRequestChange from "../Modals/ModalRequestChange";
import api from "@/utils/api";

export type RecipientRole = "client" | "psychologist" | "manager" | "admin" | string;

export interface NotificationDTO {
  created_at: string;
  id: number;
  message: string;
  read: boolean;
  recipient_id: number;
  recipient_role: RecipientRole;
  request_id: number | null;
  title: string;
}

const formatTime = (iso: string) => {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${dd}.${mm}.${yyyy}, ${hh}:${min}`;
};

const isActionable = (n: NotificationDTO) => !!n.request_id && n.request_id > 0;

export default function NotificationCenter({
  onClose,
}: {
  onClose: () => void;
}) {
  const [items, setItems] = useState<NotificationDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState<null | {
    id: number;
    title: string;
    message: string;
    recipient_id: number;
  }>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get<NotificationDTO[]>("/v1/notifications");
        if (!cancelled) setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        if (!cancelled) console.error("Не удалось загрузить уведомления", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const markRead = useCallback((id: number) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    // PATCH/POST
  }, []);

  const handleItemClick = useCallback(
    (n: NotificationDTO) => {
      if (isActionable(n)) {
        setModal({
          id: n.id,
          title: n.title,
          message: n.message,
          recipient_id: n.recipient_id,
        });
        setOpenModal(true);
        markRead(n.id);
      } else {
        if (!n.read) markRead(n.id);
      }
    },
    [markRead]
  );

  return (
    <div className="nc-wrap">
      <div className="nc-card" role="dialog" aria-label="Уведомления">
        <div className="nc-header">
          <div className="nc-title">Уведомления</div>
          <button className="nc-close" aria-label="Закрыть" onClick={onClose}>
            ×
          </button>
        </div>

        {loading && (
          <div className="nc-list" role="status" aria-live="polite">
            <div className="nc-loading">Загружаем…</div>
          </div>
        )}

        {!loading && error && (
          <div className="nc-list">
            <div className="nc-end">{error}</div>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="nc-list">
            <div className="nc-end">Пока нет уведомлений</div>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="nc-list" role="list" aria-label="Список уведомлений">
            {items.map((n) => (
              <button
                key={n.id}
                className={`nc-item ${n.read ? "is-read" : "is-unread"}`}
                onClick={() => handleItemClick(n)}
                role="listitem"
              >
                {isActionable(n) ? (
                  <Image src={switcher} alt="switcher" width={32} />
                ) : (
                  <Image src={circle} alt="circle" width={32} />
                )}

                <div className="nc-item-content">
                  <div className="nc-item-row">
                    <div className="nc-item-title">{n.title}</div>
                    {!n.read && <span className="nc-badge">new</span>}
                  </div>
                  {n.message && <div className="nc-item-body">{n.message}</div>}
                  <div className="nc-item-time">{formatTime(n.created_at)}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {openModal && (
        <ModalRequestChange
          onClose={() => setOpenModal(false)}
          id={modal?.id}
          title={modal?.title}
          message={modal?.message}
          recipient_id={modal?.recipient_id}
        />
      )}
    </div>
  );
}
