import { useContext } from "react"
import { Context } from "../../Context"
// import { useLocation } from "react-router-dom";


import Layout from "../../Components/Layout"
import Card from "../../Components/Card"
import ProductDetail from "../../Components/ProductDetail"
import CheckoutSideMenu from "../../Components/CheckoutSideMenu"

function Home() {
    const context = useContext(Context)

    // const location = useLocation().pathname.slice(1) || "/"

    const homeProductsToDisplay = () => {
        if (context.filteredItems.length >= 0 && context.filteredProductsByCategory.length > 1 ) {
            return context.filteredItems
        } else {
            return context.items
        }
    }

    return (
        <Layout>
            <h1 className="sign-in-title text-xl font-bold mb-1">Home</h1>
            <input id="search" type="search" className="w-4/12 h-18 border border-black/20 rounded-full px-3 py-2" placeholder="Search..." onChange={(event) => { context.searchProducts(event.target.value) }}></input>
            {context.filteredProductsByCategory?.length > 0 && <p>{ context.filteredItems.length} products found</p>}
            {context.detailView && <ProductDetail />}
            {context.cartView && <CheckoutSideMenu />}
                
            {context.items.length === 0 ?<Layout className="w-full text-center"><p className="loading-text">Loading products...</p></Layout> : <p></p>}

            <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
                {homeProductsToDisplay().map(item => {
                        // Limpiar la URL de la imagen
                    // const cleanImageUrl = item.images[0].replace(/\\|"|\[|\]/g, ''); // Eliminar "\", "\"", "[", y "]"
                    const cleanImageUrl = item.images[0].replace(/\\|"|\[|\]/g, ''); // Eliminar "\", "\"", "[", y "]"

                    return <Card
                            
                        //LATZI API
                        // key={item.id}
                        // category={item.category.name}
                        // name={item.title}
                        // price={item.price}
                        // img={cleanImageUrl}
                        // item={item}

                            
                        // FREE TEST API
                        key={item.id}
                        category={item.category}
                        name={item.title}
                        price={item.price}
                        img={cleanImageUrl}
                        item={item}
                        />
                    })
                }
            </div>
        </Layout>
        )
    }


export default Home