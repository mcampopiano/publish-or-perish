import React from "react"
import { Route } from "react-router-dom"
import { StoryForm } from "./stories/StoryForm"
import { StoryProvider } from "./stories/StoryProvider"

export const ApplicationViews = (props) => {
    return (
        <>
            <StoryProvider>
                <Route path="/">
                    <StoryForm />
                </Route>
            </StoryProvider>
        </>
    )
}