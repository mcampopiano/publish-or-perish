import React from "react"
import { Link } from "react-router-dom"

export const Story = ({ story, history }) => {
    return (
        <div className="story">
            <h3>{story.title}</h3>
            <p>Total word count goal: {story.totalWordGoal}</p>
            <p>Daily word count goal: {story.dailyWordGoal}</p>
            <button onClick={() => history.push(`/stories/notes/create/${story.id}`)}>Add note</button>
            <Link to={{pathname: `/stories/notes/${story.id}`, state: {chosenStory: story}}}>
                <button>View notes</button>
            </Link>
        </div>
    )
}