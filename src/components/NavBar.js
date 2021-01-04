import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import "./NavBar.css"

export const NavBar = (props) => {
    const element = <FontAwesomeIcon icon={faHome} />
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">{element}</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/stories/complete">Completed stories</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" onClick={() => localStorage.clear()}to="/">Log out</Link>
            </li>
        </ul>
    )
}