import { useContext } from "react"
import { LoginContext } from "../../Context"
import { NavLink, useNavigate} from "react-router-dom"

import Layout from "../../Components/Layout"

function Signup() {
    const loginContext = useContext(LoginContext)
    const navigate = useNavigate()
    return (
        <Layout>
            <h1 className="sign-in-title text-xl font-bold mb-1">Sign up for the Shopi Experience</h1>
            <form className="log-in-form flex flex-col w-3/12 items-center gap-4" action="">
                <input id="signup-name" className="w-full rounded-full h-8 pl-4" type="text" placeholder="Name" />
                <input id="signup-lastname" className="w-full rounded-full h-8 pl-4" type="text" placeholder="Lastname" />
                <input id="signup-email" className="w-full rounded-full h-8 pl-4" type="email" placeholder="Email" autoComplete="new-password" />
                <input id="signup-password" className="w-full rounded-full h-8 pl-4" type="password" placeholder="Password" />
            
                <button className="w-full h-10 bg-black text-white rounded-full" onClick={(event) => {
                    event.preventDefault()
                    const name = document.getElementById('signup-name').value
                    const lastname = document.getElementById('signup-lastname').value
                    const email = document.getElementById('signup-email').value
                    const password = document.getElementById('signup-password').value

                    loginContext.signup({ name, lastname, email, password })
                    navigate('/')
                }}>Sign up</button>

                <NavLink to='/' className="mt-4 w-full h-10 text-center p-1.5 bg-white border border-black/50 rounded-full">Back to Login</NavLink>

            </form>
        </Layout>

    )
}

export default Signup