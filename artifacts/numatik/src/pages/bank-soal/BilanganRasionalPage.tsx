import OlympiadBankPage from "@/components/bank-soal/OlympiadBankPage";
import { latihanOlimpiade } from "@/pages/OlimpiadeBilanganRasionalPage";

export default function BilanganRasionalPage() {
  return <OlympiadBankPage title="Bilangan Rasional" questions={latihanOlimpiade} />;
}
