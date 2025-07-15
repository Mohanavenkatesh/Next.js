import React from 'react'
import datas from '../data/data.js'

const page = () => {
    return (
        <div>
            {datas.map((li) => {

                return (

                    <li>{li.post}</li>
                )


            })}
        </div>
    )
}

export default page