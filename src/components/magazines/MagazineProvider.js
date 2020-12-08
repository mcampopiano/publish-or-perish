import React, { useState } from "react"

export const MagazineContext = React.createContext()

export const MagazineProvider = (props) => {
    const [magazines, setMagazines] = useState([])

    const getMagazines = () => {
        return fetch("http://localhost:8088/magazines")
        .then(r => r.json())
        .then(setMagazines)
    }

    const addMagazine = (magazine) => {
        return fetch("http://localhost:8088/magazines", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(magazine)
        })
        .then(getMagazines)
    }

    const deleteMagazine = (magazine) => {
        return fetch(`http://localhost:8088/magazines/${magazine.id}`, {
            method: "DELETE"
        })
        .then(getMagazines)
    }

    return (
        <MagazineContext.Provider value={{magazines, setMagazines, getMagazines, addMagazine, deleteMagazine}}>
            {props.children}
        </MagazineContext.Provider>
    )
}