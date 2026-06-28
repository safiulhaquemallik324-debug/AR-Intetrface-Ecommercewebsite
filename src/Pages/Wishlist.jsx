import { useEffect, useState } from "react";
import { Heart, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/Wishlist.css";

function Wishlist() {
    const navigate = useNavigate();
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setWishlistItems(Array.isArray(saved) ? saved : []);
    }, []);

    const updateWishlist = (items) => {
        setWishlistItems(items);
        localStorage.setItem("wishlist", JSON.stringify(items));
        window.dispatchEvent(new Event("wishlistUpdated"));
    };

    const removeItem = (id, index) => {
        const updated = wishlistItems.filter((item, i) =>
            item.id ? item.id !== id : i !== index
        );
        updateWishlist(updated);
    };

    const addToCart = (item) => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const id = item.id || item.name?.toLowerCase().replace(/\s+/g, "-");
        const exist = cart.find((p) => p.id === id);
        const updatedCart = exist
            ? cart.map((p) =>
                p.id === id ? { ...p, qty: (p.qty || 1) + 1 } : p
            )
            : [...cart, { ...item, id, qty: 1, img: item.img || item.image }];

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    return (
        <section className="wishlist-page">
            <button
                className="wishlist-back"
                onClick={() => navigate("/")}
            >
                <ArrowLeft size={20} />
                Back to Home
            </button>

            <div className="wishlist-header">
                <div>
                    <h1>My Wishlist</h1>
                    <p>{wishlistItems.length} favorite products</p>
                </div>
                <Heart size={34} />
            </div>

            {wishlistItems.length === 0 ? (
                <div className="empty-wishlist">
                    <Heart size={60} />
                    <h2>Your wishlist is empty</h2>
                    <p>Add products you love by clicking the heart button.</p>
                    <button onClick={() => window.location.href = "/"}>
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div className="wishlist-grid">
                    {wishlistItems.map((item, index) => {
                        const id =
                            item.id ||
                            item.name?.toLowerCase().replace(/\s+/g, "-") ||
                            `wish-${index}`;

                        return (
                            <div className="wishlist-card" key={`${id}-${index}`}>
                                <a href={`/product/${id}`} className="wishlist-img">
                                    <img
                                        src={item.img || item.image}
                                        alt={item.name || "Product"}
                                    />
                                </a>

                                <div className="wishlist-body">
                                    <h3>{item.name || "Product"}</h3>
                                    <p className="wishlist-price">
                                        {typeof item.price === "number"
                                            ? `₹${item.price.toLocaleString("en-IN")}`
                                            : item.price}
                                    </p>
                                    <div className="wishlist-actions">
                                        <button
                                            className="wishlist-cart-btn"
                                            onClick={() => addToCart(item)}
                                        >
                                            <ShoppingCart size={17} />
                                            Add to Cart
                                        </button>
                                        <button
                                            className="wishlist-remove-btn"
                                            onClick={() => removeItem(item.id, index)}
                                        >
                                            <Trash2 size={17} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

export default Wishlist;