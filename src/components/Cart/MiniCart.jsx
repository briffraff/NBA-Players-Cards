import React, { useState, useEffect } from 'react';
import styles from "../../../public/assets/css/modules/_MiniCart.module.scss";
import { useCart } from '../../contexts/cartContext';

export default function MiniCart() {
    const { cartItems, showHideMiniCart, removeFromCart } = useCart();
    const items = Array.isArray(cartItems) ? cartItems : [];

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const total = items.reduce((acc, item) => acc + item.price, 0);
        setTotalPrice(total);
    }, [items]);

    const handleModalClick = (event) => {
        event.stopPropagation();
    };

    return (
        <>
            <section id="cartModal" className={`${styles.modalBackground}`} onClick={showHideMiniCart}>
                <div className={styles.cartContainer} onClick={handleModalClick}>
                    <div className={styles.cartHeader}>
                        <h2>Your cart</h2>
                        <button onClick={showHideMiniCart} className={styles.closeButton}>X</button>
                    </div>
                    {items.length === 0 ? (
                        <p>Cart is empty</p>
                    ) : (
                        <>
                            <ul className={styles.cartList}>
                                {items.map((item, index) => (
                                    <li key={index} className={styles.cartItem}>
                                        <img src={item.imageUrl} alt={item.playerName} className={styles.cartItemImage} />
                                        <div className={styles.cartItemDetails}>
                                            <p className={styles.player}>{item.playerName}</p>
                                            <p className={styles.price}>{item.price} $</p>
                                        </div>
                                        <button className={styles.cancel} onClick={() => removeFromCart(item.uniqueId)}>x</button>
                                    </li>
                                ))}
                            </ul>
                            <div className={styles.totalPrice}>Total price: <div className={styles.price}>{totalPrice}  $</div></div>
                        </>
                    )}
                </div>
            </section>
        </>
    );
}