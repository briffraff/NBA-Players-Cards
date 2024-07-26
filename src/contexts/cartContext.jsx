import React, { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isMiniCartVisible, setIsMiniCartVisible] = useState(false);

    useEffect(() => {
        const storedItems = sessionStorage.getItem('cartItems');
        if (storedItems) {
            try {
                const parsedItems = JSON.parse(storedItems);
                setCartItems(Array.isArray(parsedItems) ? parsedItems : []);
            } catch (error) {
                console.error('Error reading cart items from localStorage:', error);
                setCartItems([]);
            }
        }
    }, []);

    useEffect(() => {
        try {
            sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Error saving cart items to localStorage:', error);
        }
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    const showHideMiniCart = () => {
        setIsMiniCartVisible((prev) => !prev);
    };

    const clearCart = () => {
        setCartItems([]);
        setIsMiniCartVisible(false);
        sessionStorage.clear();
        localStorage.clear();
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, isMiniCartVisible, showHideMiniCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}
