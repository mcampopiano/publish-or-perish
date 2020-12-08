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
                stories.map(story => {
                    if (story.userId === parseInt(localStorage.getItem("app_user_id"))) {

                        return <Story key={story.id} story={story} {...props} />
                    }
                } )
            }
            <button onClick={() => props.history.push("/stories/create")}>Add story</button>
        </div>
    )

}