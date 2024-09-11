import { useContext } from "react"
import { LoginContext, Context } from "../Context"
import { useRoutes } from "react-router-dom"

import Login from "../Pages/Login"
import Signup from "../Pages/Signup"
import Home from "../Pages/Home"
import MyAccount from "../Pages/MyAccount"
import MyOrder from "../Pages/MyOrder"
import MyOrders from "../Pages/MyOrders"
import NotFound from "../Pages/NotFound"

const AppRoutes = () => {
    const loginContext = useContext(LoginContext)
    const generalContext = useContext(Context)

    const setRoutes = () => {
        let allRoutes = []
    
        if (loginContext.logedIn === false) {
            allRoutes.push({ path: "/*", element: <Login /> }, { path: "/sign-up", element: <Signup /> })
        } else {
            const productsCategories = generalContext.productsCategories.length > 0 ? generalContext.productsCategories : []

        // Categories Routes
        productsCategories.map(category => {
        allRoutes.push({
            path: `/${category.split(" ").join("-").toLowerCase()}`,
            element: <Home category={category} />
            })
        })

      // Static Routes
        allRoutes.push(
            { path: "/", element: <Home /> },
            { path: "/*", element: <NotFound /> },
            )

      // Account Routes
        allRoutes.push(
            { path: "/my-account", element: <MyAccount /> },
            { path: "/my-order", element: <MyOrder /> },
            { path: "/my-orders", element: <MyOrders /> },
        )
    }
    return allRoutes
    }
    
// Not Found
    const routes = useRoutes(setRoutes())
    return routes
}

export default AppRoutes
