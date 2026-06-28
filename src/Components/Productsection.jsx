import { useMemo, useState } from "react";
import {
  SlidersHorizontal,
  Grid2X2,
  Tag,
  Star,
  TicketPercent,
  ChevronDown,
  ChevronUp,
  Heart,
  Box,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import "../styles/productsection.css";
import { products } from "../data/product";
import { useWishlist } from "../hooks/useWishlist";

const getPrice = (value) => {
  if (typeof value === "number") return value;
  return Number(String(value || 0).replace(/[₹,\s]/g, ""));
};

const makeId = (item) => item.id || item.name?.toLowerCase().replace(/\s+/g, "-");

const categories = [
  "All Categories",
  "Sofa & Seating",
  "Tables",
  "Beds",
  "Storage",
  "Decor",
  "Lighting",
];

function ProductSection() {
  const [open, setOpen] = useState({
    category: true,
    price: true,
    rating: true,
    discount: true,
  });

  const [category, setCategory] = useState("All Categories");
  const [maxPrice, setMaxPrice] = useState(14000);
  const [rating, setRating] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [sort, setSort] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 8;

  const addToCart = (item) => {
    const id = makeId(item);
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((p) => p.id === id);

    const cartProduct = {
      id,
      name: item.name,
      price: getPrice(item.price),
      oldPrice: getPrice(item.oldPrice || item.price),
      img: item.img || item.image,
      discount: item.discount || 0,
      rating: item.rating || 0,
      qty: 1,
    };

    const updatedCart = existing
      ? cart.map((p) =>
        p.id === id ? { ...p, qty: (p.qty || 1) + 1 } : p
      )
      : [...cart, cartProduct];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const addToWishlist = (item) => {
    const id = makeId(item);
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const existing = wishlist.find((p) => p.id === id);

    if (existing) return;

    const wishlistProduct = {
      id,
      name: item.name,
      price: item.price,
      oldPrice: item.oldPrice || item.price,
      img: item.img || item.image,
      discount: item.discount || 0,
      rating: item.rating || 0,
    };

    localStorage.setItem(
      "wishlist",
      JSON.stringify([...wishlist, wishlistProduct])
    );

    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const toggle = (key) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const clearAll = () => {
    setCategory("All Categories");
    setMaxPrice(14000);
    setRating(0);
    setDiscount(0);
    setSort("newest");
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    let data = products.filter((item) => {
      const categoryMatch =
        category === "All Categories" || item.category === category;

      return (
        categoryMatch &&
        getPrice(item.price) <= maxPrice &&
        Number(item.rating || 0) >= rating &&
        Number(item.discount || 0) >= discount
      );
    });

    if (sort === "low") {
      data.sort((a, b) => getPrice(a.price) - getPrice(b.price));
    }

    if (sort === "high") {
      data.sort((a, b) => getPrice(b.price) - getPrice(a.price));
    }

    if (sort === "rating") {
      data.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
    }

    if (sort === "discount") {
      data.sort((a, b) => Number(b.discount || 0) - Number(a.discount || 0));
    }

    return data;
  }, [category, maxPrice, rating, discount, sort]);

  const totalPages = Math.ceil(filteredProducts.length / perPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const { isWishlisted, toggleWishlist } = useWishlist();

  return (
    <section className="product-shop-section">
      <aside className="filter-sidebar">
        <div className="filter-header">
          <div>
            <SlidersHorizontal size={24} />
            <h2>Filters</h2>
          </div>
          <button onClick={clearAll}>Clear All</button>
        </div>

        <div className="filter-block">
          <div className="filter-title" onClick={() => toggle("category")}>
            <span>
              <Grid2X2 size={18} /> CATEGORY
            </span>
            {open.category ? <ChevronUp /> : <ChevronDown />}
          </div>

          {open.category && (
            <div className="filter-content">
              {categories.map((cat) => (
                <label className="check-row" key={cat}>
                  <input
                    type="radio"
                    name="category"
                    checked={category === cat}
                    onChange={() => {
                      setCategory(cat);
                      setCurrentPage(1);
                    }}
                  />
                  <span>{cat}</span>
                  <small>
                    {cat === "All Categories"
                      ? products.length
                      : products.filter((p) => p.category === cat).length}
                  </small>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="filter-block">
          <div className="filter-title" onClick={() => toggle("price")}>
            <span>
              <Tag size={18} /> PRICE RANGE
            </span>
            {open.price ? <ChevronUp /> : <ChevronDown />}
          </div>

          {open.price && (
            <div className="filter-content">
              <h3>₹100 - ₹{maxPrice.toLocaleString("en-IN")}+</h3>

              <input
                className="price-slider"
                type="range"
                min="100"
                max="14000"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
              />

              <div className="price-labels">
                <span>₹100</span>
                <span>₹14,000+</span>
              </div>
            </div>
          )}
        </div>

        <div className="filter-block">
          <div className="filter-title" onClick={() => toggle("rating")}>
            <span>
              <Star size={18} /> RATING
            </span>
            {open.rating ? <ChevronUp /> : <ChevronDown />}
          </div>

          {open.rating && (
            <div className="filter-content">
              {[0, 5, 4, 3, 2].map((rate) => (
                <label className="check-row" key={rate}>
                  <input
                    type="radio"
                    name="rating"
                    checked={rating === rate}
                    onChange={() => {
                      setRating(rate);
                      setCurrentPage(1);
                    }}
                  />
                  <span>
                    {rate === 0
                      ? "All Ratings"
                      : "★".repeat(rate) +
                      "☆".repeat(5 - rate) +
                      " & above"}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="filter-block">
          <div className="filter-title" onClick={() => toggle("discount")}>
            <span>
              <TicketPercent size={18} /> DEALS & DISCOUNT
            </span>
            {open.discount ? <ChevronUp /> : <ChevronDown />}
          </div>

          {open.discount && (
            <div className="filter-content">
              {[0, 10, 20, 30, 50].map((dis) => (
                <label className="check-row" key={dis}>
                  <input
                    type="radio"
                    name="discount"
                    checked={discount === dis}
                    onChange={() => {
                      setDiscount(dis);
                      setCurrentPage(1);
                    }}
                  />
                  <span>{dis === 0 ? "All Deals" : `${dis}% and above`}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </aside>

      <div className="product-list-area">
        <div className="product-toolbar">
          <p>
            Showing {paginatedProducts.length} of {filteredProducts.length} products
          </p>

          <div className="sort-box">
            <span>Sort by:</span>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="newest">Newest First</option>
              <option value="low">Price Low to High</option>
              <option value="high">Price High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="discount">Best Discount</option>
            </select>
          </div>
        </div>

        <div className="product-list-grid">
          {paginatedProducts.map((item, index) => {
            const id = makeId(item);

            return (
              <div className="shop-product-card" key={id || `product-${index}`}>
                {item.discount > 0 && (
                  <div className="discount-badge">-{item.discount}%</div>
                )}

                <button
                  className={`wish-btn ${isWishlisted(id) ? "wishlisted" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(item);
                  }}
                >
                  <Heart size={20} fill={isWishlisted(id) ? "#ef4444" : "none"} color={isWishlisted(id) ? "#ef4444" : "currentColor"} />
                </button>

                <NavLink to={`/product/${id}`}>
                  <img src={item.img || item.image} alt={item.name} />
                </NavLink>

                <div className="shop-product-body">
                  <h3>{item.name}</h3>

                  <div className="price-row">
                    <strong>
                      ₹{getPrice(item.price).toLocaleString("en-IN")}
                    </strong>
                    <del>
                      ₹
                      {getPrice(item.oldPrice || item.price).toLocaleString(
                        "en-IN"
                      )}
                    </del>
                  </div>

                  <div className="info">
                    <div className="rating-row">
                      <span>
                        {"★".repeat(Number(item.rating || 0))}
                        {"☆".repeat(5 - Number(item.rating || 0))}
                      </span>
                      <small>({Math.floor(Math.random() * 180) + 30})</small>
                    </div>

                    <NavLink to={`/product/${id}`} className="details-btn">
                      See Details
                    </NavLink>
                  </div>

                  <div className="btns">
                    <NavLink to="/ar-viewer" className="ar-view-btn">
                      <Box size={17} />
                      View in AR
                    </NavLink>

                    <button
                      className="add-cart-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(item);
                      }}
                    >
                      <ShoppingCart size={17} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={`page-${i + 1}`}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductSection;