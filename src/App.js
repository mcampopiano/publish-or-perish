import React from "react"
import {Redirect, Route} from "react-router-dom"
import { ApplicationViews } from "./components/ApplicationViews"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"


export const POP = () => {
  return <>
  <Route render={() => {
    // The user id is saved under the key app_user_id in local Storage. Change below if needed!
      if (localStorage.getItem("app_user_id")) {
          return (
              <>
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
