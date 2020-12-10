import React, { useContext, useRef } from "react"
import { MagazineContext } from "./MagazineProvider"

export const MagazineForm = (props) => {
    const {addMagazine} = useContext(MagazineContext)

    // useRef is a react hook which returns an object with a .current property which is initially set to the argument passed to the function. The object is mutable, so it is a good way to capture user input.
    const name = useRef(null)
    const submissions = useRef(null)
    const words = useRef(null)
    const genre = useRef(null)
    const response = useRef(null)
    const website = useRef(null)

    const constructMagazine = () => {
        // Uses the value of the .current property of the variables storing the objects returned from the useRef hooks.
        addMagazine({
            name: name.current.value,
            submissionDates: submissions.current.value,
            wordCount: words.current.value,
            genre: genre.current.value,
            responseTime: response.current.value,
            website: website.current.value
        })
        .then(() => props.history.push("/"))
    }

    return (
        <form className="magazineForm">
            <h2>New Publishing Magazine</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="magTitle">Title of publication: </label>
                    {/* The ref attribute here referres to the variable storing the useRef returned data, and will mutate the value of the .current property to the value of the input. */}
                    <input type="text" id="magTitle" ref={name} className="form-control" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="submissionDates">Open submission dates: </label>
                    <input type="text" id="submissionDates" ref={submissions} className="form-control" placeholder="e.g. Mar 1 - Sep 1"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="responseTime">Typical response time: </label>
                    <input type="text" id="responseTime" ref={response} className="form-control" placeholder="e.g. 6 - 12 months"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="wordCount">Word count requirements: </label>
                    <input type="text" id="wordCount" ref={words} className="form-control" placeholder="e.g. 300 - 5,000 words"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="genre">Preferred genre: </label>
                    <input type="text" id="genre" ref={genre} className="form-control" placeholder="e.g. sci-fi/fantasy"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="website">Publication website: </label>
                    <input type="text" id="website" ref={website} className="form-control"/>
                </div>
            </fieldset>
            <button type="submit"
            onClick={event => {
                event.preventDefault()
                constructMagazine()
            }}
            className="btn btn-primary">Save Magazine</button>
        </form>
    )
}