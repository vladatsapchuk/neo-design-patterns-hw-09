import { readFileSync } from "fs";
import { UserData } from "../data/UserData";

export class CsvIterator implements Iterable<UserData> {
  private users: UserData[];

  constructor(filePath: string) {
    const content = readFileSync(filePath, "utf-8");
    this.users = this.parseCsv(content);
  }

  // Дозволяє використовувати for...of.
  public *[Symbol.iterator](): Iterator<UserData> {
    for (const user of this.users) {
      yield user;
    }
  }

  // Перетворює CSV-текст у масив користувачів.
  private parseCsv(content: string): UserData[] {
    const [, ...rows] = content.trim().split("\n");

    return rows.map(row => {
      const [id, name, email, phone] = this.parseCsvLine(row);

      return {
        id: Number(id),
        name,
        email,
        phone,
      };
    });
  }

  // Простий парсер CSV з підтримкою лапок.
  private parseCsvLine(line: string): string[] {
    const values: string[] = [];
    let current = "";
    let insideQuotes = false;

    for (let i = 0; i < line.length; i += 1) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"' && nextChar === '"') {
        current += '"';
        i += 1;
      } else if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === "," && !insideQuotes) {
        values.push(current);
        current = "";
      } else {
        current += char;
      }
    }

    values.push(current);

    return values;
  }
}