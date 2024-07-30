import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../public/assets/css/modules/_Cart.module.scss"
import { useCart } from "../../contexts/cartContext";

export default function Cart() {
    const { cartItems, removeFromCart } = useCart();
    const items = Array.isArray(cartItems) ? cartItems : [];

    const [subTotal, setSubTotalPrice] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [tax, setTax] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const subT = items.reduce((acc, item) => acc + item.price, 0);
        setSubTotalPrice(subT);
        setShipping(parseFloat(Math.floor(subTotal / 10).toFixed(2)));
        setTax(parseFloat(Math.floor(shipping * 0.5).toFixed(2)));
        setTotalPrice(subT + shipping + tax);
    }, [items, subTotal, shipping, tax, totalPrice]);

    return (
        <>

            <div className={styles.slogan}>Cart</div>
            <div className={styles.cartContainer}>
                {items.length === 0 ? (
                    <p className={styles.empty}>Cart is empty</p>
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
