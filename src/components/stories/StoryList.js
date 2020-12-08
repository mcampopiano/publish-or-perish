import React, { useContext, useEffect } from "react"
import { Story } from "./Story"
import { StoryContext } from "./StoryProvider"
import {CompletedStory} from "./CompletedStory"

export const StoryList = (props) => {
    const {stories, getStories} = useContext(StoryContext)

    useEffect(() => {
        getStories()
    }, [])

    return (
        <div className="storyList">
            <h2>Stories</h2>
            { 
                stories.map(story => {
                    if (story.userId === parseInt(localStorage.getItem("app_user_id")) && !story.complete) {

                        return <Story key={story.id} story={story} {...props} />
                    }
                } )
            }
            <button onClick={() => props.history.push("/stories/create")}>Add story</button>
            <button onClick={() => props.history.push("/stories/complete")}>Completed Stories</button>
        </div>
    )

}
export const CompletedStoryList = (props) => {
    const {stories, getStories} = useContext(StoryContext)

    useEffect(() => {
        getStories()
    }, [])

    return (
        <div className="storyList">
            <h2>Completed Stories</h2>
            { 
                stories.map(story => {
                    if (story.userId === parseInt(localStorage.getItem("app_user_id")) && story.complete) {

                        return <CompletedStory key={story.id} story={story} {...props} />
                    }
                } )
            }
            <button onClick={() => props.history.push("/")}>Dashboard</button>
        </div>
    )

}