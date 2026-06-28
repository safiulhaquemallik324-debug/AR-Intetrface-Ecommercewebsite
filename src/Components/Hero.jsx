import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Box } from "lucide-react";
import { heroSlides } from "../data/heroSlides";
import { useNavigate,NavLink } from "react-router-dom";

const getPrice = (value) => {
  if (typeof value === "number") return value;
  return Number(String(value || 0).replace(/[₹,\s]/g, ""));
};

export default function Hero() {

  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const slide = heroSlides[index];

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItem = {
      id: slide.id || slide.title,
      name: slide.title,
      img: slide.image,
      price: getPrice(slide.price),
      oldPrice: getPrice(slide.oldPrice || slide.price),
      rating: slide.rating || 0,
      discount: slide.discount || 0,
      qty: 1,
    };

    const existing = cart.find((item) => item.id === cartItem.id);

    const updatedCart = existing
      ? cart.map((item) =>
          item.id === cartItem.id
            ? { ...item, qty: (item.qty || 1) + 1 }
            : item
        )
      : [...cart, cartItem];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const nextSlide = () => {
    setIndex(index === heroSlides.length - 1 ? 0 : index + 1);
  };

  const prevSlide = () => {
    setIndex(index === 0 ? heroSlides.length - 1 : index - 1);
  };

  return (
    <section className="hero" style={{ background: slide.bg }}>
      <button className="hero-arrow hero-left" onClick={prevSlide}>
        <ChevronLeft size={38} />
      </button>

      <div className="hero-content">
        <div className="hero-text">
          <h1>{slide.title}</h1>
          <p>{slide.subtitle}</p>

          <div className="hero-rating">
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={22}
                  fill={star <= Math.round(slide.rating) ? "#facc15" : "none"}
                  color="#facc15"
                />
              ))}
            </div>

            <span>
              {slide.rating} ({slide.reviews} reviews)
            </span>
          </div>

          <div className="hero-price">
            ₹{slide.price}
            <span>{slide.discount}% Off</span>
          </div>

          <div className="hero-buttons">
            <button className="cart-btn" onClick={addToCart}>
              Add to Cart
            </button>

            <NavLink to="/ar-viewer" className="ar-btn-one">
              <span>
              <Box size={17} />
              </span>
              Try In AR
            </NavLink>
          </div>
        </div>

        <div className="hero-image">
          <img src={slide.image}   onClick={() => navigate(`/product/${slide.id}`)}/>
        </div>
      </div>

      <button className="hero-arrow hero-right" onClick={nextSlide}>
        <ChevronRight size={38} />
      </button>

      <div className="hero-dots">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={i === index ? "dot active-dot" : "dot"}
          ></button>
        ))}
      </div>
    </section>
  );
}