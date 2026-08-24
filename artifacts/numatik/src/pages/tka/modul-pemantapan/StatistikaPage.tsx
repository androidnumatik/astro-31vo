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

type ComplexFormat = Partial<Pick<LatihanSoal, "type" | "pernyataan" | "jawabanPGK" | "jawabanBS">>;

// Lima soal per tipe: PG (1, 5, 7, 10, 13), PGK (2, 4, 8, 11, 14),
// dan PG benar-salah (3, 6, 9, 12, 15). Teks soal dan gambar sumber tetap dipakai.
const complexFormats: Record<number, ComplexFormat> = {
  2: {
    type: "pgk",
    pernyataan: [
      "Median data tersebut adalah 6,5.",
      "Mean data tersebut sekitar 6,1.",
      "Modus data tersebut adalah 7.",
      "Jangkauan data tersebut adalah 9.",
    ],
    jawabanPGK: [0, 1, 2],
  },
  3: {
    type: "pgkbs",
    pernyataan: [
      "Jumlah seluruh siswa pada tabel adalah 32 orang.",
      "Median data tersebut adalah 7,5.",
      "Rata-rata data tersebut adalah 7,5.",
    ],
    jawabanBS: ["B", "B", "S"],
  },
  4: {
    type: "pgk",
    pernyataan: [
      "Modus data tersebut adalah 5.",
      "Median data tersebut adalah 6,5.",
      "Rata-rata data tersebut adalah 6,5.",
      "Jangkauan data tersebut adalah 6.",
    ],
    jawabanPGK: [0, 1, 2],
  },
  6: {
    type: "pgkbs",
    pernyataan: [
      "Perbandingan banyak siswa putra dan putri adalah 2 : 1.",
      "Banyak siswa putra dua kali banyak siswa putri.",
      "Jika jumlah siswa 30 orang, banyak siswa putri adalah 15 orang.",
    ],
    jawabanBS: ["B", "B", "S"],
  },
  8: {
    type: "pgk",
    pernyataan: [
      "Banyak siswa laki-laki adalah 12 orang.",
      "Banyak siswa perempuan adalah 8 orang.",
      "Selisih banyak siswa laki-laki dan perempuan adalah 4 orang.",
      "Banyak siswa laki-laki lebih sedikit daripada siswa perempuan.",
    ],
    jawabanPGK: [0, 1, 2],
  },
  9: {
    type: "pgkbs",
    pernyataan: [
      "Besar sudut sektor Penjas adalah 156°.",
      "Bagian siswa yang gemar Penjas adalah 13/30 dari seluruh siswa.",
      "Jumlah siswa yang gemar Penjas adalah 104 orang.",
    ],
    jawabanBS: ["B", "B", "B"],
  },
  11: {
    type: "pgk",
    pernyataan: [
      "Penyusutan harga antara tahun 2015 dan 2016 adalah Rp7.500.000,00.",
      "Harga mobil berkurang dari Rp110.000.000,00 menjadi Rp102.500.000,00.",
      "Persentase penyusutan terhadap harga tahun 2015 adalah 7,5%.",
      "Selisih harga tahun 2015 dan 2016 adalah Rp7.500.000,00.",
    ],
    jawabanPGK: [0, 1, 3],
  },
  12: {
    type: "pgkbs",
    pernyataan: [
      "Rata-rata data pada tabel adalah 5,7.",
      "Banyak siswa yang memperoleh nilai lebih dari rata-rata adalah 11 orang.",
      "Banyak siswa yang memperoleh nilai lebih dari rata-rata adalah 9 orang.",
    ],
    jawabanBS: ["B", "B", "S"],
  },
  14: {
    type: "pgk",
    pernyataan: [
      "Jika ada seorang murid setinggi 132 cm, pasti ada seorang murid setinggi 128 cm.",
      "Jika 23 murid tingginya 130 cm dan satu murid 133 cm, tinggi murid terakhir adalah 127 cm.",
      "Murid yang berada di tengah setelah semua tinggi diurutkan pasti memiliki tinggi 130 cm.",
      "Pasti setengah murid berada di bawah 130 cm dan setengah lainnya di atas 130 cm.",
    ],
    jawabanPGK: [1],
  },
  15: {
    type: "pgkbs",
    pernyataan: [
      "Kuartil atas (Q₃) data tersebut adalah 8.",
      "Kuartil atas (Q₃) data tersebut adalah 7,5.",
      "Q₃ diperoleh dari rata-rata data ke-9 dan ke-10 setelah data diurutkan.",
    ],
    jawabanBS: ["B", "S", "B"],
  },
};

const latihanDasar: LatihanSoal[] = olimpiadeStatistikaDasar.map((item) => {
  const pembahasan = statistikaDasarPembahasan[item.no];
  const jawaban = pembahasan?.jawaban.match(/^([A-E])\./)?.[1];

  return {
    no: item.no,
    soal: item.soal,
    options: item.options,
    jawaban,
    ...complexFormats[item.no],
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
