import React, { useContext, useEffect } from "react"
import { Story } from "./Story"
import { StoryContext } from "./StoryProvider"

export const StoryList = (props) => {
    const {stories, getStories} = useContext(StoryContext)

    useEffect(() => {
        getStories()
    }, [])

    return (
        <div className="storyList">
            <h2>Stories</h2>
            {
                stories.map(story => <Story key={story.id} story={story} />)
            }
            <button onClick={() => props.history.push("/stories/create")}>Add story</button>
        </div>
    )

}