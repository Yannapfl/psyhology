export function statusColor(status: string): string {
  if (status.includes("Заверш") || 
  status.includes("Все распределен") || 
  status.includes('Обработан') ||
  status.includes('Подтвержден') ||
  status.includes('Распредел')
)
    return "status-green";
  if (
    status.includes("Ожидает") ||
    status.includes("В ожидании") ||
    status.includes("В процессе") ||
    status.includes("Ожидает распред") ||
    status.includes("Новая") ||
    status.includes('Возврат')
  )
    return "status-yellow";
  if (status.includes("Вышел") || 
      status.includes('Не подтвержд')
    
  ) 
    return "status-red";
  if (status.includes("Базовый")) return "status-purple";
  if (status.includes("Premium")) return "status-premium";
  return "default";
}
