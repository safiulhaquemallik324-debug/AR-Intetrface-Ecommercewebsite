import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../styles/Offers.css";

const offerItems = [
  {
    id: 1,
    title: "Luxury Furniture Sale",
    discount: "Up to 45% OFF",
    text: "Premium sofas, chairs and tables with AR preview.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900",
  },
  {
    id: 2,
    title: "Fashion Week Deals",
    discount: "Flat 35% OFF",
    text: "Try clothes in AR before buying.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900",
  },
  {
    id: 3,
    title: "Sneaker Drop Offer",
    discount: "Buy 1 Get 20% OFF",
    text: "Explore trending shoes and footwear.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900",
  },
  {
    id: 4,
    title: "Accessories Combo",
    discount: "Combo Sale 30% OFF",
    text: "Watches, bags and lifestyle accessories.",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=900",
  },
];

export default function Offers() {
  const navigate = useNavigate();

  return (
    <section className="all-offers-page">
      <button className="all-offers-back" onClick={() => navigate("/")}>
        <ArrowLeft size={24} />
      </button>

      <div className="all-offers-header">
        <span>Special Offers</span>
        <h1>Best Deals For AR Shopping</h1>
        <p>
          Explore premium discounts on furniture, fashion, footwear and
          accessories with immersive 3D product preview.
        </p>
      </div>

      <div className="all-offers-hero">
        <div className="all-offers-hero-content">
          <span>Limited Time Deal</span>
          <h2>Transform Your Home With AR Furniture</h2>
          <p>
            Preview sofas, tables and decor in your room before placing an
            order.
          </p>
          <button>Shop Now →</button>
        </div>
      </div>

      <div className="all-offers-grid">
        {offerItems.map((item) => (
          <div className="all-offers-card" key={item.id}>
            <img src={item.image} alt={item.title} />

            <div className="all-offers-card-body">
              <span>{item.discount}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <button>Grab Offer</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}