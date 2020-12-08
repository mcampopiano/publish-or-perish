import React from "react"
import { Route } from "react-router-dom"
import { Dashboard } from "./Dashboard"
import { MagazineDetail } from "./magazines/MagazineDetail"
import { MagazineForm } from "./magazines/MagazineForm"
import { MagazineProvider } from "./magazines/MagazineProvider"
import { NoteForm } from "./notes/NoteForm"
import { NoteProvider } from "./notes/NoteProvider"
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

            <NoteProvider>
                <StoryProvider>
                    <Route path="/stories/create" render={
                        props => <StoryForm {...props} />

                    } />
                    <Route exact path="/stories/notes/:storyId(\d+)" render={
                        props => <NoteForm {...props} />

                    } />
                </StoryProvider>
            </NoteProvider>

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