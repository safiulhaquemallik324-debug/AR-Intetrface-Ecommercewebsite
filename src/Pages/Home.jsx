import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import CategorySection from "../Components/CategorySection";
import ProductSection from "../Components/Productsection";
import OffersDeals from "../Components/OfferSection";
import RecommendedProducts from "../Components/RecommendedProducts";
import WhyAR from "../Components/WhyAR";
import Footer from "../Components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <CategorySection />
      <ProductSection />
      <OffersDeals />
      <RecommendedProducts />
      <WhyAR />
      <Footer/>
    </>
  );
}