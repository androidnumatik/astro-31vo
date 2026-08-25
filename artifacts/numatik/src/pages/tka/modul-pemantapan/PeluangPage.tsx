import TKAPemantapanLayout from "@/components/tka/TKAPemantapanLayout";
import type { MateriSection, LatihanSoal } from "@/components/tka/TKAPemantapanLayout";
import { latihanDasarSVG } from "@/pages/OlimpiadePeluangPage";
import { peluangDasarPembahasan } from "@/data/pembahasan/peluangDasar";
import diagramKelereng from "@assets/image_1787583206453.png";
import papanSpinner from "@assets/image_1787585871802.png";

const materiSections: MateriSection[] = [
  { heading: "A. Ruang Sampel", content: `Ruang sampel (S) = himpunan semua kemungkinan hasil percobaan.\n\nKejadian (A) = bagian dari ruang sampel.\n\nContoh:\n- Melempar dadu: S = {1, 2, 3, 4, 5, 6}, n(S) = 6\n- Melempar koin: S = {A (angka), G (gambar)}, n(S) = 2\n- Melempar 2 koin: S = {AA, AG, GA, GG}, n(S) = 4` },
  { heading: "B. Frekuensi Relatif (Peluang Empirik)", content: `Frekuensi relatif menunjukkan perbandingan banyaknya suatu kejadian dengan banyak seluruh percobaan. Nilainya dapat digunakan sebagai peluang empirik.\n\n[SUBHEADING:Rumus frekuensi relatif (peluang empirik)]\n[BLOCKMATH:P(A) = \\dfrac{\\text{frekuensi kejadian } A}{\\text{banyak seluruh percobaan}}]\n\nSemakin banyak percobaan dilakukan, peluang empirik biasanya semakin mendekati peluang teoretik.` },
  { heading: "C. Peluang", content: `Peluang teoretik suatu kejadian adalah perbandingan banyak hasil yang mendukung kejadian dengan banyak seluruh hasil yang mungkin, apabila setiap hasil memiliki kesempatan yang sama.\n\n[SUBHEADING:Rumus peluang teoretik]\n[BLOCKMATH:P(A) = \\dfrac{n(A)}{n(S)}]\n\n- $n(A)$ = banyak kejadian yang diharapkan\n- $n(S)$ = banyak semua kemungkinan (ruang sampel)\n- $0 \\leq P(A) \\leq 1$\n- $P(\\text{pasti terjadi}) = 1$\n- $P(\\text{mustahil}) = 0$` },
  { heading: "D. Frekuensi Harapan", content: `Frekuensi harapan adalah banyak kemunculan suatu kejadian yang diperkirakan terjadi dalam sejumlah percobaan.\n\n[SUBHEADING:Rumus frekuensi harapan]\n[BLOCKMATH:F_h = P(A) \\times n]\n\n- $F_h$ = frekuensi harapan\n- $P(A)$ = peluang kejadian $A$\n- $n$ = banyak percobaan` },
  { heading: "E. Peluang Komplemen", content: `Peluang komplemen suatu kejadian adalah peluang kejadian tersebut tidak terjadi.\n\n[SUBHEADING:Rumus peluang komplemen]\n[BLOCKMATH:P(A^c) = 1 - P(A)]\n\nDimana $A^c$ = kejadian bukan A.` },
  { heading: "F. Peluang Kejadian Majemuk", content: `1. Kejadian saling lepas (mutually exclusive):\n[SUBHEADING:Rumus peluang gabungan kejadian saling lepas]\n[BLOCKMATH:P(A \\cup B) = P(A) + P(B)]\n\n2. Kejadian tidak saling lepas:\n[SUBHEADING:Rumus peluang gabungan kejadian tidak saling lepas]\n[BLOCKMATH:P(A \\cup B) = P(A) + P(B) - P(A \\cap B)]\n\n3. Kejadian bebas (independent):\n[SUBHEADING:Rumus peluang irisan kejadian bebas]\n[BLOCKMATH:P(A \\cap B) = P(A) \\times P(B)]\n\n4. Kejadian bersyarat:\n[SUBHEADING:Rumus peluang bersyarat]\n[BLOCKMATH:P(A|B) = \\dfrac{P(A \\cap B)}{P(B)}]` },
];

const latihanAwal: LatihanSoal[] = [
  {
    no: 1,
    type: "pgkbs",
    soal: "Seorang siswa melakukan lemparan dadu bermata enam sebanyak $50$ kali. Hasil pengamatan dicatat dalam tabel berikut.\n\nTentukan nilai Benar atau Salah untuk setiap pernyataan berikut!",
    gambar: (
      <div className="my-2 overflow-x-auto">
        <table className="mx-auto min-w-[360px] border-collapse overflow-hidden rounded-lg text-center text-xs">
          <thead>
            <tr className="bg-cyan-500/20 text-cyan-100">
              <th className="border border-cyan-400/30 px-4 py-2">Mata dadu</th>
              {[1, 2, 3, 4, 5, 6].map((mata) => (
                <th key={mata} className="border border-cyan-400/30 px-3 py-2">{mata}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white/5 text-white/85">
              <th className="border border-cyan-400/30 px-4 py-2 text-cyan-100">Frekuensi</th>
              {[12, 8, 10, 5, 11, 4].map((frekuensi, index) => (
                <td key={index} className="border border-cyan-400/30 px-3 py-2">{frekuensi}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    ),
    pernyataan: [
      "Frekuensi relatif munculnya mata dadu 2 adalah $0,16$.",
      "Frekuensi relatif munculnya mata dadu 5 adalah $0,22$.",
      "Frekuensi relatif munculnya setiap mata dadu bernilai sama.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Jawaban: (1) BENAR, (2) BENAR, (3) SALAH\n\nKonsep & Trik:\nFrekuensi relatif $F_r = \\frac{f_i}{N}$, dengan $f_i$ frekuensi kejadian dan $N$ banyak seluruh percobaan. Karena $N=50$, frekuensi dapat dikalikan 2 untuk memperoleh persentase.\n\nStep-by-Step Penyelesaian:\nPernyataan 1: $F_r=\\frac{8}{50}=\\frac{16}{100}=0,16$, jadi BENAR.\n\nPernyataan 2: $F_r=\\frac{11}{50}=\\frac{22}{100}=0,22$, jadi BENAR.\n\nPernyataan 3: Frekuensi tiap mata dadu adalah $12, 8, 10, 5, 11, 4$, sehingga frekuensi relatifnya tidak sama. Jadi SALAH.",
  },
  {
    no: 2,
    type: "pg",
    soal: "Sebuah koin seimbang dilempar sebanyak $80$ kali. Jika sisi Gambar ($G$) muncul sebanyak $32$ kali, berapakah frekuensi relatif munculnya sisi Angka ($A$)?",
    options: ["A. $0,400$", "B. $0,500$", "C. $0,600$", "D. $0,750$"],
    jawaban: "C",
    pembahasan: "Jawaban: C\n\nKonsep & Trik:\nFrekuensi sisi Angka adalah sisa dari seluruh lemparan setelah kemunculan Gambar.\n\nStep-by-Step Penyelesaian:\n$f_A=80-32=48$.\n\n$F_r(A)=\\frac{48}{80}=\\frac{6}{10}=0,600$.",
  },
  {
    no: 3,
    type: "pg",
    soal: "Sebuah dadu standar bermata $6$ dilambungkan satu kali. Peluang munculnya mata dadu bernilai lebih dari $6$ adalah ....",
    options: ["A. $0$", "B. $\\frac{1}{6}$", "C. $\\frac{1}{2}$", "D. $1$"],
    jawaban: "A",
    pembahasan: "Jawaban: A\n\nKonsep & Trik:\nDadu standar hanya memiliki mata $1,2,3,4,5,6$. Kejadian muncul mata dadu lebih dari 6 adalah kejadian mustahil.\n\n$P(A)=\\frac{n(A)}{n(S)}=\\frac{0}{6}=0$.",
  },
  {
    no: 4,
    type: "pg",
    soal: "Tiga buah koin uang logam dilempar bersamaan satu kali. Peluang munculnya tepat $2$ Gambar dan $1$ Angka adalah ....",
    options: ["A. $\\frac{1}{8}$", "B. $\\frac{3}{8}$", "C. $\\frac{1}{2}$", "D. $\\frac{5}{8}$"],
    jawaban: "B",
    pembahasan: "Jawaban: B\n\nKonsep & Trik:\nTiga koin memiliki $2^3=8$ kemungkinan hasil. Hasil dengan tepat 2 Gambar adalah $AGG$, $GAG$, dan $GGA$, sebanyak 3 hasil.\n\n$P(A)=\\frac{3}{8}$.",
  },
  {
    no: 5,
    type: "pg",
    soal: "Dalam sebuah kotak terdapat $10$ bola merah, $15$ bola kuning, dan $25$ bola hijau. Jika diambil satu bola secara acak, peluang terambilnya bola kuning adalah ....",
    options: ["A. $\\frac{1}{5}$", "B. $\\frac{3}{10}$", "C. $\\frac{1}{2}$", "D. $\\frac{3}{5}$"],
    jawaban: "B",
    pembahasan: "Jawaban: B\n\nTotal bola $=10+15+25=50$. Banyak bola kuning adalah 15, sehingga\n$P(K)=\\frac{15}{50}=\\frac{3}{10}$.",
  },
  {
    no: 6,
    type: "pgk",
    soal: "Dalam rangka Peringatan Hari Guru, sekolah membagikan kupon undian bernomor $001$ sampai $200$ kepada $200$ siswa. Panitia menyediakan $5$ unit laptop, $15$ unit sepeda, dan $30$ unit buku tulis.\n\nPilihlah semua pernyataan yang Benar!",
    pernyataan: [
      "Peluang setiap siswa memperoleh hadiah adalah $\\frac{1}{4}$.",
      "Peluang siswa mendapat laptop pada undian pertama adalah $2,5\\%$.",
      "Jika undian pertama telah mendapatkan laptop, peluang undian kedua mendapatkan sepeda adalah $\\frac{15}{199}$.",
    ],
    jawabanPGK: [0, 1, 2],
    jawaban: "Pernyataan (1), (2), dan (3) BENAR",
    pembahasan: "Jawaban: Pernyataan 1, 2, dan 3 BENAR\n\nTotal hadiah $=5+15+30=50$.\n\nPernyataan 1: $P(\\text{hadiah})=\\frac{50}{200}=\\frac{1}{4}$, BENAR.\n\nPernyataan 2: $P(\\text{laptop})=\\frac{5}{200}=0,025=2,5\\%$, BENAR.\n\nPernyataan 3: Setelah satu kupon terambil, tersisa 199 kupon dan 15 sepeda. Jadi $P(\\text{sepeda})=\\frac{15}{199}$, BENAR.",
  },
  {
    no: 7,
    type: "pgkbs",
    soal: "Dalam sebuah kantong terdapat $8$ kartu bernomor $1,2,3,4,5,6,7,8$. Diambil dua kartu sekaligus secara acak. Tentukan nilai Benar atau Salah!",
    pernyataan: [
      "Peluang terambil pasangan kartu bernomor berurutan adalah $\\frac{1}{4}$.",
      "Peluang terambil pasangan kartu dengan jumlah genap adalah $\\frac{3}{7}$.",
      "Peluang terambil kedua kartu bernomor prima adalah $\\frac{3}{14}$.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Jawaban: (1) BENAR, (2) BENAR, (3) BENAR\n\nRuang sampel pengambilan dua kartu adalah $C(8,2)=28$.\n\nPasangan berurutan ada 7, sehingga peluangnya $\\frac{7}{28}=\\frac{1}{4}$.\n\nJumlah genap terjadi pada pasangan ganjil-ganjil atau genap-genap: $C(4,2)+C(4,2)=12$, sehingga peluangnya $\\frac{12}{28}=\\frac{3}{7}$.\n\nBilangan prima adalah $2,3,5,7$. Banyak pasangan prima $C(4,2)=6$, sehingga peluangnya $\\frac{6}{28}=\\frac{3}{14}$.",
  },
  {
    no: 8,
    type: "pg",
    soal: "Berdasarkan data meteorologi, peluang hari berawan di Kota Bandung selama bulan Agustus ($31$ hari) adalah $\\frac{2}{5}$. Berapakah harapan banyaknya hari tidak berawan di bulan tersebut?",
    options: ["A. $12,4$ hari", "B. $18,6$ hari", "C. $20,0$ hari", "D. $24,8$ hari"],
    jawaban: "B",
    pembahasan: "Jawaban: B\n\nPeluang tidak berawan adalah $1-\\frac{2}{5}=\\frac{3}{5}$.\n\nFrekuensi harapan $=\\frac{3}{5}\\times31=\\frac{93}{5}=18,6$ hari.",
  },
  {
    no: 9,
    type: "pg",
    soal: "Di dalam sebuah kotak terdapat $12$ bola bernomor $1$ sampai $12$. Diambil satu bola secara acak dan terambil bola bernomor $3$ (tidak dikembalikan). Peluang terambil bola bernomor kelipatan $3$ pada pengambilan kedua adalah ....",
    options: ["A. $\\frac{1}{4}$", "B. $\\frac{3}{11}$", "C. $\\frac{4}{11}$", "D. $\\frac{1}{3}$"],
    jawaban: "B",
    pembahasan: "Jawaban: B\n\nKelipatan 3 dari 1 sampai 12 adalah $3,6,9,12$. Setelah bola 3 diambil, tersisa 3 bola kelipatan 3 dan 11 bola seluruhnya.\n\n$P=\\frac{3}{11}$.",
  },
  {
    no: 10,
    type: "pg",
    soal: "Banyak anggota ruang sampel dari pelemparan tiga koin uang logam dan satu dadu bermata 6 secara bersamaan adalah ....",
    options: ["A. $18$", "B. $24$", "C. $48$", "D. $72$"],
    jawaban: "C",
    pembahasan: "Jawaban: C\n\nTiga koin menghasilkan $2^3=8$ kemungkinan dan satu dadu menghasilkan 6 kemungkinan. Dengan aturan perkalian, $n(S)=8\\times6=48$.",
  },
  {
    no: 11,
    type: "pg",
    soal: "Lima orang nasabah: Andi, Budi, Citra, Deni, dan Eka sedang mengantre di depan teller bank yang menyediakan $5$ kursi berdampingan secara sejajar. Banyak cara kelima nasabah tersebut mengatur posisi duduk mereka adalah ....",
    options: ["A. $20$ cara", "B. $60$ cara", "C. $120$ cara", "D. $720$ cara"],
    jawaban: "C",
    pembahasan: "Jawaban: C\n\nLima orang berbeda dapat disusun berjajar dengan $5!$ cara.\n\n$5!=5\\times4\\times3\\times2\\times1=120$ cara.",
  },
  {
    no: 12,
    type: "pgk",
    soal: "Lima orang nasabah: Andi, Budi, Citra, Deni, dan Eka sedang duduk acak pada $5$ kursi berjajar. Pilihlah semua pernyataan yang Benar!",
    pernyataan: [
      "Peluang Andi duduk di posisi paling ujung (kiri atau kanan) adalah $\\frac{2}{5}$.",
      "Peluang Budi dan Citra selalu duduk berdampingan adalah $40\\%$.",
      "Peluang Deni dan Eka terpisah (tidak berdampingan) adalah $60\\%$.",
    ],
    jawabanPGK: [0, 1, 2],
    jawaban: "Pernyataan (1), (2), dan (3) BENAR",
    pembahasan: "Jawaban: Pernyataan 1, 2, dan 3 BENAR\n\nPernyataan 1: Ada 2 posisi ujung dari 5 posisi, jadi peluangnya $\\frac{2}{5}$.\n\nPernyataan 2: Anggap Budi dan Citra sebagai satu blok. Banyak susunan $4!\\times2!=48$, sehingga peluangnya $\\frac{48}{120}=\\frac{2}{5}=40\\%$.\n\nPernyataan 3: Peluang terpisah adalah komplemen peluang berdampingan, yaitu $1-40\\%=60\\%$.",
  },
  {
    no: 13,
    type: "pgkbs",
    soal: "Reno dan Siska memiliki jadwal les musik pada hari kerja (Senin sampai Jumat). Masing-masing memilih satu hari secara acak dalam seminggu. Tentukan Benar atau Salah!",
    pernyataan: [
      "Peluang mereka memilih hari les yang sama adalah $0,20$.",
      "Peluang mereka memilih hari les yang berurutan (misal: Senin-Selasa) adalah $\\frac{8}{25}$.",
      "Peluang Reno les di hari Jumat dan Siska tidak les di hari Jumat adalah $16\\%$.",
    ],
    jawabanBS: ["B", "B", "B"],
    pembahasan: "Jawaban: (1) BENAR, (2) BENAR, (3) BENAR\n\nAda $5\\times5=25$ pasangan pilihan hari.\n\nHari sama memiliki 5 pasangan, jadi peluangnya $\\frac{5}{25}=0,20$.\n\nHari berurutan memiliki $4\\times2=8$ pasangan, jadi peluangnya $\\frac{8}{25}$.\n\nPeluang Reno Jumat dan Siska bukan Jumat adalah $\\frac{1}{5}\\times\\frac{4}{5}=\\frac{4}{25}=16\\%$.",
  },
  {
    no: 14,
    type: "pg",
    soal: "Sebuah kantong berisi $30$ kelereng yang terdiri dari $12$ warna merah, $8$ warna biru, dan $10$ warna hijau. Jika diambil satu kelereng secara acak, peluang terambil kelereng bukan warna biru adalah ....",
    options: ["A. $\\frac{4}{15}$", "B. $\\frac{2}{3}$", "C. $\\frac{11}{15}$", "D. $\\frac{4}{5}$"],
    jawaban: "C",
    pembahasan: "Jawaban: C\n\nKelereng bukan biru berjumlah $12+10=22$. Maka\n$P(B^c)=\\frac{22}{30}=\\frac{11}{15}$.",
  },
  {
    no: 15,
    type: "pgkbs",
    soal: "Sebuah papan undian berbentuk lingkaran dibagi menjadi 10 sektor sama besar yang diberi nomor $1$ sampai $10$. Papan diputar satu kali. Tentukan nilai Benar atau Salah!",
    gambar: (
      <div className="my-2 flex justify-center">
        <img src={papanSpinner} alt="Papan undian putar bernomor 1 sampai 10" className="max-h-64 w-auto rounded-xl border border-white/15 bg-white p-2 object-contain" />
      </div>
    ),
    pernyataan: [
      "Peluang jarum menunjukkan angka ganjil adalah $50\\%$.",
      "Frekuensi harapan jarum menunjuk angka kelipatan 5 jika diputar $50$ kali adalah $10$ kali.",
      "Frekuensi relatif terpilihnya angka prima jika dilakukan $8$ kali putaran adalah selalu $\\frac{2}{5}$.",
    ],
    jawabanBS: ["B", "B", "S"],
    pembahasan: "Jawaban: (1) BENAR, (2) BENAR, (3) SALAH\n\nAngka ganjil ada 5 dari 10 sektor, sehingga peluangnya $\\frac{5}{10}=50\\%$.\n\nKelipatan 5 adalah 5 dan 10, sehingga $P=\\frac{2}{10}=\\frac{1}{5}$ dan frekuensi harapannya $\\frac{1}{5}\\times50=10$ kali.\n\nFrekuensi relatif ditentukan oleh hasil percobaan nyata, sehingga tidak selalu sama dengan peluang teoretik $\\frac{4}{10}=\\frac{2}{5}$.",
  },
];

const formatPembahasan = (pembahasan: {
  jawaban: string;
  konsepTrik: string;
  stepByStep: string;
  tips: string;
  kesimpulan: string;
}) =>
  `Jawaban: ${pembahasan.jawaban}\n\n` +
  `Konsep & Trik:\n${pembahasan.konsepTrik}\n\n` +
  `Step-by-Step Penyelesaian:\n${pembahasan.stepByStep}\n\n` +
  `Tips:\n${pembahasan.tips}\n\n` +
  `Kesimpulan:\n${pembahasan.kesimpulan}`;

const latihanDasarLanjutan: LatihanSoal[] = [
  { no: 12, soal: "Sebuah dadu dilambungkan satu kali. Peluang muncul mata dadu bilangan prima adalah...", options: ["A. $\\frac{1}{6}$", "B. $\\frac{2}{9}$", "C. $\\frac{3}{6}$", "D. $\\frac{4}{6}$"] },
  { no: 13, soal: "Dua buah dadu dilempar bersama-sama, peluang munculnya dadu berjumlah 9 adalah ...", options: ["A. $\\frac{1}{9}$", "B. $\\frac{3}{4}$", "C. $\\frac{1}{4}$", "D. $\\frac{1}{3}$"] },
  { no: 14, soal: "Dalam percobaan melempar 2 buah dadu, peluang muncul mata dadu berjumlah lebih dari 7 adalah ...", options: ["A. $\\frac{1}{18}$", "B. $\\frac{5}{36}$", "C. $\\frac{5}{12}$", "D. $\\frac{7}{18}$"] },
  { no: 15, soal: "Jika dipilih satu huruf dari M A T E M A T I K A, maka peluang yang terpilih huruf A adalah ...", options: ["A. $\\frac{1}{6}$", "B. $\\frac{1}{5}$", "C. $\\frac{1}{4}$", "D. $\\frac{1}{3}$"] },
  { no: 16, soal: "Di dalam sebuah kotak terdapat kelereng sebanyak bernomor 1 sampai dengan 15. Jika dilakukan pengambilan 1 kelereng secara acak dan terambil kelereng bernomor 9, serta kelereng tersebut tidak dikembalikan, maka peluang terambilnya kelereng bernomor ganjil pada pengambilan kedua adalah ...", options: ["A. $\\frac{8}{14}$", "B. $\\frac{7}{14}$", "C. $\\frac{8}{15}$", "D. $\\frac{7}{15}$"] },
  { no: 17, soal: "Dalam sebuah kantong terdapat bola bernomor 1 sampai dengan 13. Bola merah bernomor 1 sampai dengan 4, bola biru bernomor 5 sampai dengan 8 dan sisanya bola putih. Dari kantong tersebut diambil sebuah bola secara acak dan terambil bola biru. Peluang terambilnya bola bernomor kelipatan tiga dan berwarna putih pada pengambilan kedua adalah ...", options: ["A. $\\frac{1}{2}$", "B. $\\frac{1}{5}$", "C. $\\frac{1}{6}$", "D. $\\frac{2}{13}$"] },
  { no: 18, soal: "Pada seleksi pegawai sebuah perusahaan, seorang calon dapat diterima apabila lulus tes akademik dan tes fisik. Dari hasil seleksi, 25 lulus tes akademik, 20 lulus tes fisik dan 15 orang lulus keduanya. Saat pengumuman peserta tes dipanggil satu-persatu. Peluang terpanggil peserta yang hanya lulus tes fisik adalah ...", options: ["A. $\\frac{5}{6}$", "B. $\\frac{2}{3}$", "C. $\\frac{1}{2}$", "D. $\\frac{1}{6}$"] },
  { no: 19, soal: "Tiga mata uang ditos bersama-sama. Peluang munculnya dua angka dan satu gambar adalah ...", options: ["A. $\\frac{3}{4}$", "B. $\\frac{2}{4}$", "C. $\\frac{3}{8}$", "D. $\\frac{2}{8}$"] },
  { no: 20, soal: "Dalam percobaan melempar 3 uang logam secara bersamaan, peluang muncul minimal 2 angka adalah...", options: ["A. 0,375", "B. 0,500", "C. 0,667", "D. 0,875"] },
  { no: 21, soal: "Roni diperbolehkan ibunya untuk mengambil 1 permen dari sebuah kantong. Dia tidak dapat melihat warna permen tersebut. Kantong tersebut berisi 4 permen merah, 2 permen biru, 8 permen kuning, dan 6 permen hijau. Berapa peluang Roni mengambil sebuah permen warna merah?", options: ["A. 10%", "B. 20%", "C. 25%", "D. 50%"] },
  { no: 22, soal: "Di dalam kaleng terdapat 8 buah bola yang bernomor 1, 2, 3, 4, 5, 6, 7, 8. Jika diambil secara acak 2 bola sekaligus dari kaleng tersebut, peluang yang terambil kedua bola tersebut bernomor genap adalah …", options: ["A. $\\frac{1}{7}$", "B. $\\frac{2}{7}$", "C. $\\frac{3}{14}$", "D. $\\frac{3}{7}$"] },
  { no: 23, soal: "Terdapat 5 buah bola yang diberi nomor 1, 2, 3, 4, dan 5. Jika diambil 2 buah bola sekaligus, maka peluang terambil kedua bola bernomor ganjil adalah …", options: ["A. $\\frac{1}{5}$", "B. $\\frac{3}{10}$", "C. $\\frac{2}{5}$", "D. $\\frac{1}{2}$"] },
  { no: 24, soal: "Bima ingin menulis bilangan yang terdiri dari dua angka dari angka-angka 1, 2, 3, 5, 8, 9. Jika tidak ada angka yang sama, banyak bilangan dengan nilai berbeda yang bisa ditulis seluruhnya adalah ....", options: ["A. 20", "B. 24", "C. 30", "D. 36"] },
  { no: 25, soal: "Pada pelemparan dua dadu, peluang muncul mata dadu berjumlah 5 atau 7 adalah ...", options: ["A. 0,14", "B. 0,16", "C. 0,17", "D. 0,28"] },
  { no: 26, soal: "Sebuah dadu dan mata uang logam ditos bersama-sama. Peluang munculnya mata uang logam muncul gambar dan dadu lebih dari 4 adalah ....", options: ["A. $\\frac{1}{12}$", "B. $\\frac{1}{6}$", "C. $\\frac{1}{4}$", "D. $\\frac{1}{3}$"] },
  { no: 27, soal: "Dari seperangkat kartu bridge (52 kartu), diambil sebuah kartu secara acak. Peluang yang terambil kartu As adalah ....", options: ["A. $\\frac{1}{52}$", "B. $\\frac{1}{26}$", "C. $\\frac{1}{13}$", "D. $\\frac{4}{13}$"] },
  { no: 28, soal: "Sebuah dadu ditos sebanyak 60 kali. Frekuensi harapan munculnya angka kurang dari 3 adalah ....", options: ["A. 15 kali", "B. 20 kali", "C. 30 kali", "D. 35 kali"] },
  { no: 29, soal: "Sebuah bola diambil dari sebuah kantong yang berisi 4 bola berwarna putih, 6 bola berwarna hijau, dan 5 bola berwarna merah. Peluang terambilnya bola berwarna merah adalah ...", options: ["A. $\\frac{1}{5}$", "B. $\\frac{4}{15}$", "C. $\\frac{1}{3}$", "D. $\\frac{3}{5}$"] },
  { no: 30, soal: "Tiga keping uang logam dilempar bersama-sama. Peluang muncul ketiganya gambar adalah ...", options: ["A. $\\frac{1}{8}$", "B. $\\frac{1}{4}$", "C. $\\frac{3}{8}$", "D. $\\frac{1}{2}$"] },
  { no: 31, soal: "Sebuah dadu dilambungkan satu kali. Peluang munculnya mata dadu kurang dari 4 adalah ...", options: ["A. $\\frac{1}{6}$", "B. $\\frac{1}{3}$", "C. $\\frac{1}{2}$", "D. $\\frac{2}{3}$"] },
  { no: 32, soal: "Seorang ibu dan anaknya bermain tebak warna dengan cara mengambil bola dari kotak A dan memasukkannya ke kotak B. Kotak A berisi 5 bola merah, 7 bola kuning, dan 3 bola biru, sedangkan kotak B berisi 3 bola merah, 5 bola kuning, dan 3 bola biru. Ibu mengambil satu bola dari kotak A dan memasukkannya ke kotak B, kemudian si anak mengambil satu bola dari kotak B. Peluang si anak mendapatkan bola biru adalah ...", options: ["A. $\\frac{3}{11}$", "B. $\\frac{4}{15}$", "C. $\\frac{1}{4}$", "D. $\\frac{1}{3}$"] },
  { no: 33, soal: "Sebuah keluarga ingin mempunyai 4 orang anak. Peluang bahwa keluarga tersebut memiliki paling banyak 2 orang anak laki-laki adalah ...", options: ["A. $\\frac{5}{16}$", "B. $\\frac{6}{16}$", "C. $\\frac{11}{16}$", "D. $\\frac{13}{16}$"] },
  { no: 34, soal: "Babak perempat final Liga Champion diikuti oleh 8 tim A, B, C, D, E, F, G, dan H. Setiap tim memiliki peluang $\\frac{1}{2}$ untuk melaju ke babak selanjutnya. Jika B dan F berada di bagian bracket yang berbeda, peluang B bertemu F di babak final dan F menjadi juara adalah ...", options: ["A. $\\frac{1}{8}$", "B. $\\frac{1}{16}$", "C. $\\frac{1}{32}$", "D. $\\frac{1}{64}$"] },
  { no: 35, soal: "Seorang siswa mempunyai tiga buah celana berwarna biru, hitam, dan abu-abu, tiga buah kemeja berwarna putih, hijau, dan kuning serta dua pasang sepatu berwarna hitam dan coklat. Banyak kombinasi pakaian dan sepatu yang bisa digunakan siswa tersebut adalah ... kombinasi.", options: ["A. 12", "B. 15", "C. 18", "D. 24"] },
  { no: 36, soal: "Dalam sebuah peti terdapat 7 bola kuning bernomor 1−7, dan 5 bola merah bernomor a−e. Jika seseorang mengambil sebuah bola dari dalam peti secara acak, peluang terambilnya bola kuning bernomor ganjil atau bola merah dengan huruf vokal adalah ...", options: ["A. $\\frac{1}{4}$", "B. $\\frac{1}{3}$", "C. $\\frac{5}{12}$", "D. $\\frac{1}{2}$"] },
  { no: 37, soal: "Sebuah kantong berisi 5 kelereng merah, 6 kelereng kuning, dan 9 kelereng hijau. Sebuah kelereng diambil dari kantong tersebut. Peluang terambil kelereng kuning adalah ...", options: ["A. $\\frac{1}{4}$", "B. $\\frac{3}{10}$", "C. $\\frac{9}{20}$", "D. $\\frac{3}{5}$"] },
  { no: 38, soal: "Dalam rangka memperingati Hari Kemerdekaan RI, panitia menyiapkan sebuah kotak berisi kartu yang diberi nomor 1 sampai dengan 30. Setiap peserta hanya boleh mengambil satu kartu, dan yang mendapatkan kartu bernomor kelipatan 3 atau bilangan prima akan mendapat hadiah doorprize. Berapakah peluang seorang murid akan mendapatkan doorprize?", options: ["A. $\\frac{7}{15}$", "B. $\\frac{17}{30}$", "C. $\\frac{19}{30}$", "D. $\\frac{2}{3}$"] },
  { no: 39, soal: "Sebuah survei mengambil secara acak 60 murid sebagai sampelnya. Hasilnya, 36 siswa menjawab membawa bekal ke sekolah. Jika survei dilakukan lagi pada 50 murid lainnya dan diperkirakan hasil survei sama proporsinya dengan survei sebelumnya, frekuensi relatif murid yang membawa bekal dari seluruh siswa yang disurvei adalah ....", options: ["A. 0,59", "B. 0,60", "C. 0,61", "D. 0,62"] },
  { no: 40, soal: "Tiga buah dadu biasa dilempar sekaligus sebanyak satu kali. Peluang salah satu mata dadu sama dengan jumlah dua mata dadu lainnya adalah …", options: ["A. $\\frac{1}{6}$", "B. $\\frac{5}{24}$", "C. $\\frac{7}{24}$", "D. $\\frac{1}{3}$"] },
].map((soal) => {
  const pembahasan = peluangDasarPembahasan[soal.no];
  return pembahasan
    ? { ...soal, pembahasan: formatPembahasan(pembahasan) }
    : soal;
});

const soalByRef = new Map<string, LatihanSoal>([
  ...latihanAwal.map((soal) => [`awal-${soal.no}`, soal] as const),
  ...latihanDasarLanjutan.map((soal) => [`lanjutan-${soal.no}`, soal] as const),
]);

const urutanSubtopik: string[] = [
  // Ruang sampel
  "awal-10", "lanjutan-22", "lanjutan-23", "lanjutan-24", "lanjutan-35", "awal-11",
  // Frekuensi relatif / peluang empirik
  "awal-1", "awal-2", "lanjutan-39",
  // Peluang teoretis
  "awal-3", "awal-4", "awal-5", "awal-9",
  "lanjutan-12", "lanjutan-13", "lanjutan-14", "lanjutan-15", "lanjutan-16",
  "lanjutan-21", "lanjutan-27", "lanjutan-29", "lanjutan-30", "lanjutan-31", "lanjutan-37",
  // Frekuensi harapan
  "awal-8", "lanjutan-28", "awal-15",
  // Peluang komplemen
  "awal-14",
  // Peluang kejadian majemuk
  "awal-6", "awal-7", "awal-12", "awal-13",
  "lanjutan-17", "lanjutan-18", "lanjutan-19", "lanjutan-20",
  "lanjutan-25", "lanjutan-26", "lanjutan-32", "lanjutan-33",
  "lanjutan-34", "lanjutan-36", "lanjutan-38", "lanjutan-40",
];

const nomorSoalDihapus = new Set([2, 5, 9, 14, 15, 16, 22, 23, 35, 39, 40, 41, 42, 43, 44]);

const latihanDasarAwal: LatihanSoal[] = urutanSubtopik
  .map((ref, index) => {
  const soal = soalByRef.get(ref);
  if (!soal) throw new Error(`Soal dengan referensi ${ref} tidak ditemukan`);
  return { ...soal, no: index + 1 };
  })
  .filter((soal) => !nomorSoalDihapus.has(soal.no))
  .map((soal, index) => ({ ...soal, no: index + 1 }));

const latihanDasar: LatihanSoal[] = [
  ...latihanDasarAwal.filter((soal) => soal.no !== 3 && soal.no !== 4),
  ...latihanDasarAwal.filter((soal) => soal.no === 3 || soal.no === 4),
]
  .filter((soal) => !new Set([2, 5, 13, 14, 18, 20, 28, 29]).has(soal.no))
  .map((soal, index) => ({
    ...soal,
    no: index + 1,
    // Keep the graph with the original question 21 when the list is renumbered.
    gambar: soal.no === 21 ? latihanDasarSVG[21] : soal.gambar,
  }));

const ruangSampelDuaDadu = (
  <div className="space-y-4 min-w-[600px]">
    <div>
      <p className="mb-2 text-xs font-bold text-cyan-200">Tabel Ruang Sampel Pelemparan 2 Dadu</p>
      <table className="w-full border-collapse text-center text-[11px] text-cyan-50">
        <thead>
          <tr>
            <th className="border border-cyan-400/30 bg-cyan-400/10 p-2">Dadu 1 \\ Dadu 2</th>
            {[1, 2, 3, 4, 5, 6].map((value) => <th key={value} className="border border-cyan-400/30 bg-cyan-400/10 p-2">{value}</th>)}
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5, 6].map((dadu1) => (
            <tr key={dadu1}>
              <th className="border border-cyan-400/30 bg-cyan-400/10 p-2">{dadu1}</th>
              {[1, 2, 3, 4, 5, 6].map((dadu2) => {
                const sum = dadu1 + dadu2;
                const isMultiple = sum % 4 === 0;
                return (
                  <td key={dadu2} className={`border border-cyan-400/20 p-2 ${isMultiple ? "bg-emerald-400/25 font-bold text-emerald-200" : "bg-white/5"}`}>
                    ({dadu1}, {dadu2})
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div>
      <p className="mb-2 text-xs font-bold text-cyan-200">Rincian Pembagian Pasangan Kelipatan 4</p>
      <table className="w-full border-collapse text-left text-[11px] text-cyan-50">
        <thead>
          <tr>
            <th className="border border-cyan-400/30 bg-cyan-400/10 p-2">Nilai Kelipatan 4</th>
            <th className="border border-cyan-400/30 bg-cyan-400/10 p-2">Pasangan Mata Dadu (D1, D2)</th>
            <th className="border border-cyan-400/30 bg-cyan-400/10 p-2">Jumlah Kemungkinan</th>
          </tr>
        </thead>
        <tbody>
          <tr><td className="border border-cyan-400/20 p-2">Jumlah = 4</td><td className="border border-cyan-400/20 p-2">(1, 3), (2, 2), (3, 1)</td><td className="border border-cyan-400/20 p-2">3 cara</td></tr>
          <tr><td className="border border-cyan-400/20 p-2">Jumlah = 8</td><td className="border border-cyan-400/20 p-2">(2, 6), (3, 5), (4, 4), (5, 3), (6, 2)</td><td className="border border-cyan-400/20 p-2">5 cara</td></tr>
          <tr><td className="border border-cyan-400/20 p-2">Jumlah = 12</td><td className="border border-cyan-400/20 p-2">(6, 6)</td><td className="border border-cyan-400/20 p-2">1 cara</td></tr>
          <tr className="font-bold text-emerald-200"><td className="border border-cyan-400/20 p-2" colSpan={2}>TOTAL n(A)</td><td className="border border-cyan-400/20 p-2">9 cara</td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

const contohSoal: LatihanSoal[] = [
  {
    no: 1,
    type: "pg",
    soal: "Pada percobaan melempar satu buah dadu bermata 6 sebanyak satu kali, tentukan peluang munculnya mata dadu yang merupakan bilangan prima!",
    options: ["A. $\\frac{1}{6}$", "B. $\\frac{1}{3}$", "C. $\\frac{1}{2}$", "D. $\\frac{2}{3}$"],
    jawaban: "C",
    pembahasan:
      "Jawaban: C\n\n" +
      "Konsep & Trik:\n" +
      "Konsep dasar: Peluang $P(A) = \\frac{n(A)}{n(S)}$, di mana $n(A)$ adalah jumlah anggota kejadian yang diinginkan dan $n(S)$ adalah total seluruh ruang sampel.\n\n" +
      "Trik Cepat: Untuk 1 dadu (6 sisi), tepat 3 sisinya adalah prima $(2,3,5)$. Jadi peluang muncul bilangan prima adalah $\\frac{1}{2}$.\n\n" +
      "Step-by-Step Penyelesaian:\n" +
      "Menentukan Ruang Sampel $S$:\n" +
      "Dadu memiliki 6 sisi, maka $S = \\{1, 2, 3, 4, 5, 6\\}$ sehingga $n(S) = 6$.\n\n" +
      "Menentukan Kejadian $A$:\n" +
      "Bilangan prima pada dadu adalah $A = \\{2, 3, 5\\}$ sehingga $n(A) = 3$.\n\n" +
      "Menghitung Peluang $P(A)$:\n" +
      "$$P(A) = \\frac{n(A)}{n(S)} = \\frac{3}{6} = \\frac{1}{2}$$",
  },
  {
    no: 2,
    type: "pg",
    soal: "Dimas melakukan eksperimen pengundian koin bernomor/bergambar sebanyak $120$ kali. Dari eksperimen tersebut, sisi angka muncul sebanyak $45$ kali, sedangkan sisanya yang muncul adalah sisi gambar. Berapakah frekuensi relatif munculnya sisi gambar?",
    options: ["A. $\\frac{3}{8}$", "B. $\\frac{5}{8}$", "C. $\\frac{1}{2}$", "D. $\\frac{3}{5}$"],
    jawaban: "B",
    pembahasan:
      "Jawaban: B\n\n" +
      "Konsep & Trik:\n" +
      "Frekuensi relatif $F_r(A) = \\frac{\\text{banyak kejadian } A}{\\text{banyak percobaan } (N)}$.\n\n" +
      "Step-by-Step Penyelesaian:\n" +
      "Total percobaan $(N) = 120$ dan kejadian muncul angka = $45$.\n\n" +
      "Banyak kejadian muncul gambar:\n" +
      "$$120 - 45 = 75$$\n\n" +
      "Frekuensi relatif gambar:\n" +
      "$$F_r = \\frac{75}{120} = \\frac{75 \\div 15}{120 \\div 15} = \\frac{5}{8}$$",
  },
  {
    no: 3,
    type: "pgk",
    soal: "Sebuah wadah berisi sekantong kelereng dengan berbagai warna. Andika mencatat jumlah kelereng berdasarkan warnanya seperti diagram batang di bawah ini. Jika satu kelereng diambil secara acak dari wadah tersebut, tentukan kebenaran dari pernyataan-pernyataan berikut!",
    pernyataan: [
      "Peluang terambil kelereng berwarna Kuning adalah $32\\%$.",
      "Peluang terambil kelereng berwarna Biru adalah $0,16$.",
      "Peluang terambil kelereng berwarna Hijau atau Ungu adalah $\\frac{1}{3}$.",
      "Peluang terambil kelereng selain warna Merah adalah $\\frac{4}{5}$.",
    ],
    jawabanPGK: [0, 1, 3],
    jawaban: "Pernyataan (1), (2), dan (4) BENAR",
    gambar: <img src={diagramKelereng} alt="Diagram batang jumlah kelereng berdasarkan warna" className="mx-auto w-full max-w-xl rounded-xl border border-white/10 bg-white p-2" />,
    pembahasan:
      "Jawaban: Pernyataan 1 (Benar), Pernyataan 2 (Benar), Pernyataan 3 (Salah), Pernyataan 4 (Benar)\n\n" +
      "Konsep & Trik:\n" +
      "Total ruang sampel $n(S) = \\sum$ banyak kelereng. Peluang komplemen $P(A^c) = 1 - P(A)$.\n\n" +
      "Step-by-Step Penyelesaian:\n" +
      "Hitung ruang sampel total:\n" +
      "$$n(S) = 8 + 6 + 4 + 5 + 2 = 25$$\n\n" +
      "Pernyataan 1: $P(K) = \\frac{8}{25} = \\frac{32}{100} = 32\\%$, jadi BENAR.\n\n" +
      "Pernyataan 2: $P(B) = \\frac{4}{25} = 0,16$, jadi BENAR.\n\n" +
      "Pernyataan 3: $P(H \\cup U) = \\frac{6+2}{25} = \\frac{8}{25} \\neq \\frac{1}{3}$, jadi SALAH.\n\n" +
      "Pernyataan 4: Kelereng selain Merah berjumlah $25-5=20$.\n" +
      "$$P(M^c) = \\frac{20}{25} = \\frac{4}{5}$$\n" +
      "Jadi pernyataan 4 BENAR.",
  },
  {
    no: 4,
    type: "pgkbs",
    soal: "Perhatikan teks berikut untuk menjawab soal nomor 4 dan 5!\n\nTeks Stimulus: Permainan Monopoli Sederhana\nFajar dan Doni sedang bermain board game dengan melempar dua buah dadu berenam sisi secara bersamaan. Seseorang dapat melangkah sesuai jumlah mata dadu yang muncul. Jika pemain mendapatkan pasangan dadu kembar (dobel), ia mendapat kesempatan melempar sekali lagi. Jika jumlah kedua mata dadu kurang dari 5, pemain masuk ke kotak \"Bonus\". Jika jumlah kedua mata dadu lebih dari 9, pemain masuk ke kotak \"Tantangan\".\n\nBerdasarkan teks di atas, tentukan Benar atau Salah untuk setiap pernyataan berikut!",
    pernyataan: [
      "Peluang Fajar masuk ke kotak \"Bonus\" (jumlah $< 5$) adalah $\\frac{1}{6}$.",
      "Peluang Doni masuk ke kotak \"Tantangan\" (jumlah $> 9$) adalah $\\frac{1}{12}$.",
      "Peluang seorang pemain mendapat lemparan tambahan (dadu kembar) adalah $\\frac{1}{6}$.",
    ],
    jawabanBS: ["B", "S", "B"],
    pembahasan:
      "Jawaban:\nPernyataan 1: BENAR\nPernyataan 2: SALAH\nPernyataan 3: BENAR\n\n" +
      "Konsep & Trik:\n" +
      "Ruang sampel dua dadu adalah $n(S) = 6 \\times 6 = 36$. Banyak pasangan untuk jumlah 2, 3, 4 berturut-turut adalah 1, 2, 3.\n\n" +
      "Step-by-Step Penyelesaian:\n" +
      "Pernyataan 1 (jumlah $<5$): $1+2+3=6$ pasangan, sehingga $P(\\text{Bonus})=\\frac{6}{36}=\\frac{1}{6}$ — BENAR.\n\n" +
      "Pernyataan 2 (jumlah $>9$): jumlah 10, 11, dan 12 memiliki $3+2+1=6$ pasangan, sehingga $P(\\text{Tantangan})=\\frac{6}{36}=\\frac{1}{6}$, bukan $\\frac{1}{12}$ — SALAH.\n\n" +
      "Pernyataan 3 (dadu kembar): pasangan kembar $(1,1)$ sampai $(6,6)$ berjumlah 6, sehingga $P(\\text{kembar})=\\frac{6}{36}=\\frac{1}{6}$ — BENAR.",
  },
  {
    no: 5,
    type: "pg",
    soal: "Pada giliran berikutnya, peluang Doni untuk melempar dua dadu dengan jumlah mata dadu merupakan bilangan kelipatan 4 adalah ....",
    options: ["A. $\\frac{1}{4}$", "B. $\\frac{1}{3}$", "C. $\\frac{5}{12}$", "D. $\\frac{1}{2}$"],
    jawaban: "A",
    pembahasanDiagram: ruangSampelDuaDadu,
    pembahasan:
      "Jawaban: A\n\n" +
      "Konsep & Trik:\n" +
      "Kelipatan 4 pada penjumlahan dua dadu (jangkauan hasil 2 sampai 12) adalah 4, 8, dan 12. Banyak pasangan untuk jumlah tersebut adalah 3, 5, dan 1, sehingga totalnya 9 pasangan.\n\n" +
      "Step-by-Step Penyelesaian:\n" +
      "Identifikasi kelipatan 4 yang mungkin pada dua dadu:\n" +
      "$\\{4, 8, 12\\}$.\n\n" +
      "Mendaftar pasangan mata dadu:\n" +
      "Jumlah 4: $(1,3), (2,2), (3,1) \\rightarrow 3$ cara.\n" +
      "Jumlah 8: $(2,6), (3,5), (4,4), (5,3), (6,2) \\rightarrow 5$ cara.\n" +
      "Jumlah 12: $(6,6) \\rightarrow 1$ cara.\n\n" +
      "Hitung total kejadian:\n" +
      "$$n(A) = 3 + 5 + 1 = 9$$\n\n" +
      "Ruang sampel dua dadu:\n" +
      "$$n(S) = 6 \\times 6 = 36$$\n\n" +
      "Hitung peluang:\n" +
      "$$P(A) = \\frac{n(A)}{n(S)} = \\frac{9}{36} = \\frac{1}{4}$$",
  },
];

const contohSoalTerurut = [
  contohSoal[0],
  contohSoal[1],
  contohSoal[4],
  contohSoal[2],
  contohSoal[3],
];

const PeluangPage = () => (
  <TKAPemantapanLayout
    title="PELUANG"
    materiSections={materiSections}
    contohSoal={contohSoalTerurut}
    latihanDasar={latihanDasar}
    gambarMap={latihanDasarSVG}
  />
);

export default PeluangPage;
