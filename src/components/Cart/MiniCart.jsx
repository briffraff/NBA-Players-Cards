import React from 'react';
import styles from "../../../public/assets/css/modules/_MiniCart.module.scss";

export default function MiniCart({ cartItems, showHideMiniCartInfo }) {
    const items = Array.isArray(cartItems) ? cartItems : [];

    return (
        <>
            <div className={styles.cartContainer}>
                <div className={styles.cartHeader}>
                    <h2>Your cart</h2>
                    <button onClick={showHideMiniCartInfo} className={styles.closeButton}>X</button>
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
        </>
    )
}



