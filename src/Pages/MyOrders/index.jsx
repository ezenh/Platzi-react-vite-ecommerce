import { useContext } from "react"
import { Context } from "../../Context"

import Layout from "../../Components/Layout"

function MyOrders() {
    const context = useContext(Context)

    // useEffect(() => {
    //     console.log('My Orders (useEffect):', context?.myOrders ? context.myOrders : "undefined");
    // }, [context?.myOrders]);

    return (
        <Layout>
            <h1 className="sign-in-title text-xl font-bold mb-1">My orders</h1>
            <div className="flex flex-col w-6/12 h-full py-12 mb-auto gap-3 overflow-auto">
                {context && context.myOrders ? (
                    context.myOrders.length > 0 ?
                        context.viewAllOrders()
                        : <p className="py-12 text-center">0 orders</p>
                ) : (
                        <p className="py-12 text-center">Loading...</p>

                    )}
            </div>
        </Layout>
    )
}

export default MyOrders