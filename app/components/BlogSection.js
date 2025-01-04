// components/BlogSection.js

export default function BlogSection() {
    const articles = [
      {
        title: "How to Optimize Your Website for SEO",
        description:
          "Learn the key strategies to boost your website's search engine ranking and improve visibility.",
        link: "/blog/seo-optimization",
        image: "/images/seo-article.jpg",
      },
      {
        title: "5 Tips to Boost Conversions on Your Website",
        description:
          "Increase your website's conversion rate with these actionable tips for improved user experience.",
        link: "/blog/boost-conversions",
        image: "/images/conversion-tips.jpg",
      },
      {
        title: "The Future of Web Development in 2024",
        description:
          "Discover the latest trends and technologies shaping the future of web development in 2024 and beyond.",
        link: "/blog/future-of-web-development",
        image: "/images/web-dev-future.jpg",
      },
    ];
  
    return (
      <section className="py-16 px-8 bg-gradient-to-r from-gray-900 via-[#0c0e10] to-gray-900">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-semibold text-gray-200 text-center mb-8">
            Latest Articles and Insights
          </h2>
  
          {/* Grid Layout for Articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {articles.map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                {/* Article Image */}
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  {/* Article Title */}
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {article.title}
                  </h3>
                  {/* Article Description */}
                  <p className="text-gray-300 mb-4">{article.description}</p>
                  {/* Read More Button */}
                  <a
                    href={article.link}
                    className="text-purple-600 font-semibold hover:underline"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
  
          {/* Explore More Button */}
          <div className="text-center mt-8">
            <a
              href="/blog"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Explore More Articles
            </a>
          </div>
        </div>
      </section>
    );
  }
  