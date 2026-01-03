import Image from 'next/image';

export default function CtoSection() {
  return (
    <section className="cto-section bg-gray-50 py-12 px-4 sm:px-8 lg:px-16">
      <div className="cto-container p-15 max-w-6xl mx-auto flex flex-col items-center gap-12">
        
        {/* Testimonial Block */}
        <div className="w-full max-w-3xl text-center">
          <p className=" text-lg sm:text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-6">
            <span>
              "RC Tech Solutions doesn’t just deliver code — they deliver clarity, performance, and a long-term tech vision.{' '}
            </span>
            Their ability to simplify complex workflows is unmatched."
          </p>

          <div className="cto-profile mx-auto w-max place-content-center flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4">
            <Image
              src="/rahul.jpeg"
              alt="Rahul Chauhan"
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold text-gray-900">Rahul Chauhan</h3>
              <span className="text-sm text-gray-600">CEO @ RC Tech Solutions</span>
            </div>
          </div>
        </div>

        {/* Optional Logo Section Below */}
        {/* Add carousel or logo grid here if needed */}

      </div>
    </section>
  );
}
