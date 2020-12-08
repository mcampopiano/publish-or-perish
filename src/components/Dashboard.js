import React from "react"
import { MagazineList } from "./magazines/MagazineList"
import { StoryList } from "./stories/StoryList"

export const Dashboard = (props) => {
    return (
        <>
            <MagazineList {...props}/>
            <StoryList {...props}/>
        </>

    )
}