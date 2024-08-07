import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/cartContext";
import { calculateCartTotals } from "../../service/cart/cart-service"; // Обновете пътя до новото име на функцията
import styles from "../../../public/assets/scss/modules/_Cart.module.scss";

export default function Cart() {
    const { cartItems, removeFromCart } = useCart();
    const items = Array.isArray(cartItems) ? cartItems : [];

    const [subTotal, setSubTotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [tax, setTax] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const updateCalculations = async () => {
            const calcs = await calculateCartTotals(items);
            setSubTotal(calcs.subtotal);
            setShipping(calcs.shipping);
            setTax(calcs.tax);
            setTotalPrice(calcs.total);
        };

        updateCalculations();
    }, [items]);

    return (
        <>
            <div className={styles.slogan}>Cart</div>
            <div className={styles.cartContainer}>
                {items.length === 0 ? (
                    <div className={`${styles.cartList}`}>
                        <p className={`${styles.empty}`}>Cart is empty</p>
                    </div>
                ) : (
                    <>
                        <ul className={styles.cartList}>
                            {items.map((item, index) => (
                                <li key={index} className={styles.cartItem}>
                                    <img src={item.imageUrl} alt={item.playerName} className={styles.cartItemImage} />
                                    <Link to={`/cards-shop/${item.id}`} className={styles.links}>
                                        <div className={styles.cartItemDetails}>
                                            <p className={styles.player}>{item.playerName}</p>
                                            <p className={styles.price}>{item.price} $</p>
                                        </div>
                                    </Link>
                                    <button className={styles.cancel} onClick={() => removeFromCart(item.uniqueId)}>x</button>
                                </li>
                            ))}
                                <button className={styles.clearAll}>Clear all</button>
                            </ul>
                    </>
                )}

                <div className={styles.summary}>
                    <div className={styles.summarySlogan}>Summary</div>
                    <div className={styles.additionalsContainer}>
                        <div className={styles.additionals}>Subtotal
                            <div className={styles.addsPrice}>{subTotal} $</div>
                        </div>
                        <div className={styles.additionals}>Shipping
                            <div className={styles.addsPrice}>{shipping} $</div>
                        </div>
                        <div className={styles.additionals}>Tax
                            <div className={styles.addsPrice}>{tax} $</div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.totalPrice}>Total Price
                            <div>{totalPrice} $</div>
                        </div>
                        <button className={styles.checkoutBtn}>Checkout</button>
                    </div>
                </div >
            </div >
        </>
    );
}
