import React, { useContext, useEffect, useRef } from "react"
import { StoryContext } from "../stories/StoryProvider"
import { SubmittedStoriesContext } from "./SubmittedStoriesProvider"

export const SubmissionForm = (props) => {
    const magazine = props.location.state.chosenMag
    const {addSubmission} = useContext(SubmittedStoriesContext)
    const {getStories, stories} = useContext(StoryContext)

    const story = useRef(null)
    const dateSubmitted = useRef(null)
    const response = useRef(null)

    const constructSubmission = () => {
        console.log({
            magazineId: parseInt(magazine.id),
            storyId: parseInt(story.id),
            dateSubmitted: dateSubmitted.current.value,
            expectedResponseDate: response.current.value,
            isPending: true,
            accepted: false
        })
    }

    useEffect(() => {
        getStories()
    }, [stories])


    return (
        <form className="submissionForm">
            <fieldset>
                <div className="form-group">
                    <select defaultValue="" ref={story} className="form-control">
                        <option value="0">Select a story to submit</option>
                        {
                            stories.map(story => {
                                if (story.userId === parseInt(localStorage.getItem("app_user_id")) && story.complete) {
                               return (<option key={story.id} value={story.id}>{story.title}</option>)
                                }
                            })
                        }
                    </select>
                </div>
            </fieldset>
        </form>
    )
}