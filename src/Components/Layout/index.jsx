import PropTypes from 'prop-types';

function Layout({ children }) {
    return (
        <div className="relative flex flex-col mt-2 items-center gap-5 h-screen overflow-auto pt-16 pb-16 pl-4 pr-4">
            {children}
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}

export default Layout