import React, { useEffect, useState } from "react"
import { Redirect, Route } from "react-router-dom"
import { ApplicationViews } from "./components/ApplicationViews"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { NavBar } from "./components/NavBar"
import "./components/darkMode.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faMoon } from '@fortawesome/free-solid-svg-icons'
import "./components/Dashboard.css"


export const POP = () => {
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        const json = localStorage.getItem("site-dark-mode");
        const currentMode = JSON.parse(json);
        if (currentMode) {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark")
        }
        const json = JSON.stringify(darkMode);
        localStorage.setItem("site-dark-mode", json);
    }, [darkMode])
    const element = <FontAwesomeIcon icon={faMoon} />
    return <>
        <Route render={() => {
            // The user id is saved under the key app_user_id in local Storage. If there is not anyone logged in, go to log in page. Otherwise, render Application views.
            if (localStorage.getItem("app_user_id")) {
                return (
                    <>
                        <div className= "darkModeBtn">
                            <button  onClick={() => setDarkMode(!darkMode)}>{element}</button>
                        </div>
                        <NavBar />
                        <ApplicationViews />
                    </>
                )
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
    </>
}
