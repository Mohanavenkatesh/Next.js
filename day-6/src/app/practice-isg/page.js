import React from 'react'

export const revalidate = 10;

export default async function ISGPractice() {

    const res = await fetch('https://api.vercel.app/blog/4', { next: { revalidate: 10 } })

    const api_data = await res.json()

    return (
        <div>
            <h1>{api_data.title}</h1>
            <h1>{api_data.content}</h1>
        </div>
    );

}


