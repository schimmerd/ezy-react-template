import React from 'react'

import Home from "views/Home"
import Impressum from "views/Impressum"
import auth from "middleware/auth"

const sampleRoutes = [
    {
        path: "/home",
        name: "Home",
        component: <Home authenticated={auth.isAuthenticated()} />,
        layout: "/sample"
    }
]

const footers = [
    {
        name: "Impressum",
        path: "/impressum",
        component: Impressum,
        layout: "/sample"
    }
]
export {
    sampleRoutes,
    footers
}