import { useEffect, useState } from "react";
import {
    MapPin,
    Search,
    Heart,
    ShoppingCart,
    User,
    ChevronDown,
    Menu,
    X,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
        const updateCounts = () => {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

            setCartCount(cart.length);
            setWishlistCount(wishlist.length);
        };

        updateCounts();

        window.addEventListener("cartUpdated", updateCounts);
        window.addEventListener("wishlistUpdated", updateCounts);

        return () => {
            window.removeEventListener("cartUpdated", updateCounts);
            window.removeEventListener("wishlistUpdated", updateCounts);
        };
    }, []);

    const closeMenu = () => setOpenMenu(false);

    return (
        <header className="navbar">
            <div className="topbar">
                <div className="location">
                    <MapPin size={15} />
                    Kolkata, India
                </div>

                <div className="language-select">
                    <select>
                        <option>ENG</option>
                        <option>বাংলা</option>
                        <option>हिंदी</option>
                    </select>
                    <ChevronDown size={14} />
                </div>
            </div>

            <div className="nav-container">
                <button className="hamburger" onClick={() => setOpenMenu(!openMenu)}>
                    {openMenu ? <X size={26} /> : <Menu size={26} />}
                </button>

                <NavLink to="/" className="logo" onClick={closeMenu}>
                    AR<span className="blue">Shop</span>
                </NavLink>

                <nav className={`menu ${openMenu ? "show-menu" : ""}`}>
                    <NavLink to="/" onClick={closeMenu}>
                        Home
                    </NavLink>

                    <NavLink to="/category" onClick={closeMenu}>
                        Category
                    </NavLink>

                    <NavLink to="/offers" onClick={closeMenu}>
                        Offers
                    </NavLink>

                    <NavLink to="/ar-viewer" className="try-ar-btn" onClick={closeMenu}>
                        AR Try
                    </NavLink>

                    <NavLink to="/about" onClick={closeMenu}>
                        About
                    </NavLink>
                </nav>

                <div className="search-box">
                    <Search size={18} />

                    <input type="text" placeholder="Search products..." />
                </div>

                <div className="icons">
                    <NavLink to="/wishlist" className="icon-btn nav-icon-wrap">
                        <Heart size={22} />

                        {wishlistCount > 0 && (
                            <span className="nav-count">{wishlistCount}</span>
                        )}
                    </NavLink>

                    <NavLink to="/cart" className="icon-btn nav-icon-wrap">
                        <ShoppingCart size={22} />

                        {cartCount > 0 && <span className="nav-count">{cartCount}</span>}
                    </NavLink>

                    <div className="icon-btn login">
                        <User size={20} />
                        <span>Login</span>
                    </div>
                </div>
            </div>
        </header>
    );
}