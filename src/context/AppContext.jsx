import { createContext, useEffect,useState } from "react";
import {fetchCategories} from "../Service/CategoryService"
import {fetchItems} from "../Service/ItemService"
import toast from "react-hot-toast";
import { redirect, useNavigate } from "react-router-dom";
export const AppContext =createContext(null);
export const AppContextProvider=(props)=>{
    const navigate=useNavigate()
    const [auth, setAuth] = useState(() => ({
        token: localStorage.getItem("token"),
        role: localStorage.getItem("role")
    }));
    const [categories, setCategories] = useState([])
    const [itemsData, setItemsData] = useState([])
    const [cartItems, setCartItems] = useState([])

    const addToCart=(item)=>{
        const existingItem=cartItems.find(cartItem=>cartItem.name===item.name)
        if(existingItem){
            setCartItems(cartItems.map(cartItem=>cartItem.name===item.name?{...cartItem,quantity:cartItem.quantity+1}:cartItem))
        }
        else{
            setCartItems([...cartItems,item])
        }
    }

    const removeFromCart=(itemId)=>{
        setCartItems(cartItems.filter(item=>item.itemId!==itemId))
    }
    const updateQuantity=(itemId,newQuantity)=>{
        setCartItems(cartItems.map(item=>item.itemId===itemId?{...item,quantity:newQuantity}:item))
    }
    const setAuthData=(token,role)=>{
        setAuth({token,role});
    }
    const clearCart=()=>{
        setCartItems([])
    }
    useEffect(()=>{
        async function loadData() {
            let response;
            let itemsResponse;
            try {
                response = await fetchCategories();
                itemsResponse=await fetchItems();
                setItemsData(itemsResponse.data);
                setCategories(response.data);
            } catch (error) {
                if(error.status===403||error.status===403||error.status===401||error.status===401){
                    console.log(error)
                    localStorage.removeItem("token")
                    localStorage.removeItem("role")
                    setAuthData(null,null)
                    navigate("/login")
                }
                else{
                    toast.error("Unable to fetch data")
                }
            }
        }
        loadData()
    },[navigate])   
    const contextValue={
        categories,
        setCategories,
        auth,
        setAuthData,
        itemsData,
        setItemsData,
        addToCart,
        cartItems,
        removeFromCart,
        updateQuantity,
        clearCart,
        
    }
    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}