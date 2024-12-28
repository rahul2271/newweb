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
// import FAQSection from "./components/FAQSection";
import DownloadResourceSection from "./components/DownloadResourceSection";
import FaqSection from "./components/FAQSection";
import BlogSection from "./components/BlogSection";
import Chatbot from "./components/Chatbot";
import Timeline from "./components/Timeline";
// import ProjectTracker from "./components/project-tracker";
// import JourneyMap from './components/JourneyMap';
// import ContactSection from "./components/ContactSection";
// import ResourcesPage from './resources/page';
import WebinarList from "./webinars/page";



export default function Home() {
  return (
<>
<HeroSection/>
{/* <ResourcesPage/> */}
<ProblemSolution/>
<ServicesSection/>
{/* <SmoothBackgroundSection/> */}
{/* <ProductShowcase/> */}
<Timeline/>
{/* <JourneyMap/> */}
{/* <ProjectTracker/> */}
<ValueProposition/>
<DownloadResourceSection/>



<BoldStats/>

<SuccessStories/>
<PortfolioItems/>
<CTASection/>

<FaqSection/>
{/* <FAQSection/> */}
<BlogSection/>

<WebinarList/>
<Chatbot/>
{/* <ContactSection/> */}
</>
  );
}
