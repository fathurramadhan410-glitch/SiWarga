import VerifyClient from "./VerifyClient";

export default function Page({ params }: { params: { id: string } }) {
  // Mengambil ID dari URL dan meneruskannya ke Client Component
  return <VerifyClient id={params.id} />;
}