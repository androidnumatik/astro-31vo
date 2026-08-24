import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { LatihanSoal } from "@/components/tka/TKAPemantapanLayout";
import { getTkaContohSoal } from "@/data/tkaContohSoal";
import {
  latihanDasar as olimpiadeStatistika,
  dasarImages,
  materiSections as olimpiadeMateriSections,
} from "@/pages/OlimpiadeStatistikaPage";

const latihanDasar: LatihanSoal[] = olimpiadeStatistika.map((item) => ({
  no: item.no,
  soal: item.soal,
  image: item.image,
  options: item.options,
  jawaban: item.jawaban,
  pembahasan: typeof item.pembahasan === "string" ? item.pembahasan : item.pembahasan ? [item.pembahasan.konsep, ...item.pembahasan.langkah, item.pembahasan.rumus].filter(Boolean).join("\n") : "",
}));

const StatistikaPage = () => (
  <TKAPemantapanLayout
    title="STATISTIKA"
    materiSections={olimpiadeMateriSections}
  contohSoal={getTkaContohSoal("statistika")}
  latihanDasar={latihanDasar}
    gambarMap={dasarImages}
  />
);

export default StatistikaPage;
