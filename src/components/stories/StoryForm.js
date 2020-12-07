import React, { useContext, useRef } from "react"
import { StoryContext } from "./StoryProvider"

export const StoryForm = (props) => {
    const {addStory} = useContext(StoryContext)

    const title = useRef(null)
    const dailyWord = useRef(null)
    const totalWord = useRef(null)

    const constructNewStory = () => {
        addStory({
            title: title.current.value,
            dailyWord: parseInt(dailyWord.current.value),
            totalWord: parseInt(totalWord.current.value),
            userId: parseInt(localStorage.getItem("app_user_id")),
            complete: false
        })
        .then(() => props.history.push("/"))
        // console.log("my object: ", {
        //     title: title.current.value,
        //     dailyWord: dailyWord.current.value,
        //     totalWord: totalWord.current.value,
        //     userId: parseInt(localStorage.getItem("app_user_id")),
        //     complete: false
        // })
    }

    return (
        <form className="storyForm">
            <h2>New Project</h2>
            <fieldset>
                <div className="form-group">
                    <input type="text" id="storyTitle" ref={title} placeholder="Title" />
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
            <button type="submit"
            onClick={event => {
                event.preventDefault()
                constructNewStory()
            }}
            className="btn btn-primary">Save Story</button>
        </form>
    )
}