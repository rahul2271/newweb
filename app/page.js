import Image from "next/image";
import Head from "next/head";
import HeroSection from './components/HeroSection';
// import ProductShowcase from './components/ProductShowcase';
// import SmoothBackgroundSection from './components/SmoothBackgroundSection';
import ProblemSolution from './components/ProblemSolution';
// import ServicesSection from './components/ServicesSection';
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
// import Timeline from "./components/Timeline";
// import ProjectTracker from "./components/project-tracker";
// import JourneyMap from './components/JourneyMap';
// import ContactSection from "./components/ContactSection";
// import ResourcesPage from './resources/page';
import WebinarList from "./webinars/page";
// import ChatGPTSection from "./components/Gpt";
// import SEO from "./components/seo";
import Quiz from "./components/Quiz";
import Capabilities from "./components/capabilities";
import BrandsSection from "./components/TrustedBrands";






export default function Home() {
  return (
<>
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
/>
{/* <CursorEffect/> */}
<HeroSection/>
<BrandsSection/>
<ProblemSolution/>

<div className="bg-gradient-to-r from-purple-100 to-white"><Quiz /></div>
        
     
{/* <SEO/> */}
{/* <ChatGPTSection/> */}
{/* <ResourcesPage/> */}
<Capabilities/>
{/* <ServicesSection/> */}
{/* <SmoothBackgroundSection/> */}
{/* <ProductShowcase/> */}
{/* <Timeline/> */}
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
