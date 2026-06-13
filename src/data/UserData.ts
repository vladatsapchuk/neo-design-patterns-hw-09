// Тип даних користувача.
// Це фінальна структура, яку ми експортуємо у CSV, JSON та XML.
export interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
}