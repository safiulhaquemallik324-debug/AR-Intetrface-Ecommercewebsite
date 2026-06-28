import { useRef } from "react";
import { Heart, Share2, ShoppingCart, ArrowRight } from "lucide-react";
import { recommendedProducts } from "../data/RecommendedProducts";
import { NavLink } from "react-router-dom";
import { useWishlist } from "../hooks/useWishlist";

export default function RecommendedProducts() {
  const recommendRef = useRef(null);

  const scrollLeft = () => {
    recommendRef.current?.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    recommendRef.current?.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  const getNumberPrice = (price) => {
    if (typeof price === "number") return price;
    return Number(String(price || 0).replace(/[₹,\s]/g, ""));
  };

  const addToCart = (product) => {
    const oldCart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartProduct = {
      ...product,
      price: getNumberPrice(product.price),
      oldPrice: getNumberPrice(product.oldPrice || product.price),
      img: product.img || product.image,
      qty: 1,
    };

    const exist = oldCart.find((item) => item.id === cartProduct.id);

    const updatedCart = exist
      ? oldCart.map((item) =>
        item.id === cartProduct.id
          ? { ...item, qty: (item.qty || 1) + 1 }
          : item
      )
      : [...oldCart, cartProduct];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const addToWishlist = (product) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    const wishlistProduct = {
      ...product,
      img: product.img || product.image,
      price: product.price,
      oldPrice: product.oldPrice || product.price,
    };

    const exist = wishlist.find((item) => item.id === wishlistProduct.id);

    if (exist) return;

    localStorage.setItem(
      "wishlist",
      JSON.stringify([...wishlist, wishlistProduct])
    );

    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const { isWishlisted, toggleWishlist } = useWishlist();

  return (
    <section className="recommend-section">
      <div className="section-head">
        <h2>You May Also Like</h2>

        <a href="#">
          View all <ArrowRight size={18} />
        </a>
      </div>

      <div className="recommend-wrapper">
        <button className="recommend-arrow left" onClick={scrollLeft}>
          ❮
        </button>

        <div className="recommend-grid" ref={recommendRef}>
          {recommendedProducts.map((p, index) => (
            <div className="recommend-card" key={p.id || `recommend-${index}`}>
              <NavLink to={`/product/${p.id}`} className="recommend-img">
                <img src={p.img} alt={p.name} />

                <button
                  className={`heart ${isWishlisted(p.id) ? "wishlisted" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(p);
                  }}
                >
                  <Heart size={22} fill={isWishlisted(p.id) ? "#ef4444" : "none"} color={isWishlisted(p.id) ? "#ef4444" : "currentColor"} />
                </button>
              </NavLink>

              <div className="recommend-body">
                <div className="title-row">
                  <h4>{p.name}</h4>

                  <button className="share-small">
                    <Share2 size={18} />
                  </button>
                </div>

                <div className="price-row">
                  <h3>{p.price}</h3>
                  <span>{p.discount}</span>
                </div>

                <div className="rating-row">
                  <span className="stars">★★★☆☆</span>

                  <p>
                    {p.rating} ({p.reviews} reviews)
                  </p>
                </div>

                <NavLink to={`/product/${p.id}`} className="details-link">
                  See Details
                </NavLink>

                <div className="product-detail-btn-two">
                  <button className="add-to-cart-btn" onClick={() => addToCart(p)}>
                    Add to Cart
                    <ShoppingCart size={16} />
                  </button>

                  <NavLink to="/ar-viewer" className="ar-btn-three">Try In AR</NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="recommend-arrow right" onClick={scrollRight}>
          ❯
        </button>
      </div>
    </section>
  );
}