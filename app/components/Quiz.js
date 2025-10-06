"use client"
import { useState, useEffect } from "react";
import { FaRegEdit, FaCog, FaLaptop, FaUsers, FaRocket, FaStore, FaSignInAlt, FaChartLine, FaBox, FaRegLightbulb } from "react-icons/fa";
import { useRouter } from "next/navigation";
export default function Quiz() {
  const [step, setStep] = useState("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    businessType: "",
    businessNeeds: "",
    website: "",
    satisfaction: "",
    focus: "",
    socialMedia: "",
    paidAds: "",
    branding: "",
    digitalMarketing: "",
    targetAudience: "",
    ecommerce: "",
    biggestChallenge: "",
  });
  const [quizAnswers, setQuizAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    { question: "What is the main goal you are trying to achieve with your business right now?", key: "businessNeeds", options: ["Increase sales", "Improve brand recognition", "Improve online presence", "Generate more leads", "Other"], icon: <FaChartLine /> },
    { question: "How would you describe your business?", key: "businessType", options: ["Retail", "Technology", "Healthcare", "Education", "Professional Services", "Other"], icon: <FaStore /> },
    { question: "Do you currently have a website for your business?", key: "website", options: ["Yes", "No"], icon: <FaLaptop /> },
    { question: "If you have a website, how satisfied are you with its current performance?", key: "satisfaction", options: ["Very satisfied", "Somewhat satisfied", "Not satisfied", "I don’t have a website"], icon: <FaRegEdit /> },
    { question: "What is your primary focus at the moment?", key: "focus", options: ["Increase online sales", "Improve lead generation", "Improve customer engagement", "Other"], icon: <FaRocket /> },
    { question: "Which of the following best describes your business’s online presence?", key: "socialMedia", options: ["Active on social media and SEO is in place", "I have a website but not much social presence", "I don’t have an online presence"], icon: <FaUsers /> },
    { question: "Are you currently running any paid advertising (Google Ads, Facebook Ads, etc.)?", key: "paidAds", options: ["Yes", "No", "Planning to start"], icon: <FaSignInAlt /> },
    { question: "Do you want to improve your business’s branding and logo?", key: "branding", options: ["Yes", "No", "Not sure"], icon: <FaRegLightbulb /> },
    { question: "Do you have any digital marketing strategies in place?", key: "digitalMarketing", options: ["Yes, we have a solid strategy", "We’re trying but not sure if it’s working", "No, we don’t have any"], icon: <FaCog /> },
    { question: "What is your target audience?", key: "targetAudience", options: ["Local customers", "National customers", "International customers", "Other"], icon: <FaUsers /> },
    { question: "Do you want to offer an e-commerce solution for your products or services online?", key: "ecommerce", options: ["Yes", "No", "Maybe in the future"], icon: <FaBox /> },
    { question: "What is your biggest challenge when it comes to growing your business?", key: "biggestChallenge", options: ["Finding customers", "Conversion rates", "Branding and recognition", "Online presence", "Other"], icon: <FaChartLine /> },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://sheetdb.io/api/v1/nac4zyu6aoaoz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (response.ok) {
        setStep("quiz");
      } else {
        alert("Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAnswer = (key, value) => {
    setQuizAnswers({ ...quizAnswers, [key]: value });
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep("results");
    }
  };

  const services = {
    webDevelopment: { name: "Website Development", price: "₹30,000 - ₹50,000" },
    branding: { name: "Branding & Logo Design", price: "₹10,000 - ₹20,000" },
    seo: { name: "Search Engine Optimization", price: "₹15,000 - ₹30,000" },
    socialMedia: { name: "Social Media Marketing", price: "₹20,000 - ₹40,000" },
    leadGeneration: { name: "Lead Generation Services", price: "₹25,000 - ₹45,000" },
  };

  const recommendedServices = () => {
    let recommendations = [];

    if (quizAnswers.businessNeeds === "Increase sales") {
      recommendations.push(services.leadGeneration);
    }
    if (quizAnswers.businessNeeds === "Improve online presence") {
      recommendations.push(services.socialMedia, services.seo);
    }
    if (quizAnswers.businessNeeds === "Branding") {
      recommendations.push(services.branding);
    }
    if (quizAnswers.website === "No") {
      recommendations.push(services.webDevelopment);
    }

    return recommendations;
  };
 const router = useRouter();
  return (
    <div className="flex items-center justify-center  p-4 md:p-8 max-w-full bg-white md:pt-[150px] md:pb-[150px]">
      <div className="flex flex-col lg:flex-row w-full max-w-screen-xl">
        {/* Left Section: Engaging Content */}
        <div className="w-full lg:w-1/2 p-8 text-white flex flex-col justify-center space-y-8">
          <h2 className="text-3xl lg:text-5xl font-light tracking-tight bg-gradient-to-r from-pink-500 to-yellow-500  text-transparent bg-clip-text">Take Your Business to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">New Heights</span> </h2>
          <p className="text-lg lg:text-xl text-gray-900">As one of the top application development companies, we provide tailored solutions that
help startups and enterprises succeed in the digital era. Simply answer a few questions, and
we’ll recommend the most effective services for your goals.
</p>
          <ul className="list-disc space-y-4 text-gray-900 lg:text-lg">
            <li>Custom Web Development</li>
            <li>Branding & Logo Design</li>
            <li>Social Media Strategy</li>
            <li>Search Engine Optimization (SEO)</li>
            <li>Lead Generation Strategies</li>
          </ul>
          <button
      onClick={() => router.push("/contact")}
      className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-lg rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
    >
      Get Started Now
    </button>
        </div>

        {/* Right Section: Form */}
        <div className="w-full lg:w-1/2 p-8 bg-white rounded-3xl shadow-2xl">
          {step === "form" && (
            <form onSubmit={handleSubmitForm} className="space-y-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">Tell Us About Your Business</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-base lg:text-lg text-black">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-lg bg-gray-100 text-black shadow-xl focus:ring-4 focus:ring-purple-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-base lg:text-lg text-black">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-lg bg-gray-100 text-black shadow-xl focus:ring-4 focus:ring-purple-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-base lg:text-lg text-black">Business Name</label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-lg bg-gray-100 text-black shadow-xl focus:ring-4 focus:ring-purple-400"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-white font-semibold text-lg rounded-[50px] shadow-lg transform transition-all duration-300 hover:scale-105"
              >
                Start Quiz
              </button>
            </form>
          )}
          {step === "quiz" && (
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-center text-purple-700">Answer These Questions</h2>
              <div className="transition-opacity duration-500 opacity-100">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="text-4xl">{questions[currentQuestion].icon}</div>
                  <p className="text-xl lg:text-2xl text-gray-700">{questions[currentQuestion].question}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
                  {questions[currentQuestion].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(questions[currentQuestion].key, option)}
                      className="py-3 px-6 bg-gray-200 text-lg rounded-lg shadow-lg transition-all hover:scale-105"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {step === "results" && (
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-center text-purple-700">Recommended Services</h2>
              {recommendedServices().map((service) => (
                <div key={service.name} className="flex items-center justify-between py-4 px-6 bg-gray-100 rounded-lg shadow-lg">
                  <span className="text-xl text-black">{service.name}</span>
                  <span className="text-lg text-purple-600">{service.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
