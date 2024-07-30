import React, { useState, useEffect } from 'react';
import styles from '../../../public/assets/scss/modules/_AddItemToMiniCart.module.scss';

export default function AddToCartSuccessModal() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
        const timer = setTimeout(() => setShow(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`${styles.itemToCardMsg} ${show ? styles.show : ''}`}>
            Item added to cart!
        </div>
    );
}
