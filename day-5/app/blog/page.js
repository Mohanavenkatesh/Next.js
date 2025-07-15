import React from 'react'
import data from '../data/data.js'


const page = () => {
    return (
        <div>
            {data.map((map) => {

                return (
                  
                    <ul key={map.id}>
                        <li>{map.post}</li>  
                    </ul>
                      
                )

            })}
        </div>
    )
}

export default page