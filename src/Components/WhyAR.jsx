import { Box, Scan, ShoppingBasket, Home, ArrowRight } from "lucide-react";
import "../styles/WhyAR.css";
import { NavLink } from "react-router-dom";

function WhyAR() {
  const whyCards = [
    { icon: <Box />, title: "Try Before You Buy", text: "See products in your real space" },
    { icon: <Scan />, title: "Real Size Preview", text: "Check exact size & Fit" },
    { icon: <ShoppingBasket />, title: "Better Decisions", text: "Avoid wrong Purchase" },
  ];

  const steps = [
    { icon: <Box />, title: "Select a product", text: "Choose the item you want to try in your space" },
    { icon: <Scan />, title: "Try in AR", text: "Open your camera to start AR view" },
    { icon: <Home />, title: "place in your room or anywhere", text: "Rotate , resize & view from all angles" },
  ];

  return (
    <>
      <section className="why-ar">
        <h2>Why use <span>AR</span> Shopping</h2>

        <div className="why-grid">
          {whyCards.map((card, index) => (
            <div className="why-card" key={index}>
              <div className="ar-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="how-ar">
        <h2>How <span>AR</span> Works</h2>

        <div className="how-grid">
          {steps.map((step, index) => (
            <div className="how-card" key={index}>
              <div className="ar-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>

        <NavLink to="/ar-viewer" className="try-btn">
          TRY NOW <ArrowRight size={22} />
        </NavLink>
      </section>
    </>
  );
}

export default WhyAR;