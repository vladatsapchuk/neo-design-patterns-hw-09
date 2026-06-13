import { CsvIterator } from "./iterators/CsvIterator";
import { JsonIterator } from "./iterators/JsonIterator";
import { XmlIterator } from "./iterators/XmlIterator";

// CSV
console.log("--- CSV ---");
for (const user of new CsvIterator("./dist/users.csv")) {
  console.log(user);
}

// JSON
console.log("--- JSON ---");
for (const user of new JsonIterator("./dist/users.json")) {
  console.log(user);
}

// XML
console.log("--- XML ---");
for (const user of new XmlIterator("./dist/users.xml")) {
  console.log(user);
}