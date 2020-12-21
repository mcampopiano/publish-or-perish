import React, { useContext } from "react"
import { MagazineContext } from "./MagazineProvider"

// Since this component is being called by other components within <>, the arguments were passed down as objects, so I am using object deconstruction here.
export const Magazine = ({ mag, history }) => {
    const { deleteMagazine } = useContext(MagazineContext)
    return (
        <div className="magazineCard">
            <h2 className="magCardTitle">Publication Details</h2>
            <p>Open submission dates: {mag.submissionDates}</p>
            <p>Word count requriements: {mag.wordCount}</p>
            <p>Preffered genre: {mag.genre}</p>
            <p>Typical response time: {mag.responseTime}</p>
            <p>Website: {mag.website}</p>
            {/* <button onClick={() => {
                deleteMagazine(mag)
                history.push("/")
            }}>Delete Magazine</button> */}
            <button onClick={(e) => { if (window.confirm("Are you sure you want to delete? Doing so will permanently remove the entry with it's corresponding submissions. This cannot be undone.")) {
                deleteMagazine(mag)
                history.push("/")}}}>Delete Magazine</button>
            <button onClick={() => history.push(`/magazine/edit/${mag.id}`, { chosenMagazine: mag })}>
                Edit Magazine Details
                </button>


        </div>
    )
}