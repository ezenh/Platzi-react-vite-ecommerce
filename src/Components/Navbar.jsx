import { useContext } from "react"
import { Context, LoginContext } from "../Context"
import { NavLink } from "react-router-dom"

// import logOutMessage from "./logOutMessage"

function Navbar() {
    const loginContext = useContext(LoginContext)
    const context = useContext(Context)

    const activeStyle = 'underline underline-offset-4 font-semibold'

    const productsCategories = context.productsCategories.length > 0 ? context.productsCategories : []

    return (        
        <nav className="fixed top-0 flex justify-between items-center w-full h-10 px-5 text-xs font-light bg-white/80 backdrop-blur-xl shadow-lg z-10">
            <ul className="nav-list flex items-center gap-2.5">
                <li className="font-semibold text-sm">
                    <NavLink to='/'>
                        Shopi
                    </NavLink>
                </li>

                <li>
                    <NavLink to='/' className={({ isActive }) => isActive ? activeStyle : undefined} onClick={() => { context.filterItemsByCategory("all")}}>
                        All
                    </NavLink>
                </li>

                {productsCategories.map(category => {
                    return (
                        <li key={productsCategories.indexOf(category)}>
                            <NavLink to={`/${category}`} className={({ isActive }) => isActive ? activeStyle : undefined} onClick={() => { context.filterItemsByCategory(category)}}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>

            <ul className="nav-list flex gap-2 items-center">
                <li className="text-black/60">
                    {loginContext.account.email}
                </li>

                <li>
                    <NavLink to='/my-orders' className={({ isActive }) => isActive ? activeStyle : undefined}>
                        My Orders
                    </NavLink>
                </li>

                <li>
                    <NavLink to='/my-account' className={({ isActive }) => isActive ? activeStyle : undefined}>
                        My Account
                    </NavLink>
                </li>

                <li className="cursor-pointer" onClick={() => {
                    loginContext.toggleLogoutWindow()
                    console.log(loginContext.logoutWindow)

                }}>
                    Log out
                </li>

                <li className="flex items-center cursor-pointer" onClick={() => { context?.setCartView(true); context?.setDetailView(false) }}>
                    {/* <img src="public/shop-icon.webp" alt="shop-icon" className="h-6" /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <div className="flex items-center justify-center w-3 h-3 p-3 rounded-full bg-black text-white font-bold text-sm ml-1">
                        {context?.cartProducts?.length > 0 ? context.cartProducts.length : 0}
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar