import React, { useState } from "react"

export const SubmittedStoriesContext = React.createContext()

export const SubmittedStoriesProvider = (props) => {
    const [submittedStories, setSubmittedStories] = useState([])

    const getSubmittedStories = () => {
        // Using _expand finds the corresponding story and magazine objects whose id's match the storyId and magazineId of each object in the submittedStories resource. This give me access to their data without having to use a .find method
        return fetch("http://localhost:8088/submittedStories?_expand=story&_expand=magazine")
        .then(r => r.json())
        .then(setSubmittedStories)
    }

    const addSubmission = story => {
        return fetch("http://localhost:8088/submittedStories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(story) 
        })
        .then(getSubmittedStories)
    }

    const editSubmission = submission => {
        return fetch(`http://localhost:8088/submittedStories/${submission.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(submission)
        })
        .then(getSubmittedStories)
    }

    return <SubmittedStoriesContext.Provider value={{submittedStories, getSubmittedStories, addSubmission, editSubmission}}>
        {props.children}
    </SubmittedStoriesContext.Provider>
}