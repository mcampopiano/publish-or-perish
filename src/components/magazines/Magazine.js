import React from "react"

export const Magazine = ({ mag }) => {
    return (
        <div className="magazineCard">
            <h3>Publication Details</h3>
            <p>Open submission dates: {mag.submissionDates}</p>
            <p>Word count requriements: {mag.wordCount}</p>
            <p>Preffered genre: {mag.genre}</p>
            <p>Typical response time: {mag.responseTime}</p>
            <a href={mag.website}>Website</a>
        </div>
    )
}