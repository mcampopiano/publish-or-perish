import React from "react"
import { MagazineList } from "./magazines/MagazineList"
import { StoryList } from "./stories/StoryList"

export const Dashboard = (props) => {
    return (
        <>
            <h1>Publish Or Perish</h1>
            <MagazineList {...props}/>
            <StoryList {...props}/>
        </>

    )
}