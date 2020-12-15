import React, { useContext, useEffect } from "react"
import { NoteContext } from "./NoteProvider"

export const NoteList = (props) => {
    const { notes, getNotes } = useContext(NoteContext)
    const story = props.location.state.chosenStory

    useEffect(() => {
        getNotes()
    }, [])

    return (
        <div className="noteList">

            <h2>{story.title}</h2>
            <section className="notes">
                {
                    notes.map(note => {
                        if (note.storyId === parseInt(story.id)) {
                            return (
                                <article className="noteEntry" key={note.id}>
                                    <p> {note.entry} </p>
                                    <div className="btnDiv">
                                        <button onClick={() => props.history.push(`/notes/edit/${note.id}`, {chosenNote: note} )}>
                                            Edit note
                                        </button>
                                    </div>
                                </article>
                            )
                        }
                    })
                }
            </section>

            <button className="btn btn-primary" onClick={() => props.history.push("/")}>
                Dashboard
            </button>

        </div>

    )
}