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
    const { stories, getStories, searchTerms, setSearchTerms } = useContext(StoryContext)
    const { magazines, getMagazines } = useContext(MagazineContext)
    const { getSubmittedStories, submittedStories } = useContext(SubmittedStoriesContext)

    // This state will be used to determine which story cards are displayed to the DOM
    const [completedStories, setCompleted] = useState([])

    // When this function is called, it will modify the state of completedStories based on what has been selected in the dropdown menu
    const changeStories = (event) => {
        if (event.target.value === "submitted") {
            const storiesSubmitted = []
            stories.forEach(story => {
                if (story.userId === parseInt(localStorage.getItem("app_user_id"))) {
                    // I iterate through the submittedStories join table, to see if at least one of those relates to the current story, which would indicate that said story has been submttied.
                    const currentStory = submittedStories.find(ss => ss.storyId === story.id)
                    // I have to use typeof here to ensure that nothing that is undefined gets pushed into the new array
                    if (typeof currentStory === 'object') {
                        storiesSubmitted.push(story)
                    }
                }
            })
            setCompleted(storiesSubmitted)
        } else if (event.target.value === "notSubmitted") {
            const storiesNotSubmitted = []
            stories.forEach(story => {
                if (story.userId === parseInt(localStorage.getItem("app_user_id"))) {
                    const currentStory = submittedStories.find(ss => ss.storyId === story.id)
                    // This conditional works very similarly to the one above for submitted stories, however in this case, if the .find method returns undefined, it indicates that the current story from the .forEach method does not have a corresponding join table resource and therefore has not been submitted.
                    if (typeof currentStory === 'undefined') {
                        storiesNotSubmitted.push(story)
                    }
                }
            })
            setCompleted(storiesNotSubmitted)
        } else if (event.target.value === "all") {
            setCompleted(stories)
        } else if (event.target.value === "pending") {
            const pendingStories = []
            stories.forEach(story => {
                if (story.userId === parseInt(localStorage.getItem("app_user_id"))) {
                    const currentStory = submittedStories.find(ss => ss.storyId === story.id && ss.isPending)
                    if (typeof currentStory === 'object') {
                        pendingStories.push(story)
                    }
                }
            })
            setCompleted(pendingStories)
        } else if (event.target.value === "accepted") {
            const acceptedStories = []
            stories.forEach(story => {
                if (story.userId === parseInt(localStorage.getItem("app_user_id"))) {
                    const currentStory = submittedStories.find(ss => ss.storyId === story.id && !ss.isPending && ss.accepted)
                    if (typeof currentStory === 'object') {
                        acceptedStories.push(story)
                    }
                }
            })
            setCompleted(acceptedStories)
        } else if (event.target.value === "rejected") {
            const rejectedStories = []
            stories.forEach(story => {
                if (story.userId === parseInt(localStorage.getItem("app_user_id"))) {
                    const currentStory = submittedStories.find(ss => ss.storyId === story.id && !ss.isPending && !ss.accepted)
                    if (typeof currentStory === 'object') {
                        rejectedStories.push(story)
                    }
                }
            })
            setCompleted(rejectedStories)
        }
    }

    useEffect(() => {
        if (searchTerms !== "") {
            const subset = stories.filter(story => story.title.toLowerCase().includes(searchTerms.toLowerCase()))
            setCompleted(subset)
        } else {
            setCompleted(stories)
        }
    }, [searchTerms])
    // Setting completedStories to stories in this uesEffect ensures that the user will first be provided with a list of all of their completed stories.
    useEffect(() => {
        setCompleted(stories)
    }, [stories])

    useEffect(() => {
        getMagazines().then(getSubmittedStories).then(getStories)
    }, [])

    return (
        <div className="completedStoryList">
            <h2 className="completedStoryHeader">Completed Stories</h2>
            <div className="filterBar">
            <select defaultValue="" onChange={changeStories}>
                <option value="all">Display all</option>
                <option value="submitted">Submitted</option>
                <option value="notSubmitted">Not submitted</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
            </select>
            <input type="text" onKeyUp={event => setSearchTerms(event.target.value)} placeholder="Search for a story by title" />
            </div>
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