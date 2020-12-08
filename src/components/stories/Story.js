import React, { useContext, useRef } from "react"
import { Link } from "react-router-dom"
import { StoryContext } from "./StoryProvider"

export const Story = ({ story, history }) => {
    const {editStory} = useContext(StoryContext)
    const complete = useRef(null)
    const checked = () => {
        console.log(complete.current.checked)
    }

    return (
        <div className="story">
            <h3>{story.title}</h3>
            <label htmlFor="completeBox">Check when completed</label>
            <input type="checkbox" ref={complete} onChange={checked}/>
            <p>Total word count goal: {story.totalWordGoal}</p>
            <p>Daily word count goal: {story.dailyWordGoal}</p>
            <button onClick={() => history.push(`/stories/notes/create/${story.id}`)}>Add note</button>
            <Link to={{pathname: `/stories/notes/${story.id}`, state: {chosenStory: story}}}>
                <button>View notes</button>
            </Link>
        </div>
    )
}