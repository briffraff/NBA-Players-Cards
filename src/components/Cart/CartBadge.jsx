import React from 'react';
import { useCart } from '../../contexts/cartContext';
import styles from "../../../public/assets/scss/modules/_CartBadge.module.scss";

export default function CartBadge() {
    const { cartItems, showHideMiniCart } = useCart();
    const itemCount = cartItems ? cartItems.length : 0;

    return (
        <div className={styles.cartInfo} onClick={showHideMiniCart}>
            {itemCount > 0 && (
                <div className={styles.badge}>{itemCount}</div>
            )}
        </div>
    );
}
