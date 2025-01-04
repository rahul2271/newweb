'use client'; // This makes the file a client component

import { useState } from 'react';
import Result from './Result';

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [formData, setFormData] = useState({ email: '', name: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStep(1); // Proceed to the quiz after successful submission
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleAnswer = (question, answer) => {
    setAnswers((prev) => ({ ...prev, [question]: answer }));
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      setStep(questions.length + 1); // Move to result page
    }
  };

  const questions = [
    { id: 1, question: 'What best describes your business?', options: ['Startup', 'Established Business', 'Freelancer/Consultant', 'E-commerce Business', 'Non-Profit Organization'] },
    { id: 2, question: 'What are your primary business goals?', options: ['Increase Sales & Conversions', 'Build a Professional Website', 'Improve Online Visibility', 'Improve Brand Identity', 'Enhance Customer Engagement'] },
    { id: 3, question: 'What services are you most interested in?', options: ['Web Development', 'Digital Marketing', 'Branding & Design', 'Video & Content Creation', 'Business Consulting'] },
    { id: 4, question: 'What is your estimated budget?', options: ['Low (₹20k–₹50k)', 'Medium (₹50k–₹1L)', 'High (₹1L+)'] },
    { id: 5, question: 'What is your project timeline?', options: ['ASAP (1–2 weeks)', 'Short-Term (1 month)', 'Medium-Term (2–3 months)', 'Long-Term (3+ months)'] },
  ];

  if (step > questions.length) {
    return <Result answers={answers} />;
  }

  if (step === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-purple-600">Enter Your Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 rounded-lg border border-gray-300"
            required
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 rounded-lg border border-gray-300"
            required
          />
          <input
            type="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone Number"
            className="w-full p-3 rounded-lg border border-gray-300"
            required
          />
          <button type="submit" className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Submit and Continue
          </button>
        </form>
      </div>
    );
  }

  const currentQuestion = questions[step - 1];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-purple-600">{currentQuestion.question}</h2>
      <div className="space-y-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700"
            onClick={() => handleAnswer(currentQuestion.question, option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
