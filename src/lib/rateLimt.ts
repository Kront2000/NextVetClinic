// используем Map, ключом будет строка (IP)
const attempts = new Map<string, { count: number, time: number }>();

const LIMIT = 5;            // 5 попыток
const WINDOW_MS = 5 * 60 * 1000; // окно 5 минут

export function checkLimit(ip: string) {
  const now = Date.now();
  const data = attempts.get(ip);

  // первый запрос
  if (!data) {
    attempts.set(ip, { count: 1, time: now });
    return true;
  }

  // окно прошло — сброс
  if (now - data.time > WINDOW_MS) {
    attempts.set(ip, { count: 1, time: now });
    return true;
  }

  // увеличиваем попытки
  data.count += 1;
  attempts.set(ip, data);

  return data.count <= LIMIT;
}
