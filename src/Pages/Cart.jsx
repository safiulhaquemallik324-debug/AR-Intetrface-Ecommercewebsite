import { useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

const getPrice = (value) => {
  if (typeof value === "number") return value;
  return Number(String(value || 0).replace(/[₹,\s]/g, ""));
};

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  });

  const updateCart = (updatedItems) => {
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increaseQty = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
    );

    updateCart(updatedItems);
  };

  const decreaseQty = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id
        ? { ...item, qty: Math.max((item.qty || 1) - 1, 1) }
        : item
    );

    updateCart(updatedItems);
  };

  const removeItem = (id, index) => {
    const updatedItems = cartItems.filter((item, i) =>
      item.id ? item.id !== id : i !== index
    );

    updateCart(updatedItems);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + getPrice(item.price) * (item.qty || 1),
    0
  );

  const delivery = subtotal > 0 ? 99 : 0;
  const total = subtotal + delivery;

  return (
    <section className="cart-page">
      <button className="cart-back-btn" onClick={() => navigate("/")}>
        <ArrowLeft size={20} />
        Continue Shopping
      </button>

      <div className="cart-header">
        <div>
          <h1>Your Cart</h1>
          <p>{cartItems.length} items in your cart</p>
        </div>

        <ShoppingBag size={34} />
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <ShoppingBag size={60} />
          <h2>Your cart is empty</h2>
          <p>Add some products to see them here.</p>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div
                className="cart-card"
                key={item.id || `${item.name}-${index}`}
              >
                <img src={item.img || item.image} alt={item.name} />

                <div className="cart-info">
                  <h3>{item.name}</h3>

                  <p>₹{getPrice(item.price).toLocaleString("en-IN")}</p>

                  <div className="qty-box">
                    <button onClick={() => increaseQty(item.id)}>
                      <Plus size={16} />
                    </button>

                    <span>{item.qty || 1}</span>

                    <button onClick={() => decreaseQty(item.id)}>
                      <Minus size={16} />
                    </button>
                  </div>
                </div>

                <div className="cart-right">
                  <strong>
                    ₹
                    {(getPrice(item.price) * (item.qty || 1)).toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                  <button
                    className="delete-btn"
                    onClick={() => removeItem(item.id, index)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <strong>₹{delivery.toLocaleString("en-IN")}</strong>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <strong>₹{total.toLocaleString("en-IN")}</strong>
            </div>

            <button className="checkout-btn">
              Checkout <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;