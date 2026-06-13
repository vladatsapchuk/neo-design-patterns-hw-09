import { writeFileSync } from "fs";
import { DataExporter } from "./DataExporter";
import { UserData } from "../data/UserData";

export class CsvExporter extends DataExporter {
  // Форматує дані у CSV.
  protected render(): void {
    const header = "id,name,email,phone";

    const rows = this.data.map(user =>
      [
        user.id,
        this.escapeCsv(user.name),
        this.escapeCsv(user.email),
        this.escapeCsv(user.phone),
      ].join(",")
    );

    this.result = [header, ...rows].join("\n");
  }

  // Зберігає CSV у dist/users.csv.
  protected save(): void {
    this.ensureDistDirectory();
    writeFileSync("./dist/users.csv", this.result, "utf-8");
    console.log("CSV exported to dist/users.csv");
  }

  // Захищає CSV від ком, лапок і переносів рядків.
  private escapeCsv(value: string | number): string {
    const text = String(value);

    if (/[",\n]/.test(text)) {
      return `"${text.replace(/"/g, '""')}"`;
    }

    return text;
  }
}