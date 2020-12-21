import React, { useContext, useRef, } from "react"
import { Link } from "react-router-dom"
import { StoryContext } from "./StoryProvider"
import "./Story.css"

export const Story = ({ story, history, mags, subStories }) => {
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
                        <button onClick={(e) => { if (window.confirm("Are you sure you want to delete? Doing so will permanently remove the entry with it's corresponding notes and submissions. This cannot be undone.")) deleteStory(story)}}>Delete Story</button>
                    </div>

                    <div className="btnDiv">
                        <Link to={{ pathname: `stories/edit/${story.id}`, state: { chosenStory: story } }}>
                            <button>Edit</button>
                        </Link>
                    </div>
                </section>

            </div>
        )
    } else {
        return (
            <div className="story completed">
                <h3 className="storyCardTitle--completed">{story.title}</h3>
                <section className="storyCardDetails">
                    <label htmlFor="completeBox">Complete</label>
                    <input type="checkbox" checked ref={complete} onChange={storyComplete} />
                    <p>Total word count goal: {story.totalWordGoal}</p>
                    <p>Daily word count goal: {story.dailyWordGoal}</p>
                    <select onChange={event => {
                        const magazine = mags.find(mag => mag.id === parseInt(event.target.value))
                        history.push("/magazines/submissions", { chosenMag: magazine })
                    }
                    }>
                        <option value="0">Select a magazine</option>
                        {
                            mags.map(mag => <option key={mag.id} value={mag.id}>{mag.name}</option>)
                        }
                    </select>
                    <section className="Submissions">
                        {
                            subStories.map(ss => {
                                if (ss.storyId === story.id && ss.isPending) {
                                    return (
                                        <article key={ss.id} className="pending">
                                            <div className="mag">
                                                <h5>{ss.magazine.name}</h5>
                                                <p>Status: Pending</p>
                                                <p>Expected response date: {ss.expectedResponseDate}</p>
                                            </div>
                                        </article>
                                    )
                                } else if (ss.storyId === story.id && !ss.isPending && ss.accepted) {
                                    return (
                                        <article key={ss.id} className="accepted">
                                            <div className="mag">
                                                <h5>{ss.magazine.name}</h5>
                                                <p>Status: Accepted</p>
                                            </div>
                                        </article>
                                    )
                                } else if (ss.storyId === story.id && !ss.isPending && !ss.accepted) {
                                    return (
                                        <article key={ss.id} className="rejected">
                                            <div className="mag">
                                                <h5>{ss.magazine.name}</h5>
                                                <p>Status: Rejected</p>
                                            </div>
                                        </article>
                                    )
                                }
                            })
                        }
                    </section>
                </section>
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
                    <button onClick={(e) => { if (window.confirm("Are you sure you want to delete? Doing so will permanently remove the entry with it's corresponding notes and submissions. This cannot be undone.")) deleteStory(story)}}>Delete Story</button>
                    </div>
                </section>
            </div>
        )
    }
}

