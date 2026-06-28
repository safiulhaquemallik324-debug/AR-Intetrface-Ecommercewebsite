import { useState } from "react";
import { useParams, useNavigate , NavLink } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Share2,
  ShoppingCart,
  Box,
  Star,
  ChevronRight,
  Link2,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faXTwitter, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { useWishlist } from "../hooks/useWishlist";
import "../styles/productdetails.css";
import { allProducts } from "../data/allProducts";
import { products as oldProducts } from "../data/product";

const colorOptions = [
  { name: "Yellow", hex: "#e8d5b0" },
  { name: "Grey", hex: "#b0b0b0" },
  { name: "Green", hex: "#6b7c5c" },
];

const allData = [...allProducts, ...oldProducts];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const product = allData.find(
    (p) =>
      String(p.id) === String(id) ||
      p.name?.toLowerCase().replace(/\s+/g, "-") === id
  );

  const [selectedColor, setSelectedColor] = useState(colorOptions[0].name);
  const [activeImg, setActiveImg] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="pd-not-found">
        <h2>Product not found</h2>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  const thumbs = [product.img, product.img];

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const exist = cart.find((p) => p.id === product.id);
    const updated = exist
      ? cart.map((p) =>
        p.id === product.id ? { ...p, qty: (p.qty || 1) + 1 } : p
      )
      : [...cart, { ...product, qty: 1 }];
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const toggleSection = (key) =>
    setOpenSection((prev) => (prev === key ? null : key));

  const shareLinks = [
    {
      label: "WhatsApp",
      icon: <FontAwesomeIcon icon={faWhatsapp} />,
      href: `https://wa.me/?text=${encodeURIComponent(product.name + " - ₹" + product.price + " " + window.location.href)}`,
    },
    {
      label: "Twitter / X",
      icon: <FontAwesomeIcon icon={faXTwitter} />,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(product.name)}&url=${encodeURIComponent(window.location.href)}`,
    },
    {
      label: "Facebook",
      icon: <FontAwesomeIcon icon={faFacebookF} />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
    },
    {
      label: "Copy Link",
      icon: <Link2 size={18} />,
      href: null,
      action: () => {
        navigator.clipboard.writeText(window.location.href);
        setShareOpen(false);
      },
    },
  ];

  return (
    <div className="pd-page">
      {/* BACK BTN */}
      <button className="pd-back" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
      </button>

      <div className="pd-layout">
        {/* LEFT — IMAGE */}
        <div className="pd-left">
          <div className="pd-main-img">
            <img src={thumbs[activeImg]} alt={product.name} />
          </div>

          <div className="pd-thumbs">
            {thumbs.map((src, i) => (
              <button
                key={i}
                className={`pd-thumb ${activeImg === i ? "active" : ""}`}
                onClick={() => setActiveImg(i)}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>

          <div className="pd-description">
            <h3>Description</h3>
            <p>
              Experience unmatched comfort and style with the {product.name}.
              Crafted with premium materials and modern design sensibility,
              this piece elevates any living space. Perfectly sized for
              contemporary homes with AR-verified dimensions so you know
              exactly how it fits before you buy.
            </p>
          </div>
        </div>

        {/* RIGHT — DETAILS */}
        <div className="pd-right">
          <div className="pd-title-row">
            <h1>{product.name}</h1>

            <div className="pd-action-btns">
              {/* SHARE */}
              <div className="pd-share-wrap">
                <button
                  className="pd-icon-btn"
                  onClick={() => setShareOpen((p) => !p)}
                >
                  <Share2 size={20} />
                </button>

                {shareOpen && (
                  <div className="pd-share-dropdown">
                    {shareLinks.map((s) =>
                      s.href ? (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => setShareOpen(false)}
                        >
                          {s.icon} {s.label}
                        </a>
                      ) : (
                        <button key={s.label} onClick={s.action}>
                          {s.icon} {s.label}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* WISHLIST */}
              <button
                className={`pd-icon-btn ${isWishlisted(product.id) ? "wishlisted" : ""}`}
                onClick={() => toggleWishlist(product)}
              >
                <Heart
                  size={20}
                  fill={isWishlisted(product.id) ? "#ef4444" : "none"}
                  color={isWishlisted(product.id) ? "#ef4444" : "currentColor"}
                />
              </button>
            </div>
          </div>

          {/* RATING */}
          <div className="pd-rating">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.floor(product.rating) ? "#f59e0b" : "none"}
                color={i < Math.floor(product.rating) ? "#f59e0b" : "#d1d5db"}
              />
            ))}
            <span>{product.rating} (120 reviews)</span>
          </div>

          {/* PRICE */}
          <div className="pd-price-row">
            <h2>₹{product.price.toLocaleString("en-IN")}</h2>
            {product.discount > 0 && (
              <span className="pd-badge">{product.discount}% Off</span>
            )}
          </div>
          <p className="pd-tax-note">Price incl. of all taxes</p>

          <hr className="pd-divider" />

          {/* COLOR */}
          <div className="pd-color-section">
            <div className="pd-color-label">
              <span>Choose colour</span>
              <ChevronRight size={18} />
            </div>
            <p className="pd-color-name">{selectedColor}</p>
            <div className="pd-colors">
              {colorOptions.map((c) => (
                <button
                  key={c.name}
                  className={`pd-color-btn ${selectedColor === c.name ? "active" : ""}`}
                  style={{ background: c.hex }}
                  onClick={() => setSelectedColor(c.name)}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          <hr className="pd-divider" />

          {/* CTA BUTTONS */}
          <div className="pd-cta">
            <NavLink to="/ar-viewer" className="pd-ar-btn">
              AR Try
            </NavLink>

            <button
              className={`pd-cart-btn ${added ? "added" : ""}`}
              onClick={addToCart}
            >
              <ShoppingCart size={20} />
              {added ? "Added!" : "Add to cart"}
            </button>
          </div>

          <hr className="pd-divider" />

          {/* ACCORDION SECTIONS */}
          {[
            { key: "details", label: "Product Details", content: `Category: ${product.category} | Rating: ${product.rating}★ | Discount: ${product.discount}%` },
            { key: "item", label: "Item Details", content: "Premium quality materials, easy assembly, 1 year manufacturer warranty included." },
            { key: "reviews", label: "Rating & Reviews", extra: `★ ${product.rating} based on 120 reviews`, content: "Customers love the build quality and modern design. Great value for money." },
          ].map(({ key, label, extra, content }) => (
            <div className="pd-accordion" key={key}>
              <button
                className="pd-accordion-head"
                onClick={() => toggleSection(key)}
              >
                <span>
                  {label}
                  {extra && <small>{extra}</small>}
                </span>
                <ChevronRight
                  size={18}
                  className={openSection === key ? "rotated" : ""}
                />
              </button>
              {openSection === key && (
                <div className="pd-accordion-body">{content}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}