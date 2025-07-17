"use client"

import React, { useEffect, useState } from 'react'

const Page = () => {

  const [data, setData] = useState([])

  useEffect(() => {

    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch(() => {
        console.log("error")
      })

    return () => {
      controller.abort(); // This aborts the fetch if the component unmounts
    }
  }, [])

  return (
    <div>

      {data.map((value) => (

        <h1>{value.name}</h1>
      )
      )}
    </div>
  )
}

export default Page