import React from "react"

export const Story = ({story}) => {
    return (
        <div className="story">
            <h2>{story.title}</h2>
    <p>Total word count goal: {story.totalWordGoal}</p>
    <p>Daily word count goal: {story.dailyWordGoal}</p>
        </div>
    )
}