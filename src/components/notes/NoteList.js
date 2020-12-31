import React, { useContext, useEffect } from "react"
import { NoteContext } from "./NoteProvider"
import "./notes.css"

export const NoteList = (props) => {
    const { notes, getNotes, deleteNote } = useContext(NoteContext)
    const story = props.location.state.chosenStory

    useEffect(() => {
        getNotes()
    }, [])

    return (
        <div className="noteList">

            <h2 className="notesTitle">{story.title}</h2>
            <section className="notes">
                {
                    notes.map(note => {
                        if (note.storyId === parseInt(story.id)) {
                            return (
                                <article className="noteEntry" key={note.id}>
                                    <p> {note.entry} </p>
                                    <section className="noteBtns">
                                        <div className="btnDiv">
                                            <button onClick={() => props.history.push(`/notes/edit/${note.id}`, { chosenNote: note })}>
                                                Edit note
                                        </button>
                                        </div>
                                        <div className="btnDiv">
                                            <button onClick={() => { if (window.confirm("Are you sure you want to delete? Doing so will permanently remove the note and cannot be undone.")) deleteNote(note) }}>
                                                Delete note
                                        </button>
                                        </div>
                                    </section>
                                </article>
                            )
                        }
                    })
                }
            </section>
            <div className="btnDiv">
                <button className="newNote" onClick={() => props.history.push(`/stories/notes/create/${story.id}`)}>New note</button>
            </div>

        </div>

    )
}