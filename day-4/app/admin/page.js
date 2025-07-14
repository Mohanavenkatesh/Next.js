"use client"
import { useRouter } from 'next/navigation'


const page = () => {

  const router = useRouter()

  const handleClick = () => {


    router.push("/dashboard")

  }



  return (
    <div>


      <h1>Admin Page</h1>
      <button  className="border border-white p-1 rounded" onClick={handleClick} >Dashboard Button From Admin</button>

    </div>
  )
}

export default page