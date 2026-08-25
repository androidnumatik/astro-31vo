import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { MateriSection, LatihanSoal } from "@/components/tka/TKAPemantapanLayout";
import { getTkaContohSoal } from "@/data/tkaContohSoal";
import { materiSection as olimpiadeMateriSection } from "@/pages/OlimpiadeTransformasiPage";

const materiImagesByHeading: Record<string, string> = {
  "A. Definisi Transformasi": "/translasi-claw-machine.png",
  "B. Translasi (Pergeseran)": "/cermin-refleksi.png",
  "C. Refleksi (Pencerminan)": "/pontiac-rotasi.png",
};

const materiSections: MateriSection[] = olimpiadeMateriSection.sections
  .filter((section) => section.heading !== "Indikator 11")
  .map((section) => {
    const image = materiImagesByHeading[section.heading];
    return {
      ...section,
      content: image ? `${section.content}\n\n[IMAGE:${image}]` : section.content,
    };
  });

const latihanDasar: LatihanSoal[] = [
  { no: 1, soal: "Titik A(5, -2) ditranslasi oleh $T\\binom{-3}{1}$. Tentukan koordinat bayangan titik A tersebut!", options: ["A. A'(2, 1)", "B. A'(1, 1)", "C. A'(2, 2)", "D. A'(2, -1)", "E. A'(-2, 1)"] },
  { no: 2, soal: "Tentukan bayangan titik A(3, -4) jika digeser oleh $T\\binom{-3}{9}$ ...", options: ["A. A'(0, 13)", "B. A'(0, 5)", "C. A'(6, 13)", "D. A'(6, 5)"] },
  { no: 3, soal: "Tentukan bayangan titik B(-2, -13) jika digeser oleh $T\\binom{3}{-6}$ ...", options: ["A. B'(5, 7)", "B. B'(5, -7)", "C. B'(1, -19)", "D. B'(1, 19)"] },
  { no: 4, soal: "Tentukanlah bayangan titik C(2, 8) jika digeser oleh $T_1\\binom{2}{8}$ dan dilanjutkan oleh $T_2\\binom{-2}{-5}$ ...", options: ["A. C''(2, 8)", "B. C''(2, 16)", "C. C''(2, 21)", "D. C''(2, 11)"] },
  { no: 5, soal: "Tentukanlah bayangan titik D(9, 0) jika digeser oleh $T_1\\binom{7}{18}$ dan dilanjutkan oleh $T_2\\binom{6}{-15}$ ...", options: ["A. D''(9, 13)", "B. D''(22, 9)", "C. D''(22, 13)", "D. D''(22, 3)"] },
  { no: 6, soal: "Jika titik A(27, -12) digeser oleh T(a, b) sehingga bayangannya adalah titik A'(20, -3), tentukan a + b ...", options: ["A. -7", "B. 9", "C. 2", "D. 16"] },
  { no: 7, soal: "Jika titik B(3, -7) digeser oleh T(a, b) sehingga bayangannya adalah titik B'(20, -3), tentukan T ...", options: ["A. T(17, 4)", "B. T(17, 10)", "C. T(3, 4)", "D. T(2, 10)"] },
  { no: 8, soal: "Jika titik A digeser oleh $T\\binom{2}{9}$ menjadi A'(0, 5) maka titik A adalah ...", options: ["A. A(2, 14)", "B. A(-2, 4)", "C. A(2, 4)", "D. A(-2, 14)"] },
  { no: 9, soal: "Jika titik B digeser oleh $T\\binom{6}{-2}$ menjadi B'(1, 7) maka titik B adalah ...", options: ["A. B(7, 5)", "B. B(7, 9)", "C. B(-5, 5)", "D. B(-5, 9)"] },
  { no: 10, soal: "Tentukan bayangan titik A(3, -4) jika dicerminkan oleh garis x = 3 ...", options: ["A. A'(3, 10)", "B. A'(4, -3)", "C. A'(3, -4)", "D. A'(3, 4)"] },
  { no: 11, soal: "Tentukan bayangan titik B(-2, -13) jika dicerminkan oleh garis y = 4 ...", options: ["A. B'(-2, 21)", "B. B'(12, -19)", "C. B'(10, 21)", "D. B'(1, 4)"] },
  { no: 12, soal: "Tentukanlah bayangan titik C(2, 8) jika dicerminkan oleh sumbu x ...", options: ["A. C''(2, 8)", "B. C''(2, -8)", "C. C''(-2, 8)", "D. C''(-2, -8)"] },
  { no: 13, soal: "Tentukanlah bayangan titik D(9, 0) jika dicerminkan oleh sumbu y ...", options: ["A. D''(9, 0)", "B. D''(-9, 0)", "C. D''(0, 9)", "D. D''(0, -9)"] },
  { no: 14, soal: "Jika titik A(27, -12) dicerminkan menjadi A'(27, 12), sumbu refleksinya adalah ...", options: ["A. Sumbu x", "B. Titik (0, 0)", "C. Sumbu y", "D. x = 2"] },
  { no: 15, soal: "Jika titik B(3, -7) dicerminkan menjadi A'(-7, 3), sumbu refleksinya adalah ...", options: ["A. Sumbu y = x", "B. Sumbu x", "C. Sumbu y = -x", "D. Sumbu y"] },
  { no: 16, soal: "Jika titik A(2, 8) dicerminkan menjadi A'(2, 12), sumbu refleksinya adalah ...", options: ["A. x = 10", "B. y = 2", "C. x = 2", "D. y = 10"] },
  { no: 17, soal: "Jika titik B(2, -2) dicerminkan menjadi A'(6, -2), sumbu refleksinya adalah ...", options: ["A. x = 4", "B. y = 4", "C. x = 5", "D. y = 5"] },
  { no: 18, soal: "Bayangan titik A oleh refleksi terhadap titik (1, -2) adalah titik A'(3, 5). Tentukan koordinat titik A!", options: ["A. A(1, 9)", "B. A(1, 1)", "C. A(-9, 1)", "D. A(-1, -9)", "E. A(9, 1)"] },
  { no: 19, soal: "Tentukan bayangan titik (5, -3) oleh rotasi $R(P,\\ 90^{\\circ})$ dengan koordinat titik P(-1, 2)!", options: ["A. (8, 4)", "B. (-8, 4)", "C. (8, -4)", "D. (-4, -8)", "E. (4, 8)"] },
  { no: 20, soal: "Titik A(-3, 1) jika dirotasi terhadap sudut $90^{\\circ}$ dan $180^{\\circ}$ menghasilkan bayangan pada titik ... dan ...", options: ["A. (1, 3) dan (-3, -1)", "B. (-1, -3) dan (3, -1)", "C. (1, -2) dan (-1, -2)", "D. (-2, 1) dan (2, -1)"] },
  { no: 21, soal: "Tentukan bayangan titik (9, 3) oleh dilatasi $[O,\\ \\frac{1}{3}]$!", options: ["A. (1, 3)", "B. (3, 1)", "C. (-1, -3)", "D. (3, -1)", "E. (1, -3)"] },
  { no: 22, soal: "Titik M'(8, -6) merupakan hasil dilatasi dari titik M(-24, 18). Maka faktor skala dilatasi tersebut jika pusatnya (0, 0) adalah ...", options: ["A. 2", "B. 3", "C. -3", "D. -2"] },
  { no: 23, soal: "Segitiga PQR memiliki koordinat P(1, 1); Q(1, 5) dan R(3, 3). Didilatasi dengan [O, c] menghasilkan bayangan P'(-2, -2); Q'(-2, -10) dan R'(-6, -6). Nilai c adalah ...", options: ["A. 2", "B. 3", "C. -3", "D. -2"] },
];

const TransformasiPage = () => (
  <TKAPemantapanLayout
    title="TRANSFORMASI GEOMETRI"
  materiSections={materiSections}
  contohSoal={getTkaContohSoal("transformasi-geometri")}
  latihanDasar={latihanDasar}
  showImageSourceLinks={false}
  />
);

export default TransformasiPage;
