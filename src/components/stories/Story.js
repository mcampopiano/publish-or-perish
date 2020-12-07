import React from "react"

export const Story = ({story}) => {
    return (
        <div className="story">
            <h2>{story.title}</h2>
        </div>
    )
}