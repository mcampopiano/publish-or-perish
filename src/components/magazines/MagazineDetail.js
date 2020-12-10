import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { StorySubmitted, StoryAcceptedRejected } from "../stories/Story"
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
                {/* Since Magazine is a user-defined component functioning similarly to a DOM element in this case, I can pass information, in this case mag, which will be passed as an argument to the Magazine function. */}
                <Magazine mag={props.location.state.chosenMagazine} {...props} />
                <button onClick={() => props.history.push("/")}>Dashboard</button>
                {/* In the below case, I am using Link instead of the onClick function because I need to pass certain information in the location.state property. */}
                <Link to={{ pathname: "/magazines/submissions", state: { chosenMag: props.location.state.chosenMagazine } }}>
                    <button>Add submission</button>
                </Link>
            </article>
            <article className="pendingSubmissions">
                <h2>Pending Submissions</h2>
                {
                    submittedStories.map(sub => {
                        if (sub.magazineId === props.location.state.chosenMagazine.id && sub.isPending && parseInt(localStorage.getItem("app_user_id")) ===sub.story.userId) {
                          return  <StorySubmitted story={sub.story} sub={sub} mag={props.location.state.chosenMagazine} {...props}/> 
                        }
                    })
                }
            </article>
            <article className="acceptedSubmissions">
                <h2>Accepted Submissions</h2>
                {
                    submittedStories.map(sub => {
                        if (sub.magazineId === props.location.state.chosenMagazine.id && !sub.isPending && sub.accepted && parseInt(localStorage.getItem("app_user_id")) ===sub.story.userId) {
                          return  <StoryAcceptedRejected story={sub.story} mag={props.location.state.chosenMagazine} {...props}/> 
                        }
                    })
                }
            </article>
            <article className="rejectedSubmissions">
                <h2>Rejected Submissions</h2>
                {
                    submittedStories.map(sub => {
                        if (sub.magazineId === props.location.state.chosenMagazine.id && !sub.isPending && !sub.accepted && parseInt(localStorage.getItem("app_user_id")) === sub.story.userId) {
                          return  <StoryAcceptedRejected story={sub.story} mag={props.location.state.chosenMagazine} {...props}/> 
                        }
                    })
                }
            </article>
        </>
    )
}