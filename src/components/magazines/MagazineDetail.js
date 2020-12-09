import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { CompletedStory } from "../stories/CompletedStory"
import { StorySubmitted } from "../stories/Story"
import { SubmittedStoriesContext } from "../submittedStories/SubmittedStoriesProvider"
import { Magazine } from "./Magazine"

export const MagazineDetail = (props) => {
    const {getSubmittedStories, submittedStories} = useContext(SubmittedStoriesContext)
    // const magazine = props.location.state.chosenMagazine
    
    useEffect(() => {
        getSubmittedStories()
    }, [])

    return (
        <>
            <article className="magazineDetails">
                <header className="magDetailsTitle">
                    <h2 className="magDetailsTitle">{props.location.state.chosenMagazine.name}</h2>
                </header>
                <Magazine mag={props.location.state.chosenMagazine} {...props} />
                <button onClick={() => props.history.push("/")}>Dashboard</button>
                <Link to={{ pathname: "/magazines/submissions", state: { chosenMag: props.location.state.chosenMagazine } }}>
                    <button>Add submission</button>
                </Link>
            </article>
            <article className="pendingSubmissions">
                <h2>Pending Submissions</h2>
                {
                    submittedStories.map(sub => {
                        if (sub.magazineId === props.location.state.chosenMagazine.id && sub.isPending) {
                          return  <StorySubmitted story={sub.story} sub={sub} mag={props.location.state.chosenMagazine} {...props}/> 
                        }
                    })
                }
            </article>
        </>
    )
}