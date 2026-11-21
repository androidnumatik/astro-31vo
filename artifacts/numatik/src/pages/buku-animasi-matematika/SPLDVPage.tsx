import { pickLang } from "@/lib/pickLang";
import { useLanguage } from "@/contexts/LanguageContext";
import MateriTopicPage from "@/components/MateriTopicPage";

const translations = {
  id: {
    title: "SISTEM PERSAMAAN LINEAR DUA VARIABEL",
    kelas: "Kelas 8",
    backLabel: "Kembali ke Kelas 8",
    subtopics: [
      { label: "DEFINISI DAN BENTUK UMUM SPLDV BESERTA KAITANNYA DENGAN PLDV", path: "/buku-animasi-matematika/spldv/definisi", icon: "📖" },
      { label: "PENYELESAIAN SPLDV DENGAN METODE GRAFIK", path: "/buku-animasi-matematika/spldv/metode-grafik", icon: "📈" },
      { label: "PENYELESAIAN SPLDV DENGAN METODE SUBSTITUSI", path: "/buku-animasi-matematika/spldv/metode-substitusi", icon: "🔄" },
      { label: "PENYELESAIAN SPLDV DENGAN METODE ELIMINASI", path: "/buku-animasi-matematika/spldv/metode-eliminasi", icon: "➖" },
      { label: "PENYELESAIAN SPLDV DENGAN METODE CAMPURAN", path: "/buku-animasi-matematika/spldv/metode-campuran", icon: "🔀" },
      { label: "MEMBUAT MODEL DARI PERMASALAHAN YANG BERKAITAN DENGAN SPLDV", path: "/buku-animasi-matematika/spldv/model-spldv", icon: "🧮" },
      { label: "PENYELESAIAN MASALAH YANG BERKAITAN DENGAN SPLDV", path: "/buku-animasi-matematika/spldv/penyelesaian-masalah", icon: "✅" },
    ],
  },
  en: {
    title: "SYSTEM OF LINEAR EQUATIONS IN TWO VARIABLES",
    kelas: "Grade 8",
    backLabel: "Back to Grade 8",
    subtopics: [
      { label: "DEFINITION & GENERAL FORM OF SLETV AND ITS RELATION TO LETV", path: "/buku-animasi-matematika/spldv/definisi", icon: "📖" },
      { label: "SOLVING SLETV WITH THE GRAPHICAL METHOD", path: "/buku-animasi-matematika/spldv/metode-grafik", icon: "📈" },
      { label: "SOLVING SLETV WITH THE SUBSTITUTION METHOD", path: "/buku-animasi-matematika/spldv/metode-substitusi", icon: "🔄" },
      { label: "SOLVING SLETV WITH THE ELIMINATION METHOD", path: "/buku-animasi-matematika/spldv/metode-eliminasi", icon: "➖" },
      { label: "SOLVING SLETV WITH THE COMBINED METHOD", path: "/buku-animasi-matematika/spldv/metode-campuran", icon: "🔀" },
      { label: "MODELLING PROBLEMS RELATED TO SLETV", path: "/buku-animasi-matematika/spldv/model-spldv", icon: "🧮" },
      { label: "SOLVING REAL-WORLD PROBLEMS WITH SLETV", path: "/buku-animasi-matematika/spldv/penyelesaian-masalah", icon: "✅" },
    ],
  },
  ja: {
    title: "二元一次連立方程式",
    kelas: "中学2年",
    backLabel: "中学2年に戻る",
    subtopics: [
      { label: "二元一次連立方程式の定義・一般形と一元方程式との関係", path: "/buku-animasi-matematika/spldv/definisi", icon: "📖" },
      { label: "グラフ法による連立方程式の解法", path: "/buku-animasi-matematika/spldv/metode-grafik", icon: "📈" },
      { label: "代入法による連立方程式の解法", path: "/buku-animasi-matematika/spldv/metode-substitusi", icon: "🔄" },
      { label: "加減法による連立方程式の解法", path: "/buku-animasi-matematika/spldv/metode-eliminasi", icon: "➖" },
      { label: "代入法と加減法を組み合わせた解法", path: "/buku-animasi-matematika/spldv/metode-campuran", icon: "🔀" },
      { label: "連立方程式を使った数学モデルの作成", path: "/buku-animasi-matematika/spldv/model-spldv", icon: "🧮" },
      { label: "連立方程式を使った実問題の解法", path: "/buku-animasi-matematika/spldv/penyelesaian-masalah", icon: "✅" },
    ],
  },
};

const SPLDVPage = () => {
  const { language } = useLanguage();
  const t = pickLang(translations, language);
  return (
    <MateriTopicPage
      title={t.title}
      emoji="➕"
      kelas={t.kelas}
      subtopics={t.subtopics}
      backPath="/buku-animasi-matematika/kelas-8"
      backLabel={t.backLabel}
    />
  );
};

export default SPLDVPage;
