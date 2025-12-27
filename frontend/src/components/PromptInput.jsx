import React, { useState } from "react";

const PromptInput = ({ onGenerate, loading }) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onGenerate(prompt);
  };

  const handleClear = () => {
    setPrompt("");
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="prompt" className="block mb-3 text-lg font-semibold text-white">
          Describe Your Diagram
        </label>
        <textarea
          id="prompt"
          className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none"
          rows={6}
          placeholder="Example: Create a login flow where user enters credentials, system validates, and either shows dashboard or error message..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
        />
        <div className="mt-2 flex items-center justify-between text-sm text-gray-400">
          <span>{prompt.length} characters</span>
          {prompt && (
            <button
              type="button"
              onClick={handleClear}
              className="text-primary-400 hover:text-primary-300 transition"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading || !prompt.trim()}
          className="flex-1 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-xl hover:shadow-primary-500/50 transform hover:scale-105 disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <span>✨</span>
              <span>Generate Diagram</span>
            </>
          )}
        </button>
      </div>

      {/* Tips */}
      <div className="glass-dark rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <div className="font-semibold text-white mb-1">Pro Tip</div>
            <div className="text-sm text-gray-400">
              Be specific about the steps and decision points in your process for better results.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
