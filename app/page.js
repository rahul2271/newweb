import Image from "next/image";

import HeroSection from './components/HeroSection';
// import ProductShowcase from './components/ProductShowcase';
// import SmoothBackgroundSection from './components/SmoothBackgroundSection';
import ProblemSolution from './components/ProblemSolution';
import ServicesSection from './components/ServicesSection';
import SuccessStories from "./components/SuccessStories";
import BoldStats from "./components/BoldStats";
import PortfolioItems from "./components/PortfolioItems"

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
</>
  );
}
