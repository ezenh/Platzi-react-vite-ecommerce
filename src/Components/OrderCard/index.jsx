import { useContext, useState, useRef, useEffect } from "react"
import { Context } from "../../Context"

import PropTypes from 'prop-types';

function OrderCard({ data }) {
    const context = useContext(Context)
    const [isExpanded, setIsExpanded] = useState(false)
    const containerRef = useRef(null)

    useEffect(() => {
        if (containerRef.current) {
            if (isExpanded) {
                const height = containerRef.current.scrollHeight + .1;
                containerRef.current.style.maxHeight = `${height}px`

            } else {
                containerRef.current.style.maxHeight = '0px'

            }
        }
    }, [isExpanded])

    function toggleCard() {
        setIsExpanded(!isExpanded)
    }

    return (
        <div className="relative flex flex-col min-w-full h-fit items-center justify-between p-3 border border-black/10 rounded-xl bg-white transition-all">
            <div className="flex w-full min-h-12 px-6 items-center gap-3 justify-between">
                <span className="font-semibold ">Items: {data.products.length}</span>
                <div className='flex flex-col ml-auto mr-4'>
                    <span className='font-bold text-right'>Total: ${data.total.toFixed(2)}</span>
                    <span className='text-xs text-right'>{String(data.date)}</span>
                </div>

                <span className="toggle-card-icon flex items-center justify-center h-6 w-6 p-1 border border-black/10 rounded-full" onClick={toggleCard}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="black" className="size-6 z-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </span>
            </div>


            <div ref={containerRef} className={`order-products-container min-w-full ${isExpanded ? 'expanded' : ''}`}>
                {context && context.viewOrderProducts(data.products)}
            </div>
        </div>
    )
}

OrderCard.propTypes = {
    data: PropTypes.object.isRequired,
};

export default OrderCard