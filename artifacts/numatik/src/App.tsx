import { lazy, Suspense, useEffect } from "react";
import MenuPage from "./pages/MenuPage";
import { Analytics } from '@vercel/analytics/react';
import { Capacitor } from '@capacitor/core';
import { initGA, trackPageView } from '@/lib/analytics';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { startGlobalAmbient } from "@/hooks/useAudio";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SoundProvider } from "@/contexts/SoundContext";
import { MusicProvider } from "@/contexts/MusicContext";
import { FontProvider } from "@/contexts/FontContext";
import { AnimationProvider } from "@/contexts/AnimationContext";
import PageLoader from "@/components/PageLoader";
import MenuSidebar from "@/components/MenuSidebar";
import type { MenuSidebarTab } from "@/components/MenuSidebar";
import { MENU_ITEMS } from "@/data/menuConfig";
// Sidebar destinations load eagerly so desktop navigation does not suspend on route changes.
import BankSoalPage from "./pages/BankSoalPage";
import BiografiPage from "./pages/BiografiPage";
import ChatAIPage from "./pages/ChatAIPage";
import DonasiPage from "./pages/DonasiPage";
import KalkulatorScientificPage from "./pages/KalkulatorScientificPage";
import KokulikulerPage from "./pages/ruang-untuk-guru/KokulikulerPage";
import KonversiSatuanPage from "./pages/KonversiSatuanPage";
import KumpulanRumusPage from "./pages/KumpulanRumusPage";
import KritikSaranPage from "./pages/KritikSaranPage";
import LKPDMenuPage from "./pages/LKPDMenuPage";
import MenghitungCepatPage from "./pages/MenghitungCepatPage";
import OlimpiadePage from "./pages/OlimpiadePage";
import PengaturanPage from "./pages/PengaturanPage";
import PetunjukPage from "./pages/PetunjukPage";
import ReferensiPage from "./pages/ReferensiPage";
import RuangUntukGuruPage from "./pages/RuangUntukGuruPage";
import TentangAplikasiPage from "./pages/TentangAplikasiPage";
import TugasLatihanMandiriPage from "./pages/TugasLatihanMandiriPage";
import UjiMandiriPage from "./pages/UjiMandiriPage";
import UcapanTerimaKasihPage from "./pages/UcapanTerimaKasihPage";
import VideoPembelajaranPage from "./pages/VideoPembelajaranPage";

const LegacyMathBookRedirect = () => {
  const location = useLocation();
  const path = location.pathname
    .replace(/^\/materi-matematika(?=\/|$)/, "/buku-animasi-matematika")
    .replace(/^(\/buku-animasi-matematika)\/kelas-[789](?=\/|$)/, "$1");
  return <Navigate to={`${path}${location.search}${location.hash}`} replace />;
};

const LegacyTaskPracticeRedirect = () => {
  const location = useLocation();
  const path = location.pathname
    .replace(/^\/latihan-mandiri(?=\/|$)/, "/tugas-latihan-mandiri")
    .replace(/^(\/tugas-latihan-mandiri)\/kelas-[789](?=\/|$)/, "$1");
  return <Navigate to={`${path}${location.search}${location.hash}`} replace />;
};

const LegacyNumatikGamezRedirect = () => {
  const location = useLocation();
  const path = location.pathname
    .replace(/^\/math-game-arena(?=\/|$)/, "/numatik-gamez")
    .replace(/^(\/numatik-gamez)\/kelas-[789](?=\/|$)/, "$1");
  return <Navigate to={`${path}${location.search}${location.hash}`} replace />;
};

const LegacyLKPDRedirect = () => {
  const location = useLocation();
  const path = location.pathname.replace(/^\/lkpd\/kelas-[789](?=\/|$)/, "/lkpd");
  return <Navigate to={`${path}${location.search}${location.hash}`} replace />;
};

// ── Lazy-loaded pages ──────────────────────────────────────────────────────
const WelcomePage = lazy(() => import("./pages/WelcomePage"));
const ExamBrowserComingSoonPage = lazy(() => import("./pages/ExamBrowserComingSoonPage"));

const LKPDPage = lazy(() => import("./pages/LKPDPage"));
const LKPDPerbandinganPage = lazy(() => import("./pages/LKPDPerbandinganPage"));
const BertingkatLKPDPage = lazy(() => import("./pages/lkpd/perbandingan/BertingkatLKPDPage"));
const SenilaiLKPDPage = lazy(() => import("./pages/lkpd/perbandingan/SenilaiLKPDPage"));
const SkalaLKPDPage = lazy(() => import("./pages/lkpd/perbandingan/SkalaLKPDPage"));
const CampuranLKPDPage = lazy(() => import("./pages/lkpd/perbandingan/CampuranLKPDPage"));
const BilanganBulatMenuPage = lazy(() => import("./pages/lkpd/BilanganBulatMenuPage"));
const PenjumlahanLKPDPage = lazy(() => import("./pages/lkpd/bilangan-bulat/PenjumlahanLKPDPage"));
const PesawatTembakMeteorPage = lazy(() => import("./pages/lkpd/bilangan-bulat/PesawatTembakMeteorPage"));
const PesawatTembakMeteorPenjumlahanPage = lazy(() => import("./pages/lkpd/bilangan-bulat/PesawatTembakMeteorPenjumlahanPage"));
const PenguranganLKPDPage = lazy(() => import("./pages/lkpd/bilangan-bulat/PenguranganLKPDPage"));
const PerkalianLKPDPage = lazy(() => import("./pages/lkpd/bilangan-bulat/PerkalianLKPDPage"));
const PembagianLKPDPage = lazy(() => import("./pages/lkpd/bilangan-bulat/PembagianLKPDPage"));
const OperasiCampuranLKPDPage = lazy(() => import("./pages/lkpd/bilangan-bulat/OperasiCampuranLKPDPage"));
const KPKFPBLKPDPage = lazy(() => import("./pages/lkpd/bilangan-bulat/KPKFPBLKPDPage"));
const BilanganRasionalMenuPage = lazy(() => import("./pages/lkpd/BilanganRasionalMenuPage"));
const ArtiPecahanLKPDPage = lazy(() => import("./pages/lkpd/bilangan-rasional/ArtiPecahanLKPDPage"));
const AljabarMenuPage = lazy(() => import("./pages/lkpd/AljabarMenuPage"));
const PengertianUnsurAljabarLKPDPage = lazy(() => import("./pages/lkpd/aljabar/PengertianUnsurAljabarLKPDPage"));
const PenjumlahanPenguranganAljabarLKPDPage = lazy(() => import("./pages/lkpd/aljabar/PenjumlahanPenguranganAljabarLKPDPage"));
const PerkalianPembagianAljabarLKPDPage = lazy(() => import("./pages/lkpd/aljabar/PerkalianPembagianAljabarLKPDPage"));
const SubstitusiAljabarLKPDPage = lazy(() => import("./pages/lkpd/aljabar/SubstitusiAljabarLKPDPage"));
const FaktorisasiAljabarLKPDPage = lazy(() => import("./pages/lkpd/aljabar/FaktorisasiAljabarLKPDPage"));
const AritmetikaSosialMenuPage = lazy(() => import("./pages/lkpd/AritmetikaSosialMenuPage"));
const JualBeliUntungRugiLKPDPage = lazy(() => import("./pages/lkpd/aritmetika-sosial/JualBeliUntungRugiLKPDPage"));
const DiskonLKPDPage = lazy(() => import("./pages/lkpd/aritmetika-sosial/DiskonLKPDPage"));
const BrutoNettoTaraLKPDPage = lazy(() => import("./pages/lkpd/aritmetika-sosial/BrutoNettoTaraLKPDPage"));
const BungaTunggalLKPDPage = lazy(() => import("./pages/lkpd/aritmetika-sosial/BungaTunggalLKPDPage"));
const GarisDanSudutLKPDPage = lazy(() => import("./pages/lkpd/garis-sudut/GarisDanSudutLKPDPage"));
const SegitigaDanSegiempatLKPDPage = lazy(() => import("./pages/lkpd/segitiga-segiempat/SegitigaDanSegiempatLKPDPage"));
const HimpunanLKPDPage = lazy(() => import("./pages/lkpd/himpunan/HimpunanLKPDPage"));
const HimpunanMenuPage = lazy(() => import("./pages/lkpd/HimpunanMenuPage"));
const GarisDanSudutMenuPage = lazy(() => import("./pages/lkpd/GarisDanSudutMenuPage"));
const SegitigaDanSegiempatMenuPage = lazy(() => import("./pages/lkpd/SegitigaDanSegiempatMenuPage"));
const PolaBilanganLKPDPage = lazy(() => import("./pages/lkpd/pola-bilangan/PolaBilanganLKPDPage"));
const PolaBilanganMenuPage = lazy(() => import("./pages/lkpd/PolaBilanganMenuPage"));
const KoordinatCartesiusLKPDMenuPage = lazy(() => import("./pages/lkpd/KoordinatCartesiusMenuPage"));
const KoordinatCartesiusLKPDPage = lazy(() => import("./pages/lkpd/koordinat-cartesius/KoordinatCartesiusLKPDPage"));
const RelasiFungsiLKPDMenuPage = lazy(() => import("./pages/lkpd/RelasiFungsiMenuPage"));
const RelasiFungsiLKPDPage = lazy(() => import("./pages/lkpd/relasi-fungsi/RelasiFungsiLKPDPage"));
const SPLDVLKPDMenuPage = lazy(() => import("./pages/lkpd/SPLDVMenuPage"));
const SPLDVLKPDPage = lazy(() => import("./pages/lkpd/spldv/SPLDVLKPDPage"));
const SPLDVMetodeEliminasiLKPDPage = lazy(() => import("./pages/lkpd/spldv/MetodeEliminasiLKPDPage"));
const PostesEliminasiDispatcher = lazy(() => import("./pages/lkpd/spldv/PostesEliminasiDispatcher"));
const SPLDVMetodeSubstitusiLKPDPage = lazy(() => import("./pages/lkpd/spldv/MetodeSubstitusiLKPDPage"));
const SPLDVMetodeCampuranLKPDPage = lazy(() => import("./pages/lkpd/spldv/MetodeCampuranLKPDPage"));
const SPLDVDefinisiLKPDPage = lazy(() => import("./pages/lkpd/spldv/DefinisiSPLDVLKPDPage"));
const SPLDVMetodeGrafikLKPDPage = lazy(() => import("./pages/lkpd/spldv/MetodeGrafikLKPDPage"));
const SPLDVModelLKPDPage = lazy(() => import("./pages/lkpd/spldv/ModelSPLDVLKPDPage"));
const SPLDVPenyelesaianMasalahLKPDPage = lazy(() => import("./pages/lkpd/spldv/PenyelesaianMasalahLKPDPage"));
const PersamaanGarisLurusLKPDMenuPage = lazy(() => import("./pages/lkpd/PersamaanGarisLurusMenuPage"));
const PersamaanGarisLurusLKPDPage = lazy(() => import("./pages/lkpd/persamaan-garis-lurus/PersamaanGarisLurusLKPDPage"));
const BukuAnimasiPGLPage = lazy(() => import("./pages/lkpd/persamaan-garis-lurus/BukuAnimasiPGLPage"));
const TeoremaPythagorasLKPDMenuPage = lazy(() => import("./pages/lkpd/TeoremaPythagorasMenuPage"));
const TeoremaPythagorasLKPDPage = lazy(() => import("./pages/lkpd/teorema-pythagoras/TeoremaPythagorasLKPDPage"));
const LingkaranLKPDMenuPage = lazy(() => import("./pages/lkpd/LingkaranMenuPage"));
const LingkaranLKPDPage = lazy(() => import("./pages/lkpd/lingkaran/LingkaranLKPDPage"));
const GarisSinggungLingkaranLKPDMenuPage = lazy(() => import("./pages/lkpd/GarisSinggungLingkaranMenuPage"));
const GarisSinggungLingkaranLKPDPage = lazy(() => import("./pages/lkpd/garis-singgung-lingkaran/GarisSinggungLingkaranLKPDPage"));
const BangunRuangSisiDatarLKPDMenuPage = lazy(() => import("./pages/lkpd/BangunRuangSisiDatarMenuPage"));
const KubusBRSDLKPDPage = lazy(() => import("./pages/lkpd/bangun-ruang-sisi-datar/KubusLKPDPage"));
const BalokBRSDLKPDPage = lazy(() => import("./pages/lkpd/bangun-ruang-sisi-datar/BalokLKPDPage"));
const PrismaBRSDLKPDPage = lazy(() => import("./pages/lkpd/bangun-ruang-sisi-datar/PrismaLKPDPage"));
const LimasBRSDLKPDPage = lazy(() => import("./pages/lkpd/bangun-ruang-sisi-datar/LimasLKPDPage"));
const GabunganBRSDLKPDPage = lazy(() => import("./pages/lkpd/bangun-ruang-sisi-datar/GabunganBRSDLKPDPage"));
const BilanganBerpangkatLKPDMenuPage = lazy(() => import("./pages/lkpd/BilanganBerpangkatMenuPage"));
const PengertianNotasiPangkatLKPDPage = lazy(() => import("./pages/lkpd/bilangan-berpangkat/PengertianNotasiPangkatLKPDPage"));
const SifatOperasiPangkatLKPDPage = lazy(() => import("./pages/lkpd/bilangan-berpangkat/SifatOperasiPangkatLKPDPage"));
const BentukAkarLKPDPage = lazy(() => import("./pages/lkpd/bilangan-berpangkat/BentukAkarLKPDPage"));
const MerasionalkanAkarLKPDPage = lazy(() => import("./pages/lkpd/bilangan-berpangkat/MerasionalkanAkarLKPDPage"));
const NotasiIlmiahLKPDPage = lazy(() => import("./pages/lkpd/bilangan-berpangkat/NotasiIlmiahLKPDPage"));
const KesebangunanKekongruenanLKPDMenuPage = lazy(() => import("./pages/lkpd/KesebangunanKekongruenanMenuPage"));
const TransformasiGeometriLKPDMenuPage = lazy(() => import("./pages/lkpd/TransformasiGeometriMenuPage"));
const TranslasiTGLKPDPage = lazy(() => import("./pages/lkpd/transformasi-geometri/TranslasiLKPDPage"));
const RefleksiTGLKPDPage = lazy(() => import("./pages/lkpd/transformasi-geometri/RefleksiLKPDPage"));
const RotasiTGLKPDPage = lazy(() => import("./pages/lkpd/transformasi-geometri/RotasiLKPDPage"));
const DilatasiTGLKPDPage = lazy(() => import("./pages/lkpd/transformasi-geometri/DilatasiLKPDPage"));
const BangunRuangSisiLengkungLKPDMenuPage = lazy(() => import("./pages/lkpd/BangunRuangSisiLengkungMenuPage"));
const TabungBRSLLKPDPage = lazy(() => import("./pages/lkpd/bangun-ruang-sisi-lengkung/TabungLKPDPage"));
const KerucutBRSLLKPDPage = lazy(() => import("./pages/lkpd/bangun-ruang-sisi-lengkung/KerucutLKPDPage"));
const BolaBRSLLKPDPage = lazy(() => import("./pages/lkpd/bangun-ruang-sisi-lengkung/BolaLKPDPage"));
const PerubahanLuasVolumeBRSLLKPDPage = lazy(() => import("./pages/lkpd/bangun-ruang-sisi-lengkung/PerubahanLuasVolumeLKPDPage"));
const GabunganBRSLLKPDPage = lazy(() => import("./pages/lkpd/bangun-ruang-sisi-lengkung/GabunganBRSLLKPDPage"));
const StatistikaLKPDMenuPage = lazy(() => import("./pages/lkpd/StatistikaMenuPage"));
const PengantarStatistikaLKPDPage = lazy(() => import("./pages/lkpd/statistika/PengantarStatistikaLKPDPage"));
const PenyajianDataLKPDPage = lazy(() => import("./pages/lkpd/statistika/PenyajianDataLKPDPage"));
const RataRataStatistikaLKPDPage = lazy(() => import("./pages/lkpd/statistika/RataRataLKPDPage"));
const MedianModusLKPDPage = lazy(() => import("./pages/lkpd/statistika/MedianModusLKPDPage"));
const KuartilLKPDPage = lazy(() => import("./pages/lkpd/statistika/KuartilLKPDPage"));
const JangkauanSimpanganLKPDPage = lazy(() => import("./pages/lkpd/statistika/JangkauanSimpanganLKPDPage"));
const PeluangLKPDMenuPage = lazy(() => import("./pages/lkpd/PeluangMenuPage"));
const RuangSampelLKPDPage = lazy(() => import("./pages/lkpd/peluang/RuangSampelLKPDPage"));
const PeluangEmpirikLKPDPage = lazy(() => import("./pages/lkpd/peluang/PeluangEmpirikLKPDPage"));
const PeluangTeoretikLKPDPage = lazy(() => import("./pages/lkpd/peluang/PeluangTeoretikLKPDPage"));
const FrekuensiHarapanLKPDPage = lazy(() => import("./pages/lkpd/peluang/FrekuensiHarapanLKPDPage"));
const KomplemenLKPDPage = lazy(() => import("./pages/lkpd/peluang/KomplemenLKPDPage"));
const PeluangKejadianMajemukLKPDPage = lazy(() => import("./pages/lkpd/peluang/PeluangKejadianMajemukLKPDPage"));
const PersamaanKuadratLKPDMenuPage = lazy(() => import("./pages/lkpd/PersamaanKuadratMenuPage"));
const PKBentukUmumLKPDPage = lazy(() => import("./pages/lkpd/persamaan-kuadrat/BentukUmumLKPDPage"));
const PKPemfaktoranLKPDPage = lazy(() => import("./pages/lkpd/persamaan-kuadrat/PemfaktoranLKPDPage"));
const PKRumusKuadratikLKPDPage = lazy(() => import("./pages/lkpd/persamaan-kuadrat/RumusKuadratikLKPDPage"));
const PKPelengkapKuadratLKPDPage = lazy(() => import("./pages/lkpd/persamaan-kuadrat/PelengkapKuadratLKPDPage"));
const PKDiskriminanLKPDPage = lazy(() => import("./pages/lkpd/persamaan-kuadrat/DiskriminanLKPDPage"));
const PKMenyusunBaruLKPDPage = lazy(() => import("./pages/lkpd/persamaan-kuadrat/MenyusunPKBaruLKPDPage"));
const PKPenerapanKontekstualLKPDPage = lazy(() => import("./pages/lkpd/persamaan-kuadrat/PenerapanKontekstualLKPDPage"));
const FungsiKuadratLKPDMenuPage = lazy(() => import("./pages/lkpd/FungsiKuadratMenuPage"));
const FKBentukUmumKarakteristikLKPDPage = lazy(() => import("./pages/lkpd/fungsi-kuadrat/BentukUmumKarakteristikLKPDPage"));
const FKTitikPotongLKPDPage = lazy(() => import("./pages/lkpd/fungsi-kuadrat/TitikPotongLKPDPage"));
const FKSumbuSimetriPuncakLKPDPage = lazy(() => import("./pages/lkpd/fungsi-kuadrat/SumbuSimetriPuncakLKPDPage"));
const FKMenggambarGrafikLKPDPage = lazy(() => import("./pages/lkpd/fungsi-kuadrat/MenggambarGrafikLKPDPage"));
const FKMenyusunFungsiLKPDPage = lazy(() => import("./pages/lkpd/fungsi-kuadrat/MenyusunFungsiLKPDPage"));
const FKPenerapanMaksMinLKPDPage = lazy(() => import("./pages/lkpd/fungsi-kuadrat/PenerapanMaksMinLKPDPage"));
const PPNLKPDPage = lazy(() => import("./pages/lkpd/aritmetika-sosial/PPNLKPDPage"));
const PPhLKPDPage = lazy(() => import("./pages/lkpd/aritmetika-sosial/PPhLKPDPage"));
const PecahanCampuranLKPDPage = lazy(() => import("./pages/lkpd/bilangan-rasional/PecahanCampuranLKPDPage"));
const PenjumlahanPenguranganPecahanLKPDPage = lazy(() => import("./pages/lkpd/bilangan-rasional/PenjumlahanPenguranganPecahanLKPDPage"));
const PerkalianPecahanLKPDPage = lazy(() => import("./pages/lkpd/bilangan-rasional/PerkalianPecahanLKPDPage"));
const PembagianPecahanLKPDPage = lazy(() => import("./pages/lkpd/bilangan-rasional/PembagianPecahanLKPDPage"));
const BentukDesimalLKPDPage = lazy(() => import("./pages/lkpd/bilangan-rasional/BentukDesimalLKPDPage"));
const OperasiDesimalLKPDPage = lazy(() => import("./pages/lkpd/bilangan-rasional/OperasiDesimalLKPDPage"));
const PLSVPtLSVMenuPage = lazy(() => import("./pages/lkpd/PLSVPtLSVMenuPage"));
const KalimatTerbukaTertutupLKPDPage = lazy(() => import("./pages/lkpd/plsv-ptlsv/KalimatTerbukaTertutupLKPDPage"));
const PengertianPLSVLKPDPage = lazy(() => import("./pages/lkpd/plsv-ptlsv/PengertianPLSVLKPDPage"));
const PenyelesaianPLSVLKPDPage = lazy(() => import("./pages/lkpd/plsv-ptlsv/PenyelesaianPLSVLKPDPage"));
const ModelMatematikaPLSVLKPDPage = lazy(() => import("./pages/lkpd/plsv-ptlsv/ModelMatematikaPLSVLKPDPage"));
const PengertianPtLSVLKPDPage = lazy(() => import("./pages/lkpd/plsv-ptlsv/PengertianPtLSVLKPDPage"));
const PenyelesaianPtLSVLKPDPage = lazy(() => import("./pages/lkpd/plsv-ptlsv/PenyelesaianPtLSVLKPDPage"));
const ModelMatematikaPtLSVLKPDPage = lazy(() => import("./pages/lkpd/plsv-ptlsv/ModelMatematikaPtLSVLKPDPage"));
const ATPPage = lazy(() => import("./pages/ATPPage"));
const GuruLayout = lazy(() => import("./components/GuruLayout"));
const SmaPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPage"));
const SdPage = lazy(() => import("./pages/ruang-untuk-guru/SdPage"));
const SdComingSoonPage = lazy(() =>
  import("./pages/ruang-untuk-guru/SdPage").then((module) => ({ default: module.SdComingSoonPage })),
);
const SdBukuAnimasiPage = lazy(() => import("./pages/ruang-untuk-guru/SdBukuAnimasiPage"));
const SdBukuAnimasiTopicPage = lazy(() =>
  import("./pages/ruang-untuk-guru/SdBukuAnimasiPage").then((module) => ({
    default: module.SdBukuAnimasiTopicPage,
  })),
);
const IntensifUtbkPage = lazy(() => import("./pages/ruang-untuk-guru/IntensifUtbkPage"));
const SmaComingSoonPage = lazy(() => import("./pages/ruang-untuk-guru/SmaComingSoonPage"));
const SmaTopicMenuPage = lazy(() => import("./pages/ruang-untuk-guru/SmaTopicMenuPage"));
const SmaSubtopicComingSoonPage = lazy(() => import("./pages/ruang-untuk-guru/SmaSubtopicComingSoonPage"));
const SmaRelasiDanFungsiPage = lazy(() => import("./pages/ruang-untuk-guru/SmaRelasiDanFungsiPage"));
const SmaFungsiInversPage = lazy(() => import("./pages/ruang-untuk-guru/SmaFungsiInversPage"));
const SmaFungsiKomposisiPage = lazy(() => import("./pages/ruang-untuk-guru/SmaFungsiKomposisiPage"));
const SmaPenerapanOperasiInversKomposisiPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPenerapanOperasiInversKomposisiPage"));
const SmaDefinisiBentukUmumPersamaanLingkaranPage = lazy(() => import("./pages/ruang-untuk-guru/SmaDefinisiBentukUmumPersamaanLingkaranPage"));
const SmaKuasaTitikLingkaranDanGarisPage = lazy(() => import("./pages/ruang-untuk-guru/SmaKuasaTitikLingkaranDanGarisPage"));
const SmaPersamaanGarisSinggungLingkaranPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPersamaanGarisSinggungLingkaranPage"));
const SmaHubunganDuaLingkaranPage = lazy(() => import("./pages/ruang-untuk-guru/SmaHubunganDuaLingkaranPage"));
const SmaSpltvPage = lazy(() => import("./pages/ruang-untuk-guru/SmaSpltvPage"));
const SmaSptdvPage = lazy(() => import("./pages/ruang-untuk-guru/SmaSptdvPage"));
const SmaKonsepJenisKesamaanTransposeMatriksPage = lazy(() => import("./pages/ruang-untuk-guru/SmaKonsepJenisKesamaanTransposeMatriksPage"));
const SmaOperasiAljabarMatriksPage = lazy(() => import("./pages/ruang-untuk-guru/SmaOperasiAljabarMatriksPage"));
const SmaDeterminanInversMatriksPage = lazy(() => import("./pages/ruang-untuk-guru/SmaDeterminanInversMatriksPage"));
const SmaPenerapanMatriksPadaSPLPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPenerapanMatriksPadaSPLPage"));
const SmaPolinomialKonsepPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPolinomialKonsepPage"));
const SmaNilaiPolinomialHornerPage = lazy(() => import("./pages/ruang-untuk-guru/SmaNilaiPolinomialHornerPage"));
const SmaPembagianPolinomialPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPembagianPolinomialPage"));
const SmaPolinomialTeoremaFaktorPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPolinomialTeoremaFaktorPage.tsx"));
const SmaPersamaanPolinomialVietaPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPersamaanPolinomialVietaPage"));
const SmaStatistikaPenyajianDataPage = lazy(() => import("./pages/ruang-untuk-guru/SmaStatistikaPenyajianDataPage"));
const SmaStatistikaUkuranPemusatanDataPage = lazy(() => import("./pages/ruang-untuk-guru/SmaStatistikaUkuranPemusatanDataPage"));
const SmaStatistikaUkuranLetakDataPage = lazy(() => import("./pages/ruang-untuk-guru/SmaStatistikaUkuranLetakDataPage"));
const SmaStatistikaUkuranPenyebaranDataPage = lazy(() => import("./pages/ruang-untuk-guru/SmaStatistikaUkuranPenyebaranDataPage"));
const SmaPeluangAturanPerkalianPenjumlahanPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPeluangAturanPerkalianPenjumlahanPage"));
const SmaPeluangPermutasiPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPeluangPermutasiPage"));
const SmaPeluangKombinasiPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPeluangKombinasiPage"));
const SmaPeluangEkspansiBinomialPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPeluangEkspansiBinomialPage"));
const SmaPeluangRuangSampelDistribusiPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPeluangRuangSampelDistribusiPage"));
const SmaPeluangFrekuensiHarapanKomplemenPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPeluangFrekuensiHarapanKomplemenPage"));
const SmaPeluangKejadianMajemukPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPeluangKejadianMajemukPage"));
const SmaEksponenLogaritmaPage = lazy(() => import("./pages/ruang-untuk-guru/SmaEksponenLogaritmaPage"));
const SmaEksponenLogaritmaLatihanPage = lazy(() => import("./pages/ruang-untuk-guru/SmaEksponenLogaritmaLatihanPage"));
const SmaPersamaanEksponenLatihanPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPersamaanEksponenLatihanPage"));
const SmaLogaritmaPage = lazy(() => import("./pages/ruang-untuk-guru/SmaLogaritmaPage"));
const SmaPerbandinganTrigonometriSegitigaPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPerbandinganTrigonometriSegitigaPage"));
const SmaSudutIstimewaPage = lazy(() => import("./pages/ruang-untuk-guru/SmaSudutIstimewaPage"));
const SmaNilaiKuadranPage = lazy(() => import("./pages/ruang-untuk-guru/SmaNilaiKuadranPage"));
const SmaPersamaanTrigonometriPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPersamaanTrigonometriPage"));
const SmaPertidaksamaanTrigonometriPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPertidaksamaanTrigonometriPage"));
const SmaIdentitasTrigonometriPage = lazy(() => import("./pages/ruang-untuk-guru/SmaIdentitasTrigonometriPage"));
const SmaRumusRumusTrigonometriPage = lazy(() => import("./pages/ruang-untuk-guru/SmaRumusRumusTrigonometriPage"));
const SmaGrafikFungsiTrigonometriPage = lazy(() => import("./pages/ruang-untuk-guru/SmaGrafikFungsiTrigonometriPage"));
const SmaAturanSinusCosinusLuasSegitigaPage = lazy(() => import("./pages/ruang-untuk-guru/SmaAturanSinusCosinusLuasSegitigaPage"));
const SmaPersamaanLogaritmaPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPersamaanLogaritmaPage"));
const SmaPertidaksamaanLogaritmaPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPertidaksamaanLogaritmaPage"));
const SmaFungsiEksponenPage = lazy(() => import("./pages/ruang-untuk-guru/SmaFungsiEksponenPage"));
const SmaPersamaanEksponenPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPersamaanEksponenPage"));
const SmaPertidaksamaanEksponenPage = lazy(() => import("./pages/ruang-untuk-guru/SmaPertidaksamaanEksponenPage"));
const SmaBentukAkarPage = lazy(() => import("./pages/ruang-untuk-guru/SmaBentukAkarPage"));
const SmaBarisanDeretAritmetikaPage = lazy(() => import("./pages/ruang-untuk-guru/SmaBarisanDeretAritmetikaPage"));
const SmaBarisanDeretGeometriPage = lazy(() => import("./pages/ruang-untuk-guru/SmaBarisanDeretGeometriPage"));
const SmaDeretGeometriTakHinggaPage = lazy(() => import("./pages/ruang-untuk-guru/SmaDeretGeometriTakHinggaPage"));
const SmaKonsepDasarVektorPage = lazy(() => import("./pages/ruang-untuk-guru/SmaKonsepDasarVektorPage"));
const SmaOperasiVektorPage = lazy(() => import("./pages/ruang-untuk-guru/SmaOperasiVektorPage"));
const SmaVektorPadaSistemKoordinatKartesiusPage = lazy(() => import("./pages/ruang-untuk-guru/SmaVektorPadaSistemKoordinatKartesiusPage"));
const SmaSudutAntaraDuaVektorPage = lazy(() => import("./pages/ruang-untuk-guru/SmaSudutAntaraDuaVektorPage"));
const SmaProyeksiVektorPage = lazy(() => import("./pages/ruang-untuk-guru/SmaProyeksiVektorPage"));
const NumatikGamePage = lazy(() => import("./pages/ruang-untuk-guru/NumatikGamePage"));
const NumatikMetropolisPage = lazy(() => import("./games/numatik-metropolis/NumatikMetropolisPage.tsx"));
const NumatikCityRiderPage = lazy(() => import("./pages/ruang-untuk-guru/NumatikCityRiderPage"));
const NumatikKartPage = lazy(() => import("./pages/ruang-untuk-guru/NumatikKartPage"));
const NumatikRunnerPage = lazy(() => import("./games/numatik-runner/NumatikRunnerPage"));
const ObbyMatematikaPage = lazy(() => import("./games/obby-matematika/ObbyPage"));
const NumatikStrikeGamePage = lazy(() => import("./pages/numatik-gamez/umum/GamePage"));
const NumatikWorldPage = lazy(() => import("./pages/numatik-gamez/umum/NumatikWorldPage"));
const KeyakinanKelasPage = lazy(() => import("./pages/ruang-untuk-guru/KeyakinanKelasPage"));
const PenilaianPembelajaranPage = lazy(() => import("./pages/ruang-untuk-guru/PenilaianPembelajaranPage"));
const CapaianPembelajaranPage = lazy(() => import("./pages/ruang-untuk-guru/CapaianPembelajaranPage"));
const RubrikPenilaianDimensiLulusanPage = lazy(() => import("./pages/ruang-untuk-guru/RubrikPenilaianDimensiLulusanPage"));
const JurnalGuruPage = lazy(() => import("./pages/ruang-untuk-guru/JurnalGuruPage"));
const AgendaGuruPage = lazy(() => import("./pages/ruang-untuk-guru/AgendaGuruPage"));
const ProsemPage = lazy(() => import("./pages/ruang-untuk-guru/ProsemPage"));
const ProtaPage = lazy(() => import("./pages/ruang-untuk-guru/ProtaPage"));
const ProtaTahunPage = lazy(() => import("./pages/ruang-untuk-guru/ProtaTahunPage"));
const AnalisisAlokasiWaktuPage = lazy(() => import("./pages/ruang-untuk-guru/AnalisisAlokasiWaktuPage"));
const KKTPPage = lazy(() => import("./pages/ruang-untuk-guru/KKTPPage"));
const AbsensiSiswaPage = lazy(() => import("./pages/ruang-untuk-guru/AbsensiSiswaPage"));
const PenilaianSiswaPage = lazy(() => import("./pages/ruang-untuk-guru/PenilaianSiswaPage"));
const RancangRPPPage = lazy(() => import("./pages/ruang-untuk-guru/RancangRPPPage"));
const RPPPage = lazy(() => import("./pages/ruang-untuk-guru/RPPPage"));
const RPPBilanganBulatPage = lazy(() => import("./pages/ruang-untuk-guru/RPPBilanganBulatPage"));
const RPPPenjumlahanBilanganBulatPage = lazy(() => import("./pages/ruang-untuk-guru/RPPPenjumlahanBilanganBulatPage"));
const RPPPenguranganBilanganBulatPage = lazy(() => import("./pages/ruang-untuk-guru/RPPPenguranganBilanganBulatPage"));
const RPPPerkalianBilanganBulatPage = lazy(() => import("./pages/ruang-untuk-guru/RPPPerkalianBilanganBulatPage"));
const RPPPembagianBilanganBulatPage = lazy(() => import("./pages/ruang-untuk-guru/RPPPembagianBilanganBulatPage"));
const RPPOperasiCampuranBilanganBulatPage = lazy(() => import("./pages/ruang-untuk-guru/RPPOperasiCampuranBilanganBulatPage"));
const RPPKpkFpbPage = lazy(() => import("./pages/ruang-untuk-guru/RPPKpkFpbPage"));
const RPPMateriDynamicPage = lazy(() => import("./pages/ruang-untuk-guru/RPPMateriDynamicPage"));
const RPPDetailDynamicPage = lazy(() => import("./pages/ruang-untuk-guru/RPPDetailDynamicPage"));
const UlanganHarianPage = lazy(() => import("./pages/UlanganHarianPage"));
const PesanKesanPage = lazy(() => import("./pages/PesanKesanPage"));
const QuizPage = lazy(() => import("./pages/QuizPage"));
const OlimpiadeBilanganBulatPage = lazy(() => import("./pages/OlimpiadeBilanganBulatPage"));
const OlimpiadeBilanganRasionalPage = lazy(() => import("./pages/OlimpiadeBilanganRasionalPage"));
const OlimpiadeBilanganBerpangkatPage = lazy(() => import("./pages/OlimpiadeBilanganBerpangkatPage"));
const OlimpiadeStatistikaPage = lazy(() => import("./pages/OlimpiadeStatistikaPage"));
const OlimpiadeBilanganIrasionalPage = lazy(() => import("./pages/OlimpiadeBilanganIrasionalPage"));
const OlimpiadeKPKFPBPage = lazy(() => import("./pages/OlimpiadeKPKFPBPage"));
const OlimpiadeModuloPage = lazy(() => import("./pages/OlimpiadeModuloPage"));
const OlimpiadeHimpunanPage = lazy(() => import("./pages/OlimpiadeHimpunanPage"));
const OlimpiadeRelasiFungsiPage = lazy(() => import("./pages/OlimpiadeRelasiFungsiPage"));
const OlimpiadePerbandinganPage = lazy(() => import("./pages/OlimpiadePerbandinganPage"));
const OlimpiadeAljabarPage = lazy(() => import("./pages/OlimpiadeAljabarPage"));
const OlimpiadePolaBilanganPage = lazy(() => import("./pages/OlimpiadePolaBilanganPage"));
const OlimpiadeSPLDVPage = lazy(() => import("./pages/OlimpiadeSPLDVPage"));
const OlimpiadeGarisSudutPage = lazy(() => import("./pages/OlimpiadeGarisSudutPage"));
const OlimpiadeKoordinatCartesiusPage = lazy(() => import("./pages/OlimpiadeKoordinatCartesiusPage"));
const OlimpiadeTeoremaPage = lazy(() => import("./pages/OlimpiadeTeoremaPage"));
const OlimpiadeSegitigaSegiempatPage = lazy(() => import("./pages/OlimpiadeSegitigaSegiempatPage"));
const OlimpiadeLingkaranPage = lazy(() => import("./pages/OlimpiadeLingkaranPage"));
const OlimpiadeBangunRuangSisiDatarPage = lazy(() => import("./pages/OlimpiadeBangunRuangSisiDatarPage"));
const OlimpiadeBangunRuangSisiLengkungPage = lazy(() => import("./pages/OlimpiadeBangunRuangSisiLengkungPage"));
const OlimpiadePLSVPage = lazy(() => import("./pages/OlimpiadePLSVPage"));
const OlimpiadePersamaanGarisPage = lazy(() => import("./pages/OlimpiadePersamaanGarisPage"));
const OlimpiadePersamaanKuadratPage = lazy(() => import("./pages/OlimpiadePersamaanKuadratPage"));
const OlimpiadeFungsiKuadratPage = lazy(() => import("./pages/OlimpiadeFungsiKuadratPage"));
const OlimpiadeAritmetikaSosialPage = lazy(() => import("./pages/OlimpiadeAritmetikaSosialPage"));
const OlimpiadeKesebangunanPage = lazy(() => import("./pages/OlimpiadeKesebangunanPage"));
const OlimpiadeTransformasiPage = lazy(() => import("./pages/OlimpiadeTransformasiPage"));
const OlimpiadePeluangPage = lazy(() => import("./pages/OlimpiadePeluangPage"));
const TKAPage = lazy(() => import("./pages/TKAPage"));
const TKALatihan1Page = lazy(() => import("./pages/tka/TKALatihan1Page"));
const TKATryOut1Page = lazy(() => import("./pages/tka/TKATryOut1Page"));
const TKATryOut2Page = lazy(() => import("./pages/tka/TKATryOut2Page"));
const TKALatihan2Page = lazy(() => import("./pages/tka/TKALatihan2Page"));
const TKALatihan3Page = lazy(() => import("./pages/tka/TKALatihan3Page"));
const TKALatihan4Page = lazy(() => import("./pages/tka/TKALatihan4Page"));
const TKALatihan5Page = lazy(() => import("./pages/tka/TKALatihan5Page"));
const TKALatihan6Page = lazy(() => import("./pages/tka/TKALatihan6Page"));
const TKALatihan7Page = lazy(() => import("./pages/tka/TKALatihan7Page"));
const TKASoalAsli2025Page = lazy(() => import("./pages/tka/TKASoalAsli2025Page"));
const TKATipsPage = lazy(() => import("./pages/tka/TKATipsPage"));
const TKAModulPemantapanPage = lazy(() => import("./pages/tka/TKAModulPemantapanPage"));
const TKAPemantapanBilanganBulatPage = lazy(() => import("./pages/tka/modul-pemantapan/BilanganBulatPage"));
const TKAPemantapanBilanganRasionalPage = lazy(() => import("./pages/tka/modul-pemantapan/BilanganRasionalPage"));
const TKAPemantapanBilanganBerpangkatPage = lazy(() => import("./pages/tka/modul-pemantapan/BilanganBerpangkatPage"));
const TKAPemantapanBilanganIrasionalPage = lazy(() => import("./pages/tka/modul-pemantapan/BilanganIrasionalPage"));
const TKAPemantapanBilanganBerpangkatIrasionalPage = lazy(() => import("./pages/tka/modul-pemantapan/BilanganBerpangkatIrasionalPage"));
const TKAPemantapanHimpunanPage = lazy(() => import("./pages/tka/modul-pemantapan/HimpunanPage"));
const TKAPemantapanRelasiFungsiPage = lazy(() => import("./pages/tka/modul-pemantapan/RelasiFungsiPage"));
const TKAPemantapanPerbandinganPage = lazy(() => import("./pages/tka/modul-pemantapan/PerbandinganPage"));
const TKAPemantapanAljabarPage = lazy(() => import("./pages/tka/modul-pemantapan/AljabarPage"));
const TKAPemantapanPLSVPage = lazy(() => import("./pages/tka/modul-pemantapan/PLSVPage"));
const TKAPemantapanAritmetikaSosialPage = lazy(() => import("./pages/tka/modul-pemantapan/AritmetikaSosialPage"));
const TKAPemantapanPolaBilanganPage = lazy(() => import("./pages/tka/modul-pemantapan/PolaBilanganPage"));
const TKAPemantapanSPLDVPage = lazy(() => import("./pages/tka/modul-pemantapan/SPLDVPage"));
const TKAPemantapanGarisSudutPage = lazy(() => import("./pages/tka/modul-pemantapan/GarisSudutPage"));
const TKAPemantapanTeoremaPage = lazy(() => import("./pages/tka/modul-pemantapan/TeoremaPage"));
const TKAPemantapanSegitigaSegiempatPage = lazy(() => import("./pages/tka/modul-pemantapan/SegitigaSegiempatPage"));
const TKAPemantapanLingkaranPage = lazy(() => import("./pages/tka/modul-pemantapan/LingkaranPage"));
const TKAPemantapanBangunRuangSisiDatarPage = lazy(() => import("./pages/tka/modul-pemantapan/BangunRuangSisiDatarPage"));
const TKAPemantapanBangunRuangSisiLengkungPage = lazy(() => import("./pages/tka/modul-pemantapan/BangunRuangSisiLengkungPage"));
const TKAPemantapanKesebangunanPage = lazy(() => import("./pages/tka/modul-pemantapan/KesebangunanPage"));
const TKAPemantapanTransformasiPage = lazy(() => import("./pages/tka/modul-pemantapan/TransformasiPage"));
const TKAPemantapanStatistikaPage = lazy(() => import("./pages/tka/modul-pemantapan/StatistikaPage"));
const TKAPemantapanPeluangPage = lazy(() => import("./pages/tka/modul-pemantapan/PeluangPage"));
const TKAPemantapanPersamaanGarisPage = lazy(() => import("./pages/tka/modul-pemantapan/PersamaanGarisPage"));
const TKAPemantapanKoordinatCartesiusPage = lazy(() => import("./pages/tka/modul-pemantapan/KoordinatCartesiusPage"));
const PapanPeringkatPage = lazy(() => import("./pages/PapanPeringkatPage"));
const BankSoalBilanganBulatPage = lazy(() => import("./pages/bank-soal/BilanganBulatPage"));
const BankSoalBilanganRasionalPage = lazy(() => import("./pages/bank-soal/BilanganRasionalPage"));
const BankSoalSegitigaSegiempatPage = lazy(() => import("./pages/bank-soal/SegitigaSegiempatPage"));
const BankSoalHimpunanPage = lazy(() => import("./pages/bank-soal/HimpunanPage"));
const BankSoalKoordinatCartesiusPage = lazy(() => import("./pages/bank-soal/KoordinatCartesiusPage"));
const BankSoalAljabarPage = lazy(() => import("./pages/bank-soal/AljabarPage"));
const BankSoalPLSVPage = lazy(() => import("./pages/bank-soal/PLSVPage"));
const BankSoalPerbandinganPage = lazy(() => import("./pages/bank-soal/PerbandinganPage"));
const BankSoalAritmetikaSosialPage = lazy(() => import("./pages/bank-soal/AritmetikaSosialPage"));
const BankSoalPolaBilanganPage = lazy(() => import("./pages/bank-soal/PolaBilanganPage"));
const BankSoalRelasiFungsiPage = lazy(() => import("./pages/bank-soal/RelasiFungsiPage"));
const BankSoalGarisSudutPage = lazy(() => import("./pages/bank-soal/GarisSudutPage"));
const BankSoalSPLDVPage = lazy(() => import("./pages/bank-soal/SPLDVPage"));
const BankSoalPersamaanGarisLurusPage = lazy(() => import("./pages/bank-soal/PersamaanGarisLurusPage"));
const BankSoalPeluangPage = lazy(() => import("./pages/bank-soal/PeluangPage"));
const BankSoalTeoremaPythagorasPage = lazy(() => import("./pages/bank-soal/TeoremaPythagorasPage"));
const BankSoalLingkaranPage = lazy(() => import("./pages/bank-soal/LingkaranPage"));
const BankSoalBangunRuangSisiDatarPage = lazy(() => import("./pages/bank-soal/BangunRuangSisiDatarPage"));
const BankSoalBangunRuangSisiLengkungPage = lazy(() => import("./pages/bank-soal/BangunRuangSisiLengkungPage"));
const BankSoalBilanganBerpangkatPage = lazy(() => import("./pages/bank-soal/BilanganBerpangkatPage"));
const BankSoalPersamaanKuadratPage = lazy(() => import("./pages/bank-soal/PersamaanKuadratPage"));
const BankSoalFungsiKuadratPage = lazy(() => import("./pages/bank-soal/FungsiKuadratPage"));
const BankSoalStatistikaPage = lazy(() => import("./pages/bank-soal/StatistikaPage"));
const BankSoalGarisSinggungLingkaranPage = lazy(() => import("./pages/bank-soal/GarisSinggungLingkaranPage"));
const BankSoalKesebangunanPage = lazy(() => import("./pages/bank-soal/KesebangunanPage"));
const BankSoalTransformasiGeometriPage = lazy(() => import("./pages/bank-soal/TransformasiGeometriPage"));
const ComingSoonPage = lazy(() => import("./pages/ComingSoonPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PerkalianDengan11Page = lazy(() => import("./pages/menghitung-cepat/PerkalianDengan11Page"));
const KuadratBerakhiran5Page = lazy(() => import("./pages/menghitung-cepat/KuadratBerakhiran5Page"));
const KuadratCepatPage = lazy(() => import("./pages/menghitung-cepat/KuadratCepatPage"));
const PerkalianDekat100Page = lazy(() => import("./pages/menghitung-cepat/PerkalianDekat100Page"));
const PersentaseCepatPage = lazy(() => import("./pages/menghitung-cepat/PersentaseCepatPage"));
const PenjumlahanPenguranganCepatPage = lazy(() => import("./pages/menghitung-cepat/PenjumlahanPenguranganPage"));
const PerkalianDuaDigitPage = lazy(() => import("./pages/menghitung-cepat/PerkalianDuaDigitPage"));
const PembagianCepatPage = lazy(() => import("./pages/menghitung-cepat/PembagianCepatPage"));
const TabelReferensiPage = lazy(() => import("./pages/menghitung-cepat/TabelReferensiPage"));
const LatihanFlashcardPage = lazy(() => import("./pages/menghitung-cepat/LatihanFlashcardPage"));
const GameLatihanHitungCepatPage = lazy(() => import("./pages/menghitung-cepat/GameLatihanHitungCepatPage"));

// Latihan Mandiri
const TugasLatihanMandiriKelas7Page = lazy(() => import("./pages/TugasLatihanMandiriKelas7Page"));
const TugasLatihanMandiriKelas8Page = lazy(() => import("./pages/TugasLatihanMandiriKelas8Page"));
const TugasLatihanMandiriKelas9Page = lazy(() => import("./pages/TugasLatihanMandiriKelas9Page"));

// Kelas 7 Topic Pages
const BilanganBulatK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/BilanganBulatPage"));
const PenjumlahanBilanganBulatK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/bilangan-bulat/PenjumlahanPage"));
const PenguranganBilanganBulatK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/bilangan-bulat/PenguranganPage"));
const PerkalianBilanganBulatK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/bilangan-bulat/PerkalianPage"));
const PembagianBilanganBulatK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/bilangan-bulat/PembagianPage"));
const OperasiCampuranBilanganBulatK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/bilangan-bulat/OperasiCampuranPage"));
const KPKFPBBilanganBulatK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/bilangan-bulat/KPKFPBPage"));
const BilanganRasionalK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/BilanganRasionalPage"));
const ArtiPecahanSenilaiMembandingkanK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/pecahan/ArtiPecahanSenilaiMembandingkanPage"));
const PecahanCampuranPersenK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/pecahan/PecahanCampuranPersenPage"));
const PenjumlahanPecahanK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/pecahan/PenjumlahanPecahanPage"));
const PerkalianPecahanK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/pecahan/PerkalianPecahanPage"));
const PembagianPecahanK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/pecahan/PembagianPecahanPage"));
const BentukDesimalK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/pecahan/BentukDesimalPage"));
const PenjumlahanPenguranganDesimalK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/pecahan/PenjumlahanPenguranganDesimalPage"));
const PerkalianDesimalK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/pecahan/PerkalianDesimalPage"));
const PembagianDesimalK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/pecahan/PembagianDesimalPage"));
const PembulatanDesimalK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/pecahan/PembulatanDesimalPage"));
const PengertianUnsurAljabarK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/aljabar/PengertianUnsurAljabarPage"));
const PenjumlahanPenguranganAljabarK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/aljabar/PenjumlahanPenguranganAljabarPage"));
const PerkalianAljabarK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/aljabar/PerkalianAljabarPage"));
const PembagianAljabarK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/aljabar/PembagianAljabarPage"));
const PemangkatanAljabarK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/aljabar/PemangkatanAljabarPage"));
const SubstitusiBilanganAljabarK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/aljabar/SubstitusiBilanganAljabarPage"));
const FaktorisasiAljabarK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/aljabar/FaktorisasiAljabarPage"));
const MenyederhanakanPecahanAljabarK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/aljabar/MenyederhanakanPecahanAljabarPage"));
const AljabarK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/AljabarPage"));
const PLSVPtLSVK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/PLSVPtLSVPage"));
const KalimatTerbukaTertutupK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/plsv-ptlsv/KalimatTerbukaTertutupPage"));
const PengertianPLSVK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/plsv-ptlsv/PengertianPLSVPage"));
const PenyelesaianPLSVK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/plsv-ptlsv/PenyelesaianPLSVPage"));
const ModelMatematikaPLSVK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/plsv-ptlsv/ModelMatematikaPLSVPage"));
const PengertianPtLSVK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/plsv-ptlsv/PengertianPtLSVPage"));
const PenyelesaianPtLSVK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/plsv-ptlsv/PenyelesaianPtLSVPage"));
const ModelMatematikaPtLSVK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/plsv-ptlsv/ModelMatematikaPtLSVPage"));
const PerbandinganK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/PerbandinganPage"));
const PerbandinganUmumK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/perbandingan/PerbandinganUmumPage"));
const PerbandinganSenilaiK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/perbandingan/PerbandinganSenilaiPage"));
const PerbandinganCampuranK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/perbandingan/PerbandinganCampuranPage"));
const PerbandinganBertingkatK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/perbandingan/PerbandinganBertingkatPage"));
const PerbandinganSkalaK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/perbandingan/PerbandinganSkalaPage"));
const AritmetikaSosialK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/AritmetikaSosialPage"));
const JualBeliUntungRugiK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/aritmetika-sosial/JualBeliUntungRugiPage"));
const DiskonK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/aritmetika-sosial/DiskonPage"));
const BrutoNettoTaraK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/aritmetika-sosial/BrutoNettoTaraPage"));
const BungaTunggalK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/aritmetika-sosial/BungaTunggalPage"));
const PPNK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/aritmetika-sosial/PPNPage"));
const PPhK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/aritmetika-sosial/PPhPage"));
const GarisDanSudutK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/GarisDanSudutPage"));
const HubunganDuaGarisK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/garis-dan-sudut/HubunganDuaGarisPage"));
const SudutPelurusPenyikuBertolakK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/garis-dan-sudut/SudutPelurusPenyikuBertolakPage"));
const SifatSudutDuaGarisSejajarK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/garis-dan-sudut/SifatSudutDuaGarisSejajarPage"));
const JumlahSudutSegiBanyakK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/garis-dan-sudut/JumlahSudutPadaSegiBanyakPage"));
const SegitigaSegiempatK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/SegitigaSegiempatPage"));
const GarisBeratBagiTinggiLatihanK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/segitiga-segiempat/GarisBeratBagiTinggiPage"));
const KelilingSegitigaSegiempatLatihanK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/segitiga-segiempat/KelilingSegitigaSegiempatPage"));
const LuasSegitigaLatihanK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/segitiga-segiempat/LuasSegitigaPage"));
const LuasSegiempatLatihanK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/segitiga-segiempat/LuasSegiempatPage"));
const KelilingLuasBangunTakBeraturanLatihanK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/segitiga-segiempat/KelilingLuasBangunTakBeraturanPage"));
const PengertianKeanggotaanHimpunanLatihanK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/himpunan/PengertianKeanggotaanPage"));
const MenyatakanHimpunanLatihanK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/himpunan/MenyatakanHimpunanPage"));
const DiagramVennLatihanK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/himpunan/DiagramVennPage"));
const HimpunanBagianLatihanK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/himpunan/HimpunanBagianPage"));
const OperasiHimpunanLatihanK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/himpunan/OperasiHimpunanPage"));
const HimpunanK7Page = lazy(() => import("./pages/tugas-latihan-mandiri/HimpunanPage"));

// Kelas 8 Topic Pages
const PolaBilanganK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/PolaBilanganPage"));
const PengertianPolaK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/pola-bilangan/PengertianPolaPage"));
const PengertianDanPolaKhususK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/pola-bilangan/PengertianDanPolaKhususPage"));
const PolaKhususK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/pola-bilangan/PolaKhususPage"));
const PolaAritmetikaK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/pola-bilangan/PolaAritmetikaPage"));
const PolaGeometriK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/pola-bilangan/PolaGeometriPage"));
const KoordinatCartesiusK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/KoordinatCartesiusPage"));
const UnsurUnsurCartesiusK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/koordinat-cartesius/UnsurUnsurPage"));
const PosisiRelatifTitikAcuanK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/koordinat-cartesius/PosisiRelatifTitikAcuanPage"));
const JarakTitikGarisK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/koordinat-cartesius/JarakTitikGarisPage"));
const RelasiFungsiK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/RelasiFungsiPage"));
const PengertianRelasiK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/relasi-fungsi/PengertianRelasiPage"));
const PengertianFungsiK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/relasi-fungsi/PengertianFungsiPage"));
const BanyakFungsiK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/relasi-fungsi/BanyakFungsiPage"));
const NotasiFungsiK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/relasi-fungsi/NotasiFungsiPage"));
const GrafikFungsiK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/relasi-fungsi/GrafikFungsiPage"));
const SPLDVK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/SPLDVPage"));
const DefinisiSPLDVK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/spldv/DefinisiSPLDVPage"));
const MetodeGrafikSPLDVK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/spldv/MetodeGrafikPage"));
const MetodeSubstitusiSPLDVK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/spldv/MetodeSubstitusiPage"));
const MetodeEliminasiSPLDVK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/spldv/MetodeEliminasiPage"));
const MetodeCampuranSPLDVK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/spldv/MetodeCampuranPage"));
const ModelSPLDVK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/spldv/ModelSPLDVPage"));
const PenyelesaianMasalahSPLDVK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/spldv/PenyelesaianMasalahPage"));
const PersamaanGarisLurusK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/PersamaanGarisLurusPage"));
const GrafikPGLK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/persamaan-garis-lurus/GrafikPGLPage"));
const GradienK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/persamaan-garis-lurus/GradienPage"));
const MenentukanPGLK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/persamaan-garis-lurus/MenentukanPGLPage"));
const Hubungan2GarisK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/persamaan-garis-lurus/Hubungan2GarisPage"));
const AplikasiKontekstualPGLK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/persamaan-garis-lurus/AplikasiKontekstualPage"));
const TeoremaPythagorasK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/TeoremaPythagorasPage"));
const PembuktianPythagorasK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/teorema-pythagoras/PembuktianPage"));
const MenghitungPanjangPythagorasK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/teorema-pythagoras/MenghitungPanjangPage"));
const TriplePythagorasK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/teorema-pythagoras/TriplePythagorasPage"));
const JenisSegitigaPythagorasK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/teorema-pythagoras/JenisSegitigaPage"));
const SudutKhususPythagorasK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/teorema-pythagoras/SudutKhususPage"));
const MasalahKontekstualPythagorasK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/teorema-pythagoras/MasalahKontekstualPage"));
const LingkaranK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/LingkaranPage"));
const UnsurUnsurLingkaranK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/lingkaran/UnsurUnsurPage"));
const KelilingLuasLingkaranK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/lingkaran/KelilingLuasPage"));
const KaitanBangunDatarLingkaranK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/lingkaran/KaitanBangunDatarPage"));
const BusurJuringLingkaranK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/lingkaran/BusurJuringPage"));
const SudutPusatKelilingLingkaranK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/lingkaran/SudutPusatKelilingPage"));
const PenerapanKontekstualLingkaranK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/lingkaran/PenerapanKontekstualPage"));
const GarisSinggungLingkaranK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/GarisSinggungLingkaranPage"));
const PengertianGSLK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/garis-singgung-lingkaran/PengertianPage"));
const MenghitungPanjangGSLK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/garis-singgung-lingkaran/MenghitungPanjangPage"));
const GSPLK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/garis-singgung-lingkaran/GSPLPage"));
const GSPDK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/garis-singgung-lingkaran/GSPDPage"));
const SabukLilitanK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/garis-singgung-lingkaran/SabukLilitanPage"));
const BangunRuangSisiDatarK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/BangunRuangSisiDatarPage"));
const KubusLMK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/bangun-ruang-sisi-datar/KubusPage"));
const BalokLMK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/bangun-ruang-sisi-datar/BalokPage"));
const PrismaLMK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/bangun-ruang-sisi-datar/PrismaPage"));
const LimasLMK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/bangun-ruang-sisi-datar/LimasPage"));
const MasalahKontekstualBRSDLMK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/bangun-ruang-sisi-datar/MasalahKontekstualPage"));
const BRSDGabunganLMK8Page = lazy(() => import("./pages/tugas-latihan-mandiri/bangun-ruang-sisi-datar-gabungan/GabunganPage"));

// Kelas 9 Topic Pages
const BilanganBerpangkatK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/BilanganBerpangkatPage"));
const PengertianNotasiK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/bilangan-berpangkat/PengertianNotasiPage"));
const SifatSifatK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/bilangan-berpangkat/SifatSifatPage"));
const PangkatNolNegatifPecahanK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/bilangan-berpangkat/PangkatNolNegatifPecahanPage"));
const BentukAkarK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/bilangan-berpangkat/BentukAkarPage"));
const NotasiIlmiahK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/bilangan-berpangkat/NotasiIlmiahPage"));
const KesebangunanKekongruenK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/KesebangunanKekongruenPage"));
const DefinisiKesebangunanK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/kesebangunan-kekongruenan/DefinisiKesebangunanPage"));
const MenghitungRusukK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/kesebangunan-kekongruenan/MenghitungRusukPage"));
const SegitigaSebangunK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/kesebangunan-kekongruenan/SegitigaSebangunPage"));
const RasioRusukK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/kesebangunan-kekongruenan/RasioRusukPage"));
const KekongruenBangunDatarK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/kesebangunan-kekongruenan/KekongruenBangunDatarPage"));
const TransformasiGeometriK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/TransformasiGeometriPage"));
const TranslasiK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/transformasi-geometri/TranslasiPage"));
const RefleksiK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/transformasi-geometri/RefleksiPage"));
const RotasiK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/transformasi-geometri/RotasiPage"));
const DilatsiK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/transformasi-geometri/DilatsiPage"));
const BangunRuangSisiLengkungK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/BangunRuangSisiLengkungPage"));
const TabungLMK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/bangun-ruang-sisi-lengkung/TabungPage"));
const KerucutLMK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/bangun-ruang-sisi-lengkung/KerucutPage"));
const BolaLMK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/bangun-ruang-sisi-lengkung/BolaPage"));
const PerubahanVolumeLMK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/bangun-ruang-sisi-lengkung/PerubahanVolumePage"));
const GabunganLMK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/bangun-ruang-sisi-lengkung/GabunganPage"));
const StatistikaK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/StatistikaPage"));
const PengantarStatistikaLMK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/statistika/PengantarStatistikaPage"));
const PenyajianDataLMK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/statistika/PenyajianDataPage"));
const RataRataLMK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/statistika/RataRataPage"));
const MedianModusLMK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/statistika/MedianModusPage"));
const KuartilLMK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/statistika/KuartilPage"));
const PenyebaranDataLMK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/statistika/PenyebaranDataPage"));
const PeluangK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/PeluangPage"));
const RuangSampelLMK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/peluang/RuangSampelPage"));
const PeluangEmpirikLMK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/peluang/PeluangEmpirikPage"));
const PeluangTeoretikLMK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/peluang/PeluangTeoretikPage"));
const FrekuensiHarapanLMK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/peluang/FrekuensiHarapanPage"));
const KomplementLMK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/peluang/KomplementPage"));
const PeluangKejadianMajemukLMK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/peluang/PeluangKejadianMajemukPage"));
const PersamaanKuadratK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/PersamaanKuadratPage"));
const FungsiKuadratK9Page = lazy(() => import("./pages/tugas-latihan-mandiri/FungsiKuadratPage"));
const FKBentukUmumKarakteristikPage = lazy(() => import("./pages/tugas-latihan-mandiri/fungsi-kuadrat/BentukUmumKarakteristikPage"));
const FKTitikPotongPage = lazy(() => import("./pages/tugas-latihan-mandiri/fungsi-kuadrat/TitikPotongPage"));
const FKSumbuSimetriPage = lazy(() => import("./pages/tugas-latihan-mandiri/fungsi-kuadrat/SumbuSimetriPage"));
const FKMenggambarGrafikPage = lazy(() => import("./pages/tugas-latihan-mandiri/fungsi-kuadrat/MenggambarGrafikPage"));
const FKMenyusunFungsiPage = lazy(() => import("./pages/tugas-latihan-mandiri/fungsi-kuadrat/MenyusunFungsiPage"));
const FKPenerapanNilaiMaksMinPage = lazy(() => import("./pages/tugas-latihan-mandiri/fungsi-kuadrat/PenerapanNilaiMaksMinPage"));
const PKBentukUmumPage = lazy(() => import("./pages/tugas-latihan-mandiri/persamaan-kuadrat/BentukUmumPage"));
const PKPemfaktoranPage = lazy(() => import("./pages/tugas-latihan-mandiri/persamaan-kuadrat/PemfaktoranPage"));
const PKRumusKuadratikPage = lazy(() => import("./pages/tugas-latihan-mandiri/persamaan-kuadrat/RumusKuadratikPage"));
const PKPelengkapKuadratPage = lazy(() => import("./pages/tugas-latihan-mandiri/persamaan-kuadrat/PelengkapKuadratPage"));
const PKDiskriminanPage = lazy(() => import("./pages/tugas-latihan-mandiri/persamaan-kuadrat/DiskriminanPage"));
const PKMenyusunBaruPage = lazy(() => import("./pages/tugas-latihan-mandiri/persamaan-kuadrat/MenyusunPKBaruPage"));
const PKPenerapanKontekstualPage = lazy(() => import("./pages/tugas-latihan-mandiri/persamaan-kuadrat/PenerapanKontekstualPage"));

// Numatik Gamez Pages
const NumatikGamezPage = lazy(() => import("./pages/NumatikGamezPage"));
const NumatikGamezSmaMenuPage = lazy(() => import("./pages/NumatikGamezSmaMenuPage"));
const NumatikGamezSmaSubtopicPage = lazy(() => import("./pages/NumatikGamezSmaSubtopicPage"));
const NumatikGamezUmumPage = lazy(() => import("./pages/NumatikGamezUmumPage"));
const TetrisGamePage = lazy(() => import("./pages/numatik-gamez/umum/TetrisGamePage"));
const DinoRunGamePage = lazy(() => import("./pages/numatik-gamez/umum/DinoRunGamePage"));
const FlappyRocketPage = lazy(() => import("./pages/numatik-gamez/umum/FlappyRocketPage"));
const SnakeMathPage = lazy(() => import("./pages/numatik-gamez/umum/SnakeMathPage"));
const AsteroidBlasterPage = lazy(() => import("./pages/numatik-gamez/umum/AsteroidBlasterPage"));
const BrickBreakerPage = lazy(() => import("./pages/numatik-gamez/umum/BrickBreakerPage"));
const BattleTankPage = lazy(() => import("./pages/numatik-gamez/umum/BattleTankPage"));
const CoinTrainMathPage = lazy(() => import("./pages/numatik-gamez/umum/CoinTrainMathPage"));
const SpaceImpactPage = lazy(() => import("./pages/numatik-gamez/umum/SpaceImpactPage"));
const GalaxyDefenderPage = lazy(() => import("./pages/numatik-gamez/umum/GalaxyDefenderPage"));
const ZumaMathPage = lazy(() => import("./pages/numatik-gamez/umum/ZumaMathPage"));
const PacmanMathPage = lazy(() => import("./pages/numatik-gamez/umum/PacmanMathPage"));

// MGA - Kelas 7
const BilanganBulatMGAK7Page = lazy(() => import("./pages/numatik-gamez/BilanganBulatPage"));
const BilanganRasionalMGAK7Page = lazy(() => import("./pages/numatik-gamez/BilanganRasionalPage"));
const AljabarMGAK7Page = lazy(() => import("./pages/numatik-gamez/AljabarPage"));
const PLSVPtLSVMGAK7Page = lazy(() => import("./pages/numatik-gamez/PLSVPtLSVPage"));
const PerbandinganMGAK7Page = lazy(() => import("./pages/numatik-gamez/PerbandinganPage"));
const PenguranganBilanganBulatGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PenguranganGamePage"));
const PerkalianBilanganBulatGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PerkalianGamePage"));
const PembagianBilanganBulatGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PembagianGamePage"));
const OperasiCampuranBilanganBulatGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/OperasiCampuranGamePage"));
const KPKFPBGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/KPKFPBGamePage"));
const AritmetikaSosialMGAK7Page = lazy(() => import("./pages/numatik-gamez/AritmetikaSosialPage"));
const JualBeliUntungRugiGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/aritmetika-sosial/JualBeliUntungRugiGamePage"));
const DiskonGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/aritmetika-sosial/DiskonGamePage"));
const BrutoNettoTaraGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/aritmetika-sosial/BrutoNettoTaraGamePage"));
const PPNGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/aritmetika-sosial/PPNGamePage"));
const PPhGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/aritmetika-sosial/PPhGamePage"));
const GarisDanSudutMGAK7Page = lazy(() => import("./pages/numatik-gamez/GarisDanSudutPage"));
const SegitigaSegiempatMGAK7Page = lazy(() => import("./pages/numatik-gamez/SegitigaSegiempatPage"));
const HimpunanMGAK7Page = lazy(() => import("./pages/numatik-gamez/HimpunanPage"));

// MGA - Kelas 7 Pecahan
const ArtiPecahanGamePage = lazy(() => import("./pages/numatik-gamez/pecahan/ArtiPecahanGamePage"));
const PecahanCampuranGamePage = lazy(() => import("./pages/numatik-gamez/pecahan/PecahanCampuranGamePage"));
const PenjumlahanPecahanGamePage = lazy(() => import("./pages/numatik-gamez/pecahan/PenjumlahanPecahanGamePage"));
const PenguranganPecahanGamePage = lazy(() => import("./pages/numatik-gamez/pecahan/PenguranganPecahanGamePage"));
const PerkalianPecahanGamePage = lazy(() => import("./pages/numatik-gamez/pecahan/PerkalianPecahanGamePage"));
const PembagianPecahanGamePage = lazy(() => import("./pages/numatik-gamez/pecahan/PembagianPecahanGamePage"));
const BentukDesimalGamePage = lazy(() => import("./pages/numatik-gamez/pecahan/BentukDesimalGamePage"));
const PenjumlahanDesimalGamePage = lazy(() => import("./pages/numatik-gamez/pecahan/PenjumlahanDesimalGamePage"));
const PenguranganDesimalGamePage = lazy(() => import("./pages/numatik-gamez/pecahan/PenguranganDesimalGamePage"));
const PerkalianDesimalGamePage = lazy(() => import("./pages/numatik-gamez/pecahan/PerkalianDesimalGamePage"));
const PembagianDesimalGamePage = lazy(() => import("./pages/numatik-gamez/pecahan/PembagianDesimalGamePage"));
const PembulatanDesimalGamePage = lazy(() => import("./pages/numatik-gamez/pecahan/PembulatanDesimalGamePage"));

// MGA - Kelas 7 Aljabar
const PengertianUnsurAljabarGamePage = lazy(() => import("./pages/numatik-gamez/aljabar/PengertianUnsurGamePage"));
const PenjumlahanPenguranganAljabarGamePage = lazy(() => import("./pages/numatik-gamez/aljabar/PenjumlahanPenguranganAljabarGamePage"));
const PerkalianAljabarGamePage = lazy(() => import("./pages/numatik-gamez/aljabar/PerkalianAljabarGamePage"));
const PembagianAljabarGamePage = lazy(() => import("./pages/numatik-gamez/aljabar/PembagianAljabarGamePage"));
const PemangkatanAljabarGamePage = lazy(() => import("./pages/numatik-gamez/aljabar/PemangkatanAljabarGamePage"));
const SubstitusiAljabarGamePage = lazy(() => import("./pages/numatik-gamez/aljabar/SubstitusiAljabarGamePage"));
const FaktorisasiAljabarGamePage = lazy(() => import("./pages/numatik-gamez/aljabar/FaktorisasiAljabarGamePage"));
const OperasiPecahanAljabarGamePage = lazy(() => import("./pages/numatik-gamez/aljabar/OperasiPecahanAljabarGamePage"));

// MGA - Kelas 7 PLSV
const KalimatTerbukaGamePage = lazy(() => import("./pages/numatik-gamez/plsv/KalimatTerbukaGamePage"));
const PengertianPLSVGamePage = lazy(() => import("./pages/numatik-gamez/plsv/PengertianPLSVGamePage"));
const PenyelesaianPLSVGamePage = lazy(() => import("./pages/numatik-gamez/plsv/PenyelesaianPLSVGamePage"));
const ModelMatematikaPLSVGamePage = lazy(() => import("./pages/numatik-gamez/plsv/ModelMatematikaPLSVGamePage"));
const PengertianPtLSVGamePage = lazy(() => import("./pages/numatik-gamez/plsv/PengertianPtLSVGamePage"));
const PenyelesaianPtLSVGamePage = lazy(() => import("./pages/numatik-gamez/plsv/PenyelesaianPtLSVGamePage"));
const ModelMatematikaPtLSVGamePage = lazy(() => import("./pages/numatik-gamez/plsv/ModelMatematikaPtLSVGamePage"));

// MGA - Kelas 7 Perbandingan
const PerbandinganUmumGamePage = lazy(() => import("./pages/numatik-gamez/perbandingan/PerbandinganUmumGamePage"));
const PerbandinganSenilaiGamePage = lazy(() => import("./pages/numatik-gamez/perbandingan/PerbandinganSenilaiGamePage"));
const PerbandinganCampuranGamePage = lazy(() => import("./pages/numatik-gamez/perbandingan/PerbandinganCampuranGamePage"));
const PerbandinganBertingkatGamePage = lazy(() => import("./pages/numatik-gamez/perbandingan/PerbandinganBertingkatGamePage"));
const SkalaGamePage = lazy(() => import("./pages/numatik-gamez/perbandingan/SkalaGamePage"));

// MGA - Kelas 7 Garis Dan Sudut
const HubunganDuaGarisGamePage = lazy(() => import("./pages/numatik-gamez/garis-dan-sudut/HubunganDuaGarisGamePage"));
const SudutPelurusGamePage = lazy(() => import("./pages/numatik-gamez/garis-dan-sudut/SudutPelurusGamePage"));
const SifatSudutSejajarGamePage = lazy(() => import("./pages/numatik-gamez/garis-dan-sudut/SifatSudutSejajarGamePage"));
const JumlahSudutSegibanyakGamePage = lazy(() => import("./pages/numatik-gamez/garis-dan-sudut/JumlahSudutSegibanyakGamePage"));

// MGA - Kelas 7 Segitiga Segiempat
const GarisBeratBagiTinggiGamePage = lazy(() => import("./pages/numatik-gamez/segitiga-segiempat/GarisBeratBagiTinggiGamePage"));
const KelilingSegitigaSegiempatGamePage = lazy(() => import("./pages/numatik-gamez/segitiga-segiempat/KelilingGamePage"));
const LuasSegitigaGamePage = lazy(() => import("./pages/numatik-gamez/segitiga-segiempat/LuasSegitigaGamePage"));
const LuasSegiempatGamePage = lazy(() => import("./pages/numatik-gamez/segitiga-segiempat/LuasSegiempatGamePage"));
const BangunTakBeraturanGamePage = lazy(() => import("./pages/numatik-gamez/segitiga-segiempat/BangunTakBeraturanGamePage"));

// MGA - Kelas 7 Himpunan
const PengertianKeanggotaanHimpunanGamePage = lazy(() => import("./pages/numatik-gamez/himpunan/PengertianKeanggotaanGamePage"));
const HimpunanBerhingaKosongGamePage = lazy(() => import("./pages/numatik-gamez/himpunan/HimpunanBerhingaKosongGamePage"));
const DiagramVennGamePage = lazy(() => import("./pages/numatik-gamez/himpunan/DiagramVennGamePage"));
const PemecahanMasalahHimpunanGamePage = lazy(() => import("./pages/numatik-gamez/himpunan/PemecahanMasalahHimpunanGamePage"));
const BungaTunggalGamePage = lazy(() => import("./pages/numatik-gamez/aritmetika-sosial/BungaTunggalGamePage"));

// MGA - Kelas 7 Bilangan Bulat game variants
const PenjumlahanBilanganBulatGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PenjumlahanGamePage"));
const PenjumlahanMeteorGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PenjumlahanMeteorGamePage"));
const PenjumlahanTurtleRunGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PenjumlahanTurtleRunGamePage"));
const PenjumlahanFlappyRocketGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PenjumlahanFlappyRocketGamePage"));
const PenjumlahanTembakTankGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PenjumlahanTembakTankGamePage"));
const PenjumlahanSpaceImpactGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PenjumlahanSpaceImpactGamePage"));
const PenjumlahanTetrisGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PenjumlahanTetrisGamePage"));
const PenjumlahanSnakeMathGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PenjumlahanSnakeMathGamePage"));
const PenguranganMeteorGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PenguranganMeteorGamePage"));
const PenguranganFlappyRocketGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PenguranganFlappyRocketGamePage"));
const PenguranganTembakTankGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PenguranganTembakTankGamePage"));
const PenguranganSpaceImpactGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PenguranganSpaceImpactGamePage"));
const PenguranganTurtleRunGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PenguranganTurtleRunGamePage"));
const PenguranganTetrisGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PenguranganTetrisGamePage"));
const PenguranganSnakeMathGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PenguranganSnakeMathGamePage"));
const PerkalianMeteorGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PerkalianMeteorGamePage"));
const PerkalianFlappyRocketGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PerkalianFlappyRocketGamePage"));
const PerkalianTembakTankGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PerkalianTembakTankGamePage"));
const PerkalianSpaceImpactGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PerkalianSpaceImpactGamePage"));
const PerkalianTurtleRunGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PerkalianTurtleRunGamePage"));
const PerkalianTetrisGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PerkalianTetrisGamePage"));
const PerkalianSnakeMathGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PerkalianSnakeMathGamePage"));
const PembagianMeteorGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PembagianMeteorGamePage"));
const PembagianFlappyRocketGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PembagianFlappyRocketGamePage"));
const PembagianTembakTankGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PembagianTembakTankGamePage"));
const PembagianSpaceImpactGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PembagianSpaceImpactGamePage"));
const PembagianTurtleRunGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PembagianTurtleRunGamePage"));
const PembagianTetrisGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PembagianTetrisGamePage"));
const PembagianSnakeMathGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PembagianSnakeMathGamePage"));
const OperasiCampuranMeteorGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/OperasiCampuranMeteorGamePage"));
const OperasiCampuranFlappyRocketGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/OperasiCampuranFlappyRocketGamePage"));
const OperasiCampuranTembakTankGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/OperasiCampuranTembakTankGamePage"));
const OperasiCampuranSpaceImpactGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/OperasiCampuranSpaceImpactGamePage"));
const OperasiCampuranTurtleRunGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/OperasiCampuranTurtleRunGamePage"));
const OperasiCampuranTetrisGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/OperasiCampuranTetrisGamePage"));
const OperasiCampuranSnakeMathGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/OperasiCampuranSnakeMathGamePage"));
const KPKFPBMeteorGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/KPKFPBMeteorGamePage"));
const KPKFPBFlappyRocketGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/KPKFPBFlappyRocketGamePage"));
const KPKFPBTembakTankGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/KPKFPBTembakTankGamePage"));
const KPKFPBSpaceImpactGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/KPKFPBSpaceImpactGamePage"));
const KPKFPBTurtleRunGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/KPKFPBTurtleRunGamePage"));
const KPKFPBTetrisGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/KPKFPBTetrisGamePage"));
const KPKFPBSnakeMathGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/KPKFPBSnakeMathGamePage"));
const PenjumlahanMeteorPantulGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PenjumlahanMeteorPantulGamePage"));
const PenguranganMeteorPantulGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PenguranganMeteorPantulGamePage"));
const PerkalianMeteorPantulGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PerkalianMeteorPantulGamePage"));
const PembagianMeteorPantulGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PembagianMeteorPantulGamePage"));
const OperasiCampuranMeteorPantulGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/OperasiCampuranMeteorPantulGamePage"));
const KPKFPBMeteorPantulGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/KPKFPBMeteorPantulGamePage"));
const PenjumlahanGalaksiTempurGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PenjumlahanGalaksiTempurGamePage"));
const PenguranganGalaksiTempurGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PenguranganGalaksiTempurGamePage"));
const PerkalianGalaksiTempurGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PerkalianGalaksiTempurGamePage"));
const PembagianGalaksiTempurGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PembagianGalaksiTempurGamePage"));
const OperasiCampuranGalaksiTempurGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/OperasiCampuranGalaksiTempurGamePage"));
const KPKFPBGalaksiTempurGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/KPKFPBGalaksiTempurGamePage"));
const PenjumlahanZumMathGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PenjumlahanZumMathGamePage"));
const PenguranganZumMathGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PenguranganZumMathGamePage"));
const PerkalianZumMathGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PerkalianZumMathGamePage"));
const PembagianZumMathGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PembagianZumMathGamePage"));
const OperasiCampuranZumMathGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/OperasiCampuranZumMathGamePage"));
const KPKFPBZumMathGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/KPKFPBZumMathGamePage"));
const PenjumlahanPacMathGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PenjumlahanPacMathGamePage"));
const PenguranganPacMathGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PenguranganPacMathGamePage"));
const PerkalianPacMathGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PerkalianPacMathGamePage"));
const PembagianPacMathGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/PembagianPacMathGamePage"));
const OperasiCampuranPacMathGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/OperasiCampuranPacMathGamePage"));
const KPKFPBPacMathGameMGAK7Page = lazy(() => import("./pages/numatik-gamez/bilangan-bulat/KPKFPBPacMathGamePage"));

// MGA - Kelas 8 Topic Pages
const PolaBilanganMGAK8Page = lazy(() => import("./pages/numatik-gamez/PolaBilanganPage"));
const KoordinatCartesiusMGAK8Page = lazy(() => import("./pages/numatik-gamez/KoordinatCartesiusPage"));
const RelasiFungsiMGAK8Page = lazy(() => import("./pages/numatik-gamez/RelasiFungsiPage"));
const SPLDVMGAK8Page = lazy(() => import("./pages/numatik-gamez/SPLDVPage"));
const PersamaanGarisLurusMGAK8Page = lazy(() => import("./pages/numatik-gamez/PersamaanGarisLurusPage"));
const GradienPGLGameK8Page = lazy(() => import("./pages/numatik-gamez/persamaan-garis-lurus/GradienGamePage"));
const GrafikPGLGameK8Page = lazy(() => import("./pages/numatik-gamez/persamaan-garis-lurus/GrafikPGLGamePage"));
const Hubungan2GarisGameK8Page = lazy(() => import("./pages/numatik-gamez/persamaan-garis-lurus/Hubungan2GarisGamePage"));
const MenentukanPGLGameK8Page = lazy(() => import("./pages/numatik-gamez/persamaan-garis-lurus/MenentukanPGLGamePage"));
const AplikasiKontekstualPGLGameK8Page = lazy(() => import("./pages/numatik-gamez/persamaan-garis-lurus/AplikasiKontekstualPGLGamePage"));
const TeoremaPythagorasMGAK8Page = lazy(() => import("./pages/numatik-gamez/TeoremaPythagorasPage"));
const LingkaranMGAK8Page = lazy(() => import("./pages/numatik-gamez/LingkaranPage"));
const GarisSinggungLingkaranMGAK8Page = lazy(() => import("./pages/numatik-gamez/GarisSinggungLingkaranPage"));
const BangunRuangSisiDatarMGAK8Page = lazy(() => import("./pages/numatik-gamez/BangunRuangSisiDatarPage"));
const NumatikGamezChooserResolver = lazy(() =>
  import("./components/NumatikGamezRouteResolver").then((module) => ({
    default: module.NumatikGamezChooserResolver,
  })),
);
const NumatikGamezDispatcherResolver = lazy(() =>
  import("./components/NumatikGamezRouteResolver").then((module) => ({
    default: module.NumatikGamezDispatcherResolver,
  })),
);

// MGA - Kelas 9 Topic Pages
const BilanganBerpangkatMGAK9Page = lazy(() => import("./pages/numatik-gamez/BilanganBerpangkatPage"));
const KesebangunanKekongruenMGAK9Page = lazy(() => import("./pages/numatik-gamez/KesebangunanKekongruenPage"));
const TransformasiGeometriMGAK9Page = lazy(() => import("./pages/numatik-gamez/TransformasiGeometriPage"));
const BangunRuangSisiLengkungMGAK9Page = lazy(() => import("./pages/numatik-gamez/BangunRuangSisiLengkungPage"));
const StatistikaMGAK9Page = lazy(() => import("./pages/numatik-gamez/StatistikaPage"));
const PeluangMGAK9Page = lazy(() => import("./pages/numatik-gamez/PeluangPage"));
const PersamaanKuadratMGAK9Page = lazy(() => import("./pages/numatik-gamez/PersamaanKuadratPage"));
const FungsiKuadratMGAK9Page = lazy(() => import("./pages/numatik-gamez/FungsiKuadratPage"));
// Buku Animasi Matematika
const BukuAnimasiMatematikaPage = lazy(() => import("./pages/BukuAnimasiMatematikaPage"));
const BukuAnimasiMatematikaKelas7Page = lazy(() => import("./pages/BukuAnimasiMatematikaKelas7Page"));
const BukuAnimasiMatematikaKelas8Page = lazy(() => import("./pages/BukuAnimasiMatematikaKelas8Page"));
const BukuAnimasiMatematikaKelas9Page = lazy(() => import("./pages/BukuAnimasiMatematikaKelas9Page"));
const BilanganBulatMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/BilanganBulatPage"));
const PenjumlahanBilanganBulatMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/bilangan-bulat/PenjumlahanPage"));
const BukuAnimasiPenjumlahanBilanganBulatPage = lazy(() => import("./pages/buku-animasi-matematika/bilangan-bulat/BukuAnimasiPenjumlahanPage"));
const PenguranganBilanganBulatMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/bilangan-bulat/PenguranganPage"));
const PerkalianBilanganBulatMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/bilangan-bulat/PerkalianPage"));
const PembagianBilanganBulatMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/bilangan-bulat/PembagianPage"));
const OperasiCampuranBilanganBulatMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/bilangan-bulat/OperasiCampuranPage"));
const KPKFPBBilanganBulatMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/bilangan-bulat/KPKFPBPage"));
const BilanganRasionalMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/BilanganRasionalPage"));
const ArtiPecahanMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/bilangan-rasional/ArtiPecahanPage"));
const PecahanCampuranMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/bilangan-rasional/PecahanCampuranPage"));
const PenjumlahanPenguranganMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganPage"));
const PerkalianPecahanMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/bilangan-rasional/PerkalianPecahanPage"));
const PembagianPecahanMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/bilangan-rasional/PembagianPecahanPage"));
const BentukDesimalMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/bilangan-rasional/BentukDesimalPage"));
const PenjumlahanPenguranganBentukDesimalMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/bilangan-rasional/PenjumlahanPenguranganBentukDesimalPage"));
const PerkalianBentukDesimalMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/bilangan-rasional/PerkalianBentukDesimalPage"));
const PembagianBentukDesimalMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/bilangan-rasional/PembagianBentukDesimalPage"));
const PembulatanBentukDesimalMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/bilangan-rasional/PembulatanBentukDesimalPage"));
const AljabarMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/AljabarPage"));
const PengertianUnsurMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/aljabar/PengertianUnsurPage"));
const PenjumlahanPenguranganAljabarMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/aljabar/PenjumlahanPenguranganPage"));
const PerkalianAljabarMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/aljabar/PerkalianPage"));
const PembagianAljabarMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/aljabar/PembagianPage"));
const PemangkatanAljabarMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/aljabar/PemangkatanPage"));
const SubstitusiAljabarMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/aljabar/SubstitusiPage"));
const FaktorisasiAljabarMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/aljabar/FaktorisasiPage"));
const OperasiPecahanAljabarMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/aljabar/OperasiPecahanPage"));
const PLSVPtLSVMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/PLSVPtLSVPage"));
const KalimatTerbukaTertutupPage = lazy(() => import("./pages/buku-animasi-matematika/plsv-ptlsv/KalimatTerbukaTertutupPage"));
const PengertianPLSVPage = lazy(() => import("./pages/buku-animasi-matematika/plsv-ptlsv/PengertianPLSVPage"));
const PenyelesaianPLSVPage = lazy(() => import("./pages/buku-animasi-matematika/plsv-ptlsv/PenyelesaianPLSVPage"));
const ModelMatematikaPLSVPage = lazy(() => import("./pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPLSVPage"));
const PengertianPtLSVPage = lazy(() => import("./pages/buku-animasi-matematika/plsv-ptlsv/PengertianPtLSVPage"));
const PenyelesaianPtLSVPage = lazy(() => import("./pages/buku-animasi-matematika/plsv-ptlsv/PenyelesaianPtLSVPage"));
const ModelMatematikaPtLSVPage = lazy(() => import("./pages/buku-animasi-matematika/plsv-ptlsv/ModelMatematikaPtLSVPage"));
const PerbandinganMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/PerbandinganPage"));
const PerbandinganUmumMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/perbandingan/PerbandinganUmumPage"));
const PerbandinganSenilaiMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/perbandingan/PerbandinganSenilaiPage"));
const PerbandinganCampuranMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/perbandingan/PerbandinganCampuranPage"));
const PerbandinganBertingkatMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/perbandingan/PerbandinganBertingkatPage"));
const SkalaMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/perbandingan/SkalaPage"));
const AritmetikaSosialMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/AritmetikaSosialPage"));
const JualBeliUntungRugiMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/aritmetika-sosial/JualBeliUntungRugiPage"));
const DiskonMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/aritmetika-sosial/DiskonPage"));
const BrutoNettoTaraMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/aritmetika-sosial/BrutoNettoTaraPage"));
const BungaTunggalMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/aritmetika-sosial/BungaTunggalPage"));
const PPNMMk7Page = lazy(() => import("./pages/buku-animasi-matematika/aritmetika-sosial/PPNPage"));
const PPhMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/aritmetika-sosial/PPhPage"));
const GarisDanSudutMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/GarisDanSudutPage"));
const HubunganDuaGarisMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/garis-dan-sudut/HubunganDuaGarisPage"));
const SudutPelurusPenyikuBertolakMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/garis-dan-sudut/SudutPelurusPenyikuBertolakPage"));
const SifatSudutDuaGarisSejajarPage = lazy(() => import("./pages/buku-animasi-matematika/garis-dan-sudut/SifatSudutDuaGarisSejajarPage"));
const JumlahSudutSegiBanyakPage = lazy(() => import("./pages/buku-animasi-matematika/garis-dan-sudut/JumlahSudutSegiBanyakPage"));
const SegitigaSegiempatMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/SegitigaSegiempatPage"));
const GarisBeratBagiTinggiPage = lazy(() => import("./pages/buku-animasi-matematika/segitiga-segiempat/GarisBeratBagiTinggiPage"));
const KelilingSegitigaSegiempatPage = lazy(() => import("./pages/buku-animasi-matematika/segitiga-segiempat/KelilingSegitigaSegiempatPage"));
const LuasSegitigaPage = lazy(() => import("./pages/buku-animasi-matematika/segitiga-segiempat/LuasSegitigaPage"));
const LuasSegiempatPage = lazy(() => import("./pages/buku-animasi-matematika/segitiga-segiempat/LuasSegiempatPage"));
const KelilingLuasBangunTakBeraturanPage = lazy(() => import("./pages/buku-animasi-matematika/segitiga-segiempat/KelilingLuasBangunTakBeraturanPage"));
const KubusMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/bangun-ruang-sisi-datar/KubusPage"));
const BalokMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/bangun-ruang-sisi-datar/BalokPage"));
const PrismaMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/bangun-ruang-sisi-datar/PrismaPage"));
const LimasMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/bangun-ruang-sisi-datar/LimasPage"));
const GabunganMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/bangun-ruang-sisi-datar/GabunganPage"));
const HimpunanMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/HimpunanPage"));
const PengertianKeanggotaanHimpunanPage = lazy(() => import("./pages/buku-animasi-matematika/himpunan/PengertianKeanggotaanPage"));
const JenisHimpunanPage = lazy(() => import("./pages/buku-animasi-matematika/himpunan/JenisHimpunanPage"));
const OperasiHimpunanMMK7Page = lazy(() => import("./pages/buku-animasi-matematika/himpunan/OperasiHimpunanPage"));
const DiagramVennPage = lazy(() => import("./pages/buku-animasi-matematika/himpunan/DiagramVennPage"));
const PemecahanMasalahHimpunanPage = lazy(() => import("./pages/buku-animasi-matematika/himpunan/PemecahanMasalahHimpunanPage"));

// Buku Animasi Matematika - Kelas 8
const PolaBilanganMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/PolaBilanganPage"));
const PengertianPolaMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/pola-bilangan/PengertianPolaPage"));
const PolaKhususMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/pola-bilangan/PolaKhususPage"));
const PolaAritmetikaMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/pola-bilangan/PolaAritmetikaPage"));
const PolaGeometriMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/pola-bilangan/PolaGeometriPage"));
const KoordinatCartesiusMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/KoordinatCartesiusPage"));
const UnsurUnsurCartesiusMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/koordinat-cartesius/UnsurUnsurCartesiusPage"));
const PosisiRelatifTitikAcuanMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikAcuanPage"));
const JarakTitikGarisMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/koordinat-cartesius/JarakTitikGarisPage"));
const PosisiRelatifGarisMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifGarisPage"));
const PosisiRelatifTitikDanGarisMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/koordinat-cartesius/PosisiRelatifTitikDanGarisPage"));
const RelasiFungsiMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/RelasiFungsiPage"));
const PengertianRelasiMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/relasi-fungsi/PengertianRelasiPage"));
const PengertianFungsiMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/relasi-fungsi/PengertianFungsiPage"));
const BanyakFungsiMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/relasi-fungsi/BanyakFungsiPage"));
const BukuAnimasiBanyakFungsiPage = lazy(() => import("./pages/buku-animasi-matematika/relasi-fungsi/BukuAnimasiBanyakFungsiPage"));
const NotasiFungsiMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/relasi-fungsi/NotasiFungsiPage"));
const GrafikFungsiMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/relasi-fungsi/GrafikFungsiPage"));
const SPLDVMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/SPLDVPage"));
const DefinisiSPLDVMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/spldv/DefinisiSPLDVPage"));
const MetodeGrafikMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/spldv/MetodeGrafikPage"));
const MetodeSubstitusiMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/spldv/MetodeSubstitusiPage"));
const MetodeEliminasiMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/spldv/MetodeEliminasiPage"));
const MetodeCampuranMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/spldv/MetodeCampuranPage"));
const ModelSPLDVMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/spldv/ModelSPLDVPage"));
const PenyelesaianMasalahSPLDVMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/spldv/PenyelesaianMasalahSPLDVPage"));
const PersamaanGarisLurusMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/PersamaanGarisLurusPage"));
const GrafikPGLMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/persamaan-garis-lurus/GrafikPGLPage"));
const GradienMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/persamaan-garis-lurus/GradienPage"));
const MenentukanPGLMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/persamaan-garis-lurus/MenentukanPGLPage"));
const Hubungan2GarisMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/persamaan-garis-lurus/Hubungan2GarisPage"));
const AplikasiKontekstualMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/persamaan-garis-lurus/AplikasiKontekstualPage"));
const TeoremaPythagorasMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/TeoremaPythagorasPage"));
const PembuktianPythagorasMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/teorema-pythagoras/PembuktianPage"));
const MenghitungPanjangPythagorasMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/teorema-pythagoras/MenghitungPanjangPage"));
const TriplePythagorasMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/teorema-pythagoras/TriplePythagorasPage"));
const JenisSegitigaPythagorasMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/teorema-pythagoras/JenisSegitigaPage"));
const SudutKhususPythagorasMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/teorema-pythagoras/SudutKhususPage"));
const MasalahKontekstualPythagorasMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/teorema-pythagoras/MasalahKontekstualPage"));
const LingkaranMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/LingkaranPage"));
const UnsurUnsurLingkaranMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/lingkaran/UnsurUnsurPage"));
const KelilingLuasLingkaranMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/lingkaran/KelilingLuasPage"));
const KaitanBangunDatarLingkaranMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarPage"));
const KaitanBangunDatarLainnyaLingkaranMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/lingkaran/KaitanBangunDatarLainnyaPage"));
const BusurJuringLingkaranMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/lingkaran/BusurJuringPage"));
const SudutPusatKelilingLingkaranMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/lingkaran/SudutPusatKelilingPage"));
const PenerapanKontekstualLingkaranMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/lingkaran/PenerapanKontekstualPage"));
const GarisSinggungLingkaranMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/GarisSinggungLingkaranPage"));
const PengertianGSLMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/garis-singgung-lingkaran/PengertianPage"));
const MenghitungPanjangGSLMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/garis-singgung-lingkaran/MenghitungPanjangPage"));
const GSPLMMk8Page = lazy(() => import("./pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPLPage"));
const GSPDMMk8Page = lazy(() => import("./pages/buku-animasi-matematika/garis-singgung-lingkaran/GSPDPage"));
const SabukLilitanMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/garis-singgung-lingkaran/SabukLilitanPage"));
const BangunRuangSisiDatarMMK8Page = lazy(() => import("./pages/buku-animasi-matematika/BangunRuangSisiDatarPage"));

// Buku Animasi Matematika - Kelas 9
const BilanganBerpangkatMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/BilanganBerpangkatPage"));
const PengertianNotasiPangkatMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/bilangan-berpangkat/PengertianNotasiPangkatPage"));
const SifatSifatOperasiMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/bilangan-berpangkat/SifatSifatOperasiPage"));
const BentukAkarMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/bilangan-berpangkat/BentukAkarPage"));
const NotasiIlmiahMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/bilangan-berpangkat/NotasiIlmiahPage"));
const KesebangunanKekongruenMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/KesebangunanKekongruenPage"));
const DefinisiKesebangunanMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/kesebangunan-kekongruenan/DefinisiPage"));
const MenghitungRusukMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/kesebangunan-kekongruenan/MenghitungRusukPage"));
const SegitigaSebangunMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/kesebangunan-kekongruenan/SegitigaSebangunPage"));
const PerbandinganRusukSikuSikuMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/kesebangunan-kekongruenan/PerbandinganRusukSikuSikuPage"));
const KekongruenBangunDatarMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/kesebangunan-kekongruenan/KekongruenBangunDatarPage"));
const TransformasiGeometriMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/TransformasiGeometriPage"));
const TranslasiMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/transformasi-geometri/TranslasiPage"));
const RefleksiMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/transformasi-geometri/RefleksiPage"));
const RotasiMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/transformasi-geometri/RotasiPage"));
const DilatasisMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/transformasi-geometri/DilatasisPage"));
const BangunRuangSisiLengkungMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/BangunRuangSisiLengkungPage"));
const TabungMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/TabungPage"));
const KerucutMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/KerucutPage"));
const BolaMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/BolaPage"));
const PerubahanVolumeMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/PerubahanVolumePage"));
const GabunganMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/bangun-ruang-sisi-lengkung/GabunganPage"));
const StatistikaMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/StatistikaPage"));
const PengantarStatistikaMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/statistika/PengantarStatistikaPage"));
const PenyajianDataMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/statistika/PenyajianDataPage"));
const RataRataMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/statistika/RataRataPage"));
const MedianModusMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/statistika/MedianModusPage"));
const KuartilMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/statistika/KuartilPage"));
const PenyebaranDataMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/statistika/PenyebaranDataPage"));
const PeluangMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/PeluangPage"));
const RuangSampelMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/peluang/RuangSampelPage"));
const PeluangEmpirikMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/peluang/PeluangEmpirikPage"));
const PeluangTeoretikMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/peluang/PeluangTeoretikPage"));
const FrekuensiHarapanMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/peluang/FrekuensiHarapanPage"));
const KomplementMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/peluang/KomplementPage"));
const PeluangKejadianMajemukMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/peluang/PeluangKejadianMajemukPage"));
const PersamaanKuadratMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/PersamaanKuadratPage"));
const PKMMBentukUmumPage = lazy(() => import("./pages/buku-animasi-matematika/persamaan-kuadrat/BentukUmumPage"));
const PKMMPemfaktoranPage = lazy(() => import("./pages/buku-animasi-matematika/persamaan-kuadrat/PemfaktoranPage"));
const PKMMRumusKuadratikPage = lazy(() => import("./pages/buku-animasi-matematika/persamaan-kuadrat/RumusKuadratikPage"));
const PKMMPelengkapKuadratPage = lazy(() => import("./pages/buku-animasi-matematika/persamaan-kuadrat/PelengkapKuadratPage"));
const PKMMDiskriminanPage = lazy(() => import("./pages/buku-animasi-matematika/persamaan-kuadrat/DiskriminanPage"));
const PKMMMenyusunBaruPage = lazy(() => import("./pages/buku-animasi-matematika/persamaan-kuadrat/MenyusunPKBaruPage"));
const PKMMPenerapanKontekstualPage = lazy(() => import("./pages/buku-animasi-matematika/persamaan-kuadrat/PenerapanKontekstualPage"));
const FungsiKuadratMMK9Page = lazy(() => import("./pages/buku-animasi-matematika/FungsiKuadratPage"));
const FKMMBentukUmumKarakteristikPage = lazy(() => import("./pages/buku-animasi-matematika/fungsi-kuadrat/BentukUmumKarakteristikPage"));
const FKMMTitikPotongPage = lazy(() => import("./pages/buku-animasi-matematika/fungsi-kuadrat/TitikPotongPage"));
const FKMMSumbuSimetriPage = lazy(() => import("./pages/buku-animasi-matematika/fungsi-kuadrat/SumbuSimetriPage"));
const FKMMMenggambarGrafikPage = lazy(() => import("./pages/buku-animasi-matematika/fungsi-kuadrat/MenggambarGrafikPage"));
const FKMMMenyusunFungsiPage = lazy(() => import("./pages/buku-animasi-matematika/fungsi-kuadrat/MenyusunFungsiPage"));
const FKMMPenerapanNilaiMaksMinPage = lazy(() => import("./pages/buku-animasi-matematika/fungsi-kuadrat/PenerapanNilaiMaksMinPage"));

// ── App setup ──────────────────────────────────────────────────────────────
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
    },
  },
});

const scrollPositionsByPath = new Map<string, number>();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, scrollPositionsByPath.get(pathname) ?? 0);

    const saveScrollPosition = () => {
      scrollPositionsByPath.set(pathname, window.scrollY);
    };

    window.addEventListener("scroll", saveScrollPosition, { passive: true });
    return () => window.removeEventListener("scroll", saveScrollPosition);
  }, [pathname]);
  return null;
};

const hidePracticeGradeLabels = () => {
  const practiceRoute = document.querySelector(".tugas-latihan-mandiri-route");
  if (!practiceRoute) return;

  practiceRoute.querySelectorAll<HTMLElement>("p, span").forEach((element) => {
    const text = element.textContent?.trim().replace(/\s+/g, " ");
    if (text && /^(?:✦\s*)?(?:Kelas|Grade)\s+[789](?:\s*(?:·|—|-).*)?$/.test(text)) {
      element.hidden = true;
    }
  });
};

const AppInner = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const handleInteraction = () => {
      startGlobalAmbient();
      window.removeEventListener("click", handleInteraction);
    };
    window.addEventListener("click", handleInteraction);
    return () => window.removeEventListener("click", handleInteraction);
  }, []);

  // GA4: init once on mount
  useEffect(() => {
    initGA();
  }, []);

  // GA4: track route changes
  const { pathname } = useLocation();
  const sidebarMenuItems = MENU_ITEMS.filter((item) => item.group !== "featured");
  const activeMenuItem = sidebarMenuItems.find((item) => pathname === item.path)
    ?? sidebarMenuItems
      .filter((item) => pathname.startsWith(`${item.path}/`))
      .sort((left, right) => right.path.length - left.path.length)[0];
  const activeMenuTab: MenuSidebarTab = activeMenuItem?.group === "learn"
    || activeMenuItem?.group === "practice"
    || activeMenuItem?.group === "games"
    || activeMenuItem?.group === "tools"
    || activeMenuItem?.group === "more"
    ? activeMenuItem.group
    : "home";

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  useEffect(() => {
    hidePracticeGradeLabels();
    const observer = new MutationObserver(hidePracticeGradeLabels);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <div className={[
          /^\/buku-animasi-matematika\/kelas-[789](?:\/.*)?$/.test(pathname) ? "animation-submaterial-route" : "",
          pathname.startsWith("/tugas-latihan-mandiri") ? "tugas-latihan-mandiri-route" : "",
          activeMenuItem ? "menu-route-layout" : "",
        ].filter(Boolean).join(" ") || undefined}>
        {activeMenuItem && (
          <MenuSidebar
            activeTab={activeMenuTab}
            activePath={activeMenuItem.path}
            onHomeClick={() => navigate("/menu")}
          />
        )}
        <div className={activeMenuItem ? "menu-route-content" : undefined}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/exam-browser" element={<Navigate to="/ruang-untuk-guru/exam-browser" replace />} />
  <Route path="/uji-mandiri" element={<UjiMandiriPage />} />
          <Route path="/lkpd" element={<LKPDMenuPage />} />
          <Route path="/lkpd/kelas-7" element={<LegacyLKPDRedirect />} />
          <Route path="/lkpd/kelas-7/*" element={<LegacyLKPDRedirect />} />
          <Route path="/lkpd/kelas-8" element={<LegacyLKPDRedirect />} />
          <Route path="/lkpd/kelas-8/*" element={<LegacyLKPDRedirect />} />
          <Route path="/lkpd/kelas-9" element={<LegacyLKPDRedirect />} />
          <Route path="/lkpd/kelas-9/*" element={<LegacyLKPDRedirect />} />
          <Route path="/lkpd/perbandingan" element={<LKPDPerbandinganPage />} />
          <Route path="/lkpd/perbandingan/umum" element={<LKPDPage />} />
          <Route path="/lkpd/perbandingan/bertingkat" element={<BertingkatLKPDPage />} />
          <Route path="/lkpd/perbandingan/senilai-berbalik" element={<SenilaiLKPDPage />} />
          <Route path="/lkpd/perbandingan/skala" element={<SkalaLKPDPage />} />
          <Route path="/lkpd/perbandingan/campuran" element={<CampuranLKPDPage />} />
          <Route path="/lkpd/bilangan-bulat" element={<BilanganBulatMenuPage />} />
          <Route path="/lkpd/bilangan-bulat/penjumlahan" element={<PenjumlahanLKPDPage />} />
          <Route path="/lkpd/bilangan-bulat/pengurangan" element={<PenguranganLKPDPage />} />
          <Route path="/lkpd/bilangan-bulat/perkalian" element={<PerkalianLKPDPage />} />
          <Route path="/lkpd/bilangan-bulat/pembagian" element={<PembagianLKPDPage />} />
          <Route path="/lkpd/bilangan-bulat/operasi-campuran" element={<OperasiCampuranLKPDPage />} />
          <Route path="/lkpd/bilangan-bulat/kpk-fpb" element={<KPKFPBLKPDPage />} />
          <Route path="/lkpd/bilangan-bulat/pesawat-tembak-meteor" element={<PesawatTembakMeteorPage />} />
          <Route path="/lkpd/bilangan-bulat/penjumlahan/pesawat-tembak-meteor" element={<PesawatTembakMeteorPenjumlahanPage />} />
          <Route path="/lkpd/bilangan-rasional" element={<BilanganRasionalMenuPage />} />
          <Route path="/lkpd/bilangan-rasional/arti-pecahan" element={<ArtiPecahanLKPDPage />} />
          <Route path="/lkpd/bilangan-rasional/pecahan-campuran" element={<PecahanCampuranLKPDPage />} />
          <Route path="/lkpd/bilangan-rasional/penjumlahan-pengurangan" element={<PenjumlahanPenguranganPecahanLKPDPage />} />
          <Route path="/lkpd/bilangan-rasional/perkalian" element={<PerkalianPecahanLKPDPage />} />
          <Route path="/lkpd/bilangan-rasional/pembagian" element={<PembagianPecahanLKPDPage />} />
          <Route path="/lkpd/bilangan-rasional/bentuk-desimal" element={<BentukDesimalLKPDPage />} />
          <Route path="/lkpd/bilangan-rasional/operasi-desimal" element={<OperasiDesimalLKPDPage />} />
          <Route path="/lkpd/aljabar" element={<AljabarMenuPage />} />
          <Route path="/lkpd/aljabar/pengertian-unsur" element={<PengertianUnsurAljabarLKPDPage />} />
          <Route path="/lkpd/aljabar/penjumlahan-pengurangan" element={<PenjumlahanPenguranganAljabarLKPDPage />} />
          <Route path="/lkpd/aljabar/perkalian-pembagian" element={<PerkalianPembagianAljabarLKPDPage />} />
          <Route path="/lkpd/aljabar/substitusi" element={<SubstitusiAljabarLKPDPage />} />
          <Route path="/lkpd/aljabar/faktorisasi" element={<FaktorisasiAljabarLKPDPage />} />
          <Route path="/lkpd/plsv-ptlsv" element={<PLSVPtLSVMenuPage />} />
          <Route path="/lkpd/plsv-ptlsv/kalimat-terbuka-tertutup" element={<KalimatTerbukaTertutupLKPDPage />} />
          <Route path="/lkpd/plsv-ptlsv/pengertian-plsv" element={<PengertianPLSVLKPDPage />} />
          <Route path="/lkpd/plsv-ptlsv/penyelesaian-plsv" element={<PenyelesaianPLSVLKPDPage />} />
          <Route path="/lkpd/plsv-ptlsv/model-matematika-plsv" element={<ModelMatematikaPLSVLKPDPage />} />
          <Route path="/lkpd/plsv-ptlsv/pengertian-ptlsv" element={<PengertianPtLSVLKPDPage />} />
          <Route path="/lkpd/plsv-ptlsv/penyelesaian-ptlsv" element={<PenyelesaianPtLSVLKPDPage />} />
          <Route path="/lkpd/plsv-ptlsv/model-matematika-ptlsv" element={<ModelMatematikaPtLSVLKPDPage />} />
          <Route path="/lkpd/aritmetika-sosial" element={<AritmetikaSosialMenuPage />} />
          <Route path="/lkpd/aritmetika-sosial/jual-beli-untung-rugi" element={<JualBeliUntungRugiLKPDPage />} />
          <Route path="/lkpd/aritmetika-sosial/diskon" element={<DiskonLKPDPage />} />
          <Route path="/lkpd/aritmetika-sosial/bruto-netto-tara" element={<BrutoNettoTaraLKPDPage />} />
          <Route path="/lkpd/aritmetika-sosial/bunga-tunggal" element={<BungaTunggalLKPDPage />} />
          <Route path="/lkpd/garis-dan-sudut" element={<GarisDanSudutMenuPage />} />
          <Route path="/lkpd/garis-dan-sudut/lkpd" element={<GarisDanSudutLKPDPage />} />
          <Route path="/lkpd/segitiga-dan-segiempat" element={<SegitigaDanSegiempatMenuPage />} />
          <Route path="/lkpd/segitiga-dan-segiempat/lkpd" element={<SegitigaDanSegiempatLKPDPage />} />
          <Route path="/lkpd/aritmetika-sosial/ppn" element={<PPNLKPDPage />} />
          <Route path="/lkpd/aritmetika-sosial/pph" element={<PPhLKPDPage />} />
          <Route path="/lkpd/himpunan" element={<HimpunanMenuPage />} />
          <Route path="/lkpd/himpunan/lkpd" element={<HimpunanLKPDPage />} />
          <Route path="/lkpd/pola-bilangan" element={<PolaBilanganMenuPage />} />
          <Route path="/lkpd/pola-bilangan/lkpd" element={<PolaBilanganLKPDPage />} />
          <Route path="/lkpd/koordinat-cartesius" element={<KoordinatCartesiusLKPDMenuPage />} />
          <Route path="/lkpd/koordinat-cartesius/lkpd" element={<KoordinatCartesiusLKPDPage />} />
          <Route path="/lkpd/relasi-dan-fungsi" element={<RelasiFungsiLKPDMenuPage />} />
          <Route path="/lkpd/relasi-dan-fungsi/lkpd" element={<RelasiFungsiLKPDPage />} />
          <Route path="/lkpd/spldv" element={<SPLDVLKPDMenuPage />} />
          <Route path="/lkpd/spldv/lkpd" element={<SPLDVLKPDPage />} />
          <Route path="/lkpd/spldv/metode-eliminasi" element={<SPLDVMetodeEliminasiLKPDPage />} />
          <Route path="/lkpd/spldv/metode-eliminasi/postes/:variant" element={<PostesEliminasiDispatcher />} />
          <Route path="/lkpd/spldv/definisi-spldv" element={<SPLDVDefinisiLKPDPage />} />
          <Route path="/lkpd/spldv/metode-grafik" element={<SPLDVMetodeGrafikLKPDPage />} />
          <Route path="/lkpd/spldv/metode-substitusi" element={<SPLDVMetodeSubstitusiLKPDPage />} />
          <Route path="/lkpd/spldv/metode-campuran" element={<SPLDVMetodeCampuranLKPDPage />} />
          <Route path="/lkpd/spldv/model-spldv" element={<SPLDVModelLKPDPage />} />
          <Route path="/lkpd/spldv/penyelesaian-masalah" element={<SPLDVPenyelesaianMasalahLKPDPage />} />
          <Route path="/lkpd/persamaan-garis-lurus" element={<PersamaanGarisLurusLKPDMenuPage />} />
          <Route path="/lkpd/persamaan-garis-lurus/lkpd" element={<PersamaanGarisLurusLKPDPage />} />
          <Route path="/lkpd/persamaan-garis-lurus/gradien" element={<PersamaanGarisLurusLKPDPage />} />
          <Route path="/lkpd/persamaan-garis-lurus/menentukan-pgl" element={<PersamaanGarisLurusLKPDPage />} />
          <Route path="/lkpd/persamaan-garis-lurus/hubungan-2-garis" element={<PersamaanGarisLurusLKPDPage />} />
          <Route path="/lkpd/persamaan-garis-lurus/aplikasi-kontekstual" element={<PersamaanGarisLurusLKPDPage />} />
          <Route path="/lkpd/persamaan-garis-lurus/buku-animasi" element={<BukuAnimasiPGLPage />} />
          <Route path="/lkpd/teorema-pythagoras" element={<TeoremaPythagorasLKPDMenuPage />} />
          <Route path="/lkpd/teorema-pythagoras/lkpd" element={<TeoremaPythagorasLKPDPage />} />
          <Route path="/lkpd/lingkaran" element={<LingkaranLKPDMenuPage />} />
          <Route path="/lkpd/lingkaran/lkpd" element={<LingkaranLKPDPage />} />
          <Route path="/lkpd/garis-singgung-lingkaran" element={<GarisSinggungLingkaranLKPDMenuPage />} />
          <Route path="/lkpd/garis-singgung-lingkaran/lkpd" element={<GarisSinggungLingkaranLKPDPage />} />
          <Route path="/lkpd/bangun-ruang-sisi-datar" element={<BangunRuangSisiDatarLKPDMenuPage />} />
          <Route path="/lkpd/bangun-ruang-sisi-datar/kubus" element={<KubusBRSDLKPDPage />} />
          <Route path="/lkpd/bangun-ruang-sisi-datar/balok" element={<BalokBRSDLKPDPage />} />
          <Route path="/lkpd/bangun-ruang-sisi-datar/prisma" element={<PrismaBRSDLKPDPage />} />
          <Route path="/lkpd/bangun-ruang-sisi-datar/limas" element={<LimasBRSDLKPDPage />} />
          <Route path="/lkpd/bangun-ruang-sisi-datar/gabungan" element={<GabunganBRSDLKPDPage />} />
          <Route path="/lkpd/bilangan-berpangkat" element={<BilanganBerpangkatLKPDMenuPage />} />
          <Route path="/lkpd/bilangan-berpangkat/pengertian-notasi" element={<PengertianNotasiPangkatLKPDPage />} />
          <Route path="/lkpd/bilangan-berpangkat/sifat-operasi" element={<SifatOperasiPangkatLKPDPage />} />
          <Route path="/lkpd/bilangan-berpangkat/bentuk-akar" element={<BentukAkarLKPDPage />} />
          <Route path="/lkpd/bilangan-berpangkat/merasionalkan-akar" element={<MerasionalkanAkarLKPDPage />} />
          <Route path="/lkpd/bilangan-berpangkat/notasi-ilmiah" element={<NotasiIlmiahLKPDPage />} />
          <Route path="/lkpd/kesebangunan-kekongruenan" element={<KesebangunanKekongruenanLKPDMenuPage />} />
          <Route path="/lkpd/transformasi-geometri" element={<TransformasiGeometriLKPDMenuPage />} />
          <Route path="/lkpd/transformasi-geometri/translasi" element={<TranslasiTGLKPDPage />} />
          <Route path="/lkpd/transformasi-geometri/refleksi" element={<RefleksiTGLKPDPage />} />
          <Route path="/lkpd/transformasi-geometri/rotasi" element={<RotasiTGLKPDPage />} />
          <Route path="/lkpd/transformasi-geometri/dilatasi" element={<DilatasiTGLKPDPage />} />
          <Route path="/lkpd/bangun-ruang-sisi-lengkung" element={<BangunRuangSisiLengkungLKPDMenuPage />} />
          <Route path="/lkpd/bangun-ruang-sisi-lengkung/tabung" element={<TabungBRSLLKPDPage />} />
          <Route path="/lkpd/bangun-ruang-sisi-lengkung/kerucut" element={<KerucutBRSLLKPDPage />} />
          <Route path="/lkpd/bangun-ruang-sisi-lengkung/bola" element={<BolaBRSLLKPDPage />} />
          <Route path="/lkpd/bangun-ruang-sisi-lengkung/perubahan-luas-volume" element={<PerubahanLuasVolumeBRSLLKPDPage />} />
          <Route path="/lkpd/bangun-ruang-sisi-lengkung/gabungan" element={<GabunganBRSLLKPDPage />} />
          <Route path="/lkpd/statistika" element={<StatistikaLKPDMenuPage />} />
          <Route path="/lkpd/statistika/pengantar-statistika" element={<PengantarStatistikaLKPDPage />} />
          <Route path="/lkpd/statistika/penyajian-data" element={<PenyajianDataLKPDPage />} />
          <Route path="/lkpd/statistika/rata-rata" element={<RataRataStatistikaLKPDPage />} />
          <Route path="/lkpd/statistika/median-modus" element={<MedianModusLKPDPage />} />
          <Route path="/lkpd/statistika/kuartil" element={<KuartilLKPDPage />} />
          <Route path="/lkpd/statistika/jangkauan-simpangan" element={<JangkauanSimpanganLKPDPage />} />
          <Route path="/lkpd/peluang" element={<PeluangLKPDMenuPage />} />
          <Route path="/lkpd/peluang/ruang-sampel" element={<RuangSampelLKPDPage />} />
          <Route path="/lkpd/peluang/peluang-empirik" element={<PeluangEmpirikLKPDPage />} />
          <Route path="/lkpd/peluang/peluang-teoretik" element={<PeluangTeoretikLKPDPage />} />
          <Route path="/lkpd/peluang/frekuensi-harapan" element={<FrekuensiHarapanLKPDPage />} />
          <Route path="/lkpd/peluang/komplemen" element={<KomplemenLKPDPage />} />
          <Route path="/lkpd/peluang/kejadian-majemuk" element={<PeluangKejadianMajemukLKPDPage />} />
          <Route path="/lkpd/persamaan-kuadrat" element={<PersamaanKuadratLKPDMenuPage />} />
          <Route path="/lkpd/persamaan-kuadrat/bentuk-umum" element={<PKBentukUmumLKPDPage />} />
          <Route path="/lkpd/persamaan-kuadrat/pemfaktoran" element={<PKPemfaktoranLKPDPage />} />
          <Route path="/lkpd/persamaan-kuadrat/rumus-kuadratik" element={<PKRumusKuadratikLKPDPage />} />
          <Route path="/lkpd/persamaan-kuadrat/pelengkap-kuadrat" element={<PKPelengkapKuadratLKPDPage />} />
          <Route path="/lkpd/persamaan-kuadrat/diskriminan" element={<PKDiskriminanLKPDPage />} />
          <Route path="/lkpd/persamaan-kuadrat/menyusun-baru" element={<PKMenyusunBaruLKPDPage />} />
          <Route path="/lkpd/persamaan-kuadrat/penerapan-kontekstual" element={<PKPenerapanKontekstualLKPDPage />} />
          <Route path="/lkpd/fungsi-kuadrat" element={<FungsiKuadratLKPDMenuPage />} />
          <Route path="/lkpd/fungsi-kuadrat/bentuk-umum-karakteristik" element={<FKBentukUmumKarakteristikLKPDPage />} />
          <Route path="/lkpd/fungsi-kuadrat/titik-potong" element={<FKTitikPotongLKPDPage />} />
          <Route path="/lkpd/fungsi-kuadrat/sumbu-simetri-puncak" element={<FKSumbuSimetriPuncakLKPDPage />} />
          <Route path="/lkpd/fungsi-kuadrat/menggambar-grafik" element={<FKMenggambarGrafikLKPDPage />} />
          <Route path="/lkpd/fungsi-kuadrat/menyusun-fungsi" element={<FKMenyusunFungsiLKPDPage />} />
          <Route path="/lkpd/fungsi-kuadrat/penerapan-maks-min" element={<FKPenerapanMaksMinLKPDPage />} />
          <Route path="/lkpd/*" element={<ComingSoonPage />} />
          <Route path="/atp" element={<ATPPage />} />
          <Route element={<GuruLayout />}>
            <Route path="/ruang-untuk-guru" element={<RuangUntukGuruPage />} />
            <Route path="/ruang-untuk-guru/sma" element={<SmaPage />} />
            <Route path="/ruang-untuk-guru/sd" element={<SdPage />} />
            <Route path="/ruang-untuk-guru/sd/buku-animasi" element={<SdBukuAnimasiPage />} />
            <Route
              path="/ruang-untuk-guru/sd/buku-animasi/:classSlug/:topicSlug"
              element={<SdBukuAnimasiTopicPage />}
            />
            <Route path="/ruang-untuk-guru/sd/:sectionSlug" element={<SdComingSoonPage />} />
            <Route path="/ruang-untuk-guru/sma/:mode" element={<SmaTopicMenuPage />} />
            <Route path="/ruang-untuk-guru/sma/:mode/:topicSlug" element={<SmaTopicMenuPage />} />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/eksponen-dan-logaritma/sifat-sifat-eksponen"
              element={<SmaEksponenLogaritmaPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/tugas-tugas-latihan-mandiri/eksponen-dan-logaritma/sifat-sifat-eksponen"
              element={<SmaEksponenLogaritmaLatihanPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/tugas-tugas-latihan-mandiri/eksponen-dan-logaritma/persamaan-eksponen"
              element={<SmaPersamaanEksponenLatihanPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/eksponen-dan-logaritma/konsep-dan-sifat-sifat-logaritma"
              element={<SmaLogaritmaPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri/perbandingan-trigonometri-segitiga-siku-siku"
              element={<SmaPerbandinganTrigonometriSegitigaPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri/sudut-sudut-istimewa-dan-relasi-sudut"
              element={<SmaSudutIstimewaPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri/penerapan-dan-pemodelan-trigonometri"
              element={<SmaNilaiKuadranPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri/identitas-dan-rumus-rumus-trigonometri"
              element={<SmaIdentitasTrigonometriPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri/rumus-rumus-trigonometri"
              element={<SmaRumusRumusTrigonometriPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri/persamaan-trigonometri"
              element={<SmaPersamaanTrigonometriPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri/pertidaksamaan-trigonometri"
              element={<SmaPertidaksamaanTrigonometriPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri/grafik-fungsi-trigonometri"
              element={<SmaGrafikFungsiTrigonometriPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/perbandingan-trigonometri/aturan-sinus-cosinus-dan-luas-segitiga"
              element={<SmaAturanSinusCosinusLuasSegitigaPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/eksponen-dan-logaritma/persamaan-logaritma"
              element={<SmaPersamaanLogaritmaPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/eksponen-dan-logaritma/pertidaksamaan-logaritma"
              element={<SmaPertidaksamaanLogaritmaPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/eksponen-dan-logaritma/bentuk-akar-dan-merasionalkan-penyebut"
              element={<SmaBentukAkarPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/eksponen-dan-logaritma/fungsi-eksponen"
              element={<SmaFungsiEksponenPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/eksponen-dan-logaritma/persamaan-eksponen"
              element={<SmaPersamaanEksponenPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/eksponen-dan-logaritma/pertidaksamaan-eksponen"
              element={<SmaPertidaksamaanEksponenPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/fungsi-eksponen/eksplorasi-fungsi-eksponen"
              element={<SmaFungsiEksponenPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/barisan-dan-deret/barisan-dan-deret-aritmatika"
              element={<SmaBarisanDeretAritmetikaPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/barisan-dan-deret/barisan-dan-deret-geometri"
              element={<SmaBarisanDeretGeometriPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/barisan-dan-deret/deret-geometri-tak-hingga"
              element={<SmaDeretGeometriTakHinggaPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/vektor-dan-operasinya/konsep-dasar-vektor"
              element={<SmaKonsepDasarVektorPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/vektor-dan-operasinya/operasi-vektor-secara-geometris"
              element={<SmaOperasiVektorPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/vektor-dan-operasinya/vektor-pada-sistem-koordinat-kartesius"
              element={<SmaVektorPadaSistemKoordinatKartesiusPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/vektor-dan-operasinya/operasi-aljabar-pada-vektor"
              element={<SmaSudutAntaraDuaVektorPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/vektor-dan-operasinya/proyeksi-vektor"
              element={<SmaProyeksiVektorPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/sistem-persamaan-dan-pertidaksamaan-linear/sistem-persamaan-linear-tiga-variabel"
              element={<SmaSpltvPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/sistem-persamaan-dan-pertidaksamaan-linear/sistem-pertidaksamaan-linear-dua-variabel"
              element={<SmaSptdvPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/matriks/konsep-jenis-kesamaan-transpose-matriks"
              element={<SmaKonsepJenisKesamaanTransposeMatriksPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/matriks/operasi-aljabar-matriks"
              element={<SmaOperasiAljabarMatriksPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/matriks/determinan-dan-invers-matriks"
              element={<SmaDeterminanInversMatriksPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/matriks/penerapan-matriks-pada-spl"
              element={<SmaPenerapanMatriksPadaSPLPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/polinomial/konsep-dasar-dan-operasi-polinomial"
              element={<SmaPolinomialKonsepPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/polinomial/nilai-polinomial-dan-metode-horner"
              element={<SmaNilaiPolinomialHornerPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/polinomial/pembagian-polinomial"
              element={<SmaPembagianPolinomialPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/polinomial/teorema-sisa-dan-teorema-faktor"
              element={<SmaPolinomialTeoremaFaktorPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/polinomial/persamaan-polinomial-dan-teorema-vieta"
              element={<SmaPersamaanPolinomialVietaPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/statistika/penyajian-data"
              element={<SmaStatistikaPenyajianDataPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/statistika/ukuran-pemusatan-data"
              element={<SmaStatistikaUkuranPemusatanDataPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/statistika/ukuran-letak-data"
              element={<SmaStatistikaUkuranLetakDataPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/statistika/ukuran-penempatan-penyebaran-data"
              element={<SmaStatistikaUkuranPenyebaranDataPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/peluang/aturan-perkalian-dan-penjumlahan"
              element={<SmaPeluangAturanPerkalianPenjumlahanPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/peluang/kombinasi"
              element={<SmaPeluangKombinasiPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/peluang/permutasi"
              element={<SmaPeluangPermutasiPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/peluang/ekspansi-binomial"
              element={<SmaPeluangEkspansiBinomialPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/peluang/ruang-sampel-dan-distribusi-peluang-kejadian"
              element={<SmaPeluangRuangSampelDistribusiPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/peluang/frekuensi-harapan"
              element={<SmaPeluangFrekuensiHarapanKomplemenPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/peluang/kejadian-majemuk"
              element={<SmaPeluangKejadianMajemukPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/peluang/komplemen-suatu-kejadian"
              element={<SmaPeluangFrekuensiHarapanKomplemenPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/lingkaran/definisi-dan-bentuk-umum-persamaan-lingkaran"
              element={<SmaDefinisiBentukUmumPersamaanLingkaranPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/lingkaran/kuasa-titik-terhadap-lingkaran-dan-garis"
              element={<SmaKuasaTitikLingkaranDanGarisPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/lingkaran/persamaan-garis-singgung-lingkaran"
              element={<SmaPersamaanGarisSinggungLingkaranPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/lingkaran/hubungan-dua-lingkaran"
              element={<SmaHubunganDuaLingkaranPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/komposisi-fungsi-dan-fungsi-invers/relasi-dan-fungsi"
              element={<SmaRelasiDanFungsiPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/komposisi-fungsi-dan-fungsi-invers/fungsi-invers"
              element={<SmaFungsiInversPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/komposisi-fungsi-dan-fungsi-invers/fungsi-komposisi"
              element={<SmaFungsiKomposisiPage />}
            />
            <Route
              path="/ruang-untuk-guru/sma/buku-animasi/komposisi-fungsi-dan-fungsi-invers/menyelesaikan-permasalahan-operasi-invers-komposisi-fungsi"
              element={<SmaPenerapanOperasiInversKomposisiPage />}
            />
            <Route path="/ruang-untuk-guru/sma/:mode/:topicSlug/:subtopicSlug" element={<SmaSubtopicComingSoonPage />} />
            <Route path="/ruang-untuk-guru/sma/olimpiade" element={<SmaComingSoonPage />} />
            <Route path="/ruang-untuk-guru/sma/tes-kemampuan-akademik" element={<SmaComingSoonPage />} />
            <Route path="/ruang-untuk-guru/exam-browser" element={<ExamBrowserComingSoonPage />} />
            <Route path="/ruang-untuk-guru/numatik-game" element={<NumatikGamePage />} />
            <Route path="/game/numatik-metropolis" element={<NumatikMetropolisPage />} />
            <Route path="/ruang-untuk-guru/numatik-game/city-ride" element={<NumatikCityRiderPage />} />
            <Route path="/ruang-untuk-guru/numatik-game/kart" element={<NumatikKartPage />} />
            <Route path="/game/numatik-runner" element={<NumatikRunnerPage />} />
            <Route path="/game/obby-matematika" element={<ObbyMatematikaPage />} />
            <Route path="/numatik-gamez/umum/numatik-strike" element={<NumatikStrikeGamePage />} />
            <Route path="/numatik-gamez/umum/numatik-world" element={<NumatikWorldPage />} />
            <Route path="/ruang-untuk-guru/keyakinan-kelas" element={<KeyakinanKelasPage />} />
            <Route path="/ruang-untuk-guru/penilaian-pembelajaran" element={<PenilaianPembelajaranPage />} />
            <Route path="/ruang-untuk-guru/capaian-pembelajaran" element={<CapaianPembelajaranPage />} />
            <Route path="/ruang-untuk-guru/rubrik-penilaian-dimensi-lulusan" element={<RubrikPenilaianDimensiLulusanPage />} />
            <Route path="/ruang-untuk-guru/jurnal-guru" element={<JurnalGuruPage />} />
            <Route path="/ruang-untuk-guru/agenda-guru" element={<AgendaGuruPage />} />
            <Route path="/ruang-untuk-guru/prosem" element={<ProsemPage />} />
            <Route path="/ruang-untuk-guru/kktp" element={<KKTPPage />} />
            <Route path="/ruang-untuk-guru/absensi-siswa" element={<AbsensiSiswaPage />} />
            <Route path="/ruang-untuk-guru/penilaian-siswa" element={<PenilaianSiswaPage />} />
            <Route path="/ruang-untuk-guru/rpp/rancang" element={<RancangRPPPage />} />
            <Route path="/ruang-untuk-guru/kokulikuler" element={<KokulikulerPage />} />
            <Route path="/ruang-untuk-guru/prota" element={<ProtaPage />} />
            <Route path="/ruang-untuk-guru/prota/:tahun" element={<ProtaTahunPage />} />
            <Route path="/ruang-untuk-guru/analisis-alokasi-waktu" element={<AnalisisAlokasiWaktuPage />} />
            <Route path="/ruang-untuk-guru/rpp" element={<RPPPage />} />
            <Route path="/ruang-untuk-guru/rpp/bilangan-bulat" element={<RPPBilanganBulatPage />} />
            <Route path="/ruang-untuk-guru/rpp/bilangan-bulat/penjumlahan" element={<RPPPenjumlahanBilanganBulatPage />} />
            <Route path="/ruang-untuk-guru/rpp/bilangan-bulat/pengurangan" element={<RPPPenguranganBilanganBulatPage />} />
            <Route path="/ruang-untuk-guru/rpp/bilangan-bulat/perkalian" element={<RPPPerkalianBilanganBulatPage />} />
            <Route path="/ruang-untuk-guru/rpp/bilangan-bulat/pembagian" element={<RPPPembagianBilanganBulatPage />} />
            <Route path="/ruang-untuk-guru/rpp/bilangan-bulat/operasi-campuran" element={<RPPOperasiCampuranBilanganBulatPage />} />
            <Route path="/ruang-untuk-guru/rpp/bilangan-bulat/kpk-fpb" element={<RPPKpkFpbPage />} />
            <Route path="/ruang-untuk-guru/rpp/:materiSlug" element={<RPPMateriDynamicPage />} />
            <Route path="/ruang-untuk-guru/rpp/:materiSlug/:subSlug" element={<RPPDetailDynamicPage />} />
          </Route>
          <Route path="/ulangan-harian" element={<UlanganHarianPage />} />
          <Route path="/pesan-kesan" element={<PesanKesanPage />} />
          <Route path="/petunjuk" element={<PetunjukPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/referensi" element={<ReferensiPage />} />
          <Route path="/kalkulator-scientific" element={<KalkulatorScientificPage />} />
          <Route path="/kumpulan-rumus" element={<KumpulanRumusPage />} />
          <Route path="/konversi-satuan" element={<KonversiSatuanPage />} />
          <Route path="/video-pembelajaran" element={<VideoPembelajaranPage />} />
          <Route path="/donasi" element={<DonasiPage />} />
          <Route path="/biografi" element={<BiografiPage />} />
          <Route path="/kritik-saran" element={<KritikSaranPage />} />
          <Route path="/ucapan-terima-kasih" element={<UcapanTerimaKasihPage />} />
          <Route path="/olimpiade" element={<OlimpiadePage />} />
          <Route path="/olimpiade/bilangan-bulat" element={<OlimpiadeBilanganBulatPage />} />
          <Route path="/olimpiade/bilangan-rasional" element={<OlimpiadeBilanganRasionalPage />} />
          <Route path="/olimpiade/bilangan-berpangkat" element={<OlimpiadeBilanganBerpangkatPage />} />
          <Route path="/olimpiade/statistika" element={<OlimpiadeStatistikaPage />} />
          <Route path="/olimpiade/bilangan-irasional" element={<OlimpiadeBilanganIrasionalPage />} />
          <Route path="/olimpiade/kpk-fpb" element={<OlimpiadeKPKFPBPage />} />
          <Route path="/olimpiade/modulo" element={<OlimpiadeModuloPage />} />
          <Route path="/olimpiade/himpunan" element={<OlimpiadeHimpunanPage />} />
          <Route path="/olimpiade/relasi-fungsi" element={<OlimpiadeRelasiFungsiPage />} />
          <Route path="/olimpiade/perbandingan" element={<OlimpiadePerbandinganPage />} />
          <Route path="/olimpiade/aljabar" element={<OlimpiadeAljabarPage />} />
          <Route path="/olimpiade/pola-bilangan" element={<OlimpiadePolaBilanganPage />} />
          <Route path="/olimpiade/spldv" element={<OlimpiadeSPLDVPage />} />
          <Route path="/olimpiade/garis-sudut" element={<OlimpiadeGarisSudutPage />} />
          <Route path="/olimpiade/koordinat-cartesius" element={<OlimpiadeKoordinatCartesiusPage />} />
          <Route path="/olimpiade/teorema-pythagoras" element={<OlimpiadeTeoremaPage />} />
          <Route path="/olimpiade/segitiga-segiempat" element={<OlimpiadeSegitigaSegiempatPage />} />
          <Route path="/olimpiade/lingkaran" element={<OlimpiadeLingkaranPage />} />
          <Route path="/olimpiade/bangun-ruang-sisi-datar" element={<OlimpiadeBangunRuangSisiDatarPage />} />
          <Route path="/olimpiade/bangun-ruang-sisi-lengkung" element={<OlimpiadeBangunRuangSisiLengkungPage />} />
          <Route path="/olimpiade/plsv" element={<OlimpiadePLSVPage />} />
          <Route path="/olimpiade/persamaan-garis" element={<OlimpiadePersamaanGarisPage />} />
          <Route path="/olimpiade/persamaan-kuadrat" element={<OlimpiadePersamaanKuadratPage />} />
          <Route path="/olimpiade/fungsi-kuadrat" element={<OlimpiadeFungsiKuadratPage />} />
          <Route path="/olimpiade/aritmetika-sosial" element={<OlimpiadeAritmetikaSosialPage />} />
          <Route path="/olimpiade/kesebangunan" element={<OlimpiadeKesebangunanPage />} />
          <Route path="/olimpiade/transformasi-geometri" element={<OlimpiadeTransformasiPage />} />
          <Route path="/olimpiade/peluang" element={<OlimpiadePeluangPage />} />
          <Route path="/tka" element={<TKAPage />} />
          <Route path="/tka/tips" element={<TKATipsPage />} />
          <Route path="/tka/paket-1" element={<TKALatihan1Page />} />
          <Route path="/tka/try-out-1" element={<TKATryOut1Page />} />
           <Route path="/tka/try-out-2" element={<TKATryOut2Page />} />
          <Route path="/tka/paket-2" element={<TKALatihan2Page />} />
          <Route path="/tka/paket-3" element={<TKALatihan3Page />} />
          <Route path="/tka/paket-4" element={<TKALatihan4Page />} />
          <Route path="/tka/paket-5" element={<TKALatihan5Page />} />
          <Route path="/tka/paket-6" element={<TKALatihan6Page />} />
          <Route path="/tka/paket-7" element={<TKALatihan7Page />} />
          <Route path="/tka/soal-asli-2025" element={<TKASoalAsli2025Page />} />
          <Route path="/tka/modul-pemantapan" element={<TKAModulPemantapanPage />} />
          <Route path="/tka/modul-pemantapan/bilangan-bulat" element={<TKAPemantapanBilanganBulatPage />} />
          <Route path="/tka/modul-pemantapan/bilangan-rasional" element={<TKAPemantapanBilanganRasionalPage />} />
          <Route path="/tka/modul-pemantapan/bilangan-berpangkat" element={<TKAPemantapanBilanganBerpangkatPage />} />
          <Route path="/tka/modul-pemantapan/bilangan-irasional" element={<TKAPemantapanBilanganIrasionalPage />} />
          <Route path="/tka/modul-pemantapan/bilangan-berpangkat-irasional" element={<TKAPemantapanBilanganBerpangkatIrasionalPage />} />
          <Route path="/tka/modul-pemantapan/himpunan" element={<TKAPemantapanHimpunanPage />} />
          <Route path="/tka/modul-pemantapan/relasi-fungsi" element={<TKAPemantapanRelasiFungsiPage />} />
          <Route path="/tka/modul-pemantapan/perbandingan" element={<TKAPemantapanPerbandinganPage />} />
          <Route path="/tka/modul-pemantapan/aljabar" element={<TKAPemantapanAljabarPage />} />
          <Route path="/tka/modul-pemantapan/plsv" element={<TKAPemantapanPLSVPage />} />
          <Route path="/tka/modul-pemantapan/aritmetika-sosial" element={<TKAPemantapanAritmetikaSosialPage />} />
          <Route path="/tka/modul-pemantapan/pola-bilangan" element={<TKAPemantapanPolaBilanganPage />} />
          <Route path="/tka/modul-pemantapan/spldv" element={<TKAPemantapanSPLDVPage />} />
          <Route path="/tka/modul-pemantapan/garis-sudut" element={<TKAPemantapanGarisSudutPage />} />
          <Route path="/tka/modul-pemantapan/teorema-pythagoras" element={<TKAPemantapanTeoremaPage />} />
          <Route path="/tka/modul-pemantapan/segitiga-segiempat" element={<TKAPemantapanSegitigaSegiempatPage />} />
          <Route path="/tka/modul-pemantapan/lingkaran" element={<TKAPemantapanLingkaranPage />} />
          <Route path="/tka/modul-pemantapan/bangun-ruang-sisi-datar" element={<TKAPemantapanBangunRuangSisiDatarPage />} />
          <Route path="/tka/modul-pemantapan/bangun-ruang-sisi-lengkung" element={<TKAPemantapanBangunRuangSisiLengkungPage />} />
          <Route path="/tka/modul-pemantapan/kesebangunan" element={<TKAPemantapanKesebangunanPage />} />
          <Route path="/tka/modul-pemantapan/transformasi-geometri" element={<TKAPemantapanTransformasiPage />} />
          <Route path="/tka/modul-pemantapan/statistika" element={<TKAPemantapanStatistikaPage />} />
          <Route path="/tka/modul-pemantapan/peluang" element={<TKAPemantapanPeluangPage />} />
          <Route path="/tka/modul-pemantapan/persamaan-garis" element={<TKAPemantapanPersamaanGarisPage />} />
          <Route path="/tka/modul-pemantapan/koordinat-cartesius" element={<TKAPemantapanKoordinatCartesiusPage />} />
          <Route path="/papan-peringkat" element={<PapanPeringkatPage />} />
          <Route path="/bank-soal" element={<BankSoalPage />} />
          <Route path="/bank-soal/bilangan-bulat" element={<BankSoalBilanganBulatPage />} />
          <Route path="/bank-soal/bilangan-rasional" element={<BankSoalBilanganRasionalPage />} />
          <Route path="/bank-soal/segitiga-dan-segiempat" element={<BankSoalSegitigaSegiempatPage />} />
          <Route path="/bank-soal/himpunan" element={<BankSoalHimpunanPage />} />
          <Route path="/bank-soal/koordinat-cartesius" element={<BankSoalKoordinatCartesiusPage />} />
          <Route path="/bank-soal/aljabar" element={<BankSoalAljabarPage />} />
          <Route path="/bank-soal/plsv" element={<BankSoalPLSVPage />} />
          <Route path="/bank-soal/perbandingan" element={<BankSoalPerbandinganPage />} />
          <Route path="/bank-soal/aritmetika-sosial" element={<BankSoalAritmetikaSosialPage />} />
          <Route path="/bank-soal/pola-bilangan" element={<BankSoalPolaBilanganPage />} />
          <Route path="/bank-soal/relasi-fungsi" element={<BankSoalRelasiFungsiPage />} />
          <Route path="/bank-soal/garis-sudut" element={<BankSoalGarisSudutPage />} />
          <Route path="/bank-soal/spldv" element={<BankSoalSPLDVPage />} />
          <Route path="/bank-soal/persamaan-garis-lurus" element={<BankSoalPersamaanGarisLurusPage />} />
          <Route path="/bank-soal/peluang" element={<BankSoalPeluangPage />} />
          <Route path="/bank-soal/teorema-pythagoras" element={<BankSoalTeoremaPythagorasPage />} />
          <Route path="/bank-soal/lingkaran" element={<BankSoalLingkaranPage />} />
          <Route path="/bank-soal/bangun-ruang-sisi-datar" element={<BankSoalBangunRuangSisiDatarPage />} />
          <Route path="/bank-soal/bangun-ruang-sisi-lengkung" element={<BankSoalBangunRuangSisiLengkungPage />} />
          <Route path="/bank-soal/bilangan-berpangkat" element={<BankSoalBilanganBerpangkatPage />} />
          <Route path="/bank-soal/persamaan-kuadrat" element={<BankSoalPersamaanKuadratPage />} />
          <Route path="/bank-soal/fungsi-kuadrat" element={<BankSoalFungsiKuadratPage />} />
          <Route path="/bank-soal/statistika" element={<BankSoalStatistikaPage />} />
          <Route path="/bank-soal/garis-singgung-lingkaran" element={<BankSoalGarisSinggungLingkaranPage />} />
          <Route path="/bank-soal/kesebangunan-kekongruenan" element={<BankSoalKesebangunanPage />} />
          <Route path="/bank-soal/transformasi-geometri" element={<BankSoalTransformasiGeometriPage />} />
          <Route path="/chat-ai" element={<ChatAIPage />} />
          <Route path="/pengaturan" element={<PengaturanPage />} />
          <Route path="/tentang-aplikasi" element={<TentangAplikasiPage />} />
          <Route path="/coming-soon" element={<ComingSoonPage />} />
          <Route path="/intensif-utbk" element={<IntensifUtbkPage />} />
          <Route path="/intensif-utbk/:topicSlug" element={<IntensifUtbkPage />} />
          <Route path="/menghitung-cepat" element={<MenghitungCepatPage />} />
          <Route path="/menghitung-cepat/perkalian-dengan-11" element={<PerkalianDengan11Page />} />
          <Route path="/menghitung-cepat/kuadrat-berakhiran-5" element={<KuadratBerakhiran5Page />} />
          <Route path="/menghitung-cepat/kuadrat-cepat" element={<KuadratCepatPage />} />
          <Route path="/menghitung-cepat/perkalian-dekat-100" element={<PerkalianDekat100Page />} />
          <Route path="/menghitung-cepat/persentase-cepat" element={<PersentaseCepatPage />} />
          <Route path="/menghitung-cepat/penjumlahan-pengurangan" element={<PenjumlahanPenguranganCepatPage />} />
          <Route path="/menghitung-cepat/perkalian-dua-digit" element={<PerkalianDuaDigitPage />} />
          <Route path="/menghitung-cepat/pembagian-cepat" element={<PembagianCepatPage />} />
          <Route path="/menghitung-cepat/tabel-referensi" element={<TabelReferensiPage />} />
          <Route path="/menghitung-cepat/latihan-flashcard" element={<LatihanFlashcardPage />} />
          <Route path="/menghitung-cepat/game-latihan" element={<GameLatihanHitungCepatPage />} />

          {/* Latihan Mandiri Routes */}
          <Route path="/latihan-mandiri" element={<Navigate to="/tugas-latihan-mandiri" replace />} />
          <Route path="/tugas-latihan-mandiri" element={<TugasLatihanMandiriPage />} />
          <Route path="/latihan-mandiri/kelas-7" element={<Navigate to="/tugas-latihan-mandiri" replace />} />
          <Route path="/latihan-mandiri/kelas-8" element={<Navigate to="/tugas-latihan-mandiri" replace />} />
          <Route path="/latihan-mandiri/kelas-9" element={<Navigate to="/tugas-latihan-mandiri" replace />} />
          <Route path="/tugas-latihan-mandiri/kelas-7" element={<Navigate to="/tugas-latihan-mandiri" replace />} />
          <Route path="/tugas-latihan-mandiri/kelas-8" element={<Navigate to="/tugas-latihan-mandiri" replace />} />
          <Route path="/tugas-latihan-mandiri/kelas-9" element={<Navigate to="/tugas-latihan-mandiri" replace />} />
          <Route path="/latihan-mandiri/*" element={<LegacyTaskPracticeRedirect />} />
          <Route path="/tugas-latihan-mandiri/kelas-7/*" element={<LegacyTaskPracticeRedirect />} />
          <Route path="/tugas-latihan-mandiri/kelas-8/*" element={<LegacyTaskPracticeRedirect />} />
          <Route path="/tugas-latihan-mandiri/kelas-9/*" element={<LegacyTaskPracticeRedirect />} />

          {/* Kelas 7 Topic Routes */}
          <Route path="/tugas-latihan-mandiri/bilangan-bulat" element={<BilanganBulatK7Page />} />
          <Route path="/tugas-latihan-mandiri/bilangan-bulat/penjumlahan" element={<PenjumlahanBilanganBulatK7Page />} />
          <Route path="/tugas-latihan-mandiri/bilangan-bulat/pengurangan" element={<PenguranganBilanganBulatK7Page />} />
          <Route path="/tugas-latihan-mandiri/bilangan-bulat/perkalian" element={<PerkalianBilanganBulatK7Page />} />
          <Route path="/tugas-latihan-mandiri/bilangan-bulat/pembagian" element={<PembagianBilanganBulatK7Page />} />
          <Route path="/tugas-latihan-mandiri/bilangan-bulat/operasi-campuran" element={<OperasiCampuranBilanganBulatK7Page />} />
          <Route path="/tugas-latihan-mandiri/bilangan-bulat/kpk-fpb" element={<KPKFPBBilanganBulatK7Page />} />
          <Route path="/tugas-latihan-mandiri/bilangan-rasional" element={<BilanganRasionalK7Page />} />
          <Route path="/tugas-latihan-mandiri/bilangan-rasional/arti-pecahan-senilai-membandingkan" element={<ArtiPecahanSenilaiMembandingkanK7Page />} />
          <Route path="/tugas-latihan-mandiri/bilangan-rasional/pecahan-campuran-persen" element={<PecahanCampuranPersenK7Page />} />
          <Route path="/tugas-latihan-mandiri/bilangan-rasional/penjumlahan-pecahan" element={<PenjumlahanPecahanK7Page />} />
          <Route path="/tugas-latihan-mandiri/bilangan-rasional/perkalian-pecahan" element={<PerkalianPecahanK7Page />} />
          <Route path="/tugas-latihan-mandiri/bilangan-rasional/pembagian-pecahan" element={<PembagianPecahanK7Page />} />
          <Route path="/tugas-latihan-mandiri/bilangan-rasional/bentuk-desimal" element={<BentukDesimalK7Page />} />
          <Route path="/tugas-latihan-mandiri/bilangan-rasional/penjumlahan-pengurangan-desimal" element={<PenjumlahanPenguranganDesimalK7Page />} />
          <Route path="/tugas-latihan-mandiri/bilangan-rasional/perkalian-desimal" element={<PerkalianDesimalK7Page />} />
          <Route path="/tugas-latihan-mandiri/bilangan-rasional/pembagian-desimal" element={<PembagianDesimalK7Page />} />
          <Route path="/tugas-latihan-mandiri/bilangan-rasional/pembulatan-desimal" element={<PembulatanDesimalK7Page />} />
          <Route path="/tugas-latihan-mandiri/aljabar" element={<AljabarK7Page />} />
          <Route path="/tugas-latihan-mandiri/aljabar/pengertian-unsur" element={<PengertianUnsurAljabarK7Page />} />
          <Route path="/tugas-latihan-mandiri/aljabar/penjumlahan-pengurangan" element={<PenjumlahanPenguranganAljabarK7Page />} />
          <Route path="/tugas-latihan-mandiri/aljabar/perkalian" element={<PerkalianAljabarK7Page />} />
          <Route path="/tugas-latihan-mandiri/aljabar/pembagian" element={<PembagianAljabarK7Page />} />
          <Route path="/tugas-latihan-mandiri/aljabar/pemangkatan" element={<PemangkatanAljabarK7Page />} />
          <Route path="/tugas-latihan-mandiri/aljabar/substitusi" element={<SubstitusiBilanganAljabarK7Page />} />
          <Route path="/tugas-latihan-mandiri/aljabar/faktorisasi" element={<FaktorisasiAljabarK7Page />} />
          <Route path="/tugas-latihan-mandiri/aljabar/pecahan-aljabar" element={<MenyederhanakanPecahanAljabarK7Page />} />
          <Route path="/tugas-latihan-mandiri/plsv-ptlsv" element={<PLSVPtLSVK7Page />} />
          <Route path="/tugas-latihan-mandiri/plsv-ptlsv/kalimat-terbuka" element={<KalimatTerbukaTertutupK7Page />} />
          <Route path="/tugas-latihan-mandiri/plsv-ptlsv/pengertian-plsv" element={<PengertianPLSVK7Page />} />
          <Route path="/tugas-latihan-mandiri/plsv-ptlsv/penyelesaian-plsv" element={<PenyelesaianPLSVK7Page />} />
          <Route path="/tugas-latihan-mandiri/plsv-ptlsv/model-matematika-plsv" element={<ModelMatematikaPLSVK7Page />} />
          <Route path="/tugas-latihan-mandiri/plsv-ptlsv/pengertian-ptlsv" element={<PengertianPtLSVK7Page />} />
          <Route path="/tugas-latihan-mandiri/plsv-ptlsv/penyelesaian-ptlsv" element={<PenyelesaianPtLSVK7Page />} />
          <Route path="/tugas-latihan-mandiri/plsv-ptlsv/model-matematika-ptlsv" element={<ModelMatematikaPtLSVK7Page />} />
          <Route path="/tugas-latihan-mandiri/perbandingan" element={<PerbandinganK7Page />} />
          <Route path="/tugas-latihan-mandiri/perbandingan/umum" element={<PerbandinganUmumK7Page />} />
          <Route path="/tugas-latihan-mandiri/perbandingan/senilai" element={<PerbandinganSenilaiK7Page />} />
          <Route path="/tugas-latihan-mandiri/perbandingan/campuran" element={<PerbandinganCampuranK7Page />} />
          <Route path="/tugas-latihan-mandiri/perbandingan/bertingkat" element={<PerbandinganBertingkatK7Page />} />
          <Route path="/tugas-latihan-mandiri/perbandingan/skala" element={<PerbandinganSkalaK7Page />} />
          <Route path="/tugas-latihan-mandiri/aritmetika-sosial" element={<AritmetikaSosialK7Page />} />
          <Route path="/tugas-latihan-mandiri/aritmetika-sosial/jual-beli-untung-rugi" element={<JualBeliUntungRugiK7Page />} />
          <Route path="/tugas-latihan-mandiri/aritmetika-sosial/diskon" element={<DiskonK7Page />} />
          <Route path="/tugas-latihan-mandiri/aritmetika-sosial/bruto-netto-tara" element={<BrutoNettoTaraK7Page />} />
          <Route path="/tugas-latihan-mandiri/aritmetika-sosial/bunga-tunggal" element={<BungaTunggalK7Page />} />
          <Route path="/tugas-latihan-mandiri/aritmetika-sosial/ppn" element={<PPNK7Page />} />
          <Route path="/tugas-latihan-mandiri/aritmetika-sosial/pph" element={<PPhK7Page />} />
          <Route path="/tugas-latihan-mandiri/garis-dan-sudut" element={<GarisDanSudutK7Page />} />
          <Route path="/tugas-latihan-mandiri/garis-dan-sudut/hubungan-2-garis" element={<HubunganDuaGarisK7Page />} />
          <Route path="/tugas-latihan-mandiri/garis-dan-sudut/sudut-pelurus-penyiku-bertolak" element={<SudutPelurusPenyikuBertolakK7Page />} />
          <Route path="/tugas-latihan-mandiri/garis-dan-sudut/sifat-sudut-dua-garis-sejajar" element={<SifatSudutDuaGarisSejajarK7Page />} />
          <Route path="/tugas-latihan-mandiri/garis-dan-sudut/jumlah-sudut-segi-banyak" element={<JumlahSudutSegiBanyakK7Page />} />
          <Route path="/tugas-latihan-mandiri/segitiga-dan-segiempat" element={<SegitigaSegiempatK7Page />} />
          <Route path="/tugas-latihan-mandiri/segitiga-dan-segiempat/garis-berat-bagi-tinggi" element={<GarisBeratBagiTinggiLatihanK7Page />} />
          <Route path="/tugas-latihan-mandiri/segitiga-dan-segiempat/keliling-segitiga-dan-segiempat" element={<KelilingSegitigaSegiempatLatihanK7Page />} />
          <Route path="/tugas-latihan-mandiri/segitiga-dan-segiempat/luas-segitiga" element={<LuasSegitigaLatihanK7Page />} />
          <Route path="/tugas-latihan-mandiri/segitiga-dan-segiempat/luas-segiempat" element={<LuasSegiempatLatihanK7Page />} />
          <Route path="/tugas-latihan-mandiri/segitiga-dan-segiempat/keliling-luas-bangun-tak-beraturan" element={<KelilingLuasBangunTakBeraturanLatihanK7Page />} />
          <Route path="/tugas-latihan-mandiri/himpunan" element={<HimpunanK7Page />} />
          <Route path="/tugas-latihan-mandiri/himpunan/pengertian-keanggotaan" element={<PengertianKeanggotaanHimpunanLatihanK7Page />} />
          <Route path="/tugas-latihan-mandiri/himpunan/menyatakan-himpunan" element={<MenyatakanHimpunanLatihanK7Page />} />
          <Route path="/tugas-latihan-mandiri/himpunan/diagram-venn" element={<DiagramVennLatihanK7Page />} />
          <Route path="/tugas-latihan-mandiri/himpunan/himpunan-bagian" element={<HimpunanBagianLatihanK7Page />} />
          <Route path="/tugas-latihan-mandiri/himpunan/operasi-himpunan" element={<OperasiHimpunanLatihanK7Page />} />

          {/* Kelas 8 Topic Routes */}
          <Route path="/tugas-latihan-mandiri/pola-bilangan" element={<PolaBilanganK8Page />} />
          <Route path="/tugas-latihan-mandiri/pola-bilangan/pengertian-pola" element={<PengertianPolaK8Page />} />
          <Route path="/tugas-latihan-mandiri/pola-bilangan/pengertian-dan-pola-khusus" element={<PengertianDanPolaKhususK8Page />} />
          <Route path="/tugas-latihan-mandiri/pola-bilangan/pola-khusus" element={<PolaKhususK8Page />} />
          <Route path="/tugas-latihan-mandiri/pola-bilangan/pola-aritmetika" element={<PolaAritmetikaK8Page />} />
          <Route path="/tugas-latihan-mandiri/pola-bilangan/pola-geometri" element={<PolaGeometriK8Page />} />
          <Route path="/tugas-latihan-mandiri/koordinat-cartesius" element={<KoordinatCartesiusK8Page />} />
          <Route path="/tugas-latihan-mandiri/koordinat-cartesius/unsur-unsur" element={<UnsurUnsurCartesiusK8Page />} />
          <Route path="/tugas-latihan-mandiri/koordinat-cartesius/posisi-relatif-titik-acuan" element={<PosisiRelatifTitikAcuanK8Page />} />
          <Route path="/tugas-latihan-mandiri/koordinat-cartesius/jarak-titik-garis" element={<JarakTitikGarisK8Page />} />
          <Route path="/tugas-latihan-mandiri/relasi-dan-fungsi" element={<RelasiFungsiK8Page />} />
          <Route path="/tugas-latihan-mandiri/relasi-dan-fungsi/pengertian-relasi" element={<PengertianRelasiK8Page />} />
          <Route path="/tugas-latihan-mandiri/relasi-dan-fungsi/pengertian-fungsi" element={<PengertianFungsiK8Page />} />
          <Route path="/tugas-latihan-mandiri/relasi-dan-fungsi/banyak-fungsi" element={<BanyakFungsiK8Page />} />
          <Route path="/tugas-latihan-mandiri/relasi-dan-fungsi/notasi-fungsi" element={<NotasiFungsiK8Page />} />
          <Route path="/tugas-latihan-mandiri/relasi-dan-fungsi/grafik-fungsi" element={<GrafikFungsiK8Page />} />
          <Route path="/tugas-latihan-mandiri/spldv" element={<SPLDVK8Page />} />
          <Route path="/tugas-latihan-mandiri/spldv/definisi" element={<DefinisiSPLDVK8Page />} />
          <Route path="/tugas-latihan-mandiri/spldv/metode-grafik" element={<MetodeGrafikSPLDVK8Page />} />
          <Route path="/tugas-latihan-mandiri/spldv/metode-substitusi" element={<MetodeSubstitusiSPLDVK8Page />} />
          <Route path="/tugas-latihan-mandiri/spldv/metode-eliminasi" element={<MetodeEliminasiSPLDVK8Page />} />
          <Route path="/tugas-latihan-mandiri/spldv/metode-campuran" element={<MetodeCampuranSPLDVK8Page />} />
          <Route path="/tugas-latihan-mandiri/spldv/model-spldv" element={<ModelSPLDVK8Page />} />
          <Route path="/tugas-latihan-mandiri/spldv/penyelesaian-masalah" element={<PenyelesaianMasalahSPLDVK8Page />} />
          <Route path="/tugas-latihan-mandiri/persamaan-garis-lurus" element={<PersamaanGarisLurusK8Page />} />
          <Route path="/tugas-latihan-mandiri/persamaan-garis-lurus/grafik" element={<GrafikPGLK8Page />} />
          <Route path="/tugas-latihan-mandiri/persamaan-garis-lurus/gradien" element={<GradienK8Page />} />
          <Route path="/tugas-latihan-mandiri/persamaan-garis-lurus/menentukan-pgl" element={<MenentukanPGLK8Page />} />
          <Route path="/tugas-latihan-mandiri/persamaan-garis-lurus/hubungan-2-garis" element={<Hubungan2GarisK8Page />} />
          <Route path="/tugas-latihan-mandiri/persamaan-garis-lurus/aplikasi-kontekstual" element={<AplikasiKontekstualPGLK8Page />} />
          <Route path="/tugas-latihan-mandiri/teorema-pythagoras" element={<TeoremaPythagorasK8Page />} />
          <Route path="/tugas-latihan-mandiri/teorema-pythagoras/pembuktian" element={<PembuktianPythagorasK8Page />} />
          <Route path="/tugas-latihan-mandiri/teorema-pythagoras/menghitung-panjang" element={<MenghitungPanjangPythagorasK8Page />} />
          <Route path="/tugas-latihan-mandiri/teorema-pythagoras/triple-pythagoras" element={<TriplePythagorasK8Page />} />
          <Route path="/tugas-latihan-mandiri/teorema-pythagoras/jenis-segitiga" element={<JenisSegitigaPythagorasK8Page />} />
          <Route path="/tugas-latihan-mandiri/teorema-pythagoras/sudut-khusus" element={<SudutKhususPythagorasK8Page />} />
          <Route path="/tugas-latihan-mandiri/teorema-pythagoras/masalah-kontekstual" element={<MasalahKontekstualPythagorasK8Page />} />
          <Route path="/tugas-latihan-mandiri/lingkaran" element={<LingkaranK8Page />} />
          <Route path="/tugas-latihan-mandiri/lingkaran/unsur-unsur" element={<UnsurUnsurLingkaranK8Page />} />
          <Route path="/tugas-latihan-mandiri/lingkaran/keliling-luas" element={<KelilingLuasLingkaranK8Page />} />
          <Route path="/tugas-latihan-mandiri/lingkaran/kaitan-bangun-datar" element={<KaitanBangunDatarLingkaranK8Page />} />
          <Route path="/tugas-latihan-mandiri/lingkaran/busur-juring" element={<BusurJuringLingkaranK8Page />} />
          <Route path="/tugas-latihan-mandiri/lingkaran/sudut-pusat-keliling" element={<SudutPusatKelilingLingkaranK8Page />} />
          <Route path="/tugas-latihan-mandiri/lingkaran/penerapan-kontekstual" element={<PenerapanKontekstualLingkaranK8Page />} />
          <Route path="/tugas-latihan-mandiri/garis-singgung-lingkaran" element={<GarisSinggungLingkaranK8Page />} />
          <Route path="/tugas-latihan-mandiri/garis-singgung-lingkaran/pengertian" element={<PengertianGSLK8Page />} />
          <Route path="/tugas-latihan-mandiri/garis-singgung-lingkaran/menghitung-panjang" element={<MenghitungPanjangGSLK8Page />} />
          <Route path="/tugas-latihan-mandiri/garis-singgung-lingkaran/gspl" element={<GSPLK8Page />} />
          <Route path="/tugas-latihan-mandiri/garis-singgung-lingkaran/gspd" element={<GSPDK8Page />} />
          <Route path="/tugas-latihan-mandiri/garis-singgung-lingkaran/sabuk-lilitan" element={<SabukLilitanK8Page />} />
          <Route path="/tugas-latihan-mandiri/bangun-ruang-sisi-datar" element={<BangunRuangSisiDatarK8Page />} />
          <Route path="/tugas-latihan-mandiri/bangun-ruang-sisi-datar/kubus" element={<KubusLMK8Page />} />
          <Route path="/tugas-latihan-mandiri/bangun-ruang-sisi-datar/balok" element={<BalokLMK8Page />} />
          <Route path="/tugas-latihan-mandiri/bangun-ruang-sisi-datar/prisma" element={<PrismaLMK8Page />} />
          <Route path="/tugas-latihan-mandiri/bangun-ruang-sisi-datar/limas" element={<LimasLMK8Page />} />
          <Route path="/tugas-latihan-mandiri/bangun-ruang-sisi-datar/masalah-kontekstual" element={<MasalahKontekstualBRSDLMK8Page />} />
          <Route path="/tugas-latihan-mandiri/bangun-ruang-sisi-datar-gabungan" element={<BRSDGabunganLMK8Page />} />

          {/* Kelas 9 Topic Routes */}
          <Route path="/tugas-latihan-mandiri/bilangan-berpangkat" element={<BilanganBerpangkatK9Page />} />
          <Route path="/tugas-latihan-mandiri/bilangan-berpangkat/pengertian-notasi" element={<PengertianNotasiK9Page />} />
          <Route path="/tugas-latihan-mandiri/bilangan-berpangkat/sifat-sifat" element={<SifatSifatK9Page />} />
          <Route path="/tugas-latihan-mandiri/bilangan-berpangkat/pangkat-nol-negatif-pecahan" element={<PangkatNolNegatifPecahanK9Page />} />
          <Route path="/tugas-latihan-mandiri/bilangan-berpangkat/bentuk-akar" element={<BentukAkarK9Page />} />
          <Route path="/tugas-latihan-mandiri/bilangan-berpangkat/notasi-ilmiah" element={<NotasiIlmiahK9Page />} />
          <Route path="/tugas-latihan-mandiri/kesebangunan-kekongruenan" element={<KesebangunanKekongruenK9Page />} />
          <Route path="/tugas-latihan-mandiri/kesebangunan-kekongruenan/definisi" element={<DefinisiKesebangunanK9Page />} />
          <Route path="/tugas-latihan-mandiri/kesebangunan-kekongruenan/menghitung-rusuk" element={<MenghitungRusukK9Page />} />
          <Route path="/tugas-latihan-mandiri/kesebangunan-kekongruenan/segitiga-sebangun" element={<SegitigaSebangunK9Page />} />
          <Route path="/tugas-latihan-mandiri/kesebangunan-kekongruenan/rasio-rusuk" element={<RasioRusukK9Page />} />
          <Route path="/tugas-latihan-mandiri/kesebangunan-kekongruenan/kekongruenan" element={<KekongruenBangunDatarK9Page />} />
          <Route path="/tugas-latihan-mandiri/transformasi-geometri" element={<TransformasiGeometriK9Page />} />
          <Route path="/tugas-latihan-mandiri/transformasi-geometri/translasi" element={<TranslasiK9Page />} />
          <Route path="/tugas-latihan-mandiri/transformasi-geometri/refleksi" element={<RefleksiK9Page />} />
          <Route path="/tugas-latihan-mandiri/transformasi-geometri/rotasi" element={<RotasiK9Page />} />
          <Route path="/tugas-latihan-mandiri/transformasi-geometri/dilatasi" element={<DilatsiK9Page />} />
          <Route path="/tugas-latihan-mandiri/bangun-ruang-sisi-lengkung" element={<BangunRuangSisiLengkungK9Page />} />
          <Route path="/tugas-latihan-mandiri/bangun-ruang-sisi-lengkung/tabung" element={<TabungLMK9Page />} />
          <Route path="/tugas-latihan-mandiri/bangun-ruang-sisi-lengkung/kerucut" element={<KerucutLMK9Page />} />
          <Route path="/tugas-latihan-mandiri/bangun-ruang-sisi-lengkung/bola" element={<BolaLMK9Page />} />
          <Route path="/tugas-latihan-mandiri/bangun-ruang-sisi-lengkung/perubahan-volume" element={<PerubahanVolumeLMK9Page />} />
          <Route path="/tugas-latihan-mandiri/bangun-ruang-sisi-lengkung/gabungan" element={<GabunganLMK9Page />} />
          <Route path="/tugas-latihan-mandiri/statistika" element={<StatistikaK9Page />} />
          <Route path="/tugas-latihan-mandiri/statistika/pengantar" element={<PengantarStatistikaLMK9Page />} />
          <Route path="/tugas-latihan-mandiri/statistika/penyajian-data" element={<PenyajianDataLMK9Page />} />
          <Route path="/tugas-latihan-mandiri/statistika/rata-rata" element={<RataRataLMK9Page />} />
          <Route path="/tugas-latihan-mandiri/statistika/median-modus" element={<MedianModusLMK9Page />} />
          <Route path="/tugas-latihan-mandiri/statistika/kuartil" element={<KuartilLMK9Page />} />
          <Route path="/tugas-latihan-mandiri/statistika/penyebaran-data" element={<PenyebaranDataLMK9Page />} />
          <Route path="/tugas-latihan-mandiri/peluang" element={<PeluangK9Page />} />
          <Route path="/tugas-latihan-mandiri/peluang/ruang-sampel" element={<RuangSampelLMK9Page />} />
          <Route path="/tugas-latihan-mandiri/peluang/peluang-empirik" element={<PeluangEmpirikLMK9Page />} />
          <Route path="/tugas-latihan-mandiri/peluang/peluang-teoretik" element={<PeluangTeoretikLMK9Page />} />
          <Route path="/tugas-latihan-mandiri/peluang/frekuensi-harapan" element={<FrekuensiHarapanLMK9Page />} />
          <Route path="/tugas-latihan-mandiri/peluang/komplemen" element={<KomplementLMK9Page />} />
          <Route path="/tugas-latihan-mandiri/peluang/kejadian-majemuk" element={<PeluangKejadianMajemukLMK9Page />} />
          <Route path="/tugas-latihan-mandiri/persamaan-kuadrat" element={<PersamaanKuadratK9Page />} />
          <Route path="/tugas-latihan-mandiri/persamaan-kuadrat/bentuk-umum" element={<PKBentukUmumPage />} />
          <Route path="/tugas-latihan-mandiri/persamaan-kuadrat/pemfaktoran" element={<PKPemfaktoranPage />} />
          <Route path="/tugas-latihan-mandiri/persamaan-kuadrat/rumus-kuadratik" element={<PKRumusKuadratikPage />} />
          <Route path="/tugas-latihan-mandiri/persamaan-kuadrat/pelengkap-kuadrat" element={<PKPelengkapKuadratPage />} />
          <Route path="/tugas-latihan-mandiri/persamaan-kuadrat/diskriminan" element={<PKDiskriminanPage />} />
          <Route path="/tugas-latihan-mandiri/persamaan-kuadrat/menyusun-persamaan-baru" element={<PKMenyusunBaruPage />} />
          <Route path="/tugas-latihan-mandiri/persamaan-kuadrat/penerapan-kontekstual" element={<PKPenerapanKontekstualPage />} />
          <Route path="/tugas-latihan-mandiri/fungsi-kuadrat" element={<FungsiKuadratK9Page />} />
          <Route path="/tugas-latihan-mandiri/fungsi-kuadrat/bentuk-umum-karakteristik" element={<FKBentukUmumKarakteristikPage />} />
          <Route path="/tugas-latihan-mandiri/fungsi-kuadrat/titik-potong" element={<FKTitikPotongPage />} />
          <Route path="/tugas-latihan-mandiri/fungsi-kuadrat/sumbu-simetri" element={<FKSumbuSimetriPage />} />
          <Route path="/tugas-latihan-mandiri/fungsi-kuadrat/menggambar-grafik" element={<FKMenggambarGrafikPage />} />
          <Route path="/tugas-latihan-mandiri/fungsi-kuadrat/menyusun-fungsi" element={<FKMenyusunFungsiPage />} />
          <Route path="/tugas-latihan-mandiri/fungsi-kuadrat/penerapan-nilai-maks-min" element={<FKPenerapanNilaiMaksMinPage />} />

          {/* Numatik Gamez Routes */}
          <Route path="/math-game-arena" element={<LegacyNumatikGamezRedirect />} />
          <Route path="/math-game-arena/*" element={<LegacyNumatikGamezRedirect />} />
          <Route path="/numatik-gamez/kelas-7" element={<LegacyNumatikGamezRedirect />} />
          <Route path="/numatik-gamez/kelas-7/*" element={<LegacyNumatikGamezRedirect />} />
          <Route path="/numatik-gamez/kelas-8" element={<LegacyNumatikGamezRedirect />} />
          <Route path="/numatik-gamez/kelas-8/*" element={<LegacyNumatikGamezRedirect />} />
          <Route path="/numatik-gamez/kelas-9" element={<LegacyNumatikGamezRedirect />} />
          <Route path="/numatik-gamez/kelas-9/*" element={<LegacyNumatikGamezRedirect />} />
          <Route path="/numatik-gamez" element={<NumatikGamezPage />} />
          <Route path="/numatik-gamez/sma" element={<NumatikGamezSmaMenuPage />} />
           <Route path="/numatik-gamez/sma/:topicSlug/:subtopicSlug" element={<NumatikGamezSmaSubtopicPage />} />
           <Route path="/numatik-gamez/sma/:topicSlug" element={<NumatikGamezSmaMenuPage />} />
          <Route path="/numatik-gamez/umum" element={<NumatikGamezUmumPage />} />
          <Route path="/numatik-gamez/umum/tetris" element={<TetrisGamePage />} />
          <Route path="/numatik-gamez/umum/dino-run" element={<DinoRunGamePage />} />
          <Route path="/numatik-gamez/umum/flappy-rocket" element={<FlappyRocketPage />} />
          <Route path="/numatik-gamez/umum/snake-math" element={<SnakeMathPage />} />
          <Route path="/numatik-gamez/umum/asteroid-blaster" element={<AsteroidBlasterPage />} />
          <Route path="/numatik-gamez/umum/pecah-jawaban" element={<BrickBreakerPage />} />
          <Route path="/numatik-gamez/umum/tembak-tank" element={<BattleTankPage />} />
          <Route path="/numatik-gamez/umum/kereta-koin-math" element={<CoinTrainMathPage />} />
          <Route path="/numatik-gamez/umum/space-impact" element={<SpaceImpactPage />} />
          <Route path="/numatik-gamez/umum/galaxy-defender" element={<GalaxyDefenderPage />} />
          <Route path="/numatik-gamez/umum/zuma-math" element={<ZumaMathPage />} />
          <Route path="/numatik-gamez/umum/pacman-math" element={<PacmanMathPage variant="spider" topicLabel="Numatik Gamez" />} />

          {/* Numatik Gamez - Kelas 7 Topic Routes */}
          <Route path="/numatik-gamez/bilangan-bulat" element={<BilanganBulatMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/penjumlahan" element={<PenjumlahanBilanganBulatGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/penjumlahan/pesawat-tembak-meteor" element={<PenjumlahanMeteorGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/penjumlahan/turtle-run" element={<PenjumlahanTurtleRunGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/penjumlahan/flappy-rocket" element={<PenjumlahanFlappyRocketGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/penjumlahan/tembak-tank" element={<PenjumlahanTembakTankGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/penjumlahan/space-impact" element={<PenjumlahanSpaceImpactGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/penjumlahan/tetris" element={<PenjumlahanTetrisGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/penjumlahan/snake-math" element={<PenjumlahanSnakeMathGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/pengurangan" element={<PenguranganBilanganBulatGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/pengurangan/pesawat-tembak-meteor" element={<PenguranganMeteorGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/pengurangan/flappy-rocket" element={<PenguranganFlappyRocketGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/pengurangan/tembak-tank" element={<PenguranganTembakTankGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/pengurangan/space-impact" element={<PenguranganSpaceImpactGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/pengurangan/turtle-run" element={<PenguranganTurtleRunGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/pengurangan/tetris" element={<PenguranganTetrisGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/pengurangan/snake-math" element={<PenguranganSnakeMathGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/perkalian" element={<PerkalianBilanganBulatGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/perkalian/pesawat-tembak-meteor" element={<PerkalianMeteorGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/perkalian/flappy-rocket" element={<PerkalianFlappyRocketGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/perkalian/tembak-tank" element={<PerkalianTembakTankGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/perkalian/space-impact" element={<PerkalianSpaceImpactGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/perkalian/turtle-run" element={<PerkalianTurtleRunGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/perkalian/tetris" element={<PerkalianTetrisGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/perkalian/snake-math" element={<PerkalianSnakeMathGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/pembagian" element={<PembagianBilanganBulatGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/pembagian/pesawat-tembak-meteor" element={<PembagianMeteorGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/pembagian/flappy-rocket" element={<PembagianFlappyRocketGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/pembagian/tembak-tank" element={<PembagianTembakTankGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/pembagian/space-impact" element={<PembagianSpaceImpactGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/pembagian/turtle-run" element={<PembagianTurtleRunGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/pembagian/tetris" element={<PembagianTetrisGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/pembagian/snake-math" element={<PembagianSnakeMathGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/operasi-campuran" element={<OperasiCampuranBilanganBulatGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/operasi-campuran/pesawat-tembak-meteor" element={<OperasiCampuranMeteorGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/operasi-campuran/flappy-rocket" element={<OperasiCampuranFlappyRocketGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/operasi-campuran/tembak-tank" element={<OperasiCampuranTembakTankGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/operasi-campuran/space-impact" element={<OperasiCampuranSpaceImpactGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/operasi-campuran/turtle-run" element={<OperasiCampuranTurtleRunGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/operasi-campuran/tetris" element={<OperasiCampuranTetrisGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/operasi-campuran/snake-math" element={<OperasiCampuranSnakeMathGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/kpk-fpb" element={<KPKFPBGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/kpk-fpb/pesawat-tembak-meteor" element={<KPKFPBMeteorGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/kpk-fpb/flappy-rocket" element={<KPKFPBFlappyRocketGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/kpk-fpb/tembak-tank" element={<KPKFPBTembakTankGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/kpk-fpb/space-impact" element={<KPKFPBSpaceImpactGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/kpk-fpb/turtle-run" element={<KPKFPBTurtleRunGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/kpk-fpb/tetris" element={<KPKFPBTetrisGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/kpk-fpb/snake-math" element={<KPKFPBSnakeMathGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/penjumlahan/meteor-pantul" element={<PenjumlahanMeteorPantulGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/pengurangan/meteor-pantul" element={<PenguranganMeteorPantulGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/perkalian/meteor-pantul" element={<PerkalianMeteorPantulGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/pembagian/meteor-pantul" element={<PembagianMeteorPantulGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/operasi-campuran/meteor-pantul" element={<OperasiCampuranMeteorPantulGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/kpk-fpb/meteor-pantul" element={<KPKFPBMeteorPantulGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/penjumlahan/galaksi-tempur" element={<PenjumlahanGalaksiTempurGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/pengurangan/galaksi-tempur" element={<PenguranganGalaksiTempurGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/perkalian/galaksi-tempur" element={<PerkalianGalaksiTempurGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/pembagian/galaksi-tempur" element={<PembagianGalaksiTempurGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/operasi-campuran/galaksi-tempur" element={<OperasiCampuranGalaksiTempurGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/kpk-fpb/galaksi-tempur" element={<KPKFPBGalaksiTempurGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/penjumlahan/zum-math" element={<PenjumlahanZumMathGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/pengurangan/zum-math" element={<PenguranganZumMathGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/perkalian/zum-math" element={<PerkalianZumMathGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/pembagian/zum-math" element={<PembagianZumMathGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/operasi-campuran/zum-math" element={<OperasiCampuranZumMathGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/kpk-fpb/zum-math" element={<KPKFPBZumMathGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/penjumlahan/pac-math" element={<PenjumlahanPacMathGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/pengurangan/pac-math" element={<PenguranganPacMathGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/perkalian/pac-math" element={<PerkalianPacMathGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/pembagian/pac-math" element={<PembagianPacMathGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/operasi-campuran/pac-math" element={<OperasiCampuranPacMathGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-bulat/kpk-fpb/pac-math" element={<KPKFPBPacMathGameMGAK7Page />} />
          <Route path="/numatik-gamez/bilangan-rasional" element={<BilanganRasionalMGAK7Page />} />
          <Route path="/numatik-gamez/aljabar" element={<AljabarMGAK7Page />} />
          <Route path="/numatik-gamez/plsv-ptlsv" element={<PLSVPtLSVMGAK7Page />} />
          <Route path="/numatik-gamez/perbandingan" element={<PerbandinganMGAK7Page />} />
          <Route path="/numatik-gamez/aritmetika-sosial" element={<AritmetikaSosialMGAK7Page />} />
          <Route path="/numatik-gamez/garis-dan-sudut" element={<GarisDanSudutMGAK7Page />} />
          <Route path="/numatik-gamez/segitiga-dan-segiempat" element={<SegitigaSegiempatMGAK7Page />} />
          <Route path="/numatik-gamez/himpunan" element={<HimpunanMGAK7Page />} />

          {/* Numatik Gamez classless chooser & dispatcher */}
          <Route path="/numatik-gamez/pilih/:parentSlug/:slug" element={<NumatikGamezChooserResolver />} />
          <Route path="/numatik-gamez/:parentSlug/:slug" element={<NumatikGamezChooserResolver />} />
          <Route path="/numatik-gamez/:parentSlug/:slug/:variant" element={<NumatikGamezDispatcherResolver />} />

          {/* Numatik Gamez - Kelas 8 Topic Routes */}
          <Route path="/numatik-gamez/pola-bilangan" element={<PolaBilanganMGAK8Page />} />
          <Route path="/numatik-gamez/koordinat-cartesius" element={<KoordinatCartesiusMGAK8Page />} />
          <Route path="/numatik-gamez/relasi-dan-fungsi" element={<RelasiFungsiMGAK8Page />} />
          <Route path="/numatik-gamez/spldv" element={<SPLDVMGAK8Page />} />
          <Route path="/numatik-gamez/persamaan-garis-lurus" element={<PersamaanGarisLurusMGAK8Page />} />
          <Route path="/numatik-gamez/persamaan-garis-lurus/gradien" element={<GradienPGLGameK8Page />} />
          <Route path="/numatik-gamez/persamaan-garis-lurus/grafik-pgl" element={<GrafikPGLGameK8Page />} />
          <Route path="/numatik-gamez/persamaan-garis-lurus/hubungan-2-garis" element={<Hubungan2GarisGameK8Page />} />
          <Route path="/numatik-gamez/persamaan-garis-lurus/menentukan-pgl" element={<MenentukanPGLGameK8Page />} />
          <Route path="/numatik-gamez/persamaan-garis-lurus/aplikasi-kontekstual" element={<AplikasiKontekstualPGLGameK8Page />} />
          <Route path="/numatik-gamez/teorema-pythagoras" element={<TeoremaPythagorasMGAK8Page />} />
          <Route path="/numatik-gamez/lingkaran" element={<LingkaranMGAK8Page />} />
          <Route path="/numatik-gamez/garis-singgung-lingkaran" element={<GarisSinggungLingkaranMGAK8Page />} />
          <Route path="/numatik-gamez/bangun-ruang-sisi-datar" element={<BangunRuangSisiDatarMGAK8Page />} />
          {/* Numatik Gamez - Kelas 9 Topic Routes */}
          <Route path="/numatik-gamez/bilangan-berpangkat" element={<BilanganBerpangkatMGAK9Page />} />
          <Route path="/numatik-gamez/kesebangunan-kekongruenan" element={<KesebangunanKekongruenMGAK9Page />} />
          <Route path="/numatik-gamez/transformasi-geometri" element={<TransformasiGeometriMGAK9Page />} />
          <Route path="/numatik-gamez/bangun-ruang-sisi-lengkung" element={<BangunRuangSisiLengkungMGAK9Page />} />
          <Route path="/numatik-gamez/statistika" element={<StatistikaMGAK9Page />} />
          <Route path="/numatik-gamez/peluang" element={<PeluangMGAK9Page />} />
          <Route path="/numatik-gamez/persamaan-kuadrat" element={<PersamaanKuadratMGAK9Page />} />
          <Route path="/numatik-gamez/fungsi-kuadrat" element={<FungsiKuadratMGAK9Page />} />
          {/* Buku Animasi Matematika Routes */}
          <Route path="/materi-matematika" element={<Navigate to="/buku-animasi-matematika" replace />} />
          <Route path="/buku-animasi-matematika" element={<BukuAnimasiMatematikaPage />} />
          <Route path="/materi-matematika/kelas-7" element={<Navigate to="/buku-animasi-matematika" replace />} />
          <Route path="/materi-matematika/kelas-8" element={<Navigate to="/buku-animasi-matematika" replace />} />
          <Route path="/materi-matematika/kelas-9" element={<Navigate to="/buku-animasi-matematika" replace />} />
          <Route path="/materi-matematika/*" element={<LegacyMathBookRedirect />} />
          <Route path="/buku-animasi-matematika/kelas-7/*" element={<LegacyMathBookRedirect />} />
          <Route path="/buku-animasi-matematika/kelas-8/*" element={<LegacyMathBookRedirect />} />
          <Route path="/buku-animasi-matematika/kelas-9/*" element={<LegacyMathBookRedirect />} />
          <Route path="/buku-animasi-matematika/bilangan-bulat" element={<BilanganBulatMMK7Page />} />
          <Route path="/buku-animasi-matematika/bilangan-bulat/penjumlahan" element={<PenjumlahanBilanganBulatMMK7Page />} />
          <Route path="/buku-animasi-matematika/bilangan-bulat/penjumlahan/buku-animasi" element={<BukuAnimasiPenjumlahanBilanganBulatPage />} />
          <Route path="/buku-animasi-matematika/bilangan-bulat/pengurangan" element={<PenguranganBilanganBulatMMK7Page />} />
          <Route path="/buku-animasi-matematika/bilangan-bulat/perkalian" element={<PerkalianBilanganBulatMMK7Page />} />
          <Route path="/buku-animasi-matematika/bilangan-bulat/pembagian" element={<PembagianBilanganBulatMMK7Page />} />
          <Route path="/buku-animasi-matematika/bilangan-bulat/operasi-campuran" element={<OperasiCampuranBilanganBulatMMK7Page />} />
          <Route path="/buku-animasi-matematika/bilangan-bulat/kpk-fpb" element={<KPKFPBBilanganBulatMMK7Page />} />
          <Route path="/buku-animasi-matematika/bilangan-rasional" element={<BilanganRasionalMMK7Page />} />
          <Route path="/buku-animasi-matematika/bilangan-rasional/arti-pecahan" element={<ArtiPecahanMMK7Page />} />
          <Route path="/buku-animasi-matematika/bilangan-rasional/pecahan-campuran" element={<PecahanCampuranMMK7Page />} />
          <Route path="/buku-animasi-matematika/bilangan-rasional/penjumlahan-pengurangan" element={<PenjumlahanPenguranganMMK7Page />} />
          <Route path="/buku-animasi-matematika/bilangan-rasional/perkalian" element={<PerkalianPecahanMMK7Page />} />
          <Route path="/buku-animasi-matematika/bilangan-rasional/pembagian" element={<PembagianPecahanMMK7Page />} />
          <Route path="/buku-animasi-matematika/bilangan-rasional/bentuk-desimal" element={<BentukDesimalMMK7Page />} />
          <Route path="/buku-animasi-matematika/bilangan-rasional/penjumlahan-pengurangan-desimal" element={<PenjumlahanPenguranganBentukDesimalMMK7Page />} />
          <Route path="/buku-animasi-matematika/bilangan-rasional/perkalian-desimal" element={<PerkalianBentukDesimalMMK7Page />} />
          <Route path="/buku-animasi-matematika/bilangan-rasional/pembagian-desimal" element={<PembagianBentukDesimalMMK7Page />} />
          <Route path="/buku-animasi-matematika/bilangan-rasional/pembulatan-desimal" element={<PembulatanBentukDesimalMMK7Page />} />
          <Route path="/buku-animasi-matematika/aljabar" element={<AljabarMMK7Page />} />
          <Route path="/buku-animasi-matematika/aljabar/pengertian-unsur" element={<PengertianUnsurMMK7Page />} />
          <Route path="/buku-animasi-matematika/aljabar/penjumlahan-pengurangan" element={<PenjumlahanPenguranganAljabarMMK7Page />} />
          <Route path="/buku-animasi-matematika/aljabar/perkalian" element={<PerkalianAljabarMMK7Page />} />
          <Route path="/buku-animasi-matematika/aljabar/pembagian" element={<PembagianAljabarMMK7Page />} />
          <Route path="/buku-animasi-matematika/aljabar/pemangkatan" element={<PemangkatanAljabarMMK7Page />} />
          <Route path="/buku-animasi-matematika/aljabar/substitusi" element={<SubstitusiAljabarMMK7Page />} />
          <Route path="/buku-animasi-matematika/aljabar/faktorisasi" element={<FaktorisasiAljabarMMK7Page />} />
          <Route path="/buku-animasi-matematika/aljabar/operasi-pecahan" element={<OperasiPecahanAljabarMMK7Page />} />
          <Route path="/buku-animasi-matematika/plsv-ptlsv" element={<PLSVPtLSVMMK7Page />} />
          <Route path="/buku-animasi-matematika/plsv-ptlsv/kalimat-terbuka-tertutup" element={<KalimatTerbukaTertutupPage />} />
          <Route path="/buku-animasi-matematika/plsv-ptlsv/pengertian-plsv" element={<PengertianPLSVPage />} />
          <Route path="/buku-animasi-matematika/plsv-ptlsv/penyelesaian-plsv" element={<PenyelesaianPLSVPage />} />
          <Route path="/buku-animasi-matematika/plsv-ptlsv/model-matematika-plsv" element={<ModelMatematikaPLSVPage />} />
          <Route path="/buku-animasi-matematika/plsv-ptlsv/pengertian-ptlsv" element={<PengertianPtLSVPage />} />
          <Route path="/buku-animasi-matematika/plsv-ptlsv/penyelesaian-ptlsv" element={<PenyelesaianPtLSVPage />} />
          <Route path="/buku-animasi-matematika/plsv-ptlsv/model-matematika-ptlsv" element={<ModelMatematikaPtLSVPage />} />
          <Route path="/buku-animasi-matematika/perbandingan" element={<PerbandinganMMK7Page />} />
          <Route path="/buku-animasi-matematika/perbandingan/umum" element={<PerbandinganUmumMMK7Page />} />
          <Route path="/buku-animasi-matematika/perbandingan/senilai" element={<PerbandinganSenilaiMMK7Page />} />
          <Route path="/buku-animasi-matematika/perbandingan/campuran" element={<PerbandinganCampuranMMK7Page />} />
          <Route path="/buku-animasi-matematika/perbandingan/bertingkat" element={<PerbandinganBertingkatMMK7Page />} />
          <Route path="/buku-animasi-matematika/perbandingan/skala" element={<SkalaMMK7Page />} />
          <Route path="/buku-animasi-matematika/aritmetika-sosial" element={<AritmetikaSosialMMK7Page />} />
          <Route path="/buku-animasi-matematika/aritmetika-sosial/jual-beli-untung-rugi" element={<JualBeliUntungRugiMMK7Page />} />
          <Route path="/buku-animasi-matematika/aritmetika-sosial/diskon" element={<DiskonMMK7Page />} />
          <Route path="/buku-animasi-matematika/aritmetika-sosial/bruto-netto-tara" element={<BrutoNettoTaraMMK7Page />} />
          <Route path="/buku-animasi-matematika/aritmetika-sosial/bunga-tunggal" element={<BungaTunggalMMK7Page />} />
          <Route path="/buku-animasi-matematika/aritmetika-sosial/ppn" element={<PPNMMk7Page />} />
          <Route path="/buku-animasi-matematika/aritmetika-sosial/pph" element={<PPhMMK7Page />} />
          <Route path="/buku-animasi-matematika/garis-dan-sudut" element={<GarisDanSudutMMK7Page />} />
          <Route path="/buku-animasi-matematika/garis-dan-sudut/hubungan-dua-garis" element={<HubunganDuaGarisMMK7Page />} />
          <Route path="/buku-animasi-matematika/garis-dan-sudut/sudut-pelurus-penyiku-bertolak" element={<SudutPelurusPenyikuBertolakMMK7Page />} />
          <Route path="/buku-animasi-matematika/garis-dan-sudut/sifat-sudut-sejajar" element={<SifatSudutDuaGarisSejajarPage />} />
          <Route path="/buku-animasi-matematika/garis-dan-sudut/jumlah-sudut-segi-banyak" element={<JumlahSudutSegiBanyakPage />} />
          <Route path="/buku-animasi-matematika/segitiga-dan-segiempat" element={<SegitigaSegiempatMMK7Page />} />
          <Route path="/buku-animasi-matematika/segitiga-dan-segiempat/garis-berat-bagi-tinggi" element={<GarisBeratBagiTinggiPage />} />
          <Route path="/buku-animasi-matematika/segitiga-dan-segiempat/keliling" element={<KelilingSegitigaSegiempatPage />} />
          <Route path="/buku-animasi-matematika/segitiga-dan-segiempat/luas-segitiga" element={<LuasSegitigaPage />} />
          <Route path="/buku-animasi-matematika/segitiga-dan-segiempat/luas-segiempat" element={<LuasSegiempatPage />} />
          <Route path="/buku-animasi-matematika/segitiga-dan-segiempat/bangun-tak-beraturan" element={<KelilingLuasBangunTakBeraturanPage />} />
          <Route path="/buku-animasi-matematika/himpunan" element={<HimpunanMMK7Page />} />
          <Route path="/buku-animasi-matematika/himpunan/pengertian-keanggotaan" element={<PengertianKeanggotaanHimpunanPage />} />
          <Route path="/buku-animasi-matematika/himpunan/jenis-himpunan" element={<JenisHimpunanPage />} />
          <Route path="/buku-animasi-matematika/himpunan/operasi-himpunan" element={<OperasiHimpunanMMK7Page />} />
          <Route path="/buku-animasi-matematika/himpunan/diagram-venn" element={<DiagramVennPage />} />
          <Route path="/buku-animasi-matematika/himpunan/pemecahan-masalah" element={<PemecahanMasalahHimpunanPage />} />
          <Route path="/buku-animasi-matematika/pola-bilangan" element={<PolaBilanganMMK8Page />} />
          <Route path="/buku-animasi-matematika/pola-bilangan/pengertian-pola" element={<PengertianPolaMMK8Page />} />
          <Route path="/buku-animasi-matematika/pola-bilangan/pola-khusus" element={<PolaKhususMMK8Page />} />
          <Route path="/buku-animasi-matematika/pola-bilangan/pola-aritmetika" element={<PolaAritmetikaMMK8Page />} />
          <Route path="/buku-animasi-matematika/pola-bilangan/pola-geometri" element={<PolaGeometriMMK8Page />} />
          <Route path="/buku-animasi-matematika/koordinat-cartesius" element={<KoordinatCartesiusMMK8Page />} />
          <Route path="/buku-animasi-matematika/koordinat-cartesius/unsur-unsur" element={<UnsurUnsurCartesiusMMK8Page />} />
          <Route path="/buku-animasi-matematika/koordinat-cartesius/posisi-relatif-titik-dan-garis" element={<PosisiRelatifTitikDanGarisMMK8Page />} />
          <Route path="/buku-animasi-matematika/koordinat-cartesius/posisi-relatif-titik-acuan" element={<PosisiRelatifTitikAcuanMMK8Page />} />
          <Route path="/buku-animasi-matematika/koordinat-cartesius/jarak-titik-garis" element={<JarakTitikGarisMMK8Page />} />
          <Route path="/buku-animasi-matematika/koordinat-cartesius/posisi-relatif-garis" element={<PosisiRelatifGarisMMK8Page />} />
          <Route path="/buku-animasi-matematika/relasi-dan-fungsi" element={<RelasiFungsiMMK8Page />} />
          <Route path="/buku-animasi-matematika/relasi-dan-fungsi/pengertian-relasi" element={<PengertianRelasiMMK8Page />} />
          <Route path="/buku-animasi-matematika/relasi-dan-fungsi/pengertian-fungsi" element={<PengertianFungsiMMK8Page />} />
          <Route path="/buku-animasi-matematika/relasi-dan-fungsi/banyak-fungsi" element={<BanyakFungsiMMK8Page />} />
          <Route path="/buku-animasi-matematika/relasi-dan-fungsi/buku-animasi-banyak-fungsi" element={<BukuAnimasiBanyakFungsiPage />} />
          <Route path="/buku-animasi-matematika/relasi-dan-fungsi/notasi-fungsi" element={<NotasiFungsiMMK8Page />} />
          <Route path="/buku-animasi-matematika/relasi-dan-fungsi/grafik-fungsi" element={<GrafikFungsiMMK8Page />} />
          <Route path="/buku-animasi-matematika/spldv" element={<SPLDVMMK8Page />} />
          <Route path="/buku-animasi-matematika/spldv/definisi" element={<DefinisiSPLDVMMK8Page />} />
          <Route path="/buku-animasi-matematika/spldv/metode-grafik" element={<MetodeGrafikMMK8Page />} />
          <Route path="/buku-animasi-matematika/spldv/metode-substitusi" element={<MetodeSubstitusiMMK8Page />} />
          <Route path="/buku-animasi-matematika/spldv/metode-eliminasi" element={<MetodeEliminasiMMK8Page />} />
          <Route path="/buku-animasi-matematika/spldv/metode-campuran" element={<MetodeCampuranMMK8Page />} />
          <Route path="/buku-animasi-matematika/spldv/model-spldv" element={<ModelSPLDVMMK8Page />} />
          <Route path="/buku-animasi-matematika/spldv/penyelesaian-masalah" element={<PenyelesaianMasalahSPLDVMMK8Page />} />
          <Route path="/buku-animasi-matematika/persamaan-garis-lurus" element={<PersamaanGarisLurusMMK8Page />} />
          <Route path="/buku-animasi-matematika/persamaan-garis-lurus/grafik" element={<GrafikPGLMMK8Page />} />
          <Route path="/buku-animasi-matematika/persamaan-garis-lurus/gradien" element={<GradienMMK8Page />} />
          <Route path="/buku-animasi-matematika/persamaan-garis-lurus/menentukan-pgl" element={<MenentukanPGLMMK8Page />} />
          <Route path="/buku-animasi-matematika/persamaan-garis-lurus/hubungan-2-garis" element={<Hubungan2GarisMMK8Page />} />
          <Route path="/buku-animasi-matematika/persamaan-garis-lurus/aplikasi-kontekstual" element={<AplikasiKontekstualMMK8Page />} />
          <Route path="/buku-animasi-matematika/teorema-pythagoras" element={<TeoremaPythagorasMMK8Page />} />
          <Route path="/buku-animasi-matematika/teorema-pythagoras/pembuktian" element={<PembuktianPythagorasMMK8Page />} />
          <Route path="/buku-animasi-matematika/teorema-pythagoras/menghitung-panjang" element={<MenghitungPanjangPythagorasMMK8Page />} />
          <Route path="/buku-animasi-matematika/teorema-pythagoras/triple-pythagoras" element={<TriplePythagorasMMK8Page />} />
          <Route path="/buku-animasi-matematika/teorema-pythagoras/jenis-segitiga" element={<JenisSegitigaPythagorasMMK8Page />} />
          <Route path="/buku-animasi-matematika/teorema-pythagoras/sudut-khusus" element={<SudutKhususPythagorasMMK8Page />} />
          <Route path="/buku-animasi-matematika/teorema-pythagoras/masalah-kontekstual" element={<MasalahKontekstualPythagorasMMK8Page />} />
          <Route path="/buku-animasi-matematika/lingkaran" element={<LingkaranMMK8Page />} />
          <Route path="/buku-animasi-matematika/lingkaran/unsur-unsur" element={<UnsurUnsurLingkaranMMK8Page />} />
          <Route path="/buku-animasi-matematika/lingkaran/keliling-luas" element={<KelilingLuasLingkaranMMK8Page />} />
          <Route path="/buku-animasi-matematika/lingkaran/kaitan-bangun-datar-lainnya" element={<KaitanBangunDatarLainnyaLingkaranMMK8Page />} />
          <Route path="/buku-animasi-matematika/lingkaran/kaitan-bangun-datar" element={<KaitanBangunDatarLingkaranMMK8Page />} />
          <Route path="/buku-animasi-matematika/lingkaran/busur-juring" element={<BusurJuringLingkaranMMK8Page />} />
          <Route path="/buku-animasi-matematika/lingkaran/sudut-pusat-keliling" element={<SudutPusatKelilingLingkaranMMK8Page />} />
          <Route path="/buku-animasi-matematika/lingkaran/penerapan-kontekstual" element={<PenerapanKontekstualLingkaranMMK8Page />} />
          <Route path="/buku-animasi-matematika/garis-singgung-lingkaran" element={<GarisSinggungLingkaranMMK8Page />} />
          <Route path="/buku-animasi-matematika/garis-singgung-lingkaran/pengertian" element={<PengertianGSLMMK8Page />} />
          <Route path="/buku-animasi-matematika/garis-singgung-lingkaran/menghitung-panjang" element={<MenghitungPanjangGSLMMK8Page />} />
          <Route path="/buku-animasi-matematika/garis-singgung-lingkaran/gspl" element={<GSPLMMk8Page />} />
          <Route path="/buku-animasi-matematika/garis-singgung-lingkaran/gspd" element={<GSPDMMk8Page />} />
          <Route path="/buku-animasi-matematika/garis-singgung-lingkaran/sabuk-lilitan" element={<SabukLilitanMMK8Page />} />
          <Route path="/buku-animasi-matematika/bangun-ruang-sisi-datar" element={<BangunRuangSisiDatarMMK8Page />} />
          <Route path="/buku-animasi-matematika/bangun-ruang-sisi-datar/kubus" element={<KubusMMK8Page />} />
          <Route path="/buku-animasi-matematika/bangun-ruang-sisi-datar/balok" element={<BalokMMK8Page />} />
          <Route path="/buku-animasi-matematika/bangun-ruang-sisi-datar/prisma" element={<PrismaMMK8Page />} />
          <Route path="/buku-animasi-matematika/bangun-ruang-sisi-datar/limas" element={<LimasMMK8Page />} />
          <Route path="/buku-animasi-matematika/bangun-ruang-sisi-datar/gabungan" element={<GabunganMMK8Page />} />
          <Route path="/buku-animasi-matematika/bilangan-berpangkat" element={<BilanganBerpangkatMMK9Page />} />
          <Route path="/buku-animasi-matematika/bilangan-berpangkat/pengertian-notasi" element={<PengertianNotasiPangkatMMK9Page />} />
          <Route path="/buku-animasi-matematika/bilangan-berpangkat/sifat-sifat-operasi" element={<SifatSifatOperasiMMK9Page />} />
          <Route path="/buku-animasi-matematika/bilangan-berpangkat/bentuk-akar" element={<BentukAkarMMK9Page />} />
          <Route path="/buku-animasi-matematika/bilangan-berpangkat/notasi-ilmiah" element={<NotasiIlmiahMMK9Page />} />
          <Route path="/buku-animasi-matematika/kesebangunan-kekongruenan" element={<KesebangunanKekongruenMMK9Page />} />
          <Route path="/buku-animasi-matematika/kesebangunan-kekongruenan/definisi" element={<DefinisiKesebangunanMMK9Page />} />
          <Route path="/buku-animasi-matematika/kesebangunan-kekongruenan/menghitung-rusuk" element={<MenghitungRusukMMK9Page />} />
          <Route path="/buku-animasi-matematika/kesebangunan-kekongruenan/segitiga-sebangun" element={<SegitigaSebangunMMK9Page />} />
          <Route path="/buku-animasi-matematika/kesebangunan-kekongruenan/perbandingan-rusuk-siku-siku" element={<PerbandinganRusukSikuSikuMMK9Page />} />
          <Route path="/buku-animasi-matematika/kesebangunan-kekongruenan/kekongruenan" element={<KekongruenBangunDatarMMK9Page />} />
          <Route path="/buku-animasi-matematika/transformasi-geometri" element={<TransformasiGeometriMMK9Page />} />
          <Route path="/buku-animasi-matematika/transformasi-geometri/translasi" element={<TranslasiMMK9Page />} />
          <Route path="/buku-animasi-matematika/transformasi-geometri/refleksi" element={<RefleksiMMK9Page />} />
          <Route path="/buku-animasi-matematika/transformasi-geometri/rotasi" element={<RotasiMMK9Page />} />
          <Route path="/buku-animasi-matematika/transformasi-geometri/dilatasi" element={<DilatasisMMK9Page />} />
          <Route path="/buku-animasi-matematika/bangun-ruang-sisi-lengkung" element={<BangunRuangSisiLengkungMMK9Page />} />
          <Route path="/buku-animasi-matematika/bangun-ruang-sisi-lengkung/tabung" element={<TabungMMK9Page />} />
          <Route path="/buku-animasi-matematika/bangun-ruang-sisi-lengkung/kerucut" element={<KerucutMMK9Page />} />
          <Route path="/buku-animasi-matematika/bangun-ruang-sisi-lengkung/bola" element={<BolaMMK9Page />} />
          <Route path="/buku-animasi-matematika/bangun-ruang-sisi-lengkung/perubahan-volume" element={<PerubahanVolumeMMK9Page />} />
          <Route path="/buku-animasi-matematika/bangun-ruang-sisi-lengkung/gabungan" element={<GabunganMMK9Page />} />
          <Route path="/buku-animasi-matematika/statistika" element={<StatistikaMMK9Page />} />
          <Route path="/buku-animasi-matematika/statistika/pengantar" element={<PengantarStatistikaMMK9Page />} />
          <Route path="/buku-animasi-matematika/statistika/penyajian-data" element={<PenyajianDataMMK9Page />} />
          <Route path="/buku-animasi-matematika/statistika/rata-rata" element={<RataRataMMK9Page />} />
          <Route path="/buku-animasi-matematika/statistika/median-modus" element={<MedianModusMMK9Page />} />
          <Route path="/buku-animasi-matematika/statistika/kuartil" element={<KuartilMMK9Page />} />
          <Route path="/buku-animasi-matematika/statistika/penyebaran-data" element={<PenyebaranDataMMK9Page />} />
          <Route path="/buku-animasi-matematika/peluang" element={<PeluangMMK9Page />} />
          <Route path="/buku-animasi-matematika/peluang/ruang-sampel" element={<RuangSampelMMK9Page />} />
          <Route path="/buku-animasi-matematika/peluang/peluang-empirik" element={<PeluangEmpirikMMK9Page />} />
          <Route path="/buku-animasi-matematika/peluang/peluang-teoretik" element={<PeluangTeoretikMMK9Page />} />
          <Route path="/buku-animasi-matematika/peluang/frekuensi-harapan" element={<FrekuensiHarapanMMK9Page />} />
          <Route path="/buku-animasi-matematika/peluang/komplemen" element={<KomplementMMK9Page />} />
          <Route path="/buku-animasi-matematika/peluang/kejadian-majemuk" element={<PeluangKejadianMajemukMMK9Page />} />
          <Route path="/buku-animasi-matematika/persamaan-kuadrat" element={<PersamaanKuadratMMK9Page />} />
          <Route path="/buku-animasi-matematika/persamaan-kuadrat/bentuk-umum" element={<PKMMBentukUmumPage />} />
          <Route path="/buku-animasi-matematika/persamaan-kuadrat/pemfaktoran" element={<PKMMPemfaktoranPage />} />
          <Route path="/buku-animasi-matematika/persamaan-kuadrat/rumus-kuadratik" element={<PKMMRumusKuadratikPage />} />
          <Route path="/buku-animasi-matematika/persamaan-kuadrat/pelengkap-kuadrat" element={<PKMMPelengkapKuadratPage />} />
          <Route path="/buku-animasi-matematika/persamaan-kuadrat/diskriminan" element={<PKMMDiskriminanPage />} />
          <Route path="/buku-animasi-matematika/persamaan-kuadrat/menyusun-baru" element={<PKMMMenyusunBaruPage />} />
          <Route path="/buku-animasi-matematika/persamaan-kuadrat/penerapan-kontekstual" element={<PKMMPenerapanKontekstualPage />} />
          <Route path="/buku-animasi-matematika/fungsi-kuadrat" element={<FungsiKuadratMMK9Page />} />
          <Route path="/buku-animasi-matematika/fungsi-kuadrat/bentuk-umum-karakteristik" element={<FKMMBentukUmumKarakteristikPage />} />
          <Route path="/buku-animasi-matematika/fungsi-kuadrat/titik-potong" element={<FKMMTitikPotongPage />} />
          <Route path="/buku-animasi-matematika/fungsi-kuadrat/sumbu-simetri" element={<FKMMSumbuSimetriPage />} />
          <Route path="/buku-animasi-matematika/fungsi-kuadrat/menggambar-grafik" element={<FKMMMenggambarGrafikPage />} />
          <Route path="/buku-animasi-matematika/fungsi-kuadrat/menyusun-fungsi" element={<FKMMMenyusunFungsiPage />} />
          <Route path="/buku-animasi-matematika/fungsi-kuadrat/penerapan-nilai-maks-min" element={<FKMMPenerapanNilaiMaksMinPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
        </div>
      </Suspense>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AnimationProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SoundProvider>
            <MusicProvider>
              <FontProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  {!Capacitor.isNativePlatform() && <Analytics />}
                  <BrowserRouter>
                    <AppInner />
                  </BrowserRouter>
                </TooltipProvider>
              </FontProvider>
            </MusicProvider>
          </SoundProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AnimationProvider>
  </QueryClientProvider>
);

export default App;
