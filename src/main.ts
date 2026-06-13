import { CsvExporter } from "./exporters/CsvExporter";
import { JsonExporter } from "./exporters/JsonExporter";
import { XmlExporter } from "./exporters/XmlExporter";

// Створюємо всі експортери.
const exporters = [
  new CsvExporter(),
  new JsonExporter(),
  new XmlExporter(),
];

// Запускаємо всі експорти паралельно.
(async () => {
  try {
    await Promise.all(exporters.map(exporter => exporter.export()));
    console.log("All exports completed successfully.");
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Export failed: ${error.message}`);
    } else {
      console.error("Export failed: Unknown error");
    }
  }
})();