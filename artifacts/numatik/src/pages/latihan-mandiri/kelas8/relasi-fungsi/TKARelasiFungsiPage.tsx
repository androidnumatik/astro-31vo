import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import PembahasanCard, { type Pembahasan } from "@/components/PembahasanCard";
import { playPopSound } from "@/hooks/useAudio";
import { useTheme } from "@/contexts/ThemeContext";
import { BrainCircuit } from "lucide-react";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

type Question = {
  question: string;
  options?: string[];
  pembahasan: Pembahasan;
};

const renderLatex = (text: string) =>
  text.split(/(\$\$[^$]+\$\$|\$[^$]+\$)/g).map((part, i) => {
    if (part.startsWith("$$") && part.endsWith("$$")) {
      return <div key={i} className="my-2 overflow-x-auto text-center"><InlineMath math={part.slice(2, -2)} /></div>;
    }
    if (part.startsWith("$") && part.endsWith("$")) {
      return <InlineMath key={i} math={part.slice(1, -1)} />;
    }
    return <span key={i}>{part}</span>;
  });

const q = (question: string, pembahasan: Pembahasan, options?: string[]): Question =>
  ({ question, pembahasan, options });

const questions: Question[] = [
  q(
    "Diketahui relasi dari himpunan $K$ ke himpunan $L$ disajikan dalam diagram panah dengan $K = \\{3,4,5,6\\}$ dan $L = \\{5,6,7,8,10\\}$. Panah mengarah dari $3 \\to 5$, $4 \\to 6$, $5 \\to 7$, dan $6 \\to 8$. Tentukan Benar atau Salah: (1) Domain relasi adalah $\\{3,4,5,6\\}$. (2) Kodomain relasi adalah $\\{5,6,7,8\\}$. (3) Range relasi adalah $\\{5,6,7,8\\}$.",
    { jawaban: "(1) Benar, (2) Salah, (3) Benar", konsepTrik: "Domain adalah seluruh himpunan asal. Kodomain adalah seluruh himpunan tujuan tanpa terkecuali. Range hanya anggota tujuan yang mendapat panah.", stepByStep: "$K = \\{3,4,5,6\\}$ sehingga domain = $\\{3,4,5,6\\}$.\n$L = \\{5,6,7,8,10\\}$ sehingga kodomain memuat 10.\nAnggota $L$ yang tertunjuk adalah $5,6,7,8$, jadi range = $\\{5,6,7,8\\}$.", tips: "Bedakan kodomain (semua anggota di kanan) dan range (yang benar-benar mendapat panah).", kesimpulan: "Pernyataan 1 dan 3 benar; pernyataan 2 salah." }
  ),
  q(
    "Relasi $R: X \\to Y$ dinyatakan oleh $\\{(2,7),(4,11),(5,p),(7,q)\\}$. Jika aturan relasi $f(x)=2x+3$, tentukan $p+q$.",
    { jawaban: "$p+q=30$ (A)", konsepTrik: "Pada pasangan $(x,y)$, nilai kedua adalah $f(x)$. Substitusikan nilai $x$ yang bersesuaian.", stepByStep: "$p=f(5)=2(5)+3=13$.\n$q=f(7)=2(7)+3=17$.\n$$p+q=13+17=30$$", tips: "Kerjakan nilai $p$ dan $q$ terpisah agar tidak tertukar.", kesimpulan: "Nilai $p+q$ adalah $30$." },
    ["A. $30$", "B. $32$", "C. $34$", "D. $36$"]
  ),
  q(
    "Di klub renang, ukuran papan renang ditentukan dengan rumus $\\text{Ukuran Papan}=\\text{Tinggi Badan}-115$. Aris 165 cm, Bella 158 cm, Candra 170 cm, dan Dina 162 cm. Pilih semua pernyataan yang benar.",
    { jawaban: "Semua opsi benar (1, 2, 3, dan 4).", konsepTrik: "Kurangi setiap tinggi badan dengan 115.", stepByStep: "Aris: $165-115=50\\text{ cm}$.\nBella: $158-115=43\\text{ cm}$.\nCandra: $170-115=55\\text{ cm}$.\nDina: $162-115=47\\text{ cm}$.", tips: "Gunakan satuan cm pada setiap hasil agar pasangan data jelas.", kesimpulan: "Keempat pernyataan sesuai dengan rumus." },
    ["☐ Aris → $50\\text{ cm}$", "☐ Bella → $43\\text{ cm}$", "☐ Candra → $55\\text{ cm}$", "☐ Dina → $47\\text{ cm}$"]
  ),
  q(
    "Diketahui $S=\\{12,13,14,15\\}$, $L=\\{1,2,3,4,5\\}$, dan $M=\\{(12,2),(13,2),(14,4),(15,5)\\}$. Tentukan Benar atau Salah: (1) Domain $M$ adalah $\\{12,13,14,15\\}$. (2) Kodomain $M$ adalah $\\{1,2,3,4,5\\}$. (3) Range $M$ adalah $\\{2,4,5\\}$.",
    { jawaban: "(1) Benar, (2) Benar, (3) Benar", konsepTrik: "Elemen pertama pasangan membentuk domain, himpunan tujuan membentuk kodomain, dan elemen kedua yang terpakai membentuk range.", stepByStep: "Elemen pertama: $12,13,14,15$ sehingga domain = $S$.\nKodomain adalah seluruh $L=\\{1,2,3,4,5\\}$.\nElemen kedua yang muncul adalah $2,4,5$, jadi range = $\\{2,4,5\\}$.", tips: "Angka 1 dan 3 tetap berada di kodomain meskipun tidak mendapat pasangan.", kesimpulan: "Ketiga pernyataan benar." }
  ),
  q(
    "Grafik fungsi linear $f(x)$ memotong sumbu-$Y$ di $(0,4)$ dan sumbu-$X$ di $(2,0)$. Rumus $f(x)$ adalah ....",
    { jawaban: "$f(x)=-2x+4$ (B)", konsepTrik: "Gunakan bentuk $f(x)=ax+b$. Titik potong sumbu-$Y$ memberi $b=4$, lalu gunakan titik $(2,0)$ untuk mencari $a$.", stepByStep: "$f(x)=ax+4$.\n$0=2a+4 \\Rightarrow 2a=-4 \\Rightarrow a=-2$.\nJadi $$f(x)=-2x+4$$", tips: "Titik pada sumbu-$Y$ memiliki $x=0$, sedangkan titik pada sumbu-$X$ memiliki $y=0$.", kesimpulan: "Rumus fungsi adalah $f(x)=-2x+4$." },
    ["A. $2x+4$", "B. $-2x+4$", "C. $-2x-4$", "D. $2x-4$"]
  ),
  q(
    "Banyaknya pemetaan yang mungkin dari $P=\\{a,b,c\\}$ ke $Q=\\{1,2,3,4\\}$ adalah ....",
    { jawaban: "$64$ (B)", konsepTrik: "Banyak fungsi dari $A$ ke $B$ adalah $n(B)^{n(A)}$.", stepByStep: "$n(P)=3$ dan $n(Q)=4$.\n$$n(Q)^{n(P)}=4^3=4\\times4\\times4=64$$", tips: "Pangkat memakai banyak anggota himpunan asal; bilangan pokok memakai banyak anggota himpunan tujuan.", kesimpulan: "Ada 64 pemetaan yang mungkin." },
    ["A. $12$", "B. $64$", "C. $81$", "D. $256$"]
  ),
  q(
    "Fungsi $h:A\\to B$ ditentukan oleh $h(x)=\\frac{1}{3}x+2$. Jika $A=\\{3,6,9,12\\}$ dan $B=\\{p,q,r,s\\}$, nilai $p+q+r+s$ adalah ....",
    { jawaban: "$18$ (A)", konsepTrik: "Hitung semua hasil pemetaan anggota $A$.", stepByStep: "$p=h(3)=3$, $q=h(6)=4$, $r=h(9)=5$, dan $s=h(12)=6$.\n$$p+q+r+s=3+4+5+6=18$$", tips: "Untuk penjumlahan hasil fungsi, tetap pastikan setiap anggota domain dipetakan tepat satu kali.", kesimpulan: "Jumlah semua nilai pada $B$ adalah $18$." },
    ["A. $18$", "B. $19$", "C. $20$", "D. $22$"]
  ),
  q(
    "Diketahui $g(x)=5(2x-1)-4$. Jika $g(-1)=m$ dan $g(2)=n$, nilai $3m+n$ adalah ....",
    { jawaban: "$-46$ (B)", konsepTrik: "Sederhanakan fungsi terlebih dahulu.", stepByStep: "$g(x)=10x-9$.\n$m=g(-1)=-10-9=-19$ dan $n=g(2)=20-9=11$.\n$$3m+n=3(-19)+11=-46$$", tips: "Perhatikan tanda negatif ketika mensubstitusikan $x=-1$.", kesimpulan: "Nilai $3m+n$ adalah $-46$." },
    ["A. $-52$", "B. $-46$", "C. $-24$", "D. $11$"]
  ),
  q(
    "Diketahui $f(x)=mx+n$. Jika $f(2)=1$ dan $f(-2)=-11$, nilai $n-m$ adalah ....",
    { jawaban: "$-8$ (A)", konsepTrik: "Bentuk kedua informasi sebagai sistem persamaan linear.", stepByStep: "$2m+n=1$ dan $-2m+n=-11$.\nPengurangan kedua persamaan memberi $4m=12$, jadi $m=3$.\n$2(3)+n=1 \\Rightarrow n=-5$.\n$$n-m=-5-3=-8$$", tips: "Eliminasi $n$ lebih cepat karena koefisiennya sama.", kesimpulan: "Nilai $n-m$ adalah $-8$." },
    ["A. $-8$", "B. $-2$", "C. $2$", "D. $8$"]
  ),
  q(
    "Fungsi $f(k)=k^2-4$. Jika $f(a)=21$, manakah pernyataan yang benar? (Jawaban bisa lebih dari satu.)",
    { jawaban: "Opsi 1, 2, dan 3 benar.", konsepTrik: "Persamaan $a^2=25$ memiliki dua solusi yang berlawanan tanda.", stepByStep: "$a^2-4=21 \\Rightarrow a^2=25 \\Rightarrow a=\\pm5$.\nJadi $a=5$ atau $a=-5$.\nJumlahnya $5+(-5)=0$, sedangkan hasil kalinya $5(-5)=-25$, bukan 25.", tips: "Jangan lupa memeriksa kedua akar ketika menyelesaikan persamaan kuadrat.", kesimpulan: "Yang benar: $a$ bisa 5, $a$ bisa $-5$, dan jumlah semua nilai $a$ adalah 0." },
    ["☐ $a=5$", "☐ $a=-5$", "☐ Jumlah semua nilai $a$ adalah $0$", "☐ Hasil kali semua nilai $a$ adalah $25$"]
  ),
  q(
    "Fungsi dirumuskan $f(x)=-2x+7$. Tentukan pasangan nilai $(x,y)$ pada pilihan berikut yang salah.",
    { jawaban: "D. $x=4\\Rightarrow y=1$", konsepTrik: "Uji setiap nilai $x$ dengan rumus $y=f(x)$.", stepByStep: "$f(-1)=9$, $f(0)=7$, dan $f(2)=3$ sehingga A, B, C benar.\n$f(4)=-2(4)+7=-1$, bukan 1.", tips: "Substitusi tanda negatif dengan tanda kurung.", kesimpulan: "Pasangan yang salah adalah D; seharusnya $x=4\\Rightarrow y=-1$." },
    ["A. $x=-1\\Rightarrow y=9$", "B. $x=0\\Rightarrow y=7$", "C. $x=2\\Rightarrow y=3$", "D. $x=4\\Rightarrow y=1$"]
  ),
  q(
    "Bayangan dari $-3$ oleh fungsi $f:x\\mapsto10-3x$ adalah ....",
    { jawaban: "$19$ (C)", konsepTrik: "Bayangan dari $x$ berarti nilai fungsi $f(x)$.", stepByStep: "$f(-3)=10-3(-3)=10+9=19$.", tips: "Hasil kali dua bilangan negatif bernilai positif.", kesimpulan: "Bayangan dari $-3$ adalah $19$." },
    ["A. $-1$", "B. $1$", "C. $19$", "D. $-19$"]
  ),
  q(
    "Fungsi linear memiliki pasangan berurutan $\\{(1,3),(2,5),(3,7),(4,9)\\}$. Rumus fungsi yang memenuhi adalah ....",
    { jawaban: "$f(x)=2x+1$ (B)", konsepTrik: "Selisih nilai $y$ selalu 2, sehingga koefisien $x$ adalah 2.", stepByStep: "Bentuknya $f(x)=2x+b$.\nGunakan $(1,3)$: $2(1)+b=3 \\Rightarrow b=1$.\nJadi $$f(x)=2x+1$$", tips: "Setelah menemukan gradien dari selisih, gunakan satu pasangan untuk mencari konstanta.", kesimpulan: "Rumus fungsi adalah $f(x)=2x+1$." },
    ["A. $x+2$", "B. $2x+1$", "C. $3x-1$", "D. $2x-1$"]
  ),
  q(
    "Diketahui $f(x)=4-x$ dengan domain $D=\\{x\\mid -1\\le x<3,\\ x\\in\\text{bilangan bulat}\\}$. Range fungsi tersebut adalah ....",
    { jawaban: "$\\{2,3,4,5\\}$ (B)", konsepTrik: "Daftarkan domain bilangan bulat dengan memperhatikan batas yang termasuk dan tidak termasuk.", stepByStep: "$D=\\{-1,0,1,2\\}$ karena 3 tidak termasuk.\n$f(-1)=5$, $f(0)=4$, $f(1)=3$, $f(2)=2$.\nJadi $$\\text{Range}=\\{2,3,4,5\\}$$", tips: "Tanda $\\le$ memasukkan batas, sedangkan tanda $<$ tidak memasukkan batas.", kesimpulan: "Range fungsi adalah $\\{2,3,4,5\\}$." },
    ["A. $\\{1,2,3,4\\}$", "B. $\\{2,3,4,5\\}$", "C. $\\{1,2,3,5\\}$", "D. $\\{2,3,4\\}$"]
  ),
  q(
    "Tempat penyewaan sepeda motor mengenakan tarif awal Rp10.000,00 dan tambahan Rp5.000,00 setiap jam. Jika total pembayaran Rp35.000,00, berapa lama durasi sewa?",
    { jawaban: "$5\\text{ jam}$ (C)", konsepTrik: "Gunakan model linear: total biaya = biaya awal + (tarif per jam × durasi).", stepByStep: "Misalkan durasi $t$ jam.\n$35.000=10.000+5.000t$.\n$25.000=5.000t \\Rightarrow t=5$.", tips: "Kurangi biaya awal terlebih dahulu untuk mendapatkan biaya pemakaian per jam.", kesimpulan: "Durasi penyewaan adalah 5 jam." },
    ["A. $3\\text{ jam}$", "B. $4\\text{ jam}$", "C. $5\\text{ jam}$", "D. $6\\text{ jam}$"]
  ),
];

const TKARelasiFungsiPage = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden">
      <Starfield />
      <PageNavigation />
      <main className="relative z-10 max-w-3xl w-full px-4 py-10">
        <header className="flex flex-col items-center mb-7">
          <div className="w-14 h-14 rounded-full bg-fuchsia-500/20 border-2 border-fuchsia-400/60 flex items-center justify-center mb-3">
            <BrainCircuit className="w-7 h-7 text-fuchsia-300" />
          </div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-fuchsia-300 text-center">TES KEMAMPUAN AKADEMIK</h1>
          <p className={`${isDark ? "text-white/50" : "text-gray-500"} text-xs text-center font-body`}>Relasi dan Fungsi · Kelas 8</p>
          <div className="mt-3 flex items-center gap-2 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-lg px-4 py-2">
            <span className="text-fuchsia-300 text-xs font-bold">📋 15 Soal</span><span className="text-white/30 text-xs">·</span><span className="text-white/50 text-xs">TKA</span>
          </div>
        </header>
        <div className="mb-5 bg-fuchsia-900/20 border border-fuchsia-500/20 rounded-xl p-4">
          <p className="text-fuchsia-300 text-xs font-bold mb-1">Petunjuk</p>
          <p className={`${isDark ? "text-white/70" : "text-gray-700"} text-xs font-body`}>Kerjakan setiap soal. Klik “Lihat Pembahasan” untuk memeriksa jawaban, konsep, dan langkah penyelesaian.</p>
        </div>
        <div className="flex flex-col gap-4">
          {questions.map((item, index) => (
            <article key={index} className="relative rounded-2xl overflow-hidden">
              <div className={`absolute inset-0 ${isDark ? "bg-gradient-to-br from-fuchsia-900/25 via-slate-900/80 to-purple-900/25" : "bg-gradient-to-br from-fuchsia-50/70 via-white/90 to-purple-50/60"} backdrop-blur`} />
              <div className="absolute inset-0 border border-fuchsia-500/20 rounded-2xl" />
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-fuchsia-400 to-purple-500" />
              <div className="relative px-5 py-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-fuchsia-500/20 border border-fuchsia-400/50 flex items-center justify-center shrink-0">
                    <span className="text-fuchsia-300 text-xs font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`${isDark ? "text-white/90" : "text-gray-800"} font-body text-sm leading-relaxed whitespace-pre-line`}>{renderLatex(item.question)}</p>
                    {item.options && <div className="mt-3 flex flex-col gap-1.5">{item.options.map((option, i) => <div key={i} className={`${isDark ? "bg-white/5 text-white/75" : "bg-gray-100/80 text-gray-700"} rounded-lg px-3 py-2 text-sm font-body`}>{renderLatex(option)}</div>)}</div>}
                    <PembahasanCard pembahasanKey={`tka-relasi-fungsi-${index + 1}`} pembahasan={item.pembahasan} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button onClick={() => { playPopSound(); navigate("/latihan-mandiri/kelas-8/relasi-dan-fungsi"); }} className="text-sm text-muted-foreground hover:text-fuchsia-400 transition-colors cursor-pointer font-body">
            Kembali ke Relasi dan Fungsi
          </button>
        </div>
      </main>
    </div>
  );
};

export default TKARelasiFungsiPage;