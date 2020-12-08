import React from "react"
import { Route } from "react-router-dom"
import { Dashboard } from "./Dashboard"
import { MagazineDetail } from "./magazines/MagazineDetail"
import { MagazineForm } from "./magazines/MagazineForm"
import { MagazineProvider } from "./magazines/MagazineProvider"
import { StoryForm } from "./stories/StoryForm"
import { StoryProvider } from "./stories/StoryProvider"

export const ApplicationViews = (props) => {
    return (
        <>
            <MagazineProvider>
                <StoryProvider>
                    <Route exact path="/" render={
                        props => <Dashboard {...props} />
                    } />
                </StoryProvider>
            </MagazineProvider>

            <StoryProvider>
                <Route path="/stories/create" render={
                    props => <StoryForm {...props} />

                } />
            </StoryProvider>

            <MagazineProvider>
                <Route path="/magazines/create" render={
                    props => <MagazineForm {...props} />

                } />
                <Route exact path="/magazines/:magazineId(\d+)" render={
                            props => <MagazineDetail {...props} />
                        } />
            </MagazineProvider>
        </>
    )
}