import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../styles/Category.css";

const categories = [
  {
    id: 1,
    title: "Furniture",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
  },

  {
    id: 2,
    title: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
  },

  {
    id: 3,
    title: "Accessories",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800",
  },

  {
    id: 4,
    title: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
  },

  {
    id: 5,
    title: "Watches",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800",
  },

  {
    id: 6,
    title: "Bags",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800",
  },

  {
    id: 7,
    title: "Lighting",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
  },

  {
    id: 8,
    title: "Decor",
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800",
  },
];

export default function Category() {

  const navigate = useNavigate();

  return (

    <section className="all-category-page">

    <button
    className="all-category-back"
    onClick={() => navigate("/")}
    >
    <ArrowLeft size={24}/>
    </button>
    
    <div className="all-category-header">
    
    <span>Shop By Category</span>
    
    <h1>Explore Our Product Categories</h1>
    
    <p>
    Discover furniture, fashion,
    accessories and many more products.
    </p>
    
    </div>
    
    
    <div className="all-category-grid">
    
    {categories.map((item)=>(
    
    <div className="all-category-card" key={item.id}>
    
    <img src={item.image} alt={item.title}/>
    
    <div className="all-category-overlay">
    
    <h3>{item.title}</h3>
    
    <button>
    Explore →
    </button>
    
    </div>
    
    </div>
    
    ))}
    
    </div>
    
    </section>
  );
}