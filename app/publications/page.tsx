// page.tsx (Server Component)
import { getArticles } from "./data";
import PublicationsClient from "./PublicationsClient";

export default async function Publications() {

  // Mock data fetching
  const { externalPubs, internalPubs } = await getArticles();

  // Pass data to Client Component
  return (
    <PublicationsClient 
      initialExternalArticles={externalPubs} 
      initialInternalArticles={internalPubs} 
    />
  );
}