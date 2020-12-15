import React, { useState } from "react"

// React.createContext makes a context object which allows other components to have access to the data stored in the value of the context's Provider. Every Context object has a corresposding Provider, which in this case is the MagazineProvider. 
export const MagazineContext = React.createContext()

export const MagazineProvider = (props) => {
    // useState returns two things: the value of the first is whatever I pass as an argument into the function (in this case an empty array), and the second is a function for changing the state of that returned value. Using array deconstruction on the left side of the =, I initialized magazines as an empty array, and setMagazines is a variable which stores the function used to change the state of magazines to whatever is passed as an argument when it is called.
    const [magazines, setMagazines] = useState([])

    const getMagazines = () => {
        return fetch("http://localhost:8088/magazines")
        .then(r => r.json())
        // since .then takes a callback function as an argument, I don't have to use the () to call setMagazines, and this will automatically pass the data returned from the previous .then as an argument.
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

    const getMagById = id => {
        return fetch(`http://localhost:8088/magazines/${id}`)
        .then(r => r.json())
    }

    const editMagazine = magazine => {
        return fetch(`http://localhost:8088/magazines/${magazine.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(magazine)
        })
        .then(getMagazines)
    }

    return (
        <MagazineContext.Provider value={{magazines, setMagazines, getMagazines, addMagazine, deleteMagazine, getMagById, editMagazine}}>
            {/* from React documentation: props.children is available on every component. It contains the content between the opening and closing tags of a component. */}
            {props.children}
        </MagazineContext.Provider>
    )
}