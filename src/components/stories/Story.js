import React, { useContext, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { StoryContext } from "./StoryProvider"
import "./Story.css"
import { MagazineContext } from "../magazines/MagazineProvider"

export const Story = ({ story, history, mags }) => {
    const { editStory, deleteStory } = useContext(StoryContext)


    const complete = useRef(null)
    const storyComplete = () => {
        editStory({
            id: parseInt(story.id),
            userId: parseInt(story.userId),
            title: story.title,
            totalWordGoal: story.totalWordGoal,
            dailyWordGoal: story.dailyWordGoal,
            complete: complete.current.checked
        })
    }
    if (!story.complete) {

        return (
            <div className="story">
                <h3 className="storyCardTitle">{story.title}</h3>
                <label htmlFor="completeBox">Completed</label>
                <input type="checkbox" ref={complete} onChange={storyComplete} />
                <p>Total word count goal: {story.totalWordGoal}</p>
                <p>Daily word count goal: {story.dailyWordGoal}</p>
                <section className="storyButtons">
                    <div className="btnDiv">
                        <button onClick={() => history.push(`/stories/notes/create/${story.id}`)}>Add note</button>
                    </div>
                    <div className="btnDiv">
                        <Link to={{ pathname: `/stories/notes/${story.id}`, state: { chosenStory: story } }}>
                            <button>View notes</button>
                        </Link>
                    </div>
                    <div className="btnDiv">
                        <button onClick={() => deleteStory(story)}>Delete Story</button>
                    </div>
                    
                    <div className="btnDiv">
                        <Link to={{pathname: `stories/edit/${story.id}`, state: {chosenStory: story}}}>
                            <button>Edit</button>
                        </Link>
                    </div>
                </section>

            </div>
        )
    } else {
        return (
            <div className="story">
                <h3 className="storyCardTitle">{story.title}</h3>
                <label htmlFor="completeBox">Complete</label>
                <input type="checkbox" checked ref={complete} onChange={storyComplete} />
                <p>Total word count goal: {story.totalWordGoal}</p>
                <p>Daily word count goal: {story.dailyWordGoal}</p>
                <select>
                    <option value="0">Select a magazine</option>
                    {
                        mags.map(mag => <option key={mag.id}>{mag.name}</option>)
                    }
                </select>
                <section className="storyButtons">
                    <div className="btnDiv">
                        <button onClick={() => history.push(`/stories/notes/create/${story.id}`)}>Add note</button>
                    </div>
                    <div className="btnDiv">
                        <Link to={{ pathname: `/stories/notes/${story.id}`, state: { chosenStory: story } }}>
                            <button>View notes</button>
                        </Link>
                    </div>
                    <div className="btnDiv">
                        <button onClick={() => deleteStory(story)}>Delete Story</button>
                    </div>
                </section>
            </div>
        )
    }
}

