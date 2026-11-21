import { pickLang } from "@/lib/pickLang";
import MateriTopicPage from "@/components/MateriTopicPage";
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  id: {
    title: "BILANGAN RASIONAL",
    kelas: "Kelas 7",
    backLabel: "Kembali ke Kelas 7",
    subtopics: [
      { label: "ARTI PECAHAN, PECAHAN SENILAI DAN MEMBANDINGKAN PECAHAN", path: "/buku-animasi-matematika/bilangan-rasional/arti-pecahan", icon: "🔢" },
      { label: "PECAHAN CAMPURAN DAN PERSEN", path: "/buku-animasi-matematika/bilangan-rasional/pecahan-campuran", icon: "🔣" },
      { label: "PENJUMLAHAN DAN PENGURANGAN PECAHAN", path: "/buku-animasi-matematika/bilangan-rasional/penjumlahan-pengurangan", icon: "➕" },
      { label: "PERKALIAN PECAHAN", path: "/buku-animasi-matematika/bilangan-rasional/perkalian", icon: "✖️" },
      { label: "PEMBAGIAN PECAHAN", path: "/buku-animasi-matematika/bilangan-rasional/pembagian", icon: "➗" },
      { label: "BENTUK DESIMAL", path: "/buku-animasi-matematika/bilangan-rasional/bentuk-desimal", icon: "📊" },
      { label: "PENJUMLAHAN DAN PENGURANGAN BENTUK DESIMAL", path: "/buku-animasi-matematika/bilangan-rasional/penjumlahan-pengurangan-desimal", icon: "➕" },
      { label: "PERKALIAN BENTUK DESIMAL", path: "/buku-animasi-matematika/bilangan-rasional/perkalian-desimal", icon: "✖️" },
      { label: "PEMBAGIAN BENTUK DESIMAL", path: "/buku-animasi-matematika/bilangan-rasional/pembagian-desimal", icon: "➗" },
      { label: "PEMBULATAN BENTUK DESIMAL", path: "/buku-animasi-matematika/bilangan-rasional/pembulatan-desimal", icon: "🎯" },
    ],
  },
  en: {
    title: "RATIONAL NUMBERS",
    kelas: "Grade 7",
    backLabel: "Back to Grade 7",
    subtopics: [
      { label: "FRACTIONS: MEANING, EQUIVALENT & COMPARING", path: "/buku-animasi-matematika/bilangan-rasional/arti-pecahan", icon: "🔢" },
      { label: "MIXED NUMBERS AND PERCENTAGES", path: "/buku-animasi-matematika/bilangan-rasional/pecahan-campuran", icon: "🔣" },
      { label: "ADDITION AND SUBTRACTION OF FRACTIONS", path: "/buku-animasi-matematika/bilangan-rasional/penjumlahan-pengurangan", icon: "➕" },
      { label: "MULTIPLICATION OF FRACTIONS", path: "/buku-animasi-matematika/bilangan-rasional/perkalian", icon: "✖️" },
      { label: "DIVISION OF FRACTIONS", path: "/buku-animasi-matematika/bilangan-rasional/pembagian", icon: "➗" },
      { label: "DECIMAL FORM", path: "/buku-animasi-matematika/bilangan-rasional/bentuk-desimal", icon: "📊" },
      { label: "ADDITION AND SUBTRACTION OF DECIMALS", path: "/buku-animasi-matematika/bilangan-rasional/penjumlahan-pengurangan-desimal", icon: "➕" },
      { label: "MULTIPLICATION OF DECIMALS", path: "/buku-animasi-matematika/bilangan-rasional/perkalian-desimal", icon: "✖️" },
      { label: "DIVISION OF DECIMALS", path: "/buku-animasi-matematika/bilangan-rasional/pembagian-desimal", icon: "➗" },
      { label: "ROUNDING DECIMALS", path: "/buku-animasi-matematika/bilangan-rasional/pembulatan-desimal", icon: "🎯" },
    ],
  },
  ja: {
    title: "有理数",
    kelas: "中学1年",
    backLabel: "中学1年に戻る",
    subtopics: [
      { label: "分数の意味・等価分数・大小比較", path: "/buku-animasi-matematika/bilangan-rasional/arti-pecahan", icon: "🔢" },
      { label: "帯分数とパーセント", path: "/buku-animasi-matematika/bilangan-rasional/pecahan-campuran", icon: "🔣" },
      { label: "分数の足し算と引き算", path: "/buku-animasi-matematika/bilangan-rasional/penjumlahan-pengurangan", icon: "➕" },
      { label: "分数の掛け算", path: "/buku-animasi-matematika/bilangan-rasional/perkalian", icon: "✖️" },
      { label: "分数の割り算", path: "/buku-animasi-matematika/bilangan-rasional/pembagian", icon: "➗" },
      { label: "小数の形", path: "/buku-animasi-matematika/bilangan-rasional/bentuk-desimal", icon: "📊" },
      { label: "小数の足し算と引き算", path: "/buku-animasi-matematika/bilangan-rasional/penjumlahan-pengurangan-desimal", icon: "➕" },
      { label: "小数の掛け算", path: "/buku-animasi-matematika/bilangan-rasional/perkalian-desimal", icon: "✖️" },
      { label: "小数の割り算", path: "/buku-animasi-matematika/bilangan-rasional/pembagian-desimal", icon: "➗" },
      { label: "小数の四捨五入", path: "/buku-animasi-matematika/bilangan-rasional/pembulatan-desimal", icon: "🎯" },
    ],
  },
};

const BilanganRasionalPage = () => {
  const { language } = useLanguage();
  const t = pickLang(translations, language);

  return (
    <MateriTopicPage
      title={t.title}
      emoji="🔵"
      kelas={t.kelas}
      subtopics={t.subtopics}
      backPath="/buku-animasi-matematika/kelas-7"
      backLabel={t.backLabel}
    />
  );
};

export default BilanganRasionalPage;
