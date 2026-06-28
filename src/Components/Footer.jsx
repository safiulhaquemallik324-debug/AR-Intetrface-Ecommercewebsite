import {
    FaInstagram,
    FaFacebookF,
    FaXTwitter,
    FaYoutube,
    } from "react-icons/fa6";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>ARShop</h2>
          <p>
            Experience products in your real space before buying with smart AR shopping.
          </p>

          <div className="socials">
            <span><FaInstagram size={18} /></span>
            <span><FaFacebookF size={18} /></span>
            <span><FaXTwitter size={18} /></span>
            <span><FaYoutube size={18} /></span>
          </div>
        </div>

        <div className="footer-col">
          <h3>About</h3>
          <a>About ARShop</a>
          <a>Our Mission</a>
          <a>How AR Try Works</a>
          <a>Careers</a>
          <a>Blog</a>
        </div>

        <div className="footer-col">
          <h3>Support</h3>
          <a>Help Center</a>
          <a>Customer Support</a>
          <a>Return Policy</a>
          <a>Shipping Policy</a>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>

          <p><FaEnvelope size={16} /> support@arshop.com</p>
          <p><FaPhoneAlt size={16} /> +91 98765 43210</p>

          <div className="newsletter">
            <h4>Join Newsletter</h4>
            <div>
              <input type="email" placeholder="Your email" />
              <button>Join</button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 ARShop. All rights reserved.</p>

        <div>
          <a>Privacy Policy</a>
          <a>Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;