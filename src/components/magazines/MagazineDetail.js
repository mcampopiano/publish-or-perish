import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { SubmittedStoriesContext } from "../submittedStories/SubmittedStoriesProvider"
import { StorySubmitted } from "../submittedStories/SubmittedStory"
import { Magazine } from "./Magazine"

export const MagazineDetail = (props) => {
    const { getSubmittedStories, submittedStories } = useContext(SubmittedStoriesContext)
    const magazine = props.location.state.chosenMagazine

    useEffect(() => {
        getSubmittedStories()
    }, [])

    return (
        <>
            <header className="magDetailsTitle">
                <h1>{magazine.name}</h1>
            </header>
            <section className="detailsPendingDisplay">
                <article className="magazineDetails">
                    {/* Since Magazine is a user-defined component functioning similarly to a DOM element in this case, I can pass information, in this case mag, which will be passed as an argument to the Magazine function. */}
                    <Magazine mag={magazine} {...props} />
                    {/* In the below case, I am using Link instead of the onClick function because I need to pass certain information in the location.state property. */}
                    <Link to={{ pathname: "/magazines/submissions", state: { chosenMag: magazine } }}>
                        <button>Add submission</button>
                    </Link>
                </article>
                <article className="pendingSubmissions">
                    <h2 className="pendingHeader">Pending Submissions</h2>
                    {
                        submittedStories.map(sub => {
                            if (sub.magazineId === magazine.id && sub.isPending && parseInt(localStorage.getItem("app_user_id")) === sub.story.userId) {
                                return <StorySubmitted story={sub.story} key={sub.id} sub={sub} mag={magazine} {...props} />
                            }
                        })
                    }
                </article>
            </section>
            <section className="acceptedRejectedDisplay">
                <article className="acceptedSubmissions">
                    <h2 className="acceptedHeader">Accepted Submissions</h2>
                    {
                        submittedStories.map(sub => {
                            if (sub.magazineId === magazine.id && !sub.isPending && sub.accepted && parseInt(localStorage.getItem("app_user_id")) === sub.story.userId) {
                                return <StorySubmitted story={sub.story} key={sub.id} sub={sub} {...props} />
                            }
                        })
                    }
                </article>
                <article className="rejectedSubmissions">
                    <h2 className="rejectedHeader">Rejected Submissions</h2>
                    {
                        submittedStories.map(sub => {
                            if (sub.magazineId === magazine.id && !sub.isPending && !sub.accepted && parseInt(localStorage.getItem("app_user_id")) === sub.story.userId) {
                                return <StorySubmitted story={sub.story} key={sub.id} sub={sub} {...props} />
                            }
                        })
                    }
                </article>
            </section>
            <button onClick={() => props.history.push("/")}>Home</button>
        </>
    )
}