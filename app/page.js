import Image from "next/image";

import HeroSection from './components/HeroSection';
// import ProductShowcase from './components/ProductShowcase';
// import SmoothBackgroundSection from './components/SmoothBackgroundSection';
import ProblemSolution from './components/ProblemSolution';
import ServicesSection from './components/ServicesSection';
import SuccessStories from "./components/SuccessStories";
import BoldStats from "./components/BoldStats";
import PortfolioItems from "./components/PortfolioItems"
import CTASection from "./components/CTASection";
import ValueProposition from "./components/ValueProposition";
import FAQSection from "./components/FAQSection";
import DownloadResourceSection from "./components/DownloadResourceSection";
import TestimonialsSection from "./components/TestimonialsSection";
import BlogSection from "./components/BlogSection";
import Chatbot from "./components/Chatbot";
// import ContactSection from "./components/ContactSection";


export default function Home() {
  return (
<>
<HeroSection/>
{/* <SmoothBackgroundSection/> */}
{/* <ProductShowcase/> */}
<ProblemSolution/>
<ServicesSection/>
<SuccessStories/>
<BoldStats/>
<PortfolioItems/>
<CTASection/>
<ValueProposition/>
<FAQSection/>
<DownloadResourceSection/>
<TestimonialsSection/>
<BlogSection/>
<Chatbot/>
{/* <ContactSection/> */}
</>
  );
}
