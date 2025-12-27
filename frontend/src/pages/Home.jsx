import React, { useEffect, useState } from "react";

const features = [
  {
    title: "AI-Powered Generation",
    description:
      "Transform natural language into beautiful flowcharts using advanced LLaMA 3.1 AI technology.",
    icon: (
      <svg
        className="w-14 h-14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
        />
      </svg>
    ),
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "100% Offline & Free",
    description:
      "No API keys, no subscriptions. Runs completely offline with local open-source AI models.",
    icon: (
      <svg
        className="w-14 h-14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Real-Time Rendering",
    description:
      "Watch your diagrams come to life instantly with interactive Mermaid.js visualization.",
    icon: (
      <svg
        className="w-14 h-14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Export & History",
    description:
      "Save your work, view history, and export Mermaid code for documentation and reports.",
    icon: (
      <svg
        className="w-14 h-14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
        />
      </svg>
    ),
    gradient: "from-orange-500 to-yellow-500",
  },
];

const stats = [
  { label: "Diagrams Generated", value: "10K+", icon: "📊" },
  { label: "Active Users", value: "2.5K+", icon: "👥" },
  { label: "Time Saved", value: "5000h+", icon: "⚡" },
  { label: "Satisfaction Rate", value: "98%", icon: "⭐" },
];

const useCases = [
  {
    title: "Software Architecture",
    description: "Design system architecture and component diagrams for technical documentation",
    icon: "🏗️",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Business Processes",
    description: "Model business workflows and process flows for stakeholder presentations",
    icon: "💼",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "API Request Flows",
    description: "Visualize API endpoints, request/response cycles, and data flows",
    icon: "🔄",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Interview Prep",
    description: "Practice system design interviews with quick diagram generation",
    icon: "🎯",
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "College Projects",
    description: "Create professional diagrams for assignments and presentations",
    icon: "🎓",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    title: "Technical Docs",
    description: "Generate flowcharts for README files, wikis, and documentation",
    icon: "📚",
    gradient: "from-pink-500 to-rose-500",
  },
];

const techStack = [
  { name: "React.js", icon: "⚛️", color: "text-cyan-400" },
  { name: "FastAPI", icon: "⚡", color: "text-green-400" },
  { name: "Ollama", icon: "🤖", color: "text-purple-400" },
  { name: "LLaMA 3.1", icon: "🧠", color: "text-pink-400" },
  { name: "MongoDB", icon: "🍃", color: "text-emerald-400" },
  { name: "Mermaid.js", icon: "📊", color: "text-blue-400" },
];

const demoExamples = [
  {
    prompt: "Show a login process where user enters credentials, system checks, and either displays dashboard or error.",
    code: "graph TD\n  A[User Login] --> B{Valid?}\n  B -->|Yes| C[Dashboard]\n  B -->|No| D[Error]",
  },
  {
    prompt: "Create a payment flow with cart, checkout, payment gateway, and confirmation steps.",
    code: "graph LR\n  A[Cart] --> B[Checkout]\n  B --> C[Payment]\n  C --> D[Confirm]",
  },
  {
    prompt: "Design an API request flow showing client, server, database, and response.",
    code: "graph TD\n  A[Client] --> B[API]\n  B --> C[Database]\n  C --> B\n  B --> A",
  },
];

const testimonials = [
  {
    quote:
      "DiagramCraft AI revolutionized our documentation workflow. What used to take hours now takes minutes!",
    author: "Sarah Chen",
    role: "Product Manager at TechCorp",
    avatar: "SC",
  },
  {
    quote:
      "The best flowchart tool I've ever used. The AI understands context perfectly and generates exactly what I need.",
    author: "Michael Rodriguez",
    role: "Senior Software Engineer",
    avatar: "MR",
  },
  {
    quote:
      "Being completely offline and free makes this an absolute game-changer for our team's productivity.",
    author: "Emily Watson",
    role: "UX Designer",
    avatar: "EW",
  },
];

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentExample, setCurrentExample] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Typewriter effect for demo
  useEffect(() => {
    const example = demoExamples[currentExample];
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex <= example.prompt.length) {
        setTypedText(example.prompt.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);

        // Switch to next example after delay
        setTimeout(() => {
          setCurrentExample((prev) => (prev + 1) % demoExamples.length);
          setTypedText("");
          setIsTyping(true);
        }, 3000);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentExample]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-gradient bg-300%">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className={`max-w-7xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-6 px-6 py-2 glass rounded-full">
            <span className="text-accent-400 font-semibold text-sm">✨ Powered by LLaMA 3.1 AI</span>
          </div>

          <h1 className="text-7xl md:text-8xl font-black mb-8 leading-tight">
            <span className="gradient-text animate-gradient">DiagramCraft AI</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            Transform your ideas into stunning flowcharts with the power of AI.
            <br />
            <span className="text-accent-400 font-semibold">Fast. Free. Offline.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="/generate"
              className="group relative px-8 py-4 bg-gradient-to-r from-primary-600 to-blue-600 rounded-full font-bold text-lg text-white shadow-2xl hover:shadow-primary-500/50 transform hover:scale-105 transition-all duration-300 hover:animate-glow"
            >
              <span className="relative z-10">Get Started Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            <a
              href="#demo"
              className="px-8 py-4 glass rounded-full font-bold text-lg text-white hover:bg-white/20 transform hover:scale-105 transition-all duration-300"
            >
              See Demo →
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="glass rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="gradient-text">See the Magic in Action</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Watch how natural language transforms into professional diagrams instantly
            </p>
          </div>

          <div className="max-w-6xl mx-auto glass rounded-3xl p-8 md:p-12">
            {/* Demo Flow */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Step 1: Input */}
              <div className="text-center animate-slideUp">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                  📝
                </div>
                <h3 className="text-xl font-bold text-white mb-2">1. Type Prompt</h3>
                <p className="text-gray-400 text-sm">Describe your diagram in plain English</p>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center">
                <div className="text-4xl text-primary-400 animate-pulse">→</div>
              </div>

              {/* Step 2: AI Processing */}
              <div className="text-center animate-slideUp" style={{ animationDelay: '0.1s' }}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl animate-spin-slow">
                  🤖
                </div>
                <h3 className="text-xl font-bold text-white mb-2">2. AI Processes</h3>
                <p className="text-gray-400 text-sm">LLaMA 3.1 generates Mermaid code</p>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center">
                <div className="text-4xl text-primary-400 animate-pulse" style={{ animationDelay: '0.5s' }}>→</div>
              </div>

              {/* Step 3: Output */}
              <div className="text-center animate-slideUp" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-2xl">
                  ✨
                </div>
                <h3 className="text-xl font-bold text-white mb-2">3. Get Diagram</h3>
                <p className="text-gray-400 text-sm">Beautiful flowchart rendered instantly</p>
              </div>
            </div>

            {/* Live Example */}
            <div className="glass-dark rounded-2xl p-6 mt-8">
              <div className="mb-4">
                <div className="text-sm text-gray-400 mb-2">Example Prompt:</div>
                <div className="bg-slate-800/50 rounded-lg p-4 min-h-[80px] font-mono text-sm text-white">
                  {typedText}
                  {isTyping && <span className="animate-pulse">|</span>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div>
                  <div className="text-sm text-gray-400 mb-2">Generated Mermaid Code:</div>
                  <div className="bg-slate-800/50 rounded-lg p-4 font-mono text-xs text-green-400 overflow-x-auto">
                    <pre>{!isTyping ? demoExamples[currentExample].code : "..."}</pre>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-2">Rendered Diagram:</div>
                  <div className="bg-white/10 rounded-lg p-4 flex items-center justify-center min-h-[120px]">
                    <div className="text-6xl opacity-50">
                      {!isTyping ? "📊" : "⏳"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-6">
                {demoExamples.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentExample ? 'bg-primary-500 w-8' : 'bg-gray-600'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Gallery */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="gradient-text">Perfect For Every Use Case</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From technical documentation to business processes, DiagramCraft AI has you covered
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, idx) => (
              <div
                key={idx}
                className="group glass rounded-2xl p-8 hover:bg-white/20 transform hover:-translate-y-2 transition-all duration-300 animate-slideUp"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`inline-block p-4 rounded-2xl bg-gradient-to-br ${useCase.gradient} mb-6 text-4xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  {useCase.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {useCase.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Showcase */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="gradient-text">Powered by Modern Tech</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Built with cutting-edge, open-source technologies for maximum performance and reliability
            </p>
          </div>

          {/* Architecture Flow */}
          <div className="max-w-5xl mx-auto glass rounded-3xl p-12 mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {techStack.map((tech, idx) => (
                <React.Fragment key={idx}>
                  <div className="text-center animate-fadeIn" style={{ animationDelay: `${idx * 0.15}s` }}>
                    <div className="w-20 h-20 mx-auto mb-4 glass-dark rounded-2xl flex items-center justify-center text-4xl transform hover:scale-110 hover:rotate-6 transition-all duration-300">
                      {tech.icon}
                    </div>
                    <div className={`font-bold ${tech.color}`}>{tech.name}</div>
                  </div>
                  {idx < techStack.length - 1 && (
                    <div className="hidden md:block text-2xl text-primary-400 animate-pulse" style={{ animationDelay: `${idx * 0.15}s` }}>
                      →
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-white mb-3">Zero Cost</h3>
              <p className="text-gray-400">No subscriptions, no API keys, completely free forever</p>
            </div>
            <div className="glass rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-white mb-3">Lightning Fast</h3>
              <p className="text-gray-400">Local AI processing means instant results every time</p>
            </div>
            <div className="glass rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-white mb-3">Privacy First</h3>
              <p className="text-gray-400">Everything stays on your machine, 100% offline capable</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="gradient-text">Why Choose DiagramCraft?</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience the future of diagram creation with cutting-edge AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group glass rounded-2xl p-8 hover:bg-white/20 transform hover:-translate-y-2 transition-all duration-300 animate-slideUp"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`inline-block p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 text-white transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="gradient-text">How It Works</span>
            </h2>
            <p className="text-xl text-gray-400">
              Four simple steps to create professional diagrams
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Describe Your Process",
                description: "Type your workflow or process in plain English. No technical syntax required.",
              },
              {
                step: "02",
                title: "AI Processes Your Input",
                description: "Our LLaMA 3.1 AI analyzes your description and generates valid Mermaid.js syntax.",
              },
              {
                step: "03",
                title: "Instant Visualization",
                description: "Watch your diagram render in real-time with beautiful, interactive graphics.",
              },
              {
                step: "04",
                title: "Export & Share",
                description: "Download your diagram or save it to history for future reference.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex gap-6 items-start glass rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 animate-slideUp"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-blue-500 flex items-center justify-center text-2xl font-black text-white">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="gradient-text">Loved by Thousands</span>
            </h2>
            <p className="text-xl text-gray-400">
              See what our users have to say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="glass rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 animate-slideUp"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.author}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-300 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="mt-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass rounded-3xl p-12 transform hover:scale-105 transition-all duration-300">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="gradient-text">Ready to Get Started?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of users creating beautiful diagrams with AI
            </p>
            <a
              href="/generate"
              className="inline-block px-10 py-5 bg-gradient-to-r from-primary-600 to-blue-600 rounded-full font-bold text-xl text-white shadow-2xl hover:shadow-primary-500/50 transform hover:scale-110 transition-all duration-300 hover:animate-glow"
            >
              Start Creating Now - It's Free! 🚀
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p className="text-sm">
            DiagramCraft AI - Powered by LLaMA 3.1, FastAPI, React & Mermaid.js
          </p>
          <p className="text-xs mt-2">
            100% Free • 100% Offline • 100% Open Source
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
