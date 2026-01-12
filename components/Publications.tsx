"use client";

import { FormEvent, useState } from 'react';
import { searchPublicationAction } from "@/app/actions";
import { Publication } from "@/interfaces/publication";

interface PublicationProps {
    publications: Publication[]
}

export default function Publications({ publications }: PublicationProps) {
    const [pubs, setPubs] = useState<Publication[]>(publications);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const toSearch = formData.get("to-search") as string;
        const matchedPublications = await searchPublicationAction(toSearch);
        setPubs(matchedPublications);
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <label htmlFor="">Search</label>
                <input id="to-search" type="text" name="to-search" className="border-2 border-black"/>
            </form>
            {pubs.map((pub) => (
                <div key={pub.id}>
                    <p>{pub.author}</p>
                    <p>{pub.content}</p>
                    <p>{pub.datePublished.toString()}</p>
                </div>
            ))}
        </>
    );
}