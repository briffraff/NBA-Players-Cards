import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/cartContext';
import styles from "../../../public/assets/scss/modules/_MiniCart.module.scss";

export default function MiniCart() {
    const { cartItems, showHideMiniCart, removeFromCart } = useCart();
    const items = Array.isArray(cartItems) ? cartItems : [];

    const [totalSubPrice, setTotalSubPrice] = useState(0);

    useEffect(() => {
        const total = items.reduce((acc, item) => acc + item.price, 0);
        setTotalSubPrice(total);
    }, [items]);

    const handleModalClick = (event) => {
        event.stopPropagation();
    };

    return (
        <>
            <section id="cartModal" className={`${styles.modalBackground}`} onClick={showHideMiniCart}>
                <div className={styles.cartContainer} onClick={handleModalClick}>
                    <div className={styles.cartHeader}>
                        <h2>Мy cart</h2>
                        <button onClick={showHideMiniCart} className={styles.closeButton}>X</button>
                    </div>
                    {items.length === 0 ? (
                        <p>Cart is empty</p>
                    ) : (
                        <>
                            <ul className={styles.cartList}>
                                {items.map((item, index) => (
                                    <li className={styles.cartItem}>
                                        <img src={item.imageUrl} alt={item.playerName} className={styles.cartItemImage} />
                                        <Link key={index} to={`/cards-shop/${item.id}`} className={styles.links}>
                                            <div className={styles.cartItemDetails}>
                                                <p className={styles.player}>{item.playerName}</p>
                                                <p className={styles.price}>{item.price} $</p>
                                            </div>
                                        </Link>
                                        <button className={styles.cancel} onClick={() => removeFromCart(item.uniqueId)}>x</button>
                                    </li>
                                ))}
                            </ul>
                            <div className={styles.totalPrice}>Total sub-price: <div className={styles.price}>{totalSubPrice}  $</div></div>
                            <Link to="/cart" ><div className={styles.checkout}>Checkout</div></Link>
                        </>
                    )}
                </div>
            </section>
        </>
    );
}