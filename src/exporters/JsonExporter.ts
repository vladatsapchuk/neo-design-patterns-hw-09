import { writeFileSync } from "fs";
import { DataExporter } from "./DataExporter";

export class JsonExporter extends DataExporter {
  // Форматує дані у красивий JSON.
  protected render(): void {
    this.result = JSON.stringify(this.data, null, 2);
  }

  // Зберігає JSON у dist/users.json.
  protected save(): void {
    this.ensureDistDirectory();
    writeFileSync("./dist/users.json", this.result, "utf-8");
    console.log("JSON exported to dist/users.json");
  }
}