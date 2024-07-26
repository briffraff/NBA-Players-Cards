import React from 'react';
import styles from "../../../public/assets/css/modules/_MiniCart.module.scss";
import { useCart } from '../../contexts/cartContext';

export default function MiniCart() {
    const { cartItems, showHideMiniCart } = useCart();
    const items = Array.isArray(cartItems) ? cartItems : [];

    const handleModalClick = (event) => {
        event.stopPropagation();
    };

    return (
        <section id="cartModal" className={`${styles.modalBackground}`} onClick={showHideMiniCart}>
            <div className={styles.cartContainer} onClick={handleModalClick}>
                <div className={styles.cartHeader}>
                    <h2>Your cart</h2>
                    <button onClick={showHideMiniCart} className={styles.closeButton}>X</button>
                </div>
                {items.length === 0 ? (
                    <p>Cart is empty</p>
                ) : (
                    <ul className={styles.cartList}>
                        {items.map((item, index) => (
                            <li key={index} className={styles.cartItem}>
                                <img src={item.imageUrl} alt={item.playerName} className={styles.cartItemImage} />
                                <div className={styles.cartItemDetails}>
                                    <p>{item.playerName}</p>
                                    <p>{item.price} $</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}


