import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState(null);
    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));

        if (token) {
            await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const newQuantity = (prev[itemId] || 0) - 1;
            return newQuantity > 0
                ? { ...prev, [itemId]: newQuantity }
                : { ...prev, [itemId]: undefined };
        });

        if (token) {
            await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
        }
    };

    const getTotalCartAmount = () => {
        return Object.keys(cartItems).reduce((totalAmount, item) => {
            const itemCount = cartItems[item];
            if (itemCount > 0) {
                const foodItem = food_list.find(product => product._id === item);
                return totalAmount + (foodItem ? foodItem.price * itemCount : 0);
            }
            return totalAmount;
        }, 0);
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.status === 200) {
                setFoodList(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData || {});
            } else {
                console.error("Failed to load cart data:", response.data.message);
            }
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    const decodeToken = (token) => {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload)); // Decode the payload
    };

    const checkTokenExpiration = (token) => {
        const expiryTime = decodeToken(token).exp;
        const currentTime = Math.floor(Date.now() / 1000);

        return expiryTime <= currentTime;
    };

    const handleTokenCheck = () => {
        const storedToken = localStorage.getItem("token");
        if (storedToken && checkTokenExpiration(storedToken)) {
            logout();
        } else if (storedToken) {
            setToken(storedToken);
            loadCartData(storedToken);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setCartItems({}); // Optionally clear cart items
        // Redirect to login or handle logout UI here
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchFoodList();
            handleTokenCheck();
        };
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        removeFromCart,
        addToCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
