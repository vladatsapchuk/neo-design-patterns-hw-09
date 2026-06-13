import { readFileSync } from "fs";
import { UserData } from "../data/UserData";

export class XmlIterator implements Iterable<UserData> {
  private users: UserData[];

  constructor(filePath: string) {
    const content = readFileSync(filePath, "utf-8");
    this.users = this.parseXml(content);
  }

  // Дозволяє обходити XML через for...of.
  public *[Symbol.iterator](): Iterator<UserData> {
    for (const user of this.users) {
      yield user;
    }
  }

  // Парсить XML, який ми самі згенерували.
  private parseXml(content: string): UserData[] {
    const userBlocks = content.match(/<user>[\s\S]*?<\/user>/g) ?? [];

    return userBlocks.map(block => ({
      id: Number(this.getTagValue(block, "id")),
      name: this.unescapeXml(this.getTagValue(block, "name")),
      email: this.unescapeXml(this.getTagValue(block, "email")),
      phone: this.unescapeXml(this.getTagValue(block, "phone")),
    }));
  }

  // Дістає значення конкретного XML-тега.
  private getTagValue(block: string, tagName: string): string {
    const regex = new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`);
    const match = block.match(regex);

    return match?.[1] ?? "";
  }

  // Повертає XML-символи назад у звичайний текст.
  private unescapeXml(value: string): string {
    return value
      .replace(/&apos;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&gt;/g, ">")
      .replace(/&lt;/g, "<")
      .replace(/&amp;/g, "&");
  }
}