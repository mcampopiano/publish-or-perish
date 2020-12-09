import React from "react"
import { Link } from "react-router-dom"
import { Magazine } from "./Magazine"

export const MagazineDetail = (props) => {
    return (
        <>
            <article className="magazineDetails">
                <header className="magDetailsTitle">
                    <h2 className="magDetailsTitle">{props.location.state.chosenMagazine.name}</h2>
                </header>
                <Magazine mag={props.location.state.chosenMagazine} {...props} />
                <button onClick={() => props.history.push("/")}>Dashboard</button>
                <Link to={{ pathname: "/magazines/submissions", state: { chosenMag: props.location.state.chosenMagazine } }}>
                    <button>Add submission</button>
                </Link>
            </article>
        </>
    )
}