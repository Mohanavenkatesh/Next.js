import React from 'react'

const page = ({ params }) => {
    return (
        <div>dynamic page {params.dynamicroot}</div>
    )
}

export default page