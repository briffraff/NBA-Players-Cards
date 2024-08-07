export const timeout = async (callback, delay) => {
    const timer = setTimeout(callback, delay);
    return () => clearTimeout(timer);
}

export const subtotal = async (items) => {
    const result = items.reduce((acc, item) => acc + item.price, 0);
    return result;
}

export const calculateCartTotals = async (items) => {
    const subTotal = await subtotal(items);
    const shipping = parseFloat(Math.floor(subTotal / 10).toFixed(2));
    const tax = parseFloat(Math.floor(shipping * 0.5).toFixed(2));
    const total = subTotal + shipping + tax;

    return {
        subtotal: subTotal,
        shipping: shipping,
        tax: tax,
        total: total
    };
};
