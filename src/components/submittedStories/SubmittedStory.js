import React, { useContext, useRef } from "react"
import { Link } from "react-router-dom"
import { SubmittedStoriesContext } from "./SubmittedStoriesProvider"

export const StorySubmitted = ({ story, history, sub }) => {
    const { editSubmission } = useContext(SubmittedStoriesContext)

    const accepted = useRef(false)

    const storyResponse = () => {
        if (accepted.current.value === "true") {
            editSubmission({
                id: sub.id,
                magazineId: sub.magazineId,
                storyId: sub.storyId,
                dateSubmitted: sub.dateSubmitted,
                expectedResponseDate: sub.expectedResponseDate,
                isPending: false,
                accepted: true

            })
        } else if (accepted.current.value === "false") {
            editSubmission({
                id: sub.id,
                magazineId: sub.magazineId,
                storyId: sub.storyId,
                dateSubmitted: sub.dateSubmitted,
                expectedResponseDate: sub.expectedResponseDate,
                isPending: false,
                accepted: false

            })
        }
    }

    if (sub.isPending) {

        return (
            <div className="story">
                <h3 className="storyCardTitle">{story.title}</h3>
                <p>Total word count goal: {story.totalWordGoal}</p>
                <p>Daily word count goal: {story.dailyWordGoal}</p>
                <p>Expected response date: {sub.expectedResponseDate}</p>
                <select defaultValue="" ref={accepted} onChange={storyResponse}>
                    <option value="0">Select response</option>
                    <option value="true">Accepted</option>
                    <option value="false">Rejected</option>
                </select>
                <section className="pendingBtns">
                    <button onClick={() => history.push(`/stories/notes/create/${story.id}`)}>Add note</button>
                    <Link to={{ pathname: `/stories/notes/${story.id}`, state: { chosenStory: story } }}>
                        <button>View notes</button>
                    </Link>
                </section>

            </div>
        )
    } else {

        return (
            <div className="story">
                <h3 className="storyCardTitle">{story.title}</h3>
                <p>Total word count goal: {story.totalWordGoal}</p>
                <p>Daily word count goal: {story.dailyWordGoal}</p>
                <button onClick={() => history.push(`/stories/notes/create/${story.id}`)}>Add note</button>
                <Link to={{ pathname: `/stories/notes/${story.id}`, state: { chosenStory: story } }}>
                    <button>View notes</button>
                </Link>

            </div>
        )
    }

}
