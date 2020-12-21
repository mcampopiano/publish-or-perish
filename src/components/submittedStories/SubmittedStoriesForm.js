import React, { useContext, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { StoryContext } from "../stories/StoryProvider"
import { SubmittedStoriesContext } from "./SubmittedStoriesProvider"

export const SubmissionForm = (props) => {
    const magazine = props.location.state.chosenMag
    const { addSubmission } = useContext(SubmittedStoriesContext)
    const { getStories, stories } = useContext(StoryContext)

    const storyId = useRef(null)
    const dateSubmitted = useRef(null)
    const response = useRef(null)

    const constructSubmission = () => {
        addSubmission({
            magazineId: parseInt(magazine.id),
            storyId: parseInt(storyId.current.value),
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
                    <select defaultValue="" ref={storyId} className="form-control">
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
            <fieldset>
                <div className="form-group">
                    <label htmlFor="dateSubmitted">Select date submitted: </label>
                    <input type="date" id="dateSubmitted" ref={dateSubmitted} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="response">Select date of expected response: </label>
                    <div></div>
                    <input type="date" id="response" ref={response} />
                </div>
            </fieldset>
            <section className="formButtons">
                <div className="formBtn">
            <Link to={{ pathname: `/magazines/${magazine.id}`, state: { chosenMagazine: magazine } }}>
                <button  onClick={event => {
                    constructSubmission()
                }}>
                    Save submission
            </button>
            </Link>
            </div>
            <div className="formBtn">
                    <button type="submit"
                        onClick={event => {
                            event.preventDefault()
                            props.history.goBack()
                        }}
                        className="btn btn-primary">Cancel</button>
                </div>
            </section>
        </form>
    )
}