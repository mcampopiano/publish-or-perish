import React from "react"
import { Route } from "react-router-dom"
import { Dashboard } from "./Dashboard"
import { MagazineDetail } from "./magazines/MagazineDetail"
import { MagazineForm } from "./magazines/MagazineForm"
import { MagazineProvider } from "./magazines/MagazineProvider"
import { NoteForm } from "./notes/NoteForm"
import { NoteList } from "./notes/NoteList"
import { NoteProvider } from "./notes/NoteProvider"
import { StoryForm } from "./stories/StoryForm"
import { CompletedStoryList } from "./stories/StoryList"
import { StoryProvider } from "./stories/StoryProvider"
import { SubmissionForm } from "./submittedStories/SubmittedStoriesForm"
import { SubmittedStoriesProvider } from "./submittedStories/SubmittedStoriesProvider"

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
                    <Route exact path="/stories/notes/create/:storyId(\d+)" render={
                        props => <NoteForm {...props} />

                    } />
                    <Route exact path="/stories/notes/:storyId(\d+)" render={
                        props => <NoteList {...props} />

                    } />
                </StoryProvider>
            </NoteProvider>

            <StoryProvider>
                <SubmittedStoriesProvider>
                    <MagazineProvider>
                        <Route path="/magazines/create" render={
                            props => <MagazineForm {...props} />

                        } />
                        <Route exact path="/magazines/:magazineId(\d+)" render={
                            props => <MagazineDetail {...props} />
                        } />
                    </MagazineProvider>
                </SubmittedStoriesProvider>
            </StoryProvider>

            <StoryProvider>
                <Route path="/stories/complete" render={
                    props => <CompletedStoryList {...props} />
                } />
            </StoryProvider>

            <SubmittedStoriesProvider>
                <StoryProvider>
                    <Route path="/magazines/submissions" render={
                        props => <SubmissionForm {...props} />
                    } />
                </StoryProvider>
            </SubmittedStoriesProvider>
        </>
    )
}