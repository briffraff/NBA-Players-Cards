import React from 'react';
import styles from "../../../public/assets/css/modules/_CartBadge.module.scss";

export default function CartBadge({ cartItems, showHideMiniCartInfo }) {
    const itemCount = cartItems ? cartItems.length : 0;
    return (
        <div className={styles.cartInfo} onClick={showHideMiniCartInfo}>
            {itemCount > 0 && (
                <div className={styles.badge}>{itemCount}</div>
            )}
        </div>
    );
};
