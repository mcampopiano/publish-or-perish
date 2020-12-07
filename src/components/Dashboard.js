import React from "react"
import { StoryList } from "./stories/StoryList"

export const Dashboard = (props) => {
    return (
        <>
            <h2>Hi</h2>
            <StoryList {...props}/>
        </>

    )
}