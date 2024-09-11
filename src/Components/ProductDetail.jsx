import { useContext } from "react"
import { Context } from "../Context"

function ProductDetail() {
    const context = useContext(Context)

    const imgInProduct = () => {
        return context.productDetailView.images.map((el, index) => {
            // Reemplazar los caracteres no deseados
            const cleanImageUrl = el.replace(/\\|"|\[|\]/g, '')
            return (
                <img 
                    key={index} // Utiliza el índice como key (mejor si usas una propiedad única)
                    className="min-w-full snap-center" 
                    src={cleanImageUrl}
                    alt={`product-photo-${index}`} 
                />
            )
        })
    }

    return (
        <aside className="product-detail fixed flex flex-col items-center justify-center gap-3 w-1/3 h-[calc(100%-80px)] p-4 right-0 border border-black/10 rounded-lg bg-white/80 backdrop-blur-xl shadow-2xl z-10">
            <p className="text-left w-full font-bold text-xl">Product detail</p>
            <span className="flex absolute top-0 right-0 m-2 w-8 h-8 p-2 items-center justify-center border border-black/10 rounded-full cursor-pointer shadow-sm z-10" onClick={() => { context.setDetailView(false) }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="black" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </span>

            <div className="flex mt-1 w-full aspect-square overflow-auto rounded-lg shadow-lg snap-x">
                {imgInProduct()}
            </div>
            
            <span className="text-2xl py-2 px-6 bg-black border border-white mr-auto text-white rounded-full">${context.productDetailView.price}</span>
            <span className="text-xl text-center">{context.productDetailView.title}</span>
            <span className="text-justify font-light">{context.productDetailView.description}</span>

            <button className="flex justify-center w-2/3 p-3 bg-lime-300 rounded-full shadow-lg text-green-900 font-bold border-none mt-auto" onClick={(event) => { context.addProductsToCart(event, context.productDetailView) }}>Add to Cart</button>
        </aside>
    )
}

export default ProductDetail