import React from 'react'

export async function props() {

  const apiData = await fetch("https://api.vercel.app/blog/4")
  const res = await apiData.json()

}

const Page = () => {
  return (
    <div>
      <h1>{res.title}</h1>
    </div>
  )
}

export default Page