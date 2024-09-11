import { useContext } from "react"
import { Context } from "../Context"

import PropTypes from 'prop-types';


function Card({ category, name, price, img, item }) {
    const context = useContext(Context)

    return (
        <div className="bg-white cursor-pointer w-56 h-60 rounded-lg shadow-md p-2 overflow-hidden" onClick={() => { context.manageProductDetailView(item), context.setCartView(false)} }>
            <figure className="relative mb-2 w-full h-4/5">
                <span className="absolute bottom-0 left-0 bg-white/60 rounded-full text-black text-sm py-0.5 px-3 backdrop-blur-lg m-2">{category}</span>
                <img className="w-full h-full object-cover rounded-lg" src={img} alt={name.replace(/\\|"|\[|\]/g, '')} />
                <div className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1 shadow-md"
                    onClick={(event) => { context.addProductsToCart(event, item), context.setDetailView(false) }}>
                    { context.findCoincidence(item) }
                </div>
            </figure>

            <p className="flex items-center justify-between h-10 gap-2">
                <span className="text-sm font-light align-middle max-h-full overflow-hidden px-1 ">{ name }</span>
                <span className="text-lg font-medium">${ price }</span>
            </p>
        </div>
    )
}

Card.propTypes = {
    event: PropTypes.object,
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
};

export default Card