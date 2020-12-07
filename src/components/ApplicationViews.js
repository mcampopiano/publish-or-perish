import React from "react"
import { Route } from "react-router-dom"
import { Dashboard } from "./Dashboard"
import { StoryForm } from "./stories/StoryForm"
import { StoryProvider } from "./stories/StoryProvider"

export const ApplicationViews = (props) => {
    return (
        <>
            <StoryProvider>

                <Route exact path="/" render={
                    props => <Dashboard {...props} />
                } />
            </StoryProvider>

            <StoryProvider>
                <Route path="/stories/create" render={
                    props => <StoryForm {...props} />

                } />
            </StoryProvider>
        </>
    )
}