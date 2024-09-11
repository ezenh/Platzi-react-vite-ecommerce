import { LoginContext } from "../../Context"
import { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"

import Layout from "../../Components/Layout"

function Login() {
    const loginContext = useContext(LoginContext)    
    const navigate = useNavigate()

    return (
        <Layout>
            <h1 className="sign-in-title text-xl font-bold mb-1">Welcome!</h1>
            <div className="flex min-w-fit w-6/12 h-96 items-center justify-center">
            {localStorage.getItem('account') &&
                <div className="login-left flex flex-col min-w-fit w-6/12 h-72 items-end gap-3 overflow-auto pr-4">
                        <span className={`w-6/12 text-center font-bold transition-all duration-500 ${loginContext.knownUser && "opacity-0"}`}>Saved accounts</span>
                        <div id="existing-account" className={`"login-existing-account relative flex items-center min-w-fit w-72 h-24 py-2 px-2 pr-10 border-2 border-stone-500/20 bg-white rounded-3xl cursor-pointer transition-all duration-500 hover:bg-slate-500/1 hover:shadow-xl ${loginContext.knownUser && "hover:bg-slate-500/0 hover:shadow-none bg-transparent border-stone-500/0"}`} onClick={() => {
                            loginContext.setKnownUser(true)
                            }}>
                            {!loginContext.knownUser && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6 absolute top-2 right-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>}

                            <img className={`absolute h-16 w-16 rounded-full ${loginContext.knownUser && "translate-x-48 scale-150"} transition-all duration-1000 z-50`} src={JSON.parse(localStorage.getItem('account')).photo} alt="" />
                            <div className="ml-20 overflow-hidden">
                                <p className={`text-sm font-medium text-slate-900 transition-all duration-500 ${loginContext.knownUser && "opacity-0"}`}>{JSON.parse(localStorage.getItem('account')).name}</p>
                                <p className={`text-sm text-slate-500 truncate transition-all duration-500 ${loginContext.knownUser && "opacity-0"}`}>{JSON.parse(localStorage.getItem('account')).email}</p>
                            </div>
                        </div>
                </div>
                }

                <div className="h-full border border-l-black/10"></div>

                <div className="login-right flex flex-col w-6/12 h-72 items-start gap-3 pl-4">
                    <span className="min-w-72 w-6/12 text-center font-bold">{loginContext.knownUser ? `Sign in as ${JSON.parse(localStorage.getItem('account')).name}` : "New login"}</span>

                <form className="log-in-form flex flex-col min-w-72 w-6/12 h-64 items-center gap-4" action="">
                    <div className="inputs flex flex-col w-full  h-64 gap-3">
                        <input id="login-email" className="w-full rounded-full min-h-10 pl-4" placeholder="Email" type="email" {...(loginContext.knownUser && { value: JSON.parse(localStorage.getItem('account')).email })} />
                        <input id="login-password" className="w-full rounded-full min-h-10 pl-4" placeholder="Password" type="password" />
                    </div>

                    <button className="w-full min-h-10 bg-black text-white rounded-full" onClick={(event) => {
                        event.preventDefault()
                        const loginEmail = document.getElementById('login-email').value
                        const loginPassword = document.getElementById('login-password').value

                        console.log(loginEmail)
                        console.log(loginPassword)
                        loginContext.login(loginEmail, loginPassword)
                    
                        navigate('/')
                    }}>Log in</button>


                    <a className="text-xs underline underline-offset-2 -mt-3" rel="stylesheet" href="">Forgot my password</a>
                    <p id="log-in-error" className="hidden text-center text-red-600">Email and/or password are incorrect</p>
                        <NavLink to={loginContext.knownUser ? '' :'sign-up'} className="mt-4 w-full min-h-10"  onClick={()=> {{loginContext.knownUser && loginContext.setKnownUser(false)}}}>
                        <button className="w-full h-full text-center p-1.5 bg-white border border-black/50 rounded-full hover:shadow-lg transition-all duration-500" >{loginContext.knownUser ? 'Cancel' : 'Sign up'}</button>
                    </NavLink>
                </form>
                </div>
            </div>


        </Layout>
    )
}

export default Login