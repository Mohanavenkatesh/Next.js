"use client"
import React from 'react'

const ClientSideRender = () => {

    const handleClicked = () => {

        alert("Hi")

    }

    return (
        <>


            <button onClick={handleClicked}>Button</button>


        </>
    )
}

export default ClientSideRender