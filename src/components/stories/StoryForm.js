import React, { useContext, useRef } from "react"
import { StoryContext } from "./StoryProvider"

export const StoryForm = (props) => {
    const { addStory } = useContext(StoryContext)

    const title = useRef(null)
    const dailyWord = useRef(null)
    const totalWord = useRef(null)

    const constructNewStory = () => {
        addStory({
            title: title.current.value,
            dailyWordGoal: parseInt(dailyWord.current.value),
            totalWordGoal: parseInt(totalWord.current.value),
            userId: parseInt(localStorage.getItem("app_user_id")),
            complete: false
        })
            .then(() => props.history.push("/"))
    }

    return (
        <form className="storyForm">
            <h2 className="storyFormHeader">New Project</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="storyTitle">Title: </label>
                    <div></div>
                    <input type="text" id="storyTitle" ref={title} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="totalWordCount">Total word count goal: </label>
                    <input type="text" id="totalWordCount" ref={totalWord} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="dailyWordCount">Daily word count goal: </label>
                    <input type="text" id="dailyWordCount" ref={dailyWord} />
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
                            props.history.push("/")
                        }}
                        className="btn btn-primary">Dashboard</button>
                </div>
            </section>
        </form>
    )
}