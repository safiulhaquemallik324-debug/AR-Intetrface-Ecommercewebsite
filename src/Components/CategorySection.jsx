import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { categories } from "../data/categories";

export default function CategorySection() {
  return (
    <section className="category-section">

      <div className="category-header">

        <h2>Shop By Category</h2>

        <NavLink to="/category" className="view-all-btn">
          View all
          <ArrowRight size={18} />
        </NavLink>

      </div>

      <div className="category-grid">

        {categories.map((item) => (

          <div className="category-card" key={item.id}>

            <img
              src={item.image}
              alt={item.name}
            />

            <p>{item.name}</p>

          </div>

        ))}

      </div>

    </section>
  );
}