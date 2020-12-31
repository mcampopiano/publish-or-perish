import React from "react"
import { MagazineList } from "./magazines/MagazineList"
import { StoryList } from "./stories/StoryList"
import "./Dashboard.css"
import { NavBar } from "./NavBar"

export const Dashboard = (props) => {
    return (
        <>
            <h1 className="dashTitle">Publish Or Perish</h1>
            <div className="dashboard">
                <MagazineList {...props} />
                <StoryList {...props} />
            </div>
        </>

    )
}