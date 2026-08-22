import OlympiadBankPage from "@/components/bank-soal/OlympiadBankPage";
import { latihanOlimpiade } from "@/pages/OlimpiadeBilanganBulatPage";

export default function BilanganBulatPage() {
  return <OlympiadBankPage title="Bilangan Bulat" questions={latihanOlimpiade} />;
}
