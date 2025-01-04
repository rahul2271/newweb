"use client";
import { useState } from 'react';

export default function DownloadResourceSection() {
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', newsletter: false });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [currentProject, setCurrentProject] = useState(0);

  const projects = [
    {
      title: 'AI Chatbot',
      description: 'A personalized chatbot leveraging GPT for real-time interaction.',
      image: '/images/ai-chatbot.jpg',
    },
    {
      title: 'AR Product Viewer',
      description: 'Interactive AR application for virtual product try-ons.',
      image: '/images/ar-product-viewer.jpg',
    },
    {
      title: 'VR Tour',
      description: 'A virtual reality tour of real estate properties.',
      image: '/images/vr-tour.jpg',
    },
  ];

  const handlePrev = () => {
    setCurrentProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert('Please fill in all required fields.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setAiSuggestion(
        'Consider integrating AI-powered chatbots to enhance user engagement and adding AR/VR elements for a cutting-edge user experience.'
      );
    }, 2000);
  };

  return (
    <section className="py-16 px-8 bg-gradient-to-r from-gray-900 via-[#0c0e10] to-gray-900 text-gray-200">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side (Text) */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              Explore AI Features & Showcase Projects
            </h2>
            <p className="text-lg md:text-xl font-light">
              Download resources and discover how cutting-edge technologies like AI and AR/VR can transform your projects.
            </p>

            {!formVisible && (
              <button
                onClick={() => setFormVisible(true)}
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-gray-200 font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <span>Learn More</span>
              </button>
            )}
          </div>

          {/* Right Side (Swipeable Projects or Form) */}
          <div className="relative">
            {!formVisible ? (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Our Latest Projects:</h3>
                <div className="relative w-full h-64 bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src={projects[currentProject].image}
                    alt={projects[currentProject].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
                    <h4 className="text-xl font-bold">{projects[currentProject].title}</h4>
                    <p className="text-sm text-gray-300">{projects[currentProject].description}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={handlePrev}
                    className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-purple-500 transition"
                  >
                    ◀ Prev
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-purple-500 transition"
                  >
                    Next ▶
                  </button>
                </div>
              </div>
            ) : submitted ? (
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-semibold">Thank You!</h3>
                <p>Your personalized AI suggestion:</p>
                <blockquote className="italic text-purple-400">{aiSuggestion}</blockquote>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-8 rounded-lg shadow-lg space-y-6"
              >
                <h3 className="text-2xl font-semibold">Get Personalized Insights</h3>
                <div>
                  <label className="block">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                    className="h-4 w-4 text-purple-500"
                  />
                  <label className="ml-2">Subscribe to our newsletter</label>
                </div>
                <button
                  type="submit"
                  className={`w-full px-8 py-3 bg-gradient-to-r ${
                    loading
                      ? 'from-gray-500 to-gray-600'
                      : 'from-purple-500 to-indigo-500'
                  } text-gray-200 font-semibold rounded-lg shadow-lg transform ${
                    loading ? '' : 'hover:scale-105'
                  } transition-all duration-300 mt-4`}
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
