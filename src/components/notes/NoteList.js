import React, { useContext, useEffect } from "react"
import { NoteContext } from "./NoteProvider"
import "./notes.css"

export const NoteList = (props) => {
    const { notes, getNotes } = useContext(NoteContext)
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
                                    <div className="btnDiv">
                                        <button onClick={() => props.history.push(`/notes/edit/${note.id}`, { chosenNote: note })}>
                                            Edit note
                                        </button>
                                    </div>
                                </article>
                            )
                        }
                    })
                }
            </section>
            <div className="btnDiv">
                <button onClick={() => props.history.push(`/stories/notes/create/${story.id}`)}>New note</button>
            </div>

        </div>

    )
}