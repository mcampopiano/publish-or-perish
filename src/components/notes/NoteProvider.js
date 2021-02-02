import React, { useState } from "react"

export const NoteContext = React.createContext()

export const NoteProvider = (props) => {
    const [notes, setNotes] = useState([])

    const getNotes = () => {
        return fetch("https://publish-or-perish-api.herokuapp.com/notes")
        .then(r => r.json())
        .then(setNotes)
    }

    const addNote = note => {
        return fetch("https://publish-or-perish-api.herokuapp.com/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        })
        .then(getNotes)
    }

    const editNote = note => {
        return fetch(`https://publish-or-perish-api.herokuapp.com/notes/${note.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        })
        .then(getNotes)
    }

    const deleteNote = note => {
        return fetch(`https://publish-or-perish-api.herokuapp.com/notes/${note.id}`, {
            method: "DELETE"
        }).then(getNotes)
    }

    return (
        <NoteContext.Provider value={{notes, setNotes, getNotes, addNote, editNote, deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}