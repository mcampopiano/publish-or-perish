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
                                <article className="noteEntry">
                                    <p> {note.entry} </p>
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