import { db } from "@/db/index";
import { publicationsTable } from "@/db/schema";
import PublicationClient from "@/components/Publications";
import { Publication } from "@/interfaces/publication";

export default async function PublicationsPage() {
    const publications: Publication[] = await db.select({
        id: publicationsTable.id,
        author: publicationsTable.author,
        content: publicationsTable.content,
        datePublished: publicationsTable.datePublished
    }).from(publicationsTable);
    
    return (
        <PublicationClient publications={publications}/>
    );
}