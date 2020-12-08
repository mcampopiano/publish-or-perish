import React, { useState } from "react"

export const StoryContext = React.createContext()

export const StoryProvider = (props) => {
    const [stories, setStories] = useState([])

    const getStories = () => {
        return fetch("http://localhost:8088/stories")
        .then(r => r.json())
        .then(setStories)
    }

    const addStory = story => {
        return fetch("http://localhost:8088/stories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(story)
        })
        .then(getStories)
    }

    return (
        <StoryContext.Provider value={{stories, setStories, getStories, addStory}}>
            {props.children}
        </StoryContext.Provider>
    )
}