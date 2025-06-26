'use client';
import { useState, useEffect } from 'react';

export default function ProblemSolution() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cards = [
    {
      title: 'Custom Web Design',
      description:
        'No generic templates. We build fully custom, conversion-focused websites tailored to your brand and audience. Stand out from competitors with high-impact design.',
      icon: '🖌️',
    },
    {
      title: 'SEO & Content Strategy',
      description:
        'Get found on Google with powerful SEO strategies. From on-page SEO to content marketing, we optimize every element to boost organic traffic and rankings.',
      icon: '🚀',
    },
    {
      title: 'UI/UX Optimization',
      description:
        'Our UI/UX specialists craft user journeys that convert visitors into leads and customers. Clean design, intuitive navigation, and mobile responsiveness guaranteed.',
      icon: '📱',
    },
    {
      title: 'Conversion Rate Optimization',
      description:
        'Already getting traffic but no leads? We analyze user behavior and implement conversion triggers like CTAs, landing pages, and funnel optimizations that increase sales.',
      icon: '📈',
    },
    {
      title: 'Branding & Visual Identity',
      description:
        'Your brand deserves to be unforgettable. We create cohesive, emotionally resonant visual identities — logos, color schemes, typography — that drive connection.',
      icon: '🎨',
    },
    {
      title: 'Performance & Speed',
      description:
        'We build fast-loading, Core Web Vitals-optimized websites that not only rank better on Google but also reduce bounce rates and improve user engagement.',
      icon: '⚡',
    },
  ];

  return (
    <section
      className="relative w-full py-32 bg-white overflow-hidden font-sans bg-[url('https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-32">

        {/* Left Side: Problem Block */}
        <div className="w-full md:w-1/2 text-left">
          <h2
            className={`text-[2.5rem] md:text-[3.2rem] leading-tight font-light bg-gradient-to-r from-black via-neutral-700 to-black bg-clip-text text-transparent transition-all duration-1000 ease-out
            ${scrollPosition > 80 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            You're not here for ordinary.<br />
            You're building a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 font-extrabold"><br></br>Brand that wins online.</span>
          </h2>

          <div className="mt-12 flex flex-col gap-8 text-gray-600 text-[15px] leading-relaxed">
            <p className={`${scrollPosition > 100 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700`}>
              Traffic is coming, but <span className="font-semibold text-black">conversion rates are low</span>. Your <strong>website isn’t converting visitors into leads or sales</strong>. Time for strategic <strong>conversion rate optimization</strong>.
            </p>
            <p className={`${scrollPosition > 200 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700 delay-100`}>
              Your site looks okay — but <span className="font-semibold text-black">it doesn’t generate ROI</span>. You know your <strong>brand deserves a high-converting website design</strong>.
            </p>
            <p className={`${scrollPosition > 300 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700 delay-200`}>
              You’ve grown, but your <strong>digital presence</strong> still feels like it’s stuck in <span className="font-semibold text-black">2014</span>. Let’s give your <strong>brand the premium digital identity</strong> it needs.
            </p>
          </div>
        </div>

        {/* Right Side: Solution Box */}
        <div
          className={`w-full md:w-1/2 bg-white/30 border border-gray-200 rounded-3xl p-12 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-1000 ease-in-out
          ${scrollPosition > 150 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-black to-[#444] bg-clip-text text-transparent">
            Your Brand Deserves Premium. Not Basic.
          </h3>

          <p className="text-gray-800 text-sm md:text-base leading-relaxed font-medium mb-10">
            We don’t do cookie-cutter templates. We build <strong>ROI-focused branding strategies</strong> and <strong>future-proof digital marketing solutions</strong> that boost <strong>lead generation, conversion rates,</strong> and overall <strong>business growth</strong>.  
            Whether it’s <strong>SEO-focused website design</strong> or <strong>modern UI/UX for business websites</strong>, we deliver results that matter.
          </p>

          <a
            href="#services"
            className="inline-block px-10 py-3 text-white text-sm font-semibold rounded-full bg-gradient-to-r from-[#8e2de2] to-[#4a00e0] shadow-lg hover:scale-105 hover:shadow-xl hover:rotate-[.5deg] transition-transform duration-300"
          >
            Let’s Optimize Your Brand Now
          </a>
        </div>
      </div>

      {/* New: Why Choose Us - SEO Keyword Stuffed Cards */}
     <div className="relative z-10 mt-32 max-w-7xl mx-auto px-6 md:px-12 text-center">
  <h3 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-black to-gray-800 bg-clip-text text-transparent">
    Results That Speak for Themselves
  </h3>
  <p className="text-gray-700 text-md md:text-lg max-w-2xl mx-auto mb-16">
    We've helped brands like yours experience real growth, increase conversions, and dominate search rankings with our <strong>ROI-driven website design</strong> and <strong>digital marketing strategies</strong>.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Stat 1 */}
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:scale-105 transition-transform duration-300">
      <h4 className="text-5xl font-bold text-indigo-600 mb-4">
        +150%
      </h4>
      <p className="text-gray-800 font-semibold">Increase in Conversion Rates</p>
      <p className="text-gray-600 text-sm mt-2">For clients after our complete <strong>website redesign & CRO</strong> optimization.</p>
    </div>

    {/* Stat 2 */}
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:scale-105 transition-transform duration-300">
      <h4 className="text-5xl font-bold text-indigo-600 mb-4">
        +300%
      </h4>
      <p className="text-gray-800 font-semibold">Organic Traffic Growth</p>
      <p className="text-gray-600 text-sm mt-2">Achieved through targeted <strong>SEO campaigns</strong> and <strong>content marketing strategies</strong>.</p>
    </div>

    {/* Stat 3 */}
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:scale-105 transition-transform duration-300">
      <h4 className="text-5xl font-bold text-indigo-600 mb-4">
        +200%
      </h4>
      <p className="text-gray-800 font-semibold">Revenue Uplift</p>
      <p className="text-gray-600 text-sm mt-2">For eCommerce & service brands after implementing our <strong>lead generation funnels</strong> and <strong>SEO-optimized landing pages</strong>.</p>
    </div>
  </div>

  {/* Optional CTA */}
  <div className="mt-12">
    <a
      href="#case-studies"
      className="inline-block px-8 py-3 text-white text-sm font-semibold rounded-full bg-gradient-to-r from-[#8e2de2] to-[#4a00e0] shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
    >
      See Our Client Success Stories
    </a>
  </div>
</div>
    </section>
  );
}
