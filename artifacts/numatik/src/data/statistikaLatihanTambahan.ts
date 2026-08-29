import type { LatihanSoal } from "@/components/tka/TKAPemantapanLayout";

/**
 * Soal tambahan dari Modul Pemantapan 2027–2028.
 * Nomor dimulai setelah 38 soal yang sudah tersedia pada halaman Statistika.
 */
export const statistikaLatihanTambahan: LatihanSoal[] = [
  {
    no: 40,
    soal:
      "Hasil survei terhadap pelanggan restoran mengenai menu makanan favorit menghasilkan persentase sebagai berikut:\n" +
      "Jenis Makanan | Persentase Jawaban\nRendang | 40%\nSoto | 25%\nBakso | 15%\nMie Ayam | 12%\nGado-Gado | 8%\n" +
      "Jika sebanyak 60 orang memilih Rendang sebagai makanan favoritnya, jumlah total orang yang mengikuti survei tersebut adalah ....",
    options: ["A. 120 orang", "B. 150 orang", "C. 180 orang", "D. 200 orang"],
    jawaban: "B",
    pembahasan:
      "Jawaban Akhir: B. 150 orang\n\n" +
      "Konsep dan Trik: $\\text{Total Responden} = \\frac{\\text{Jumlah Bagian Diketahui}}{\\text{Persentase Bagian Diketahui}} \\times 100\\%$.\n" +
      "Trik: Bagi jumlah orang dengan nilai persentasenya dalam bentuk desimal ($60 \\div 0{,}4$).\n\n" +
      "Step by Step Penyelesaian:\n" +
      "1. Persentase Rendang = $40\\% = 0{,}4$.\n" +
      "2. $\\text{Total Responden} = \\frac{60}{40\\%} = \\frac{60}{40} \\times 100 = 150\\text{ orang}$.",
  },
  {
    no: 41,
    type: "pgk",
    soal:
      "Diagram batang berikut menunjukkan distribusi nilai kuis IPA siswa kelas VIII:\n" +
      "Berdasarkan diagram batang diatas, pilihlah semua pernyataan yang benar. pernyataan yang benar (Jawaban benar lebih dari satu):",
    pernyataan: [
      "Jumlah seluruh siswa di kelas tersebut adalah 22 orang.",
      "Nilai 8 merupakan modus (nilai yang paling banyak diperoleh).",
      "Selisih banyaknya siswa yang mendapat nilai tertinggi (10) dan terendah (5) adalah 2 orang.",
      "Jumlah siswa yang memperoleh nilai 6 dan 9 adalah 8 orang.",
    ],
    jawabanPGK: [0, 1, 3],
    pembahasan:
      "Jawaban Akhir:\n" +
      "Jumlah seluruh siswa di kelas tersebut adalah 22 orang (Benar).\n" +
      "Nilai 8 merupakan modus (Benar).\n" +
      "Jumlah siswa yang memperoleh nilai 6 dan 9 adalah 8 orang (Benar).\n\n" +
      "Konsep dan Trik: Modus = nilai dengan batang tertinggi (frekuensi terbesar). $\\text{Total Siswa} = \\sum \\text{Frekuensi}$.\n\n" +
      "Step by Step Penyelesaian:\n" +
      "1. Total siswa: $1 + 4 + 5 + 6 + 4 + 2 = 22\\text{ orang}$ → Benar.\n" +
      "2. Batang tertinggi ada pada nilai 8 (frekuensi = 6) → Benar.\n" +
      "3. Selisih siswa nilai 10 (2 orang) dan nilai 5 (1 orang) $= 2 - 1 = 1\\text{ orang}$ → Salah.\n" +
      "4. Siswa bernilai 6 (4 orang) + siswa bernilai 9 (4 orang) $= 8\\text{ orang}$ → Benar.",
  },
  {
    no: 42,
    type: "pgkbs",
    soal:
      "Suhu udara di suatu wilayah pegunungan dicatat dari sore hingga pagi hari dan disajikan dalam grafik garis berikut:\n" +
      "Pukul 19.00: $29^\\circ\\text{C}$; Pukul 21.00: $27^\\circ\\text{C}$; Pukul 23.00: $26^\\circ\\text{C}$; " +
      "Pukul 01.00: $24^\\circ\\text{C}$; Pukul 03.00: $25^\\circ\\text{C}$; Pukul 05.00: $28^\\circ\\text{C}$.\n\n" +
      "Berdasarkan grafik di atas, tentukan status Benar/Salah untuk setiap pernyataan.",
    pernyataan: [
      "Suhu udara paling dingin terjadi pada pukul 01.00.",
      "Kenaikan suhu terbesar terjadi pada rentang pukul 03.00 sampai 05.00.",
      "Penurunan suhu dari pukul 19.00 hingga 21.00 adalah $2^\\circ\\text{C}$.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan:
      "Jawaban Akhir: 1. Benar; 2. Benar; 3. Benar.\n\n" +
      "Step by Step Penyelesaian:\n" +
      "1. Suhu terendah pada titik grafik terendah yaitu $24^\\circ\\text{C}$ pada pukul 01.00 → Benar.\n" +
      "2. Perubahan suhu naik: 01.00–03.00 (naik $1^\\circ\\text{C}$), 03.00–05.00 (naik $3^\\circ\\text{C}$). Kenaikan terbesar adalah $3^\\circ\\text{C}$ pada 03.00–05.00 → Benar.\n" +
      "3. Beda suhu pukul 19.00–21.00: $29^\\circ\\text{C} - 27^\\circ\\text{C} = 2^\\circ\\text{C}$ → Benar.",
  },
  {
    no: 43,
    soal: "Berdasarkan trend grafik suhu tersebut, perkiraan suhu udara pada pukul 22.00 adalah ....",
    options: ["A. $28^\\circ\\text{C}$", "B. $27{,}5^\\circ\\text{C}$", "C. $27^\\circ\\text{C}$", "D. $26{,}5^\\circ\\text{C}$"],
    jawaban: "D",
    pembahasan:
      "Jawaban Akhir: D. $26{,}5^\\circ\\text{C}$\n\n" +
      "Konsep dan Trik: Interpolasi linear di antara dua titik waktu yang mengapit jam tersebut: $\\text{Nilai Tengah} = \\frac{\\text{Suhu Awal} + \\text{Suhu Akhir}}{2}$.\n\n" +
      "Step by Step Penyelesaian:\n" +
      "1. Pukul 22.00 berada tepat di tengah pukul 21.00 ($27^\\circ\\text{C}$) dan pukul 23.00 ($26^\\circ\\text{C}$).\n" +
      "2. Perkiraan suhu: $\\frac{27 + 26}{2} = 26{,}5^\\circ\\text{C}$.",
  },
  {
    no: 44,
    type: "pgkbs",
    soal:
      "Sebanyak 200 warga di RW 05 mengikuti pendataan demografi usia yang disajikan dalam diagram lingkaran persentase berikut:\n" +
      "Balita (0–5 thn): 10%; Anak-anak (6–12 thn): 20%; Remaja (13–17 thn): 25%; Dewasa (18–59 thn): 35%; Lansia (≥ 60 thn): 10%.\n\n" +
      "Tentukan nilai Benar / Salah untuk pernyataan berikut.",
    pernyataan: [
      "Banyak penduduk kategori anak-anak adalah 40 orang.",
      "Jumlah gabungan warga kategori remaja dan lansia adalah 70 orang.",
      "Selisih banyaknya warga dewasa dan balita adalah 50 orang.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan:
      "Jawaban Akhir: 1. Benar; 2. Benar; 3. Benar.\n\n" +
      "Step by Step Penyelesaian:\n" +
      "1. Anak-anak = $20\\% \\times 200 = 40\\text{ orang}$ → Benar.\n" +
      "2. Remaja + Lansia = $(25\\% + 10\\%) \\times 200 = 35\\% \\times 200 = 70\\text{ orang}$ → Benar.\n" +
      "3. Selisih Dewasa − Balita = $(35\\% - 10\\%) \\times 200 = 25\\% \\times 200 = 50\\text{ orang}$ → Benar.",
  },
  {
    no: 45,
    type: "pgk",
    soal:
      "Data pengunjung pameran buku selama 6 hari disajikan dalam grafik garis berikut:\n" +
      "Hari 1: 50 orang; Hari 2: 150 orang; Hari 3: 250 orang; Hari 4: 200 orang; Hari 5: 230 orang; Hari 6: 270 orang.\n" +
      "Pilihlah semua jawaban yang benar.",
    pernyataan: [
      "Kenaikan pengunjung tertinggi terjadi pada hari ke-2 ke hari ke-3.",
      "Penurunan pengunjung hanya terjadi pada hari ke-4.",
      "Pengunjung paling sedikit terjadi pada hari pertama.",
      "Total seluruh pengunjung pameran selama 6 hari adalah 1.150 orang.",
    ],
    jawabanPGK: [1, 2, 3],
    pembahasan:
      "Jawaban Akhir: Penurunan pengunjung hanya terjadi pada hari ke-4 (Benar); pengunjung paling sedikit terjadi pada hari pertama (Benar); total seluruh pengunjung selama 6 hari adalah 1.150 orang (Benar).\n\n" +
      "Step by Step Penyelesaian:\n" +
      "1. Hitung lonjakan harian: H1–H2 naik 100; H2–H3 naik 100; H3–H4 turun 50; H4–H5 naik 30; H5–H6 naik 40.\n" +
      "2. Kenaikan tertinggi di H1–H2 dan H2–H3 bernilai sama (100 orang), sehingga pernyataan pertama tidak tepat.\n" +
      "3. Penurunan grafik hanya tampak dari H3 ke H4 → Benar.\n" +
      "4. Nilai terendah di H1 (50 orang) → Benar.\n" +
      "5. Total = $50 + 150 + 250 + 200 + 230 + 270 = 1.150\\text{ orang}$ → Benar.",
  },
  {
    no: 46,
    soal:
      "Perhatikan grafik nilai tukar mata uang Dolar AS (USD) terhadap Rupiah (IDR) dalam satu minggu berikut:\n" +
      "Senin: Rp16.000; Selasa: Rp16.400; Rabu: Rp16.100; Kamis: Rp16.300; Jumat: Rp16.200; Sabtu: Rp16.600; Minggu: Rp16.500.\n" +
      "Jika Danang ingin menukarkan uang Rupiah sebanyak Rp825.000,00 ke Dolar AS pada hari Minggu, berapa banyak uang Dolar AS yang akan diperolehnya?",
    options: ["A. 40 dolar", "B. 45 dolar", "C. 50 dolar", "D. 52 dolar"],
    jawaban: "C",
    pembahasan:
      "Jawaban Akhir: C. 50 dolar\n\n" +
      "Konsep dan Trik: $\\text{Dolar diperoleh} = \\frac{\\text{Jumlah Rupiah}}{\\text{Kurs Dolar Hari Terkait}}$.\n\n" +
      "Step by Step Penyelesaian:\n" +
      "1. Nilai kurs pada hari Minggu: Rp16.500,00 / 1 USD.\n" +
      "2. $\\text{USD} = \\frac{825.000}{16.500}$.\n" +
      "3. $\\text{USD} = \\frac{8.250}{165} = 50\\text{ dolar}$.",
  },
  {
    no: 47,
    type: "pgk",
    soal:
      "Dalam suatu pemeriksaan kesehatan, dicatat massa tubuh dari 11 siswa sebagai berikut: 42, 45, 50, 55, 50, 55, 60, 55, 40, 65, 55.\n" +
      "Berdasarkan data di atas, pilihlah semua pernyataan yang benar.",
    pernyataan: [
      "Jangkauan data tersebut adalah 25 kg.",
      "Nilai modus dari data tersebut adalah 55 kg.",
      "Rata-rata massa tubuh siswa adalah 52 kg.",
      "Nilai median dari data tersebut adalah 50 kg.",
    ],
    jawabanPGK: [0, 1, 2],
    pembahasan:
      "Jawaban Akhir: Jangkauan data 25 kg (Benar); modus 55 kg (Benar); rata-rata 52 kg (Benar).\n\n" +
      "Konsep & Trik: Urutkan data terlebih dahulu untuk menentukan median dan modus dengan cepat.\n\n" +
      "Step by Step:\n" +
      "Data terurut: 40, 42, 45, 50, 50, 55, 55, 55, 55, 60, 65 (banyak data, $n = 11$).\n" +
      "Jangkauan: $\\text{Maks} - \\text{Min} = 65 - 40 = 25\\text{ kg}$.\n" +
      "Modus: nilai paling sering muncul adalah 55 (muncul 4 kali).\n" +
      "Median: data ke-$\\frac{11+1}{2} = 6$, yaitu 55.\n" +
      "Rata-rata: $\\frac{572}{11} = 52\\text{ kg}$.",
  },
  {
    no: 48,
    soal: "Data nilai kuis Matematika dari sekelompok siswa disajikan dalam tabel frekuensi berikut:\nNilai: 5, 6, 7, 8, 9, 10\nFrekuensi: 4, 8, 15, 10, 8, 5\nRata-rata nilai kuis keseluruhan siswa tersebut adalah ....",
    options: ["A. 6,8", "B. 7,2", "C. 7,3", "D. 7,5"],
    jawaban: "C",
    pembahasan:
      "Jawaban Akhir: C. 7,3\n\nKonsep & Trik: $\\bar{x} = \\frac{\\sum (f_i \\cdot x_i)}{\\sum f_i}$.\n\n" +
      "Step by Step:\n" +
      "Total frekuensi = $4 + 8 + 15 + 10 + 8 + 5 = 50$.\n" +
      "Jumlah seluruh nilai = $(5\\times4) + (6\\times8) + (7\\times15) + (8\\times10) + (9\\times8) + (10\\times5) = 365$.\n" +
      "Rata-rata: $\\bar{x} = \\frac{365}{50} = 7{,}3$.",
  },
  {
    no: 49,
    soal:
      "Sebanyak 95 peserta mengikuti seleksi olimpiade sains. Dari jumlah tersebut, 90 peserta berusia 16 tahun, sedangkan 5 peserta lainnya masing-masing berusia 14 tahun, 15 tahun, 17 tahun, 18 tahun, dan 16 tahun. Rata-rata usia seluruh peserta seleksi tersebut adalah ....",
    options: ["A. 15,8 tahun", "B. 16,0 tahun", "C. 16,2 tahun", "D. 16,5 tahun"],
    jawaban: "B",
    pembahasan:
      "Jawaban Akhir: B. 16,0 tahun\n\nKonsep & Trik: Jumlahkan total umur seluruh individu, lalu bagi dengan total populasi.\n\n" +
      "Step by Step:\n" +
      "Total usia 90 peserta: $90 \\times 16 = 1.440$ tahun.\n" +
      "Total usia 5 peserta lain: $14 + 15 + 17 + 18 + 16 = 80$ tahun.\n" +
      "Total usia seluruh 95 peserta: $1.440 + 80 = 1.520$ tahun.\n" +
      "Rata-rata usia: $\\bar{x} = \\frac{1.520}{95} = 16{,}0$ tahun.",
  },
  {
    no: 50,
    soal:
      "Hasil pengukuran tinggi tanaman disajikan pada tabel frekuensi berikut:\nTinggi: 10, 11, 12, 13, 14, 15\nFrekuensi: 3, 6, 10, 11, 8, 2\nJumlah kuartil atas dan kuartil bawah dari data tersebut adalah ....",
    options: ["A. 23", "B. 25", "C. 26", "D. 27"],
    jawaban: "B",
    pembahasan:
      "Jawaban Akhir: B. 25\n\nKonsep & Trik: Tentukan letak posisi data $Q_1$ pada data ke-$\\frac{N+1}{4}$ dan $Q_3$ pada data ke-$\\frac{3(N+1)}{4}$.\n\n" +
      "Step by Step:\n" +
      "Total data $N = 3 + 6 + 10 + 11 + 8 + 2 = 40$.\n" +
      "Posisi $Q_1 = \\frac{1}{4}(40 + 1) = 10{,}25$ → bernilai 12.\n" +
      "Posisi $Q_3 = \\frac{3}{4}(40 + 1) = 30{,}75$ → bernilai 13.\n" +
      "Jumlah $Q_1 + Q_3 = 12 + 13 = 25$.",
  },
  {
    no: 51,
    type: "pgkbs",
    soal:
      "Perhatikan diagram batang berikut.\n" +
      "Berdasarkan diagram tersebut, tentukan kebenaran dari pernyataan berikut.",
    pernyataan: [
      "Modus data sama dengan mediannya.",
      "Jangkauan data tersebut adalah 50.",
      "Rata-rata nilai ujian siswa adalah 75.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan:
      "Jawaban Akhir: Pernyataan 1 Benar; Pernyataan 2 Benar; Pernyataan 3 Benar.\n\n" +
      "Step by Step:\n" +
      "Total siswa = $2 + 3 + 8 + 5 + 6 + 1 = 25$ orang.\n" +
      "Modus: frekuensi terbanyak adalah 8 (nilai 70). Median: data ke-13 adalah nilai 70. Maka modus = median = 70.\n" +
      "Jangkauan: $100 - 50 = 50$.\n" +
      "Rata-rata: $\\frac{(50\\times2)+(60\\times3)+(70\\times8)+(80\\times5)+(90\\times6)+(100\\times1)}{25} = \\frac{1.875}{25} = 75$.",
  },
  {
    no: 52,
    soal:
      "Data nilai ulangan Sejarah dari 15 siswa adalah sebagai berikut: 60, 50, 85, 70, 60, 90, 80, 80, 75, 65, 95, 85, 75, 80, 90.\nMedian dari data nilai tersebut adalah ....",
    options: ["A. 75", "B. 78", "C. 80", "D. 85"],
    jawaban: "C",
    pembahasan:
      "Jawaban Akhir: C. 80\n\nKonsep & Trik: Median data ganjil adalah data yang terletak di tepat posisi tengah setelah data diurutkan.\n\n" +
      "Step by Step:\n" +
      "Urutkan 15 data: 50, 60, 60, 65, 70, 75, 75, [80], 80, 80, 85, 85, 90, 90, 95.\n" +
      "Letak median = data ke-$\\frac{15+1}{2}$ = data ke-8. Nilai data ke-8 adalah 80.",
  },
  {
    no: 53,
    soal:
      "Rata-rata usia dari 12 orang pekerja adalah 28 tahun. Ketika ada 1 pekerja baru bergabung, rata-rata usia kelompok tersebut berubah menjadi 29 tahun. Usia pekerja yang baru bergabung tersebut adalah ....",
    options: ["A. 41 tahun", "B. 39 tahun", "C. 37 tahun", "D. 35 tahun"],
    jawaban: "A",
    pembahasan:
      "Jawaban Akhir: A. 41 tahun\n\nKonsep & Trik: $\\text{Nilai Baru} = (N_{akhir} \\times \\bar{x}_{akhir}) - (N_{awal} \\times \\bar{x}_{awal})$.\n\n" +
      "Step by Step:\nTotal usia 12 pekerja awal: $12 \\times 28 = 336$ tahun.\n" +
      "Total usia 13 pekerja setelah bertambah: $13 \\times 29 = 377$ tahun.\nUsia pekerja baru: $377 - 336 = 41$ tahun.",
  },
  {
    no: 54,
    soal:
      "Dua kelompok tani, Kelompok A dan Kelompok B, mencatat hasil panen jagung. Rata-rata hasil panen Kelompok A adalah 6 ton, sedangkan Kelompok B adalah 9 ton. Jika 1 orang dari masing-masing kelompok saling bertukar tempat, rata-rata hasil panen kedua kelompok menjadi sama. Selisih hasil panen kedua orang yang bertukar tempat tersebut adalah ....",
    options: ["A. 3,6 ton", "B. 4,2 ton", "C. 5,0 ton", "D. 6,0 ton"],
    jawaban: "A",
    pembahasan:
      "Jawaban Akhir: A. 3,6 ton\n\nKonsep & Trik: Gunakan persamaan kesamaan rata-rata baru setelah terjadi pertukaran nilai $x$ dan $y$.\n\n" +
      "Step by Step:\nTotal awal: $S_A = 10 \\times 6 = 60$ ton; $S_B = 15 \\times 9 = 135$ ton.\n" +
      "Rata-rata baru sama: $\\frac{60 - x + y}{10} = \\frac{135 - y + x}{15}$.\n" +
      "Sederhanakan: $3(60 - x + y) = 2(135 - y + x)$ sehingga $5(y-x)=18$.\nSelisih $y-x = 3{,}6$ ton.",
  },
  {
    no: 55,
    soal: "Rata-rata dari 20 data adalah 12,4. Jika data terbesar ditambah 10 dan data terkecil ditambah 15, berapakah nilai rata-rata data yang baru?",
    options: ["A. 13,15", "B. 13,40", "C. 13,65", "D. 14,20"],
    jawaban: "C",
    pembahasan:
      "Jawaban Akhir: C. 13,65\n\nKonsep & Trik: $\\bar{x}_{baru} = \\bar{x}_{lama} + \\frac{\\Delta\\text{Jumlah}}{N}$.\n\n" +
      "Step by Step:\nJumlah total perubahan data: $+10 + 15 = +25$.\nKenaikan rata-rata: $\\frac{25}{20} = 1{,}25$.\nRata-rata baru: $12{,}4 + 1{,}25 = 13{,}65$.",
  },
  {
    no: 56,
    type: "pgkbs",
    soal:
      "Tabel nilai ujian seleksi pegawai:\nSkor: 600, 700, 750, 800, 900, 1000\nFrekuensi: 3, 6, 7, 8, 4, 2\nTentukan status Benar / Salah untuk setiap pernyataan.",
    pernyataan: [
      "Kuartil atas nilai tes pegawai adalah 800.",
      "Simpangan kuartil nilai tes pegawai adalah 50.",
      "Median dari nilai tes pegawai adalah 750.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan:
      "Jawaban Akhir: Kuartil atas 800 (Benar); simpangan kuartil 50 (Benar); median 750 (Benar).\n\n" +
      "Step by Step:\nTotal frekuensi $N = 3 + 6 + 7 + 8 + 4 + 2 = 30$.\n" +
      "Median ($Q_2$): rata-rata data ke-15 dan ke-16, keduanya bernilai 750.\n" +
      "Kuartil bawah ($Q_1$) = data ke-8 = 700. Kuartil atas ($Q_3$) = data ke-23 = 800.\n" +
      "Simpangan kuartil: $\\frac{Q_3 - Q_1}{2} = \\frac{800 - 700}{2} = 50$.",
  },
  {
    no: 57,
    soal:
      "Rata-rata nilai ujian siswa laki-laki di suatu kelas adalah 7,5 dan rata-rata nilai siswa perempuan adalah 8,0. Jika rata-rata gabungan seluruh siswa di kelas tersebut adalah 7,8, berapakah perbandingan banyaknya siswa laki-laki dan perempuan?",
    options: ["A. $2 : 3$", "B. $3 : 2$", "C. $1 : 4$", "D. $4 : 1$"],
    jawaban: "A",
    pembahasan:
      "Jawaban Akhir: A. 2 : 3\n\nKonsep & Trik: Gunakan metode selisih silang rata-rata terhadap rata-rata gabungan.\n\n" +
      "Step by Step:\nRumus: $n_L(\\bar{x}_L - \\bar{x}_G) = n_P(\\bar{x}_G - \\bar{x}_P)$.\n" +
      "$n_L(7{,}8 - 7{,}5) = n_P(8{,}0 - 7{,}8)$.\n$0{,}3 \\cdot n_L = 0{,}2 \\cdot n_P$.\n" +
      "Perbandingan: $\\frac{n_L}{n_P} = \\frac{0{,}2}{0{,}3} = \\frac{2}{3} \\implies 2 : 3$.",
  },
  {
    no: 58,
    soal:
      "Data hasil seleksi penerimaan karyawan:\nNilai: 50, 60, 70, 80, 90, 100\nFrekuensi: 10, 16, 50, $x$, 4, 5.\n" +
      "Panitia menetapkan bahwa peserta yang dinyatakan lulus adalah mereka yang memiliki nilai lebih besar dari rata-rata. Jika rata-rata nilai tes adalah 70,2, jumlah peserta yang diterima adalah ....",
    options: ["A. 15 orang", "B. 18 orang", "C. 24 orang", "D. 30 orang"],
    jawaban: "C",
    pembahasan:
      "Jawaban Akhir: C. 24 orang\n\nKonsep & Trik: Cari nilai variabel $x$ terlebih dahulu dari rumus rata-rata keseluruhan.\n\n" +
      "Step by Step:\n$\\frac{5.820 + 80x}{85 + x} = 70{,}2 \\implies 5.820 + 80x = 5.967 + 70{,}2x$.\n" +
      "$9{,}8x = 147 \\implies x = 15$.\nPeserta lulus = nilai $> 70{,}2$ → $x + 4 + 5 = 15 + 4 + 5 = 24$ orang.",
  },
  {
    no: 59,
    type: "pgk",
    soal:
      "Suatu sekolah mendata moda transportasi siswa. Data disajikan dalam diagram lingkaran derajat berikut:\n" +
      "Jalan kaki: $60^\\circ$; Sepeda: $60^\\circ$; Angkutan umum: $60^\\circ$; Ojek online: $72^\\circ$; Sepeda motor: $48^\\circ$; Lainnya: $60^\\circ$.\n" +
      "Jika jumlah siswa yang menggunakan ojek online adalah 30 orang, pilihlah semua jawaban yang benar.",
    pernyataan: [
      "Persentase siswa yang berjalan kaki adalah $16{,}67\\%$.",
      "Banyak siswa yang menggunakan sepeda motor adalah 20 orang.",
      "Moda transportasi terbanyak yang digunakan siswa adalah ojek online.",
      "Total seluruh siswa yang didata adalah 150 orang.",
    ],
    jawabanPGK: [0, 1, 2, 3],
    pembahasan:
      "Jawaban Akhir: Semua pernyataan benar.\n\nStep by Step:\n" +
      "Total siswa: $\\frac{360^\\circ}{72^\\circ} \\times 30 = 5 \\times 30 = 150$ orang.\n" +
      "Sepeda motor: $\\frac{48^\\circ}{360^\\circ} \\times 150 = 20$ orang.\n" +
      "Jalan kaki: $\\frac{60^\\circ}{360^\\circ} \\times 100\\% = 16{,}67\\%$.\n" +
      "Modus ditunjukkan oleh sudut terbesar, yaitu Ojek Online ($72^\\circ$).",
  },
  {
    no: 60,
    type: "pgkbs",
    soal:
      "Tabel acuan tinggi badan ideal anak usia 1–5 tahun:\n" +
      "Usia | Laki-Laki | Perempuan\n1 tahun | 75,7 cm | 74,0 cm\n2 tahun | 87,8 cm | 86,4 cm\n3 tahun | 96,1 cm | 95,1 cm\n4 tahun | 103,3 cm | 102,7 cm\n5 tahun | 110,0 cm | 109,4 cm\n\n" +
      "Berdasarkan tabel acuan di atas, tentukan status Benar / Salah untuk pernyataan berikut.",
    pernyataan: [
      "Rata-rata tinggi badan ideal anak laki-laki usia 3 tahun adalah 96,1 cm.",
      "Selisih tinggi badan ideal anak laki-laki dan perempuan pada usia 5 tahun adalah 0,6 cm.",
      "Jangkauan pertumbuhan tinggi badan ideal anak perempuan dari usia 1 hingga 5 tahun adalah 35,4 cm.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan:
      "Jawaban Akhir: Semua pernyataan benar.\n\nStep by Step:\n" +
      "1. Usia 3 tahun, kolom laki-laki → 96,1 cm (Benar).\n" +
      "2. Usia 5 tahun → $110{,}0 - 109{,}4 = 0{,}6$ cm (Benar).\n" +
      "3. Jangkauan perempuan → $109{,}4 - 74{,}0 = 35{,}4$ cm (Benar).",
  },
  {
    no: 61,
    type: "pgk",
    soal:
      "Dino dan Dina adalah anak kembar berusia 4 tahun. Berdasarkan tabel standar acuan tinggi ideal di atas, pilihlah semua pernyataan yang benar.",
    pernyataan: [
      "Tinggi ideal Dino adalah 103,3 cm.",
      "Tinggi ideal Dina adalah 102,7 cm.",
      "Rata-rata tinggi badan ideal gabungan keduanya pada usia 4 tahun adalah 103,0 cm.",
      "Dino idealnya lebih tinggi 0,6 cm dibandingkan Dina pada usia tersebut.",
    ],
    jawabanPGK: [0, 1, 2, 3],
    pembahasan:
      "Jawaban Akhir: Semua pernyataan centang Benar.\n\nStep by Step:\n" +
      "Cek baris usia 4 tahun: laki-laki = 103,3 cm dan perempuan = 102,7 cm.\n" +
      "Rata-rata gabungan: $\\frac{103{,}3 + 102{,}7}{2} = 103{,}0$ cm.\n" +
      "Selisih tinggi: $103{,}3 - 102{,}7 = 0{,}6$ cm.",
  },
].filter((item) => ![39, 48, 49, 52, 55, 61].includes(item.no));