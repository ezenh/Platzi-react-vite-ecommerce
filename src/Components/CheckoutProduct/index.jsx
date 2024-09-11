import { useContext } from "react"
import { Context } from "../../Context"

import PropTypes from 'prop-types';

function CheckoutProduct({name, price, img, item, boughted }) {
    const context = useContext(Context)
    const fixedImgUrl = img.replace(/\\|"|\[|\]/g, '')

    const deleteIcon = () => {
        return !boughted ? 
            <span className="absolute flex w-6 h-6 p-1 items-center justify-center top-1 right-1 bg-black rounded-full cursor-pointer shadow-sm z-10" onClick={() => { context.deleteProduct(item), context.setDetailView(false) }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="white" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </span>
        : <span></span>
    }

    return (
        <div className="relative flex w-full h-24 items-center p-2 gap-3 justify-between border border-black/10 rounded-xl bg-white">
            <div className="w-16 h-16 overflow-hidden rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${fixedImgUrl})` }}>
            </div>
            <span>{name} </span>
            <span className="font-bold mt-auto ml-auto">${price}</span>

            { deleteIcon()}
        </div>
    )
}

CheckoutProduct.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    boughted: PropTypes.bool.isRequired,
};
export default CheckoutProduct