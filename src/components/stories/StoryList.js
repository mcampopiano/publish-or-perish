import React, { useContext, useEffect, useState } from "react"
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
            <button onClick={() => props.history.push("/stories/create")}>Add story</button>
        </div>
    )

}
export const CompletedStoryList = (props) => {
    const { stories, getStories } = useContext(StoryContext)
    const {magazines, getMagazines} =useContext(MagazineContext)
    const {getSubmittedStories, submittedStories} = useContext(SubmittedStoriesContext)

    const [completedStories, setCompleted] = useState([])

    const changeStories = (event) => {
        if (event.target.value === "submitted") {
            const storiesSubmitted = []
            stories.forEach(story => {
                if (story.userId === parseInt(localStorage.getItem("app_user_id"))) {
                    const currentStory = submittedStories.find(ss => ss.storyId === story.id)
                    if (typeof currentStory === 'object') {
                        storiesSubmitted.push(story)
                    }
                }
            })
            console.log(storiesSubmitted)
            setCompleted(storiesSubmitted)
        }
    }
    useEffect(() => {
        setCompleted(stories)
    }, [stories])

    useEffect(() => {
        getMagazines().then(getSubmittedStories).then(getStories)
    }, [])

    return (
        <div className="completedStoryList"> 
            <h2 className="completedStoryHeader">Completed Stories</h2>
                <select defaultValue="" onChange={changeStories}>
                    <option value="0">Test</option>
                    <option value="submitted">submitted</option>
                    <option value="notSubmitted">not submitted</option>
                </select>
            <section className="completedStoryDisplay">

                {
                    completedStories.map(story => {
                        if (story.userId === parseInt(localStorage.getItem("app_user_id")) && story.complete) {

                            return <Story key={story.id} subStories={submittedStories} story={story} mags={magazines}{...props} />
                        }
                    })
                }
            </section>
        </div>
    )

}