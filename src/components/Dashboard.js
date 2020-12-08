import React from "react"
import { MagazineList } from "./magazines/MagazineList"
import { StoryList } from "./stories/StoryList"

export const Dashboard = (props) => {
    return (
        <>
            <h2>Hi</h2>
            <MagazineList {...props}/>
            <StoryList {...props}/>
        </>

    )
}