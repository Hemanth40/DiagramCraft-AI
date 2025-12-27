import React from "react";

const About = () => {
  const features = [
    {
      icon: "🤖",
      title: "AI-Powered",
      description: "Uses LLaMA 3.1 via Ollama for intelligent diagram generation",
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Local processing means instant results with zero latency",
    },
    {
      icon: "🔒",
      title: "Privacy First",
      description: "100% offline capable - your data never leaves your machine",
    },
    {
      icon: "💰",
      title: "Completely Free",
      description: "No subscriptions, no API keys, no hidden costs ever",
    },
    {
      icon: "📊",
      title: "Mermaid.js",
      description: "Industry-standard diagram rendering with beautiful visuals",
    },
    {
      icon: "💾",
      title: "History & Export",
      description: "Save your work and export code for documentation",
    },
  ];

  const techStack = [
    {
      category: "Frontend",
      technologies: [
        { name: "React.js", description: "Modern UI framework for dynamic interfaces" },
        { name: "Tailwind CSS", description: "Utility-first CSS for rapid styling" },
        { name: "Mermaid.js", description: "Diagram rendering engine" },
      ],
    },
    {
      category: "Backend",
      technologies: [
        { name: "FastAPI", description: "High-performance Python web framework" },
        { name: "Python 3.11", description: "Latest Python with performance improvements" },
        { name: "Uvicorn", description: "Lightning-fast ASGI server" },
      ],
    },
    {
      category: "AI & Data",
      technologies: [
        { name: "LLaMA 3.1", description: "Open-source large language model" },
        { name: "Ollama", description: "Local AI model orchestration" },
        { name: "MongoDB", description: "NoSQL database for flexible storage" },
      ],
    },
  ];

  const stats = [
    { label: "Technologies", value: "9+", icon: "🛠️" },
    { label: "Features", value: "15+", icon: "✨" },
    { label: "Open Source", value: "100%", icon: "🔓" },
    { label: "Cost", value: "$0", icon: "💵" },
  ];

  const roadmap = [
    {
      status: "completed",
      title: "Core Features",
      items: ["AI diagram generation", "Real-time rendering", "History management", "Export functionality"],
    },
    {
      status: "in-progress",
      title: "Enhancements",
      items: ["Diagram editing", "Multiple diagram types", "Collaboration features", "Advanced export options"],
    },
    {
      status: "planned",
      title: "Future Plans",
      items: ["Mobile app", "Cloud sync (optional)", "Team workspaces", "Custom templates"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fadeIn">
          <h1 className="text-6xl md:text-7xl font-black mb-6">
            <span className="gradient-text">About DiagramCraft AI</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            An intelligent, full-stack platform that transforms natural language into professional flowcharts
          </p>
        </div>

        {/* Project Story */}
        <section className="mb-20">
          <div className="glass rounded-3xl p-8 md:p-12 animate-slideUp">
            <h2 className="text-4xl font-black mb-6 gradient-text">The Story</h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                <strong className="text-white">The Problem:</strong> Creating diagrams manually is time-consuming and tedious.
                Whether you're documenting software architecture, designing business processes, or preparing for interviews,
                traditional diagramming tools require significant effort and technical knowledge.
              </p>
              <p>
                <strong className="text-white">The Solution:</strong> DiagramCraft AI leverages the power of artificial intelligence
                to make diagram creation automatic, fast, and intelligent. Simply describe what you want in plain English,
                and watch as AI generates professional Mermaid.js flowcharts instantly.
              </p>
              <p>
                <strong className="text-white">The Vision:</strong> To democratize diagram creation by making it accessible to everyone,
                regardless of technical skill level. No subscriptions, no API keys, no limits - just pure, offline AI power
                running on your local machine.
              </p>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">
            <span className="gradient-text">Key Features</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="glass rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 animate-slideUp"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="glass rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">
            <span className="gradient-text">Technology Stack</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {techStack.map((stack, idx) => (
              <div
                key={idx}
                className="glass rounded-2xl p-8 animate-slideUp"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="text-3xl">
                    {stack.category === "Frontend" ? "⚛️" : stack.category === "Backend" ? "⚡" : "🧠"}
                  </span>
                  {stack.category}
                </h3>
                <div className="space-y-4">
                  {stack.technologies.map((tech, techIdx) => (
                    <div key={techIdx} className="border-l-2 border-primary-500 pl-4">
                      <div className="font-bold text-white">{tech.name}</div>
                      <div className="text-sm text-gray-400">{tech.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">
            <span className="gradient-text">System Architecture</span>
          </h2>
          <div className="glass rounded-3xl p-8 md:p-12">
            <div className="flex flex-col gap-4 text-center">
              {[
                { name: "React.js Frontend", icon: "⚛️", desc: "User Interface & Interaction" },
                { name: "FastAPI Backend", icon: "⚡", desc: "API & Business Logic" },
                { name: "Ollama + LLaMA 3.1", icon: "🤖", desc: "AI Processing" },
                { name: "Mermaid.js", icon: "📊", desc: "Diagram Rendering" },
                { name: "MongoDB", icon: "🍃", desc: "Data Storage" },
              ].map((layer, idx) => (
                <React.Fragment key={idx}>
                  <div className="glass-dark rounded-xl p-6 transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-center gap-4">
                      <span className="text-4xl">{layer.icon}</span>
                      <div className="text-left">
                        <div className="font-bold text-white text-lg">{layer.name}</div>
                        <div className="text-sm text-gray-400">{layer.desc}</div>
                      </div>
                    </div>
                  </div>
                  {idx < 4 && (
                    <div className="flex justify-center">
                      <div className="text-3xl text-primary-400 animate-pulse">↓</div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">
            <span className="gradient-text">Development Roadmap</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {roadmap.map((phase, idx) => (
              <div
                key={idx}
                className="glass rounded-2xl p-8 animate-slideUp"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-4 h-4 rounded-full ${phase.status === "completed"
                        ? "bg-green-500"
                        : phase.status === "in-progress"
                          ? "bg-yellow-500 animate-pulse"
                          : "bg-gray-500"
                      }`}
                  ></div>
                  <h3 className="text-2xl font-bold text-white">{phase.title}</h3>
                </div>
                <ul className="space-y-3">
                  {phase.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2 text-gray-300">
                      <span className="text-primary-400 mt-1">
                        {phase.status === "completed" ? "✓" : phase.status === "in-progress" ? "⟳" : "○"}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Open Source */}
        <section className="mb-20">
          <div className="glass rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-4xl font-black mb-6 gradient-text">Open Source & Community</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              DiagramCraft AI is built with open-source technologies and embraces the open-source philosophy.
              The project demonstrates modern full-stack development, AI integration, and best practices in software engineering.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-blue-600 rounded-full font-bold text-white shadow-xl hover:shadow-primary-500/50 transform hover:scale-105 transition-all duration-300"
              >
                View on GitHub →
              </a>
              <a
                href="/generate"
                className="px-8 py-4 glass rounded-full font-bold text-white hover:bg-white/20 transform hover:scale-105 transition-all duration-300"
              >
                Try It Now
              </a>
            </div>
          </div>
        </section>

        {/* Skills Demonstrated */}
        <section>
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">
            <span className="gradient-text">Skills Demonstrated</span>
          </h2>
          <div className="glass rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Technical Skills</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> Full-stack web development
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> AI/ML integration
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> RESTful API design
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> Database management
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> Modern UI/UX design
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span> Real-time data processing
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Soft Skills</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">✓</span> Problem-solving
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">✓</span> System architecture design
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">✓</span> Project planning
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">✓</span> User-centric thinking
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">✓</span> Documentation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">✓</span> Continuous learning
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
