// HOOKS
import { createContext, useState, useEffect } from "react"

const Context = createContext()
const LoginContext = createContext()

import PropTypes from 'prop-types';

// COMPONENTS
import CheckoutProduct from "../Components/CheckoutProduct"
import OrderCard from "../Components/OrderCard";

import fetchDataApi from "../Api";

const userData = {name: "Ezequiel", lastname:"Nielsen Hillen", email: 'ezenh87@gmail.com', password: '123456', photo: "https://lh3.googleusercontent.com/a/ACg8ocJeCmg5U_pOg_3ZNJeK4xv84-rL7PRFMGrjOw5rJsZL1Z19GA0=s432-c-no" }

// function initializeLocalStorage() {
//     const accountInLocalStorage = localStorage.getItem('account')
//     const signOutInLocalStorage = localStorage.getItem('sign-out')

//     let parsedAccount
//     let parsedSignOut

//     if (!accountInLocalStorage) {
//         localStorage.setItem('account', JSON.stringufy({}))
//         parsedAccount = {}
//     } else {
//         parsedAccount = JSON.parse(accountInLocalStorage)
//     }

//     if (!signOutInLocalStorage) {
//         localStorage.setItem('sign-out', JSON.stringify(false))
//         parsedSignOut = false
//     } else {
//         parsedSignOut = JSON.parse(signOutInLocalStorage)
//     }
// }

function LoginContextProvider({children}) {
    // PARAMETROS DE LOGIN
    // Usuario en local storage?
    const [isLoading, setIsLoading] = useState(true);
        useEffect(() => {
    const storedLogedIn = localStorage.getItem('loged-in');
    setLogedIn(storedLogedIn === 'true');
    setIsLoading(false);
        }, []);
    
    const [knownUser, setKnownUser] = useState(false)

    const [account, setAccount] = useState(() => {
        // Cargar cuenta desde localStorage si existe
        const storedAccount = localStorage.getItem('account');
        return storedAccount ? JSON.parse(storedAccount) : {};
    });
    
    const [logedIn, setLogedIn] = useState(() => {
        const storedLogedIn = localStorage.getItem('loged-in');
        return storedLogedIn === 'true';
    });

    const [isEditingAccount, setIsEditingAccount] = useState(false)

    const [isEditingAccountOk, setIsEditingAccountOk] = useState(false)

     // Toggle logout message
    const [logoutWindow, setLogoutWindow] = useState(false)

     // LOGICAS PARA MANEJO DE USUARIO    
    const login = (email, password) => {
        console.log(email)
        console.log(password)
        if (email === userData.email && password === userData.password) {
            console.log('login exitoso')
            setLogedIn(true)
            setAccount(userData);
            localStorage.setItem('loged-in', JSON.stringify(true))
            localStorage.setItem('account', JSON.stringify(userData))
        } else {
            setLogedIn(false)
            console.log('Email and/or password are incorrect')
            document.getElementById('log-in-error').style.display = 'flex'
        }
    }

    const signup = ({ name, lastname, email, password }) => {
        if (name && lastname && email && password) {
            setAccount({ name: name, lastname: lastname, email: email, password: password })
            localStorage.setItem('account', JSON.stringify({ name: name, lastname: lastname, email: email, password: password }))
            localStorage.setItem('loged-in', true)
            setLogedIn(true)
        }
    }

    // useEffect(() => {
    //     const 
    //     return knownUser
    //         ? 
    //         :

    // })

    const toggleEditingAccountMode = () => {
        isEditingAccount ? setIsEditingAccount(false) : setIsEditingAccount(true)
    }

    const verifyCorrectAccountEditing = (newAccountName, newAccountLastname, newAccountEmail, newAccountPassword, newAccountPasswordConfirmation) => {
        console.log(newAccountName, newAccountLastname, newAccountEmail, newAccountPassword, newAccountPasswordConfirmation)
        if (newAccountName != '' || newAccountLastname != '' || newAccountEmail != '') {
            if (newAccountPassword === newAccountPasswordConfirmation) {
                document.getElementById('new-password-error').style.display = 'none'
                return setIsEditingAccountOk(true)
                
            } else {
                document.getElementById('new-password-error').style.display = 'flex'
                return setIsEditingAccountOk(false)
            }
        }
        if (newAccountPassword != '' && newAccountPasswordConfirmation != '') {
            if (newAccountPassword === newAccountPasswordConfirmation) {
                document.getElementById('new-password-error').style.display = 'none'
                return setIsEditingAccountOk(true)
            } else {
                document.getElementById('new-password-error').style.display = 'flex'
                return setIsEditingAccountOk(false)               
            }
        }
        if (newAccountName === '' && newAccountLastname === '' && newAccountEmail === '' && newAccountPassword === '' && newAccountPasswordConfirmation === '') {
            document.getElementById('new-password-error').style.display = 'none'
            return setIsEditingAccountOk(false) 
        }
        else {
            document.getElementById('new-password-error').style.display = 'flex'
            return setIsEditingAccountOk(false)
        }
        }
    
    const updateAccountData = (newAccountName, newAccountLastname, newAccountEmail, newAccountPassword) => {
        const oldAccount = JSON.parse(localStorage.getItem('account'))
        const newAccount = {
            photo: oldAccount.photo,
            name: newAccountName != '' ? newAccountName : oldAccount.name,
            lastname: newAccountLastname != '' ? newAccountLastname : oldAccount.lastname,
            email: newAccountEmail != '' ? newAccountEmail : oldAccount.email,
            password: newAccountPassword != '' ? newAccountPassword : oldAccount.password,
        }
        setAccount(newAccount)
        localStorage.setItem('account', JSON.stringify(newAccount))
        Array.from(document.getElementsByClassName('account-update-fields')).forEach(el => {
            el.value = ''
        })
        setIsEditingAccount(false)
    }

    const toggleLogoutWindow = () => {
        return logoutWindow === false ? setLogoutWindow(true) : setLogoutWindow(false)
    }

    const contextValues = {
        account,
        setAccount,
        logedIn,
        setLogedIn,
        isEditingAccountOk,
        updateAccountData,
        login,
        knownUser,
        setKnownUser,
        signup,
        toggleEditingAccountMode,
        isEditingAccount,
        verifyCorrectAccountEditing,
        isLoading,
        toggleLogoutWindow,
        logoutWindow,
        setLogoutWindow,
    }
    return (
        <LoginContext.Provider value={contextValues}>
            { children }
        </LoginContext.Provider>
    )
}

LoginContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}
////////////////////////////////////////////////////

function ContextProvider({ children }) {
    // PARAMETROS PARA CARGAR PRODUCTOS
    // Topos
    const [items, setItems] = useState([])
    // Solo sus categorias 
    const [productsCategories, setProductsCategories] = useState([])
    // Productos filtrados por categorias
    const [filteredProductsByCategory, setFilteredProductsByCategory] = useState([])
    // Productos filtrados por busqueda en el input searcher
    const [filteredItems, setFilteredItems] = useState([])

    // Productos cargados en la pre-orden
    const [cartProducts, setCartProducts] = useState([])
    // Toogle de vista detallada de producto
    const [detailView, setDetailView] = useState(false)
    // Producto que se va a visualizar en modo detallado
    const [productDetailView, setProductDetailView] = useState(null)

    // Toogle de vista de productos cargados en pre-orden
    const [cartView, setCartView] = useState(false)
    // Definir el monto total de la pre-orden
    let [cartTotal, setCartTotal] = useState(Number(0))

    // Ordenes (Compras) confirmadas
    const [myOrders, setMyOrders] = useState([])

    // Cargando Productos (Fetch) / Productos ya cargados
    const [isLoading, setIsLoading] = useState(true);

    //////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    // LOGICAS PARA MANEJO DE PRODUCTOS
    // 1. OBTENER TODOS LOS PRODUCTOS
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchDataApi();
                setItems(data.products);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // 1B. GET PRODUCTS CATEGORIES
    useEffect(() => {
        if (items.length > 0) {
            const filterProductsCategories = () => {
                let categoriesSet = new Set();

                items.forEach(item => {
                    categoriesSet.add(item.category); // Agrega automáticamente categorías únicas
                });

                const categoriesArray = Array.from(categoriesSet);
                // console.log(categoriesArray)
                setProductsCategories(categoriesArray); // Actualiza el estado de categorías
            };
            filterProductsCategories()
        }
    },[items])
    
    // 2. FILTRAR CATEGORIAS DE PRODUCTOS
     // Filtrar productos por categoría cuando `items` se actualiza
    useEffect(() => {
        if (!isLoading && items.length > 0) {
            filterItemsByCategory(window.location.pathname.slice(1) || "/"); // Pasamos la categoría desde la URL
        }
    }, [isLoading, items]);

    const filterItemsByCategory = (category) => {
        // console.log(typeof (category))
        // console.log(items)
        let result

        if (category == "all" || category == "/") {
            result = items
        } else {
            result = items.filter(item => item.category.toLowerCase().includes(category.toLowerCase()))
        }
        // console.log(result)
        return setFilteredItems(result), setFilteredProductsByCategory(result)
    }

    // 3. VISUALIZAR PRODUCT DETAIL
    const manageProductDetailView = (item) => {
        setProductDetailView(item)
        return setDetailView(true)
    }

    // 4. AGREGAR ITEMS AL CARRITO
    const addProductsToCart = (event, item) => {
        // const newItem = [...cartProducts]
        // newItem.push(item)
        // setCartProducts(newItem)

        // Version simplificada. El set funciona indicando el valor inicial y lo que se va a agregar
        event.stopPropagation()
        let newItem = cartProducts.filter(product => product.id === item.id)

        // CHECKEA QUE EL PRODUCTO NO SE ENCUENTRE YA AGREGADO, PARA NO GENERAR DUPLICADOS
        if (newItem.length === 0) {
            setCartProducts([...cartProducts, item])
            setCartTotal(cartTotal += Number(item.price))
        } else {
            alert("Este producto ya fue agregado")
        }
        setCartView(true)
    }

    // 5. ELIMINAR PRODUCTO DEL CARRITO
    const deleteProduct = (product) => {
        let allProducts = [...cartProducts]
        allProducts.splice(cartProducts.indexOf(product), 1)
        setCartProducts(allProducts)

        setCartTotal(cartTotal -= Number(product.price))
    }
    
    // 6. CHECKEAR SI ITEM YA ESTA CARGADO PARA MODIFICAR SU ICONO A CHECKED
    const findCoincidence = (item) => {
        let coincidence = cartProducts.filter(product => product.id === item.id)
        return coincidence.length === 0
            ? 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
    }

    // 7. CHECKEAR CANTIDAD DE PRODUCTOS CARGADOS EN CARRITO
    const checkoutProductsToDisplay = () => {
        return cartProducts?.length > 0
            ?
            cartProducts.map(item => {
                return <CheckoutProduct key={item.id} name={item.title} price={item.price} img={item.images[0]} item={item} boughted={false} />
            })
            :
            <p className="py-12 text-center">0 products selected</p>;
    }

    // 8. CREAR HISTORIAL DE ORDENES
    const saveOrder = () => {
        // const date = new Date()

        // const day = date.getDay()+1
        // const month = date.getMonth()+1
        // const year = date.getFullYear()
        // const seconds = date.getSeconds()
        // const minutes = date.getMinutes()
        // const hours = date.getHours()
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');

        if (cartProducts.length > 0) {
            const newOrder = {
                id: myOrders.length,
                products: cartProducts,
                total: cartTotal,
                date: `${day + 1}/${month + 1}/${year} - ${hours}:${minutes}:${seconds}`
            }
            
            setMyOrders([...myOrders, newOrder])
            setCartProducts([])
            setCartTotal(0)
            setCartView(false)
        }
    }

    // 9. CHECKEAR CANTIDAD DE ORDENES HISTORICAS
    const viewAllOrders = () => {
        return myOrders
        ?
        myOrders.map(order => {
            return <OrderCard key={myOrders.indexOf(order)} data={myOrders[myOrders.indexOf(order)]} />
            })
        :
            <p className="py-12 text-center">0 orders</p>
    }
    // 10. VISUALIZAR LOS PRODUCTOS DE CADA ORDEN 
    const viewOrderProducts = (order) => {
        // console.log(order)
        return order.map(item => {
            // console.log(item)
            return <CheckoutProduct key={item.id} name={item.title} price={item.price} img={item.images[0]} item={item} boughted={true} />
        });
    }

    // 11. SEARCH PRODUCTS 
    const searchProducts = (value) => {
        // console.log(value)
        const result = filteredProductsByCategory.filter(product => product.title.toLowerCase().includes(value.toLowerCase()))

        // console.log(filteredProductsByCategory)
        // console.log(result)
        return setFilteredItems(result)
    }

    const contextValues = {
        items,
        setItems,
        addProductsToCart,
        cartProducts,
        filterItemsByCategory,
        filteredItems,
        detailView,
        setDetailView,
        manageProductDetailView,
        productDetailView,
        cartView,
        setCartView,
        deleteProduct,
        cartTotal,
        findCoincidence,
        checkoutProductsToDisplay,
        saveOrder,
        myOrders,
        setMyOrders,
        viewAllOrders,
        viewOrderProducts,
        isLoading,
        productsCategories,
        searchProducts,
        filteredProductsByCategory
    }
    
    return (
        <Context.Provider value={contextValues}>
            { children }
        </Context.Provider>
    )
}

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}



export { LoginContext, Context, LoginContextProvider, ContextProvider }