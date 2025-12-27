import React, { useState, useEffect } from "react";
import PromptInput from "../components/PromptInput";
import DiagramDisplay from "../components/DiagramDisplay";

const Generate = () => {
  const [mermaidCode, setMermaidCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [diagramTypes, setDiagramTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("flowchart");

  // Fetch available diagram types on mount
  useEffect(() => {
    fetchDiagramTypes();
  }, []);

  const fetchDiagramTypes = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/diagram-types");
      if (response.ok) {
        const types = await response.json();
        setDiagramTypes(types);
      }
    } catch (err) {
      console.error("Failed to fetch diagram types:", err);
    }
  };

  const generateDiagram = async (prompt) => {
    setLoading(true);
    setError(null);
    setMermaidCode("");

    try {
      const response = await fetch("http://localhost:8000/api/v1/diagrams/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          diagram_type: selectedType
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to generate diagram");
      }

      const data = await response.json();
      setMermaidCode(data.mermaid_code);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const examplePrompts = {
    flowchart: [
      "Create a login flow with authentication and error handling",
      "Show an e-commerce checkout process with payment gateway",
    ],
    sequence: [
      "Show the interaction between user, frontend, backend, and database for a login request",
      "Create a sequence diagram for an API call with authentication",
    ],
    er: [
      "Design a database schema for a blog with users, posts, and comments",
      "Create an ER diagram for an e-commerce system with products, orders, and customers",
    ],
    class: [
      "Create a class diagram for an e-commerce system with Product, Cart, and Order classes",
      "Design a class structure for a social media application",
    ],
    state: [
      "Model the states of an order: pending, processing, shipped, delivered, cancelled",
      "Create a state diagram for a traffic light system",
    ],
    mindmap: [
      "Create a mindmap for planning a web application project",
      "Design a mindmap for learning full-stack development",
    ],
    gantt: [
      "Create a project timeline for building a mobile app over 3 months",
      "Plan a website redesign project with milestones",
    ],
    pie: [
      "Show the distribution of programming languages used in a project",
      "Display market share of different smartphone brands",
    ],
    journey: [
      "Map the user journey for online shopping from browsing to checkout",
      "Create a user journey for signing up and onboarding",
    ],
    gitGraph: [
      "Show a git workflow with main, develop, and feature branches",
      "Illustrate a hotfix workflow in git",
    ],
  };

  const currentExamples = examplePrompts[selectedType] || examplePrompts.flowchart;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-6xl md:text-7xl font-black mb-6">
            <span className="gradient-text">Generate Diagram</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose your diagram type and describe your process in plain English
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Diagram Type Selector */}
          <div className="glass rounded-3xl p-6 mb-8 animate-slideUp">
            <label className="block mb-3 text-lg font-semibold text-white">
              Select Diagram Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {diagramTypes.map((type) => (
                <button
                  key={type.type}
                  onClick={() => setSelectedType(type.type)}
                  className={`p-4 rounded-xl font-semibold transition-all duration-300 ${selectedType === type.type
                      ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-xl scale-105'
                      : 'glass-dark text-gray-300 hover:bg-white/10'
                    }`}
                >
                  {type.name}
                </button>
              ))}
            </div>
            {diagramTypes.find(t => t.type === selectedType) && (
              <div className="mt-4 p-4 glass-dark rounded-xl">
                <p className="text-sm text-gray-400">
                  {diagramTypes.find(t => t.type === selectedType).description}
                </p>
              </div>
            )}
          </div>

          {/* Input Section */}
          <div className="glass rounded-3xl p-8 md:p-10 mb-8 animate-slideUp">
            <PromptInput onGenerate={generateDiagram} loading={loading} />

            {error && (
              <div className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⚠️</span>
                  <span>{error}</span>
                </div>
              </div>
            )}
          </div>

          {/* Example Prompts */}
          {!mermaidCode && !loading && (
            <div className="glass rounded-3xl p-8 mb-8 animate-slideUp" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-2xl font-bold text-white mb-4">Try These Examples</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {currentExamples.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const input = document.querySelector('textarea');
                      if (input) {
                        input.value = prompt;
                        input.dispatchEvent(new Event('input', { bubbles: true }));
                      }
                    }}
                    className="text-left p-4 glass-dark rounded-xl hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">💡</span>
                      <span className="text-gray-300">{prompt}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Diagram Display */}
          {mermaidCode && (
            <div className="animate-slideUp" style={{ animationDelay: '0.2s' }}>
              <DiagramDisplay code={mermaidCode} />
            </div>
          )}

          {/* Features Info */}
          {!mermaidCode && !loading && (
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="glass rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-3">🤖</div>
                <h3 className="font-bold text-white mb-2">AI-Powered</h3>
                <p className="text-sm text-gray-400">LLaMA 3.1 generates perfect Mermaid syntax</p>
              </div>
              <div className="glass rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-3">📊</div>
                <h3 className="font-bold text-white mb-2">10 Diagram Types</h3>
                <p className="text-sm text-gray-400">Flowchart, Sequence, ER, Class, and more</p>
              </div>
              <div className="glass rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-3">💾</div>
                <h3 className="font-bold text-white mb-2">Auto-Saved</h3>
                <p className="text-sm text-gray-400">All diagrams saved to history automatically</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generate;
