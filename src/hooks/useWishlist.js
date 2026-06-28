import { useState, useEffect } from "react";

export function useWishlist() {
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist") || "[]");
  });

  useEffect(() => {
    const sync = () => {
      setWishlist(JSON.parse(localStorage.getItem("wishlist") || "[]"));
    };
    window.addEventListener("wishlistUpdated", sync);
    return () => window.removeEventListener("wishlistUpdated", sync);
  }, []);

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  const toggleWishlist = (product) => {
    const id = product.id || product.name?.toLowerCase().replace(/\s+/g, "-");
    const current = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const exists = current.find((item) => item.id === id);

    const updated = exists
      ? current.filter((item) => item.id !== id)
      : [...current, { ...product, id, img: product.img || product.image }];

    localStorage.setItem("wishlist", JSON.stringify(updated));
    setWishlist(updated);
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  return { wishlist, isWishlisted, toggleWishlist };
}