import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@google/model-viewer";
import html2canvas from "html2canvas";

import {
  ArrowLeft,
  Bookmark,
  Share2,
  Heart,
  RotateCw,
  Move,
  Scissors,
} from "lucide-react";

import "../styles/ARViewer.css";

export default function ARViewer() {
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const modelRef = useRef(null);

  const product = {
    id: "sofa-01",
    name: "Fior Modern 3-Seater Sofa",
    price: 24999,
    image: "/models/sofa.glb",
  };

  const [scale, setScale] = useState(1);
  const [moveX, setMoveX] = useState(0);
  const [moveY, setMoveY] = useState(0);

  const [liked, setLiked] = useState(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    return wishlist.some((item) => item.id === product.id);
  });

  const handleRotate = () => {
    const model = modelRef.current;
    if (!model) return;

    const orbit = model.getCameraOrbit();
    model.cameraOrbit = `${orbit.theta + Math.PI / 4}rad ${orbit.phi}rad ${orbit.radius}m`;
  };

  const handleResize = () => {
    setScale((prev) => (prev >= 1.6 ? 1 : prev + 0.2));
  };

  const handleMove = () => {
    setMoveX((prev) => (prev >= 80 ? 0 : prev + 40));
    setMoveY((prev) => (prev >= 40 ? 0 : prev + 20));
  };

  const handleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((item) => item.id === product.id);

    let updatedWishlist;

    if (exists) {
      updatedWishlist = wishlist.filter((item) => item.id !== product.id);
      setLiked(false);
    } else {
      updatedWishlist = [...wishlist, product];
      setLiked(true);
    }

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `${product.name} - ₹${product.price}`,
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  };

  const handleScreenshot = async () => {
    const canvas = await html2canvas(pageRef.current, {
      useCORS: true,
      backgroundColor: null,
    });

    const link = document.createElement("a");
    link.download = "ar-product-screenshot.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="ar-viewer-page" ref={pageRef}>
      <model-viewer
        ref={modelRef}
        src={`${import.meta.env.BASE_URL}models/sofa.glb`}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        shadow-intensity="1"
        exposure="1"
        class="ar-model"
        style={{
          transform: `translate(${moveX}px, ${moveY}px) scale(${scale})`,
        }}
      />

      <button className="ar-back-btn" onClick={() => navigate("/")}>
        <ArrowLeft size={30} />
      </button>

      <div className="top-actions">
        <button>
          <Bookmark size={24} />
        </button>

        <button onClick={handleShare}>
          <Share2 size={24} />
        </button>

        <button
          onClick={handleWishlist}
          className={`heart-btn ${liked ? "liked" : ""}`}
        >
          <Heart
            size={26}
            fill={liked ? "#e11d48" : "none"}
            stroke={liked ? "#e11d48" : "#111"}
          />
        </button>
      </div>

      <div className="side-tools">
        <div className="tool-item">
          <button onClick={handleRotate}>
            <RotateCw size={34} />
          </button>
          <span>Rotate</span>
        </div>

        <div className="tool-item">
          <button onClick={handleResize}>↔</button>
          <span>Resize</span>
        </div>

        <div className="tool-item">
          <button onClick={handleMove}>
            <Move size={34} />
          </button>
          <span>Move</span>
        </div>

        <div className="tool-item">
          <button onClick={handleScreenshot}>
            <Scissors size={34} />
          </button>
          <span>Screenshot</span>
        </div>
      </div>

      <div className="product-info">
        <h1>Fior Modern 3-Seater Sofa</h1>

        <div className="ar-rating">
          <span>★★★★★</span>
          <p>4.5 (120 reviews)</p>
        </div>

        <div className="ar-price-row">
          <h2>₹24,999</h2>
          <span>17 % Off</span>
        </div>

        <p className="tax">Price incl. of all taxes</p>

        <button className="ar-product-details-btn">
          View Product details <span>→</span>
        </button>
      </div>
    </div>
  );
}