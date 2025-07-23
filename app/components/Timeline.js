import Image from 'next/image';

export default function ProductTeamSection() {
  return (
    <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
        
        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
            <Image
              src="./Group 11.svg"
              alt="Team Icon"
              width={30}
              height={30}
            />
            <span className="text-blue-600 font-medium text-sm sm:text-base">
              For Real Businesses
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-snug">
            Launch with the best stack
          </h2>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Clear B2B message, data-focused, solution-driven.
            Designed to empower growing brands through modern technology.
          </p>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src="./Group 21.svg"
            alt="Product Image"
            width={500}
            height={400}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
