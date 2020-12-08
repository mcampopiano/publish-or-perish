import React, { useContext } from "react"
import { MagazineContext } from "./MagazineProvider"

export const Magazine = ({ mag, history }) => {
    const { deleteMagazine } = useContext(MagazineContext)
    return (
        <div className="magazineCard">
            <h3>Publication Details</h3>
            <p>Open submission dates: {mag.submissionDates}</p>
            <p>Word count requriements: {mag.wordCount}</p>
            <p>Preffered genre: {mag.genre}</p>
            <p>Typical response time: {mag.responseTime}</p>
            <p>Website: {mag.website}</p>
            <button onClick={() => {
                deleteMagazine(mag)
                history.push("/")
            }}>Delete Magazine</button>
        </div>
    )
}