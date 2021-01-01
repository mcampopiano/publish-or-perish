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
    const { magazines, getMagazines } = useContext(MagazineContext)
    const { getSubmittedStories, submittedStories } = useContext(SubmittedStoriesContext)

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
            setCompleted(storiesSubmitted)
        } else if (event.target.value === "notSubmitted") {
            const storiesNotSubmitted = []
            stories.forEach(story => {
                const currentStory = submittedStories.find(ss => ss.storyId === story.id)
                if (typeof currentStory === 'undefined') {
                    storiesNotSubmitted.push(story)
                }
            })
            setCompleted(storiesNotSubmitted)
        } else if (event.target.value === "all") {
            setCompleted(stories)
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
                <option value="0">Filter</option>
                <option value="all">Display all</option>
                <option value="submitted">Submitted</option>
                <option value="notSubmitted">Not submitted</option>
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