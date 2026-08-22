import OlympiadBankPage from "@/components/bank-soal/OlympiadBankPage";
import { latihanOlimpiade } from "@/pages/OlimpiadePerbandinganPage";

export default function PerbandinganPage() {
  return <OlympiadBankPage title="Perbandingan" questions={latihanOlimpiade} />;
}
