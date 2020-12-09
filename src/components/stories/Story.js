import React, { useContext, useRef } from "react"
import { Link } from "react-router-dom"
import { SubmittedStoriesContext } from "../submittedStories/SubmittedStoriesProvider"
import { StoryContext } from "./StoryProvider"

export const Story = ({ story, history }) => {
    const { editStory, deleteStory } = useContext(StoryContext)
    const complete = useRef(null)
    const storyComplete = () => {
        editStory({
            id: parseInt(story.id),
            userId: parseInt(story.userId),
            title: story.title,
            totalWordGoal: story.totalWordGoal,
            dailyWordGoal: story.dailyWordGoal,
            complete: complete.current.checked
        })
    }

    return (
        <div className="story">
            <h3>{story.title}</h3>
            <label htmlFor="completeBox">Check when completed</label>
            <input type="checkbox" ref={complete} onChange={storyComplete} />
            <p>Total word count goal: {story.totalWordGoal}</p>
            <p>Daily word count goal: {story.dailyWordGoal}</p>
            <button onClick={() => history.push(`/stories/notes/create/${story.id}`)}>Add note</button>
            <Link to={{ pathname: `/stories/notes/${story.id}`, state: { chosenStory: story } }}>
                <button>View notes</button>
            </Link>
            <button onClick={() => deleteStory(story)}>Delete Story</button>

        </div>
    )
}


export const CompletedStory = ({ story, history }) => {
    const {editStory, deleteStory} = useContext(StoryContext)
    const complete = useRef(null)
    const storyComplete = () => {
        editStory({
            id: parseInt(story.id),
            userId: parseInt(story.userId),
            title: story.title,
            totalWordGoal: story.totalWordGoal,
            dailyWordGoal: story.dailyWordGoal,
            complete: complete.current.checked
        })
    }

    return (
        <div className="story">
            <h3>{story.title}</h3>
            <label htmlFor="completeBox">Check to mark story incomplete</label>
            <input type="checkbox" checked ref={complete} onChange={storyComplete}/>
            <button onClick={() => history.push(`/stories/notes/create/${story.id}`)}>Add note</button>
            <Link to={{pathname: `/stories/notes/${story.id}`, state: {chosenStory: story}}}>
                <button>View notes</button>
            </Link>
            <button onClick={() => deleteStory(story)}>Delete story</button>
        </div>
    )
}

export const StorySubmitted = ({ story, history, mag, sub }) => {
    const { deleteStory} = useContext(StoryContext)
    const {editSubmission} = useContext(SubmittedStoriesContext)

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


    return (
        <div className="story">
            <h3>{story.title}</h3>
            <p>Total word count goal: {story.totalWordGoal}</p>
            <p>Daily word count goal: {story.dailyWordGoal}</p>
            <select defaultValue="" ref={accepted} onChange={storyResponse}>
                <option value="0">Select response</option>
                <option value="true">Accepted</option>
                <option value="false">Rejected</option>
            </select>
            <button onClick={() => history.push(`/stories/notes/create/${story.id}`)}>Add note</button>
            <Link to={{ pathname: `/stories/notes/${story.id}`, state: { chosenStory: story } }}>
                <button>View notes</button>
            </Link>
            <button onClick={() => {
                deleteStory(story)
                history.push(`/magazines/${mag.id}`)
            }}>Delete Story</button>

        </div>
    )
}


export const StoryAcceptedRejected = ({ story, history, mag }) => {
    const { deleteStory} = useContext(StoryContext)

    return (
        <div className="story">
            <h3>{story.title}</h3>
            <p>Total word count goal: {story.totalWordGoal}</p>
            <p>Daily word count goal: {story.dailyWordGoal}</p>
            <button onClick={() => history.push(`/stories/notes/create/${story.id}`)}>Add note</button>
            <Link to={{ pathname: `/stories/notes/${story.id}`, state: { chosenStory: story } }}>
                <button>View notes</button>
            </Link>
            <button onClick={() => {
                deleteStory(story)
                history.push(`/magazines/${mag.id}`)
            }}>Delete Story</button>

        </div>
    )
}