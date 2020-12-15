import React, { useState } from "react"

export const NoteContext = React.createContext()

export const NoteProvider = (props) => {
    const [notes, setNotes] = useState([])

    const getNotes = () => {
        return fetch("http://localhost:8088/notes")
        .then(r => r.json())
        .then(setNotes)
    }

    const addNote = note => {
        return fetch("http://localhost:8088/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        })
        .then(getNotes)
    }

    const editNote = note => {
        return fetch(`http://localhost:8088/notes/${note.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        })
        .then(getNotes)
    }

    return (
        <NoteContext.Provider value={{notes, setNotes, getNotes, addNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}