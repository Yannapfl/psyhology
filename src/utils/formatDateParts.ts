export const formatDateTimeParts = (iso: string, timeZone?: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { date: "", time: "" };

  if (timeZone) {
    const parts = new Intl.DateTimeFormat("ru-RU", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(d);

    const get = (t: Intl.DateTimeFormatPartTypes) =>
      parts.find((p) => p.type === t)?.value ?? "";

    return {
      date: `${get("day")}.${get("month")}.${get("year")}`,
      time: `${get("hour")}.${get("minute")}`,
    };
  }

  const pad = (n: number) => String(n).padStart(2, "0");
  const dd = pad(d.getDate());
  const mm = pad(d.getMonth() + 1);
  const yyyy = d.getFullYear();
  const hh = pad(d.getHours());
  const min = pad(d.getMinutes());
  return { date: `${dd}.${mm}.${yyyy}`, time: `${hh}:${min}` };
};
