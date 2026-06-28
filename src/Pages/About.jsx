import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/About.css";

export default function About() {

  const navigate = useNavigate();

  return (
    <section className="about-page">

      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={24} />
        <span>Back</span>
      </button>

      <div className="about-hero">
        <span className="about-tag">About ARShop</span>

        <h1>
          Shopping Experience Made Smarter With <span>AR Technology</span>
        </h1>

        <p>
          ARShop is a modern e-commerce platform where users can view products
          in 3D and try them in their real space before buying.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <h3>Our Mission</h3>
          <p>
            To help customers make better buying decisions using Augmented
            Reality and 3D product previews.
          </p>
        </div>

        <div className="about-card">
          <h3>Why ARShop?</h3>
          <p>
            Users can rotate, resize, move, and preview products before placing
            them in their room.
          </p>
        </div>

        <div className="about-card">
          <h3>What We Offer</h3>
          <p>
            Furniture, fashion, accessories, footwear, and smart AR-based
            shopping tools.
          </p>
        </div>
      </div>

      <div className="about-section">
        <div>
          <h2>Try Before You Buy</h2>
          <p>
            Traditional online shopping only shows flat images. ARShop lets users
            experience products in a realistic way using 3D models and AR view.
            This helps reduce confusion and improves confidence before purchase.
          </p>
        </div>

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900"
            alt="Modern Sofa"
          />
        </div>
      </div>
    </section>
  );
}