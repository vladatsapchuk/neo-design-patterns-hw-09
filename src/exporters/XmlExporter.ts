import { writeFileSync } from "fs";
import { DataExporter } from "./DataExporter";
import { UserData } from "../data/UserData";

export class XmlExporter extends DataExporter {
  // Форматує дані у XML.
  protected render(): void {
    const usersXml = this.data
      .map(user => this.renderUser(user))
      .join("\n");

    this.result = `<?xml version="1.0" encoding="UTF-8"?>
<users>
${usersXml}
</users>`;
  }

  // Hook-метод. Додає коментар після XML.
  protected afterRender(): void {
    this.result += `\n<!-- Експорт згенеровано: ${new Date().toISOString()} -->`;
  }

  // Зберігає XML у dist/users.xml.
  protected save(): void {
    this.ensureDistDirectory();
    writeFileSync("./dist/users.xml", this.result, "utf-8");
    console.log("XML exported to dist/users.xml");
  }

  // Формує XML для одного користувача.
  private renderUser(user: UserData): string {
    return `  <user>
    <id>${user.id}</id>
    <name>${this.escapeXml(user.name)}</name>
    <email>${this.escapeXml(user.email)}</email>
    <phone>${this.escapeXml(user.phone)}</phone>
  </user>`;
  }

  // Захищає XML від спеціальних символів.
  private escapeXml(value: string): string {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }
}