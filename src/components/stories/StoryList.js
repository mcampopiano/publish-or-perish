import React, { useContext, useEffect } from "react"
import { MagazineContext } from "../magazines/MagazineProvider"
import { SubmittedStoriesContext } from "../submittedStories/SubmittedStoriesProvider"
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
        </div>
    )

}
export const CompletedStoryList = (props) => {
    const { stories, getStories } = useContext(StoryContext)
    const {magazines, getMagazines} =useContext(MagazineContext)
    const {getSubmittedStories, submittedStories} = useContext(SubmittedStoriesContext)

    useEffect(() => {
        getMagazines().then(getSubmittedStories).then(getStories)
    }, [])

    return (
        <div className="completedStoryList"> 
            <h2 className="completedStoryHeader">Completed Stories</h2>
            <section className="completedStoryDisplay">

                {
                    stories.map(story => {
                        if (story.userId === parseInt(localStorage.getItem("app_user_id")) && story.complete) {

                            return <Story key={story.id} subStories={submittedStories} story={story} mags={magazines}{...props} />
                        }
                    })
                }
            </section>
            <button onClick={() => props.history.push("/")}>Home</button>
        </div>
    )

}