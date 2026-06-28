import { useRef } from "react";
import {
    Heart,
    Share2,
    ArrowRight,
    BadgePercent,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import "../styles/offersdeals.css";
import { deals, products } from "../data/offersDealsData";
import { useWishlist } from "../hooks/useWishlist";

export default function OffersDeals() {

    const { isWishlisted, toggleWishlist } = useWishlist();
    const productRef = useRef(null);

    const scrollLeft = () => {
        productRef.current?.scrollBy({ left: -350, behavior: "smooth" });
    };

    const scrollRight = () => {
        productRef.current?.scrollBy({ left: 350, behavior: "smooth" });
    };

    const getNumberPrice = (price) => {
        if (typeof price === "number") return price;
        return Number(String(price || 0).replace(/[₹,\s]/g, ""));
    };

    const makeId = (item) => {
        return (
            item.id ||
            item.name?.toLowerCase().replace(/\s+/g, "-")
        );
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
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

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

    return (
        <>
            <section className="offers-section">
                <div className="section-head">
                    <h2>Offers & Deals</h2>

                    <a href="#">
                        See all deals <ArrowRight size={18} />
                    </a>
                </div>

                <div className="hero-deals">
                    <div className="big-deal furniture">
                        <div className="big-content">
                            <span className="flash-badge">FLASH SALE — ENDS SOON</span>

                            <h3>Furniture Clearance Sales</h3>

                            <p>
                                Upgrade Your Space With AR-Verified Furniture At Unbeatable Prices
                            </p>

                            <h1>
                                UP TO
                                <br />
                                <span className="discount-yellow">40%</span> OFF
                            </h1>

                            <NavLink to="/ar-viewer" className="Shop-AR-btn">Shop & Try In AR</NavLink>
                        </div>
                    </div>

                    <div className="big-deal fashion">
                        <div className="big-content-two">
                            <span>NEW SEASON DROPS</span>

                            <h3>Fashion & Footwear Mega Event</h3>

                            <p>From Sneakers To Shirts — Try Them In AR Before You Buy</p>

                            <h1>
                                UP TO
                                <br />
                                20% OFF
                            </h1>

                            <NavLink to="/offers" className= "Explore-btn"> Explore Collection</NavLink>
                        </div>
                    </div>
                </div>

                <div className="small-deals">
                    {deals.map((deal, index) => (
                        <div
                            className={`deal-card ${deal.cls}`}
                            key={deal.id || `deal-${index}`}
                        >
                            <div className="deal-icon">{deal.icon}</div>

                            <h2>{deal.title}</h2>
                            <h4>{deal.sub}</h4>
                            <p>{deal.text}</p>

                            <button>
                                {deal.btn}
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <section className="trending-section">
                <div className="section-head">
                    <h2>
                        Trending & Best Sellers
                        <BadgePercent className="sale-icon" size={26} />
                    </h2>
                </div>

                <div className="tabs">
                    <button className="active">Best Sellers</button>
                    <button>New Arrivals</button>
                    <button>Top Rated</button>
                </div>

                <div className="product-slider-wrap">
                    <button className="arrow-btn left-arrow" onClick={scrollLeft}>
                        ❮
                    </button>

                    <div className="product-grid-two" ref={productRef}>
                        {products.map((p, index) => {
                            const id = makeId(p);

                            return (
                                <div className="product-card" key={id || `product-${index}`}>
                                    <div className="product-img">
                                        <NavLink to={`/product/${id}`} className="img-link">
                                            <img src={p.img || p.image} alt={p.name} />
                                        </NavLink>

                                        <button
                                            className={`wish-btn ${isWishlisted(makeId(p)) ? "wishlisted" : ""}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                toggleWishlist(p);
                                            }}
                                        >
                                            <Heart size={20} fill={isWishlisted(makeId(p)) ? "#ef4444" : "none"} color={isWishlisted(makeId(p)) ? "#ef4444" : "currentColor"} />
                                        </button>

                                        <button className="share">
                                            <Share2 size={20} />
                                        </button>
                                    </div>

                                    <h4>{p.name}</h4>
                                    <h3>{p.price}</h3>

                                    <div className="rating">
                                        <span>★★★☆☆</span>
                                        <p>3.5 (12k reviews)</p>
                                    </div>

                                    <NavLink to={`/product/${id}`} className="details">
                                        See Details
                                    </NavLink>

                                    <div className="product-detail-btn">
                                        <button  className="ADD-cart" onClick={() => addToCart(p)}>Add to Cart</button>
                                        <NavLink to="/ar-viewer"className="ar-btn">Try In AR</NavLink>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <button className="arrow-btn right-arrow" onClick={scrollRight}>
                        ❯
                    </button>
                </div>
            </section>
        </>
    );
}