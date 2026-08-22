import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { LatihanSoal, MateriSection } from "@/components/tka/TKAPemantapanLayout";
import { getTkaContohSoal } from "@/data/tkaContohSoal";
import {
  latihanDasar as latihanDasarOlimpiade,
  materiSection as materiOlimpiade,
  soalSVGMap as soalSVGMapOlimpiade,
} from "@/pages/OlimpiadePolaBilanganPage";
import { polaBilanganDasarPembahasan } from "@/data/pembahasan/polaBilanganDasar";

const kunciJawaban = [
  "C", "C", "A", "D", "C", "B", "B", "A", "D", "C", "C", "D", "D", "A",
  "C", "D", "B", "C", "A", "A", "D", "C", "B", "C", "C", "C", "C", "B",
  "D", "D", "D", "B", "C", "D", "A", "B", "B", "A", "B", "A", "A", "A",
] as const;

const toPembahasanText = (soalNo: number) => {
  const pembahasan = polaBilanganDasarPembahasan[soalNo];
  if (!pembahasan) return undefined;
  return [
    `Konsep & Trik: ${pembahasan.konsepTrik}`,
    `Langkah Penyelesaian:\n${pembahasan.stepByStep}`,
    `Tips: ${pembahasan.tips}`,
    `Kesimpulan: ${pembahasan.kesimpulan}`,
  ].join("\n\n");
};

const materiSections: MateriSection[] = materiOlimpiade.sections.map(({ heading, content }) => ({
  heading,
  content,
}));

const soalSvgMap = Object.fromEntries(
  Object.entries(soalSVGMapOlimpiade).map(([key, value]) => [key, value]),
);

const latihanDasar: LatihanSoal[] = latihanDasarOlimpiade.map((soal, index) => ({
  ...soal,
  type: "pg",
  jawaban: kunciJawaban[index],
  pembahasan: toPembahasanText(soal.no),
  soalSvg: soalSvgMap[String(soal.no)] ? String(soal.no) : undefined,
}));

const PolaBilanganPage = () => (
  <TKAPemantapanLayout
    title="POLA BILANGAN"
    materiSections={materiSections}
    contohSoal={getTkaContohSoal("pola-bilangan")}
    latihanDasar={latihanDasar}
    soalSvgMap={soalSvgMap}
  />
);

export default PolaBilanganPage;