import React, { useContext, useEffect } from "react"
import { MagazineContext } from "../magazines/MagazineProvider"
import { Story } from "./Story"
import { StoryContext } from "./StoryProvider"

export const StoryList = (props) => {
    const { stories, getStories } = useContext(StoryContext)

    useEffect(() => {
       getStories()
    }, [])

    return (
        <div className="storyList">
            <h2 className="storyListHeader">Stories</h2>
            <section className="storyCardDisplay">

                {
                    stories.map(story => {
                        if (story.userId === parseInt(localStorage.getItem("app_user_id")) && !story.complete) {
                            return <Story key={story.id} story={story} {...props} />
                        }
                    })
                }
            </section>
            <button onClick={() => props.history.push("/stories/create")}>Add story</button>
            <button onClick={() => props.history.push("/stories/complete")}>Completed Stories</button>
        </div>
    )

}
export const CompletedStoryList = (props) => {
    const { stories, getStories } = useContext(StoryContext)
    const {magazines, getMagazines} =useContext(MagazineContext)

    useEffect(() => {
        getMagazines().then(getStories)
    }, [])

    return (
        <div className="completedStoryList"> 
            <h2 className="completedStoryHeader">Completed Stories</h2>
            <section className="completedStoryDisplay">

                {
                    stories.map(story => {
                        if (story.userId === parseInt(localStorage.getItem("app_user_id")) && story.complete) {

                            return <Story key={story.id} story={story} mags={magazines}{...props} />
                        }
                    })
                }
            </section>
            <button onClick={() => props.history.push("/")}>Dashboard</button>
        </div>
    )

}