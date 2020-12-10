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

export const ApplicationViews = () => {
    return (
        <>
        {/* Each user-defined component that renders to the DOM must be wrapped in any Provider upon which it is dependent. e.g. since the Dashboard component uses data from the StoryProvider component, it must be wrapped in <StoryProvider> tags. It also uses data from the MagazineProvider, so the same rule applies. */}
            <MagazineProvider>
                <StoryProvider>
                    {/* React lets you call user-efined components similar to calling a DOM tag, and pass it certain properties (in this case, props, on which I've used the spread operator) as an argument to the that component. It distinguishes user defined by starting with a capital letter. The spread operator lets us pass all key:value pairs from the props object inherited from react-router (e.g. location, history, match)*/}
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
                    {/* Putting the : before storyId in the url means that storyId will be a variable which stores the value of whatever is in that position in the url. I will have access to that using props.match.params. The (/d+) is specifying that the value must be a number. */}
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