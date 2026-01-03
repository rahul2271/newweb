// components/ProductShowcase.js
export default function ProductShowcase() {
    return (
      <section className="bg-gradient-to-t from-white to-black py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl text-white font-bold mb-12">Our Expertise</h2>
          
          {/* Grid Layout for Services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            
            {/* Web Development Service */}
            <div className="relative group shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <img 
                src="/path/to/web-development-image.jpg" 
                alt="Web Development"
                className="w-full h-56 sm:h-64 object-cover transition-transform duration-300 group-hover:opacity-75"
              />
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-semibold mb-4">Web Development</h3>
                <p className="text-gray-600 mb-4">Sleek, responsive websites built for performance.</p>
                <a href="/web-development" className="text-blue-500 font-medium hover:underline">
                  Learn More
                </a>
              </div>
            </div>
  
            {/* SEO & Marketing Service */}
            <div className="relative group shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <img 
                src="/path/to/seo-marketing-image.jpg" 
                alt="SEO & Marketing"
                className="w-full h-56 sm:h-64 object-cover transition-transform duration-300 group-hover:opacity-75"
              />
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-semibold mb-4">SEO & Marketing</h3>
                <p className="text-gray-600 mb-4">Drive traffic. Dominate search rankings.</p>
                <a href="/seo-marketing" className="text-blue-500 font-medium hover:underline">
                  Learn More
                </a>
              </div>
            </div>
  
            {/* Video Editing Service */}
            <div className="relative group shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <img 
                src="/path/to/video-editing-image.jpg" 
                alt="Video Editing"
                className="w-full h-56 sm:h-64 object-cover transition-transform duration-300 group-hover:opacity-75"
              />
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-semibold mb-4">Video Editing</h3>
                <p className="text-gray-600 mb-4">Content that captures hearts and minds.</p>
                <a href="/video-editing" className="text-blue-500 font-medium hover:underline">
                  Learn More
                </a>
              </div>
            </div>
  
          </div>
        </div>
      </section>
    );
  }
  