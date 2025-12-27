import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      value: "support@diagramcraft.ai",
      link: "mailto:support@diagramcraft.ai",
    },
    {
      icon: "💬",
      title: "Discord",
      value: "Join our community",
      link: "#",
    },
    {
      icon: "🐙",
      title: "GitHub",
      value: "View repository",
      link: "https://github.com",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-6xl md:text-7xl font-black mb-6">
            <span className="gradient-text">Get in Touch</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions, feedback, or need support? We'd love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="glass rounded-3xl p-8 md:p-10 animate-slideUp">
            <h2 className="text-3xl font-bold text-white mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-semibold text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 font-semibold text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 font-semibold text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-xl hover:shadow-primary-500/50 transform hover:scale-105 transition-all duration-300"
              >
                Send Message
              </button>

              {submitted && (
                <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 text-center animate-fadeIn">
                  ✓ Message sent successfully!
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <div className="glass rounded-3xl p-8 md:p-10">
              <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, idx) => (
                  <a
                    key={idx}
                    href={info.link}
                    className="flex items-center gap-4 p-4 glass-dark rounded-xl hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="text-4xl">{info.icon}</div>
                    <div>
                      <div className="font-bold text-white">{info.title}</div>
                      <div className="text-gray-400">{info.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="glass rounded-3xl p-8 md:p-10">
              <h3 className="text-2xl font-bold text-white mb-4">Quick Links</h3>
              <div className="space-y-3">
                <a href="/about" className="block text-gray-300 hover:text-white transition">
                  → About DiagramCraft AI
                </a>
                <a href="/generate" className="block text-gray-300 hover:text-white transition">
                  → Generate Diagrams
                </a>
                <a href="https://github.com" className="block text-gray-300 hover:text-white transition">
                  → GitHub Repository
                </a>
              </div>
            </div>

            {/* Response Time */}
            <div className="glass rounded-3xl p-6 text-center">
              <div className="text-3xl mb-2">⚡</div>
              <div className="font-bold text-white mb-1">Fast Response Time</div>
              <div className="text-sm text-gray-400">We typically respond within 24 hours</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
