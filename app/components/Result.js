export default function Result({ answers }) {
    const getRecommendation = () => {
      const { 'What best describes your business?': businessType, 'What are your primary business goals?': goals } = answers
      let recommendations = []
  
      if (businessType === 'Startup' || businessType === 'Freelancer/Consultant') {
        recommendations.push('Web Development - Custom Solutions')
      }
      
      if (goals.includes('Increase Sales & Conversions')) {
        recommendations.push('SEO & Digital Marketing')
      }
      
      return recommendations.length > 0 ? recommendations : ['Full Service Solution: Web Development, SEO, Digital Marketing, Branding']
    }
  
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-purple-600">Your Recommended Services:</h2>
        <ul className="list-disc pl-5 space-y-2">
          {getRecommendation().map((item, index) => (
            <li key={index} className="text-lg">{item}</li>
          ))}
        </ul>
        <div className="mt-6 text-center">
          <button className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700">
            Get Started with Your Project
          </button>
        </div>
      </div>
    )
  }
  