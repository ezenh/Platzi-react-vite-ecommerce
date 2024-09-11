import { useContext } from "react"

import { Context } from "../../Context"
import Layout from "../../Components/Layout"
import { Link } from "react-router-dom"

function MyOrder() {

    const context = useContext(Context)

    return (
        <Layout>
            My Order
            <div className="flex flex-col w-6/12 h-full py-12 mb-auto gap-3 overflow-auto">
                {context.checkoutProductsToDisplay()}
            </div>

            <span className="mt-auto text-sm py-2 px-6 bg-black border border-white text-white rounded-full">Total: ${context.cartTotal.toFixed(2)}</span>

            <Link to={"/my-orders"} className="w-6/12">
                <button className="flex justify-center w-full p-3 text-md bg-lime-300 rounded-full shadow-lg text-green-900 font-bold border-none"
                    onClick={() => {
                        context.saveOrder()
                        }}>Buy</button>
            </Link>

        </Layout>
    )
}
                    

export default MyOrder