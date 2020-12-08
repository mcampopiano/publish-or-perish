import React from "react"

export const Story = ({ story, history }) => {
    return (
        <div className="story">
            <h3>{story.title}</h3>
            <p>Total word count goal: {story.totalWordGoal}</p>
            <p>Daily word count goal: {story.dailyWordGoal}</p>
            <button onClick={() => history.push(`/stories/notes/${story.id}`)}>Add note</button>
        </div>
    )
}