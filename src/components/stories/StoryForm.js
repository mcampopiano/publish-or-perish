import React, { useContext, useEffect, useState } from "react"
import { StoryContext } from "./StoryProvider"

export const StoryForm = (props) => {
    const { addStory, stories, editStory, getStories } = useContext(StoryContext)

    const [story, setStory] = useState({title: "", totalWordGoal: 0, dailyWordGoal: 0})

    const editMode = props.match.params.hasOwnProperty("storyId")

    const handleControlledInputChange = (event) => {
        const newStory = Object.assign({}, story)
        newStory[event.target.name] = event.target.value
        setStory(newStory)
    }

    const getStoryInEditMode = () => {
        if (editMode) {
            const selectedStory = props.location.state.chosenStory || {}
            setStory(selectedStory)
        }
    }

    useEffect(() => {
        getStories()
    }, [])

    useEffect(() => {
        getStoryInEditMode()
    }, [stories])

    const constructNewStory = () => {

        if (editMode) {
            editStory({
                id: story.id,
                complete: story.complete,
                dailyWordGoal: parseInt(story.dailyWordGoal),
                title: story.title,
                totalWordGoal: parseInt(story.totalWordGoal),
                userId: parseInt(story.userId)

            })
            .then(() => props.history.push("/"))
        } else {

            addStory({
                title: story.title,
                dailyWordGoal: parseInt(story.dailyWordGoal),
                totalWordGoal: parseInt(story.totalWordGoal),
                userId: parseInt(localStorage.getItem("app_user_id")),
                complete: false
            })
            .then(() => props.history.push("/"))
        }
    }

    return (
        <form className="storyForm">
            <h2 className="storyFormHeader">New Project</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <div></div>
                    <input type="text" name="title" value={story.title} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="totalWordGoal">Total word count goal: </label>
                    <input type="text" name="totalWordGoal" value={story.totalWordGoal} onChange={handleControlledInputChange}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="dailyWordGoal">Daily word count goal: </label>
                    <input type="text" name="dailyWordGoal" value={story.dailyWordGoal} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <section className="formButtons">
                <div className="formBtn">
                    <button type="submit"
                        onClick={event => {
                            event.preventDefault()
                            constructNewStory()
                        }}
                        className="btn btn-primary">Save Story</button>
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