import React, { useContext, useEffect, useRef, useState } from "react"
import { MagazineContext } from "./MagazineProvider"

export const MagazineForm = (props) => {
    const { addMagazine, getMagazines, editMagazine, magazines } = useContext(MagazineContext)

    const [magazine, setMagazine] = useState({name: "", sbumissionDates: "", wordCount: "", genre: "", responseTime: "", website: ""})
   
    const editMode = props.match.params.hasOwnProperty("magazineId")

    const handleControlledInputChange = (event) => {
        const newMagazine = Object.assign({}, magazine)
        newMagazine[event.target.name] = event.target.value
        setMagazine(newMagazine)
    }

    const getMagazineInEditMode = () => {
        if (editMode) {
            const selectedMagazine= props.location.state.chosenMagazine|| {}
            setMagazine(selectedMagazine)
        }
    }

    useEffect(() => {
        getMagazines()
    }, [])

    useEffect(() => {
        getMagazineInEditMode()
    }, [magazines])
    const constructMagazine = () => {
        if (editMode) {
            editMagazine({
                id: magazine.id,
                name: magazine.name,
                submissionDates: magazine.submissionDates,
                wordCount: magazine.wordCount,
                genre: magazine.genre,
                responseTime: magazine.responseTime,
                website: magazine.website
            })
            .then(() => props.history.push("/"))
        } else {

            addMagazine({
                name: magazine.name,
                submissionDates: magazine.submissionDates,
                wordCount: magazine.wordCount,
                genre: magazine.genre,
                responseTime: magazine.responseTime,
                website: magazine.website
            })
                .then(() => props.history.push("/"))
        }
      
    }

    return (
        <form className="magazineForm">
            <h2 className="magFormHeader">New Publishing Magazine</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="magTitle">Title of publication: </label>
                    {/* The ref attribute here referres to the variable storing the useRef returned data, and will mutate the value of the .current property to the value of the input. */}
                    <input type="text" id="magTitle" name="name" value={magazine.name} onChange={handleControlledInputChange} className="form-control" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="submissionDates">Open submission dates: </label>
                    <input type="text" id="submissionDates" name="submissionDates" value={magazine.submissionDates} onChange={handleControlledInputChange} className="form-control" placeholder="e.g. Mar 1 - Sep 1" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="responseTime">Typical response time: </label>
                    <input type="text" id="responseTime" name="responseTime" value={magazine.responseTime} onChange={handleControlledInputChange} className="form-control" placeholder="e.g. 6 - 12 months" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="wordCount">Word count requirements: </label>
                    <input type="text" id="wordCount" name="wordCount" value={magazine.wordCount} onChange={handleControlledInputChange} className="form-control" placeholder="e.g. 300 - 5,000 words" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="genre">Preferred genre: </label>
                    <input type="text" id="genre" name="genre" value={magazine.genre} onChange={handleControlledInputChange} className="form-control" placeholder="e.g. sci-fi/fantasy" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="website">Publication website: </label>
                    <input type="text" id="website" name="website" value={magazine.website} onChange={handleControlledInputChange} className="form-control" />
                </div>
            </fieldset>
            <section className="formButtons">
                <div className="formBtn">
                    <button type="submit"
                        onClick={event => {
                            event.preventDefault()
                            constructMagazine()
                        }}
                        className="btn btn-primary">Save Magazine</button>
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