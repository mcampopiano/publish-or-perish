import React, { useContext, useRef } from "react"
import { NoteContext } from "./NoteProvider"

export const NoteForm = (props) => {
    const { addNote } = useContext(NoteContext)

    const entry = useRef(null)

    const constructNote = () => {
        addNote({
            storyId: parseInt(props.match.params.storyId),
            entry: entry.current.value
        })
            .then(props.history.push("/"))
    }

    return (
        <form className="noteForm">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="noteEntry">Enter note: </label>
                    <textarea id="noteEntry" ref={entry}></textarea>
                </div>
            </fieldset>
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
        </form>
    )
}