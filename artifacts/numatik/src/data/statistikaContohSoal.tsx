import type { ReactNode } from "react";
import type { LatihanSoal } from "@/components/tka/TKAPemantapanLayout";

const svgFrame = (children: ReactNode) => (
  <div className="my-3 flex justify-center overflow-x-auto rounded-xl border border-emerald-400/20 bg-white/5 p-3">
    <svg viewBox="0 0 720 330" className="w-full max-w-2xl min-w-[520px]" role="img" aria-label="Visualisasi data soal statistika">
      {children}
    </svg>
  </div>
);

const laporanKeuanganSvg = svgFrame(
  <>
    <rect x="70" y="25" width="600" height="245" rx="8" fill="none" stroke="#94a3b8" strokeWidth="1" />
    {[0, 1, 2, 3, 4].map((i) => (
      <line key={i} x1="70" y1={65 + i * 45} x2="670" y2={65 + i * 45} stroke="#cbd5e1" strokeOpacity="0.45" />
    ))}
    <text x="370" y="15" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">Laporan Keuangan Startup (Miliar Rupiah)</text>
    {[
      ["2020", 120, 130],
      ["2021", 150, 140],
      ["2022", 180, 200],
      ["2023", 220, 190],
      ["2024", 260, 210],
    ].map(([year, income, expense], i) => {
      const x = 115 + i * 130;
      const incomeHeight = Number(income) * 0.7;
      const expenseHeight = Number(expense) * 0.7;
      return (
        <g key={year}>
          <rect x={x} y={270 - incomeHeight} width="28" height={incomeHeight} fill="#10b981" />
          <rect x={x + 34} y={270 - expenseHeight} width="28" height={expenseHeight} fill="#f97316" />
          <text x={x + 31} y="292" textAnchor="middle" fontSize="12" fill="#0f172a">{year}</text>
          <text x={x + 14} y={265 - incomeHeight} textAnchor="middle" fontSize="10" fill="#047857">{income}</text>
          <text x={x + 48} y={265 - expenseHeight} textAnchor="middle" fontSize="10" fill="#c2410c">{expense}</text>
        </g>
      );
    })}
    <rect x="90" y="308" width="12" height="12" fill="#10b981" />
    <text x="108" y="318" fontSize="11" fill="#0f172a">Pendapatan</text>
    <rect x="190" y="308" width="12" height="12" fill="#f97316" />
    <text x="208" y="318" fontSize="11" fill="#0f172a">Pengeluaran</text>
  </>,
);

const ekstrakurikulerSvg = svgFrame(
  <>
    <text x="360" y="18" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">Data Pilihan Ekstrakurikuler 200 Siswa</text>
    <rect x="90" y="38" width="540" height="235" fill="#ffffff" stroke="#64748b" />
    <rect x="90" y="38" width="540" height="38" fill="#d1fae5" />
    <line x1="135" y1="38" x2="135" y2="273" stroke="#64748b" />
    <line x1="465" y1="38" x2="465" y2="273" stroke="#64748b" />
    {[76, 115, 154, 193, 232].map((y) => <line key={y} x1="90" y1={y} x2="630" y2={y} stroke="#94a3b8" />)}
    <text x="112" y="62" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">No</text>
    <text x="300" y="62" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">Ekstrakurikuler</text>
    <text x="547" y="62" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">Jumlah Siswa</text>
    {[
      ["1", "PMR", "40"],
      ["2", "Pramuka", "60"],
      ["3", "Paskibra", "30"],
      ["4", "Futsal", "50"],
      ["5", "Seni Musik", "20"],
    ].map(([no, name, count], i) => {
      const y = 101 + i * 39;
      return (
        <g key={no}>
          <text x="112" y={y} textAnchor="middle" fontSize="11" fill="#0f172a">{no}</text>
          <text x="150" y={y} fontSize="11" fill="#0f172a">{name}</text>
          <text x="547" y={y} textAnchor="middle" fontSize="11" fill="#0f172a">{count}</text>
        </g>
      );
    })}
  </>,
);

const minatProfesiSvg = svgFrame(
  <>
    <text x="360" y="18" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">Diagram Lingkaran Minat Profesi</text>
    <circle cx="270" cy="165" r="105" fill="#dbeafe" stroke="#334155" strokeWidth="1" />
    <path d="M270 165 L270 60 A105 105 0 0 1 335.8 83.2 Z" fill="#f97316" />
    <path d="M270 165 L335.8 83.2 A105 105 0 0 1 367.1 204.9 Z" fill="#10b981" />
    <path d="M270 165 L367.1 204.9 A105 105 0 0 1 153.9 240.9 Z" fill="#8b5cf6" />
    <path d="M270 165 L153.9 240.9 A105 105 0 0 1 270 60 Z" fill="#38bdf8" />
    <text x="270" y="125" textAnchor="middle" fontSize="11" fill="#0f172a">Seni 30°</text>
    <text x="337" y="125" textAnchor="middle" fontSize="11" fill="#0f172a">IT 60°</text>
    <text x="285" y="245" textAnchor="middle" fontSize="11" fill="#ffffff">Sains 90°</text>
    <text x="190" y="150" textAnchor="middle" fontSize="11" fill="#ffffff">Wirausaha 36°</text>
    <g fontSize="12" fill="#0f172a">
      <rect x="450" y="75" width="13" height="13" fill="#f97316" /><text x="472" y="86">Seni / Kreatif: 30°</text>
      <rect x="450" y="108" width="13" height="13" fill="#10b981" /><text x="472" y="119">Teknologi / IT: 60°</text>
      <rect x="450" y="141" width="13" height="13" fill="#8b5cf6" /><text x="472" y="152">Sains / Olahraga: 90°</text>
      <rect x="450" y="174" width="13" height="13" fill="#38bdf8" /><text x="472" y="185">Wirausaha: 36°</text>
      <text x="450" y="220">Lainnya: sisa sektor</text>
    </g>
  </>,
);

export const statistikaContohSvgMap: Record<string, ReactNode> = {
  laporanKeuangan: laporanKeuanganSvg,
  ekstrakurikuler: ekstrakurikulerSvg,
  minatProfesi: minatProfesiSvg,
};

export const statistikaContohSoal: LatihanSoal[] = [
  {
    no: 1,
    type: "pgk",
    soal: "Perhatikan data grafik laporan keuangan sebuah startup teknologi selama periode 2020–2024 (dalam Miliar Rupiah) berikut:\n• 2020: Pendapatan = 120, Pengeluaran = 130\n• 2021: Pendapatan = 150, Pengeluaran = 140\n• 2022: Pendapatan = 180, Pengeluaran = 200\n• 2023: Pendapatan = 220, Pengeluaran = 190\n• 2024: Pendapatan = 260, Pengeluaran = 210\nCatatan: Keuntungan (Laba) terjadi jika Pendapatan > Pengeluaran. Kerugian (Rugi) terjadi jika Pendapatan < Pengeluaran.\nBerdasarkan data di atas, pilihlah semua pernyataan yang benar:",
    soalSvg: "laporanKeuangan",
    pernyataan: [
      "Perusahaan selalu mengalami keuntungan (laba) setiap tahun.",
      "Kerugian terbesar terjadi pada tahun 2022.",
      "Keuntungan tertinggi diraih pada tahun 2024 sebesar 50 Miliar Rupiah.",
      "Keuntungan terendah terjadi pada tahun 2020.",
    ],
    jawabanPGK: [1, 2],
    pembahasan: "Jawaban Akhir:\n• Kerugian terbesar terjadi pada tahun 2022 (Benar).\n• Keuntungan tertinggi diraih pada tahun 2024 sebesar 50 Miliar Rupiah (Benar).\n\nKonsep dan Trik:\n• $\\text{Laba/Rugi} = \\text{Pendapatan} - \\text{Pengeluaran}$.\n• Jika nilai positif → Laba (Untung). Jika nilai negatif → Rugi.\n• Trik: Buat selisih cepat pada tiap tahun tanpa menghitung ulang rumus rumit.\n\nStep by Step Penyelesaian:\n1. Hitung selisih per tahun:\n 2020: $120 - 130 = -10$ (Rugi 10 Miliar)\n 2021: $150 - 140 = +10$ (Laba 10 Miliar)\n 2022: $180 - 200 = -20$ (Rugi 20 Miliar)\n 2023: $220 - 190 = +30$ (Laba 30 Miliar)\n 2024: $260 - 210 = +50$ (Laba 50 Miliar)\n2. Evaluasi Opsi:\n Pernyataan 1: Salah, karena tahun 2020 dan 2022 mengalami rugi.\n Pernyataan 2: Benar, rugi terbesar di 2022 yaitu 20 Miliar.\n Pernyataan 3: Benar, laba tertinggi di 2024 sebesar $260 - 210 = 50$ Miliar.\n Pernyataan 4: Salah, tahun 2020 tidak untung melainkan rugi.",
  },
  {
    no: 2,
    type: "pg",
    soal: "Berdasarkan data laporan keuangan startup pada Soal 1, berapakah total pengeluaran operasional perusahaan selama 5 tahun terakhir?",
    options: ["A. 850 Miliar Rupiah", "B. 870 Miliar Rupiah", "C. 930 Miliar Rupiah", "D. 950 Miliar Rupiah"],
    jawaban: "B",
    pembahasan: "Jawaban Akhir: B. 870 Miliar Rupiah\n\nKonsep dan Trik:\n• Penjumlahan data deret statistik: $\\text{Total} = \\sum \\text{Pengeluaran}$.\n• Trik: Kelompokkan angka yang menghasilkan puluhan genap untuk mempercepat penjumlahan manual.\n\nStep by Step Penyelesaian:\n1. Ambil data pengeluaran dari tahun 2020 hingga 2024:\n$$\\text{Total} = 130 + 140 + 200 + 190 + 210$$\n2. Kelompokkan angka agar mudah dihitung:\n$$(190 + 210) + (130 + 140) + 200$$\n$$= 400 + 270 + 200 = 870 \\text{ Miliar Rupiah}$$",
  },
  {
    no: 3,
    type: "pgkbs",
    soal: "Pengelola sebuah museum mencatat jumlah pengunjung harian selama satu minggu. Data yang terkumpul adalah sebagai berikut:\n• Senin: 300 orang\n• Selasa: 250 orang\n• Rabu: 400 orang\n• Kamis: 550 orang\n• Jumat: (Data belum terisi)\n• Sabtu: 800 orang\n• Minggu: 1.200 orang\nDiketahui jumlah pengunjung pada hari Kamis menyumbang 11% dari total keseluruhan pengunjung selama seminggu.\nBerdasarkan informasi di atas, tentukan kebenaran dari pernyataan-pernyataan berikut:",
    pernyataan: [
      "Jumlah pengunjung museum pada hari Jumat adalah 1.500 orang.",
      "Penurunan pengunjung dari hari Senin ke Selasa lebih sedikit dibanding kenaikan pengunjung dari hari Jumat ke Sabtu.",
      "Persentase pengunjung hari Jumat adalah 30% dari total mingguan.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Jawaban Akhir:\n• Pernyataan 1: Benar\n• Pernyataan 2: Benar\n• Pernyataan 3: Benar\n\nKonsep dan Trik:\n• $\\text{Total Data} = \\frac{\\text{Nilai Diketahui}}{\\text{Persentase Diketahui}}$.\n• Setelah total keseluruhan diperoleh, hitung nilai data yang hilang dengan pengurangan sederhana.\n\nStep by Step Penyelesaian:\n1. Mencari Total Pengunjung Seminggu:\n$$\\text{Total} = \\frac{550}{11\\%} = \\frac{550}{0{,}11} = 5.000 \\text{ orang}$$\n2. Mencari Pengunjung Hari Jumat:\n$$\\text{Jumlah data diketahui} = 300 + 250 + 400 + 550 + 800 + 1.200 = 3.500 \\text{ orang}$$\n$$\\text{Hari Jumat} = 5.000 - 3.500 = 1.500 \\text{ orang}$$\n3. Evaluasi Pernyataan:\n Pernyataan 1: Benar (1.500 orang).\n Pernyataan 2: Penurunan Senin–Selasa = $300 - 250 = 50$. Kenaikan Jumat–Sabtu = $800 - 1.500$ (turun) atau dari Sabtu ke Minggu $1200 - 800 = 400$. Penurunan $50 < 700$. Pernyataan Benar.\n Pernyataan 3: $\\text{Persentase Jumat} = \\frac{1.500}{5.000} \\times 100\\% = 30\\%$. Pernyataan Benar.",
  },
  {
    no: 4,
    type: "pgkbs",
    soal: "Data pilihan kegiatan ekstrakurikuler 200 siswa SMP disajikan dalam tabel berikut:",
    soalSvg: "ekstrakurikuler",
    pernyataan: [
      "Besar sudut pusat sektor PMR adalah $72^\\circ$.",
      "Persentase siswa yang memilih Futsal adalah 25%.",
      "Lebih dari setengah ($50\\%$) total siswa memilih gabungan Pramuka dan Paskibra.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Jawaban Akhir:\n• Besar sudut PMR = $72^\\circ$ (Benar)\n• Persentase Futsal = 25% (Benar)\n• Gabungan Pramuka & Paskibra > 50% (Salah)\n\nKonsep dan Trik:\n• $\\text{Sudut} = \\frac{\\text{Frekuensi}}{\\text{Total}} \\times 360^\\circ$\n• $\\text{Persentase} = \\frac{\\text{Frekuensi}}{\\text{Total}} \\times 100\\%$\n\nStep by Step Penyelesaian:\n1. Pernyataan 1:\n$$\\text{Sudut PMR} = \\frac{40}{200} \\times 360^\\circ = \\frac{1}{5} \\times 360^\\circ = 72^\\circ \\quad (\\mathbf{BENAR})$$\n2. Pernyataan 2:\n$$\\text{Persentase Futsal} = \\frac{50}{200} \\times 100\\% = \\frac{1}{4} \\times 100\\% = 25\\% \\quad (\\mathbf{BENAR})$$\n3. Pernyataan 3:\n$$\\text{Jumlah Pramuka + Paskibra} = 60 + 30 = 90 \\text{ siswa}$$\n$$\\text{Persentase} = \\frac{90}{200} \\times 100\\% = 45\\% \\quad (\\text{Kurang dari } 50\\%, \\mathbf{SALAH})$$",
  },
  {
    no: 5,
    type: "pg",
    soal: "Seorang peneliti ingin menguji tingkat efektivitas instalasi pengolahan air limbah (IPAL) sebuah pabrik tekstil yang dibuang ke aliran sungai. Teknik pengambilan sampel air yang paling representatif untuk tujuan penelitian tersebut adalah ....",
    options: [
      "A. Mengambil sampel air dari seluruh area sungai dari hulu hingga hilir",
      "B. Mengambil sampel air dari sungai lain yang dekat dengan kawasan industri",
      "C. Mengambil sampel air di titik keluaran (outfall) IPAL pabrik dan daerah hilir setelah titik pembuangan",
      "D. Mengambil sampel air di hulu sungai sebelum lokasi pabrik didirikan",
    ],
    jawaban: "C",
    pembahasan: "Jawaban Akhir: C. Mengambil sampel air di titik keluaran (outfall) IPAL pabrik dan daerah hilir setelah titik pembuangan\n\nKonsep dan Trik:\n• Konsep Sampel Representatif: Sampel harus diambil langsung dari objek yang terpengaruh oleh variabel yang diteliti (dalam hal ini, dampak limbah pabrik).\n• Trik: Abaikan pilihan yang terlalu luas/tidak efisien (seperti meneliti seluruh sungai) atau lokasi kontrol yang tidak terkena paparan langsung.\n\nStep by Step Penyelesaian:\n1. Tujuan penelitian: Menguji dampak/efektivitas limbah pabrik.\n2. Titik sampel yang valid harus mencakup lokasi terdampak langsung (outfall limbah dan bagian hilir tempat air bercampur).\n3. Pilihan A tidak efisien. Pilihan B tidak relevan. Pilihan D hanya berfungsi sebagai kontrol awal, bukan pengujian tingkat pencemaran pabrik tersebut. Maka jawaban tepat adalah C.",
  },
  {
    no: 6,
    type: "pg",
    soal: "Nadia sedang merancang angket penelitian untuk mengukur tingkat kepuasan pelanggan terhadap layanan sebuah minimarket. Nadia ingin mengumpulkan data kuantitatif menggunakan pertanyaan tertutup. Pernyataan/pertanyaan berikut yang tidak tepat untuk digunakan adalah ....",
    options: [
      "A. Apakah ruang belanja minimarket ini bersih dan nyaman?",
      "B. Bagaimana tanggapan dan masukan Anda mengenai kualitas pelayanan pegawai minimarket ini?",
      "C. Apakah petugas kasir melayani Anda secara cepat dan ramah?",
      "D. Berapa kali Anda berbelanja di minimarket ini dalam sebulan terakhir?",
    ],
    jawaban: "B",
    pembahasan: "Jawaban Akhir: B. Bagaimana tanggapan dan masukan Anda mengenai kualitas pelayanan pegawai minimarket ini?\n\nKonsep dan Trik:\n• Pertanyaan Tertutup: Pertanyaan yang menyediakan pilihan jawaban terbatas (Ya/Tidak, Skala Likert, Pilihan Ganda).\n• Pertanyaan Terbuka: Pertanyaan yang meminta uraian bebas/pendapat pribadi responden tanpa batas pilihan.\n• Trik: Cari kalimat yang menggunakan kata tanya \"Bagaimana\" atau \"Mengapa\" yang membutuhkan deskripsi panjang.\n\nStep by Step Penyelesaian:\n1. Pilihan A: Jawaban berupa (Ya / Tidak) → Pertanyaan Tertutup.\n2. Pilihan B: Meminta \"tanggapan dan masukan\" secara bebas → Pertanyaan Terbuka.\n3. Pilihan C: Jawaban berupa (Ya / Tidak / Sangat Setuju) → Pertanyaan Tertutup.\n4. Pilihan D: Jawaban berupa angka pasti/pilihan rentang → Pertanyaan Tertutup.\n5. Oleh karena itu, pertanyaan yang tidak tepat sebagai pertanyaan tertutup adalah opsi B.",
  },
  {
    no: 7,
    type: "pg",
    soal: "Sebuah wahana edukasi anak mendata latar belakang minat profesi dari anak-anak yang berkunjung. Data disajikan dalam diagram lingkaran berikut:\n• Seni / Kreatif: $30^\\circ$\n• Teknologi / IT: $60^\\circ$\n• Sains / Olahraga: $90^\\circ$\n• Wirausaha: $36^\\circ$\n• Lainnya: (Sisa sektor)\nJika total anak yang didata sebanyak 500 orang, berapakah jumlah anak yang berminat pada bidang Lainnya?",
    soalSvg: "minatProfesi",
    options: ["A. 120 orang", "B. 150 orang", "C. 180 orang", "D. 200 orang"],
    jawaban: "D",
    pembahasan: "Jawaban Akhir: D. 200 orang\n\nKonsep dan Trik:\n• Total sudut 1 lingkaran = $360^\\circ$.\n• $\\text{Jumlah Sektor} = \\left(\\frac{\\text{Sudut Sektor}}{360^\\circ}\\right) \\times \\text{Total Data}$.\n• Trik: Sederhanakan pecahan $\\frac{144}{360}$ menjadi $\\frac{2}{5}$ sebelum dikalikan total populasi.\n\nStep by Step Penyelesaian:\n1. Hitung sudut sektor Lainnya:\n$$\\text{Sudut} = 360^\\circ - (30^\\circ + 60^\\circ + 90^\\circ + 36^\\circ) = 360^\\circ - 216^\\circ = 144^\\circ$$\n2. Hitung jumlah anak pada sektor tersebut:\n$$\\text{Banyak Anak} = \\frac{144^\\circ}{360^\\circ} \\times 500$$\n3. Sederhanakan $\\frac{144}{360}$ dengan membagi 72:\n$$\\frac{144 \\div 72}{360 \\div 72} = \\frac{2}{5}$$\n4. Kalikan dengan total anak:\n$$\\text{Banyak Anak} = \\frac{2}{5} \\times 500 = 200 \\text{ orang}$$",
  },
];