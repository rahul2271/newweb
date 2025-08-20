"use client";
import { useState } from "react";
import { Lock, Unlock, BookOpen } from "lucide-react";

export default function EbookClient() {
  const [unlockedChapters] = useState(["Preface", "Chapter 1"]);
  const [showBuyForm, setShowBuyForm] = useState(false);

  const chapters = [
    { title: "Preface", subtitle: "Why I Wrote This eBook" },
    { title: "Chapter 1", subtitle: "Introduction – Why Start Web Development as a Student?", points: ["The advantage of starting early", "How web development can change your career path"] },
    { title: "Chapter 2", subtitle: "Understanding the Web Development Landscape", points: ["Frontend, Backend, and Full-Stack explained", "Career paths & opportunities"] },
    { title: "Chapter 3", subtitle: "Setting Up Your Foundations", points: ["Basic tools & software", "Understanding HTML, CSS, and JavaScript"] },
    { title: "Chapter 4", subtitle: "Building Your First Website", points: ["Step-by-step beginner project", "Hosting your site for free"] },
    { title: "Chapter 5", subtitle: "Leveling Up – Learning Beyond the Basics", points: ["Frameworks & libraries", "Version control with Git & GitHub"] },
    { title: "Chapter 6", subtitle: "Creating a Strong Developer Portfolio", points: ["What to include", "How to showcase projects that get noticed"] },
    { title: "Chapter 7", subtitle: "Landing Your First Client or Internship", points: ["Where to find opportunities", "How to pitch yourself confidently"] },
    { title: "Chapter 8", subtitle: "Earning While Learning", points: ["Freelance platforms & networking tips", "Building a personal brand online"] },
    { title: "Chapter 9", subtitle: "Real-World Projects That Impress", points: ["Ideas you can start today", "Case studies from real student developers"] },
    { title: "Chapter 10", subtitle: "The Business Side of Development", points: ["Pricing your services", "Contracts, payments, and client management"] },
    { title: "Chapter 11", subtitle: "Planning Your Future – What’s Next?", points: ["Transitioning from freelancer to full-time developer", "Scaling into your own agency/startup"] },
    { title: "Bonus", subtitle: "Checklist for turning your skills into a business" },
    { title: "Final Chapter", subtitle: "Next Steps & Secret Community Access", points: ["Recap & how to take action today", "Exclusive community access for networking & mentorship", "Special discounts on premium coding courses & tools"] },
  ];

  const handleChapterClick = (title) => {
    if (!unlockedChapters.includes(title)) {
      setShowBuyForm(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-extrabold mb-8 flex items-center gap-3 justify-center text-purple-700">
        <BookOpen className="w-7 h-7" /> eBook Chapters
      </h2>

      {/* Scrollable container showing only 3 chapters at a time */}
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {chapters.map((ch, idx) => {
          const isUnlocked = unlockedChapters.includes(ch.title);
          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl shadow-lg border flex justify-between items-center transition-all duration-300 cursor-pointer
                ${isUnlocked ? "bg-white border-purple-200 hover:shadow-xl" : "bg-gray-50 border-gray-200 opacity-90 hover:shadow-md"}`}
              onClick={() => handleChapterClick(ch.title)}
            >
              <div>
                <h3 className="font-semibold text-lg sm:text-xl">{ch.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{ch.subtitle}</p>
                {isUnlocked && ch.points && (
                  <ul className="list-disc ml-5 mt-2 text-gray-700 space-y-1 text-sm sm:text-base">
                    {ch.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>

              {isUnlocked ? (
                <Unlock className="text-green-500 w-6 h-6" />
              ) : (
                <Lock className="text-gray-500 w-6 h-6" />
              )}
            </div>
          );
        })}
      </div>

      {showBuyForm && (
        <div className="mt-10 p-6 bg-purple-50 border border-purple-200 rounded-2xl shadow-lg text-center">
          <h3 className="text-xl font-bold text-purple-700 mb-4">Unlock All Chapters</h3>
          <p className="text-gray-700 mb-6">Get lifetime access to all chapters for just ₹99 + GST.</p>
          <button  className="px-6 py-3 bg-purple-600 text-white rounded-2xl shadow-md hover:bg-purple-700 transition-all"> 
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
}
