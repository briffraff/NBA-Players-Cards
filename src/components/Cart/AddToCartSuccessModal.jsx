import React, { useState, useEffect } from 'react';
import { timeout } from '../../service/cart/cart-service';
import styles from '../../../public/assets/scss/modules/_AddItemToMiniCart.module.scss';

export default function AddToCartSuccessModal() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
        timeout(() => setShow(false), 3000);
    }, []);

    return (
        <div className={`${styles.itemToCardMsg} ${show ? styles.show : ''}`}>
            Item added to cart!
        </div>
    );
}
