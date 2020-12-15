import React, { useContext, useEffect, useState } from "react"
import { NoteContext } from "./NoteProvider"

export const NoteForm = (props) => {
    const { addNote, getNotes, notes, editNote } = useContext(NoteContext)

    const [note, setNote] = useState({entry: ""})

    const editMode = props.match.params.hasOwnProperty("noteId")

    const handleControlledInputChange = (event) => {
        const newNote = Object.assign({}, note)
        newNote[event.target.name] = event.target.value
        setNote(newNote)
    }

    const getNoteInEditMode = () => {
        if (editMode) {
            const selectedNote = props.location.state.chosenNote || {}
            setNote(selectedNote)
        }
    }

    useEffect(() => {
        getNotes()
    }, [])
    
    useEffect(() => {
        getNoteInEditMode()
    }, [notes])

    const constructNote = () => {
        if (editMode) {
            editNote({
                id: note.id,
                entry: note.entry,
                storyId: note.storyId
            })
            .then(props.history.push("/"))
        } else {

            addNote({
                storyId: parseInt(props.match.params.storyId),
                entry: note.entry
            })
                .then(props.history.push("/"))
        }

    }

    return (
        <form className="noteForm">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="noteEntry">Enter note: </label>
                    <textarea id="noteEntry" name="entry" value={note.entry} onChange={handleControlledInputChange}></textarea>
                </div>
            </fieldset>
            <section className="formButtons">
                <button type="submit" className="btn btn-primary" onClick={event => {
                    event.preventDefault()
                    constructNote()
                }
                }>
                    Save note
                </button>
                <button type="submit" className="btn btn-primary" onClick={event => {
                    event.preventDefault()
                    props.history.push("/")
                }
                }>
                    Dashboard
                </button>
            </section>
        </form>
    )
}