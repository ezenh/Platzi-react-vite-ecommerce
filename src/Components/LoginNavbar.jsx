import { useLocation } from "react-router-dom"

function LoginNavbar() {
    const location = useLocation().pathname.slice(1) || "/"

    return (        
        <nav className="fixed top-0 flex justify-between items-center w-full h-10 px-5 text-xs font-light bg-white/80 backdrop-blur-xl shadow-lg z-10">
            <p className="font-semibold text-sm">Shopi</p>
            <p className="w-full text-right">{location === "sign-up" ? "Sign up" : "Log In"}</p>
        </nav>
    )
}

export default LoginNavbar