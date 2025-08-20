"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Lock,
  Zap,
  BookOpen,
  Shield,
  Gift,
  Users,
  Award,
  CheckCircle,
  Sparkles,
  Timer,
  MessageCircle,
} from "lucide-react";
import ChapterList from "./content";
import CommentsSection from "./commentss";
export default function EbookClient() {
  // ---- Pricing (fixed ₹99 + GST) ----
  const [basePrice, setBasePrice] = useState(9900); // ₹99 in paise
  const [gstAmount, setGstAmount] = useState(basePrice * 0.18);
  const [finalPrice, setFinalPrice] = useState(basePrice + gstAmount);

  // ---- Form & UI state ----
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [countdown, setCountdown] = useState(600); // 10 minutes sense-of-urgency

  // ---- Realtime counters & feed ----
  const [activeUsers, setActiveUsers] = useState(42);
  const [feed, setFeed] = useState(() => initialFeed());

  const formRef = useRef(null);

  // ---------- Effects ----------
  useEffect(() => {
    const gst = basePrice * 0.18;
    setGstAmount(gst);
    setFinalPrice(basePrice + gst);
  }, [basePrice]);

  useEffect(() => {
    const timer = setInterval(
      () => setCountdown((prev) => (prev > 0 ? prev - 1 : 0)),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  // active users: gentle random walk
  useEffect(() => {
    const t = setInterval(() => {
      setActiveUsers((u) => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2..+2
        const next = Math.min(120, Math.max(18, u + delta));
        return next;
      });
    }, 2500);
    return () => clearInterval(t);
  }, []);

  // live comments feed: push a new one every ~6s
  useEffect(() => {
    const t = setInterval(() => {
      const next = randomComment();
      setFeed((f) => [next, ...f.slice(0, 14)]); // keep 15
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const applyDiscount = () => {
    if (discountCode.trim().toUpperCase() === "FIRST10") {
      setBasePrice(0);
      setFinalPrice(0);
      setGstAmount(0);
      alert("🎉 Coupon applied! You get this for free.");
    } else alert("❌ Invalid coupon code");
  };

  const sendEbookDirect = async () => {
    setLoading(true);
    const res = await fetch("/api/sendEbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId: "FREE_COUPON", email, name }),
    });
    setLoading(false);

    if (res.ok) {
      alert("✅ eBook sent to your email!");
      setCheckoutOpen(false);
    } else alert("❌ Failed to send email");
  };

  const handlePayment = () => {
    if (!name || !email)
      return alert("Please fill in your name and email.");

    if (finalPrice === 0) return sendEbookDirect();

    const options = {
      key: "rzp_live_R5X3mt2251rX6I",
      amount: Math.round(finalPrice),
      currency: "INR",
      name: "RC Tech Solutions",
      description: "Student Developer eBook",
      handler: async function (response) {
        alert(
          "✅ Payment successful! 🎉 Welcome to the Student Developer Community 💜"
        );
        setLoading(true);
        await fetch("/api/sendEbook", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentId: response.razorpay_payment_id,
            email,
            name,
          }),
        });
        setLoading(false);
        setCheckoutOpen(false);
      },
      prefill: { name, email, contact: "" },
      theme: { color: "#953ee2" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const openCheckout = () => {
    setCheckoutOpen(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };
  // ---- Content data (advanced TOC) ----
  const toc = [
    {
      title: "Preface – Why I Wrote This eBook",
      highlights: [
        "The problem with random tutorials",
        "How to learn with outcomes in mind",
      ],
    },
    {
      title:
        "Chapter 1: Introduction – Why Start Web Development as a Student?",
      highlights: [
        "The advantage of starting early",
        "How web development can change your career path",
      ],
    },
    {
      title: "Chapter 2: Understanding the Web Development Landscape",
      highlights: [
        "Frontend, Backend, and Full-Stack explained",
        "Career paths & opportunities",
      ],
    },
    {
      title: "Chapter 3: Setting Up Your Foundations",
      highlights: [
        "Essential tools: VS Code, Node.js, Git",
        "HTML, CSS, JavaScript — the core trio",
      ],
    },
    {
      title: "Chapter 4: Building Your First Website",
      highlights: ["Step-by-step beginner project", "Free hosting options"],
    },
    {
      title: "Chapter 5: Leveling Up – Learning Beyond the Basics",
      highlights: ["Frameworks & libraries", "Version control with Git & GitHub"],
    },
    {
      title: "Chapter 6: Creating a Strong Developer Portfolio",
      highlights: ["What to include", "Projects that get noticed"],
    },
    {
      title: "Chapter 7: Landing Your First Client or Internship",
      highlights: ["Where to find opportunities", "Pitching yourself confidently"],
    },
    {
      title: "Chapter 8: Earning While Learning",
      highlights: [
        "Freelance platforms & networking tips",
        "Building a personal brand online",
      ],
    },
    {
      title: "Chapter 9: Real-World Projects That Impress",
      highlights: ["Ideas you can start today", "Student case studies"],
    },
    {
      title: "Chapter 10: The Business Side of Development",
      highlights: ["Pricing your services", "Contracts & client management"],
    },
    {
      title: "Chapter 11: Planning Your Future – What’s Next?",
      highlights: [
        "From freelancer to full-time",
        "Scaling to an agency/startup",
        "Bonus: Business-launch checklist",
      ],
    },
    {
      title: "Final Chapter: Next Steps & Secret Community Access",
      highlights: [
        "Action plan for the next 30 days",
        "Exclusive community invite",
        "Discounts on courses & tools",
      ],
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-white flex flex-col items-center p-6 relative overflow-x-hidden text-gray-900">
        {/* Floating metrics bar */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex items-center gap-4 fixed top-6 right-6 z-40 bg-white/90 backdrop-blur border border-purple-200 px-4 py-2 rounded-full shadow-lg"
        >
          <span className="flex items-center gap-2 text-purple-700 font-semibold">
            <Users className="w-4 h-4" /> {activeUsers} reading now
          </span>
          <span className="text-gray-300">•</span>
          <span className="flex items-center gap-2 text-amber-600 font-semibold">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" /> 4.9/5 (200+)
          </span>
        </motion.div>

        {/* Hero */}
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-2xl p-6 md:p-8 max-w-5xl w-full mt-12 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-200 blur-3xl rounded-full opacity-40"></div>
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-200 blur-3xl rounded-full opacity-40"></div>

          <div className="flex flex-wrap gap-3 mt-2 mb-5 relative z-10">
            <span className="bg-green-600/10 text-green-900 px-3 py-1 rounded-full text-xs flex items-center gap-1">
              <Users className="w-4 h-4" /> Trusted by 30+ coding clubs
            </span>
            <span className="bg-amber-500/10 text-amber-900 px-3 py-1 rounded-full text-xs flex items-center gap-1">
              <Award className="w-4 h-4" /> Endorsed by top developers
            </span>
            <span className="bg-rose-500/10 text-rose-900 px-3 py-1 rounded-full text-xs flex items-center gap-1">
              <Award className="w-4 h-4" /> Student-Centric
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              src="/ebookpdf.jpg"
              alt="Student Developer eBook"
              className="rounded-xl w-[240px] md:w-[260px] shadow-lg border border-purple-200"
            />

            <div className="flex-1">
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-yellow-400 w-5 h-5" />
                ))}
                <span className="ml-2 text-sm text-gray-600">(200+ Verified Reviews)</span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-extrabold text-purple-700 leading-snug"
              >
                Learn to Code, Earn from Code
              </motion.h1>
              <p className="text-gray-700 mt-2 mb-5 leading-relaxed">
                A practical eBook for <strong>students</strong> to master coding skills and convert
                them into real income. No fluff — just proven strategies and an easy roadmap.
              </p>

              {/* Feature grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mt-4">
                <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-purple-600" /> 120+ pages of student-focused content</span>
                <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-purple-600" /> Step-by-step career roadmap</span>
                <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-purple-600" /> Freelancing & job-ready skills</span>
                <span className="flex items-center gap-2"><Gift className="w-4 h-4 text-purple-600" /> Templates, checklists & resources</span>
              </div>

              {/* Price & CTA */}
              <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4">
                <div className="text-2xl font-bold text-gray-800 flex flex-col items-center md:items-start">
                  <span className="text-gray-500 text-sm line-through">₹999</span>
                  <span className="text-green-600 text-3xl">Only ₹99 + GST 💜</span>
                  <span className="text-sm text-gray-900 animate-pulse">
                    Less than your daily snacks — lifetime value 🚀
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openCheckout}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-8 py-3 rounded-xl shadow-lg font-semibold"
                >
                  Get Instant Access 🚀
                </motion.button>
              </div>

              {/* Countdown / urgency */}
              <div className="mt-3 text-xs text-gray-600 flex items-center gap-2">
                <Timer className="w-3 h-3" /> Limited-time student offer ends in
                <span className="font-semibold text-purple-700">{formatTime(countdown)}</span>
              </div>

              <p className="text-xs text-gray-500 flex items-center gap-1 mt-2">
                <Lock className="w-3 h-3" /> Secure checkout • Instant email delivery
              </p>
            </div>
          </div>

          {/* Wastage comparison block */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-6 text-sm text-gray-700 relative overflow-hidden">
            <h3 className="font-bold text-yellow-800 mb-2">Think about it 💭</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>☕ One cup of coffee = ₹120</li>
              <li>🍔 One burger = ₹150</li>
              <li>🎬 One OTT subscription = ₹199 / month</li>
              <li>📱 Daily mobile data pack = ₹99</li>
            </ul>
            <p className="mt-3 text-gray-800 font-semibold">
              But for <span className="text-green-600">₹99 once (+ GST)</span>, you get a lifetime guide 🚀
            </p>
          </div>
        </div>
<CommentsSection/>
        
        {/* ---------- What’s Inside (Advanced Cards) ---------- */}
        <ChapterList/>

        {/* ---------- Live Comments / Testimonials ---------- */}
        

        {/* ---------- Checkout Form ---------- */}
        {checkoutOpen && (
          <div
            ref={formRef}
            className="w-full flex justify-center px-4 sm:px-6 lg:px-8 py-8"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute -top-20 -right-10 w-40 h-40 bg-purple-200 blur-3xl rounded-full opacity-40"></div>
              <h2 className="text-lg font-bold mb-4 text-center">Complete Your Access</h2>
              <p className="text-sm text-gray-600 mb-4 bg-purple-50 border border-purple-200 rounded-lg p-3">
                💡 <strong>Note:</strong> One-time <strong>₹99 + GST</strong>. Instant email delivery. Student-friendly.
              </p>

              <input
                type="text"
                placeholder="Your Full Name"
                className="border rounded-lg p-3 w-full mb-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Your Email"
                className="border rounded-lg p-3 w-full mb-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Discount */}
              <div className="flex gap-2 mb-3 flex-col sm:flex-row">
                <input
                  type="text"
                  placeholder="Discount Code"
                  className="border rounded-lg p-3 flex-grow"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <button
                  onClick={applyDiscount}
                  className="bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-900 w-full sm:w-auto"
                >
                  Apply
                </button>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg mb-4 text-sm">
                <p>Base Price: ₹{(basePrice / 100).toFixed(2)}</p>
                <p>GST (18%): ₹{(gstAmount / 100).toFixed(2)}</p>
                <h2 className="text-lg font-bold mt-2">
                  Total: ₹{(finalPrice / 100).toFixed(2)}
                </h2>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-3 rounded-lg w-full font-semibold"
              >
                {loading
                  ? "Processing..."
                  : finalPrice === 0
                  ? "Get for Free"
                  : "Yes, I Want This for ₹99 + GST"}
              </button>
              <button
                onClick={() => setCheckoutOpen(false)}
                className="w-full mt-2 text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Sticky bottom CTA */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur border border-purple-200 text-purple-800 px-5 py-3 rounded-full shadow-xl flex items-center gap-3 z-40">
          <span className="hidden sm:block font-semibold">{activeUsers}+ students browsing • Get yours for ₹99 + GST</span>
          <button
            onClick={openCheckout}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full font-semibold hover:from-purple-700 hover:to-indigo-700"
          >
            Buy Now
          </button>
        </div>

        {/* Razorpay script */}
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </div>
    </>
  );
}

// ---------------- Helpers for live feed ----------------
function initialFeed() {
  const seed = [
    c("Anjali", "Delhi", "Best ₹99 I spent! Super clear & practical."),
    c("Rohit", "Pune", "Got my first freelance gig using the portfolio tips."),
    c("Meera", "Bengaluru", "Templates saved me hours. Loving it!"),
    c("Ayaan", "Mumbai", "Finally understood Git & GitHub 🫶"),
    c("Sanya", "Kolkata", "Clean roadmap. No fluff. Just do this 👉 results."),
  ];
  return seed;
}

function randomComment() {
  const names = [
    "Ishita",
    "Kabir",
    "Kriti",
    "Rakesh",
    "Sahil",
    "Niharika",
    "Dev",
    "Priya",
    "Arjun",
    "Zara",
    "Harsh",
    "Neha",
    "Kunal",
  ];
  const cities = [
    "Delhi",
    "Mumbai",
    "Bengaluru",
    "Hyderabad",
    "Pune",
    "Jaipur",
    "Chennai",
    "Indore",
    "Kolkata",
  ];
  const texts = [
    "Grabbed it! The checklists are gold.",
    "Just paid. Super excited!",
    "Loved the project ideas in Chapter 9.",
    "Got clarity on roadmap. Thanks!",
    "Freelance section ✅ Now sending pitches.",
    "Worth it for beginners.",
    "Portfolio tips = interview callbacks!",
  ];
  const name = pick(names);
  const city = pick(cities);
  const text = pick(texts);
  return c(name, city, text);
}

function c(name, city, text) {
  return {
    id: `${name}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name,
    city,
    text,
    time: timeAgo(new Date()),
    initials: initialsOf(name),
  };
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function initialsOf(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function timeAgo(date) {
  const sec = Math.floor((Date.now() - date.getTime()) / 1000);
  if (sec < 60) return `${sec}s ago`;
  const m = Math.floor(sec / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  return `${h}h ago`;
}