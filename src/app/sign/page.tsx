import { getPetitionCountAction } from "@/src/actions/petition.actions";
import PetitionForm from "./_components/PetitionForm";
import { Header } from "../_components/Header";
import Footer from "../_components/Footer";

export const dynamic = 'force-dynamic'

export const metadata = {
  title: "Sign the Petition | Save Sierra Madre",
  description:
    "Join thousands in protecting Sierra Madre. Sign the petition today.",
};

export default async function SignPetitionPage() {
  const { ok, data: petitionCount } = await getPetitionCountAction();

  return (
    <>
      <Header variant="filled" noMargin />
      <PetitionForm
        initialSignatureCount={ok ? petitionCount ?? 0 : 0}
        goalSignatures={10000}
      />
      <Footer />
    </>
  );
}
