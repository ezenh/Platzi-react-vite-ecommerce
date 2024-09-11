import { useContext } from "react"
import { LoginContext } from "../Context"

function LogoutMessage() {
    const loginContext = useContext(LoginContext)
    console.log(loginContext)

        return (
            <div className="log-out-window absolute flex top-0 left-0 w-screen h-screen items-center justify-center bg-black/40 backdrop-blur-md z-50">
                <div className="log-out-message relative flex flex-col w-6/12 max-w-80 h-fit p-6 center-items rounded-xl bg-white">
                    <span className="log-out-message-title w-full text-center">Are you sure you want to close your session?</span>
                    <div className="mt-5 flex justify-between w-full">
                        <button className="w-5/12 py-2 px-4 bg-black text-white rounded-full" onClick={() => {
                            loginContext.setLogoutWindow(false)
                        }}>Cancel</button>
                        <button className="w-5/12 py-2 px-4 border border-black/10 rounded-full" onClick={() => {
                            loginContext.setLogedIn(false)
                            localStorage.setItem('loged-in', 'false')
                            console.log(localStorage)
                            loginContext.setLogoutWindow(false)
                        }}>Accept</button>
                    </div>
                </div>
            </div>
        )
    }
export default LogoutMessage