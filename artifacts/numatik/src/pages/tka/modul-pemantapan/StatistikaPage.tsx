import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { LatihanSoal } from "@/components/tka/TKAPemantapanLayout";
import { getTkaContohSoal } from "@/data/tkaContohSoal";
import { statistikaDasarPembahasan } from "@/data/pembahasan/statistikaDasar";
import {
  latihanDasar as olimpiadeStatistikaDasar,
  dasarImages,
  renderDasarVisual,
  materiSections as olimpiadeMateriSections,
} from "@/pages/OlimpiadeStatistikaPage";

const latihanDasar: LatihanSoal[] = olimpiadeStatistikaDasar.map((item) => {
  const pembahasan = statistikaDasarPembahasan[item.no];
  const jawaban = pembahasan?.jawaban.match(/^([A-E])\./)?.[1];

  return {
    no: item.no,
    soal: item.soal,
    options: item.options,
    jawaban,
    pembahasan: pembahasan
      ? [pembahasan.konsepTrik, pembahasan.stepByStep, pembahasan.tips, pembahasan.kesimpulan]
        .filter(Boolean)
        .join("\n\n")
      : undefined,
  };
});

const gambarMap = {
  ...Object.fromEntries(
    olimpiadeStatistikaDasar
      .map((item) => [item.no, renderDasarVisual(item.no)] as const)
      .filter(([, visual]) => visual !== null),
  ),
  ...dasarImages,
};

const StatistikaPage = () => (
  <TKAPemantapanLayout
    title="STATISTIKA"
    materiSections={olimpiadeMateriSections}
    contohSoal={getTkaContohSoal("statistika")}
    latihanDasar={latihanDasar}
    gambarMap={gambarMap}
  />
);

export default StatistikaPage;
