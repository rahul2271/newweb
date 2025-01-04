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
// import Quiz from "./components/Quiz";
import Capabilities from "./components/capabilities";




export default function Home() {
  return (
<>
{/* <CursorEffect/> */}
<HeroSection/>
{/*<div className="min-h-screen bg-gray-100 py-10">

      
      <main className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg">
        <h1 className="text-3xl font-semibold text-center text-purple-600">Find Your Perfect Service</h1>
        <p className="text-center text-gray-600 mt-4">
          Answer a few questions, and we’ll recommend the best solutions for you!
        </p>

        
        <Quiz />
      </main>
    </div> */}
{/* <SEO/> */}
{/* <ChatGPTSection/> */}
{/* <ResourcesPage/> */}
<Capabilities/>
<ProblemSolution/>
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
