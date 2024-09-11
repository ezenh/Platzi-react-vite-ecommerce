import { LoginContext } from "../../Context"
import Layout from "../../Components/Layout"
import { useContext } from "react"

function MyAccount() {
    const loginContext = useContext(LoginContext)
    const isEditing = loginContext.isEditingAccount
    //  loginContext.verifyCorrectAccountEditing()

    const newAccountName = () => {
        const accountName = document.getElementById('account-name').value;
        return accountName ? accountName : '';
    };
    const newAccountLastname = () => {
        const accountLastname = document.getElementById('account-lastname').value;
        return accountLastname ? accountLastname : '';
    }
    const newAccountEmail = () => {
        const accountEmail = document.getElementById('account-email').value
        return accountEmail ? accountEmail : ''
    }
    const newAccountPassword = () => {
        const accountPassword = document.getElementById('account-password').value
        return accountPassword ? accountPassword : ''
    }
    const newAccountPasswordConfirmation = () => {
        const accountPasswordConfirmation = document.getElementById('account-password-confirmation').value
        return accountPasswordConfirmation ? accountPasswordConfirmation : ''
    }

    // const verifyCorrectEditing = () => {

    // }

    return (
        <Layout>
            <h1 className="sign-in-title text-xl font-bold mb-1">{isEditing ? "Edit My Account" : "My Account" }</h1>
            <div className="relative">
                <img className="w-28 h-28 rounded-full bg-slate-500" src={ loginContext.account.photo !== '' ? loginContext.account.photo : "../../public/legacy-user-photo.jpeg" } alt="account-photo" />
                {loginContext.isEditingAccount &&
                        <button className="flex items-center justify-center absolute w-10 h-10 text-nowrap bg-blue-600 text-white rounded-full bottom-5 -right-5 shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            </svg>
                        </button>}
            </div>
            <input className="account-update-fields w-3/12 rounded-full h-8 pl-4" id="account-name" type="text" placeholder={loginContext.account.name} disabled={isEditing ? "" : "disabled"} onChange={() => { loginContext.verifyCorrectAccountEditing( newAccountName(), newAccountLastname(), newAccountEmail(), newAccountPassword(), newAccountPasswordConfirmation() ) }}/>
            <input className="account-update-fields w-3/12 rounded-full h-8 pl-4" id="account-lastname" type="text" placeholder={loginContext.account.lastname} disabled={isEditing ? "" : "disabled"} onChange={() => { loginContext.verifyCorrectAccountEditing( newAccountName(), newAccountLastname(), newAccountEmail(), newAccountPassword(), newAccountPasswordConfirmation()) }}/>
            <input className="account-update-fields w-3/12 rounded-full h-8 pl-4" id="account-email" type="text" placeholder={loginContext.account.email} disabled={isEditing ? "" : "disabled"} onChange={() => { loginContext.verifyCorrectAccountEditing( newAccountName(), newAccountLastname(), newAccountEmail(), newAccountPassword(), newAccountPasswordConfirmation()) }}/>
            
            {isEditing && 
                <>
                <input className="w-3/12 rounded-full h-8 pl-4" id="account-password" type="text" placeholder="Password" onChange={() => { loginContext.verifyCorrectAccountEditing( newAccountName(), newAccountLastname(), newAccountEmail(), newAccountPassword(), newAccountPasswordConfirmation() ) }}/>
                <input className="w-3/12 rounded-full h-8 pl-4" id="account-password-confirmation" type="text" placeholder="Confirm password" onChange={() => { loginContext.verifyCorrectAccountEditing( newAccountName(), newAccountLastname(), newAccountEmail(), newAccountPassword(), newAccountPasswordConfirmation() ) }} />
                <p id="new-password-error" className="hidden text-red-700" >Confirmation password must match with new password</p>
                </>
            }


            {isEditing ? 
                <>
                    <button disabled={loginContext.isEditingAccountOk ? "" : "disabled"} className={loginContext.isEditingAccountOk ? "w-3/12 h-10 bg-white text-black border border-black/50 rounded-full" : "w-3/12 h-10 bg-white/20 text-black/20 border rounded-full"} onClick={() => {
                        console.log(loginContext.account.photo)
                    loginContext.updateAccountData( newAccountName(), newAccountLastname(), newAccountEmail(), newAccountPassword() )
                }}>Confirm
                </button>
                    <button className="w-3/12 h-10 bg-black text-white rounded-full" onClick={() => {
                    loginContext.toggleEditingAccountMode()
                }}>Cancel
                </button> 
                
                </>

                :
                <button className="w-3/12 h-10 bg-white text-black border border-black/50 rounded-full" onClick={() => {
                    loginContext.toggleEditingAccountMode()
                }}>Edit your account info
                </button>  
        }

        </Layout>
    )
}

export default MyAccount