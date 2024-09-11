import { useContext } from "react"
import { Context } from "../../Context"

import { Link } from "react-router-dom"


import "./styles.css"

function CheckoutSideMenu() {
    const context = useContext(Context)

    return (
        <aside className="fixed top-10 flex flex-col items-center gap-3 w-1/3 h-[calc(100%-40px)] p-4 right-0 border border-black/10 bg-white/80 backdrop-blur-xl shadow-2xl overflow-hidden z-10">
            <p className="top-mask absolute top-0 p-4 text-left w-full h-16 font-bold text-xl bg-white/50 backdrop-blur-sm z-40">My order</p>
            <span className="flex absolute top-0 right-0 m-2 w-8 h-8 p-2 items-center justify-center border border-black/10 rounded-full cursor-pointer shadow-sm z-50" onClick={() => { context.setCartView(false) }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="black" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </span>

            <div className="cart-product-container flex flex-col w-full h-full py-12 mb-auto gap-3 overflow-auto -z-10">
                { context.checkoutProductsToDisplay() }
            </div>

            <span className="mt-auto text-sm py-2 px-6 bg-black border border-white text-white rounded-full">Total: ${context.cartTotal.toFixed(2)}</span>

            <Link className="w-full" to={ "/my-order"}>
                <button className="flex justify-center w-full p-3 text-md bg-lime-300 rounded-full shadow-lg text-green-900 font-bold border-none">Checkout</button>
            </Link>
        </aside>



    )
}

export default CheckoutSideMenu