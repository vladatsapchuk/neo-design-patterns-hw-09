import { mkdirSync } from "fs";
import { UserData } from "../data/UserData";

interface ApiUser {
  id: number;
  name: string;
  email: string;
  phone: string;
}

// Базовий клас із шаблонним методом.
// Він містить незмінний алгоритм експорту.
export abstract class DataExporter {
  protected data: UserData[] = [];
  protected result = "";

  // Template Method.
  // Порядок кроків фіксований і не змінюється в підкласах.
  public async export(): Promise<void> {
    await this.load();
    this.transform();
    this.beforeRender();
    this.render();
    this.afterRender();
    this.save();
  }

  // Завантажуємо користувачів із API.
  protected async load(): Promise<void> {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`Failed to load users: ${response.status}`);
    }

    const users = (await response.json()) as ApiUser[];

    this.data = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    }));
  }

  // Залишаємо тільки потрібні поля та сортуємо за іменем.
  protected transform(): void {
    this.data = this.data
      .map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  // Hook-метод. За замовчуванням нічого не робить.
  protected beforeRender(): void {}

  // Конкретний формат визначає підклас.
  protected abstract render(): void;

  // Hook-метод. За замовчуванням нічого не робить.
  protected afterRender(): void {}

  // Конкретне збереження визначає підклас.
  protected abstract save(): void;

  // Гарантує, що папка dist існує.
  protected ensureDistDirectory(): void {
    mkdirSync("./dist", { recursive: true });
  }
}