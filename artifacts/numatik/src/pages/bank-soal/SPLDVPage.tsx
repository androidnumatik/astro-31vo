import OlympiadBankPage from "@/components/bank-soal/OlympiadBankPage";
import { latihanOlimpiade } from "@/pages/OlimpiadeSPLDVPage";

export default function SPLDVPage() {
  return <OlympiadBankPage title="Sistem Persamaan Linear Dua Variabel" questions={latihanOlimpiade} />;
}
