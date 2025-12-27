import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

const DiagramDisplay = ({ code }) => {
  const containerRef = useRef(null);
  const [editableCode, setEditableCode] = useState(code);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  // Update local state when prop changes (new AI generation)
  useEffect(() => {
    setEditableCode(code);
  }, [code]);

  useEffect(() => {
    let isMounted = true;
    if (!editableCode) return;

    const renderDiagram = async () => {
      setError(null);

      // Check if it's TikZ code
      if (editableCode.trim().startsWith('\\documentclass')) {
        if (isMounted && containerRef.current) {
          containerRef.current.innerHTML = `
            <div class="p-6 text-center">
              <div class="text-6xl mb-4">📄</div>
              <h3 class="text-xl font-bold text-white mb-2">LaTeX/TikZ Diagram</h3>
              <p class="text-gray-400 mb-6">This is professional LaTeX code. Copy it to Overleaf to render.</p>
              <div class="bg-slate-900 p-4 rounded-xl text-left overflow-auto max-h-96 font-mono text-sm text-blue-300 border border-white/10">
                <pre>${editableCode.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
              </div>
            </div>
          `;
        }
        return;
      }

      try {
        // Configure Mermaid
        mermaid.initialize({
          startOnLoad: false,
          suppressErrorRendering: true,
          theme: 'default', // Changed to default (light) to match user preference
          securityLevel: 'loose',
          flowchart: { htmlLabels: false },
          htmlLabels: false,
        });

        // Pre-validate syntax
        try {
          await mermaid.parse(editableCode);
        } catch (e) {
          console.error("Mermaid parse error:", e);
          if (isMounted) {
            const errorMessage = e.message || "Unknown syntax error";
            setError(`Syntax Error: ${errorMessage}`);
          }
          return;
        }

        // Render
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, editableCode);

        if (isMounted && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        console.error("Mermaid render error:", err);
        if (isMounted) {
          setError(`Rendering Error: ${err.message || "Failed to render diagram"}`);
        }
      }
    };

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [editableCode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(editableCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCode = () => {
    const blob = new Blob([editableCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagram.mmd';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadImage = async () => {
    if (!containerRef.current) return;

    const svgElement = containerRef.current.querySelector('svg');
    if (!svgElement) return;

    // Get SVG data
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    // Set canvas size to match SVG (with some padding/scaling for quality)
    const svgRect = svgElement.getBoundingClientRect();
    const scale = 2; // 2x resolution for better quality
    canvas.width = svgRect.width * scale;
    canvas.height = svgRect.height * scale;

    // Create a blob URL for the SVG
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      // Draw white background first (otherwise transparent)
      ctx.fillStyle = '#1e1e2e'; // Match dark theme background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Download
      const pngUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = 'diagram.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  if (!code) return null;

  return (
    <div className="space-y-6">
      {/* Diagram Display */}
      <div className="glass rounded-3xl p-8 animate-slideUp">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Generated Diagram</h2>
          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className="px-4 py-2 glass-dark rounded-xl hover:bg-white/10 transition flex items-center gap-2 text-white"
              title="Copy Mermaid Code"
            >
              {copied ? (
                <>
                  <span>✓</span>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <span>📋</span>
                  <span>Code</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownloadCode}
              className="px-4 py-2 glass-dark rounded-xl hover:bg-white/10 transition flex items-center gap-2 text-white"
              title="Download Mermaid Source"
            >
              <span>📝</span>
              <span>MMD</span>
            </button>
            <button
              onClick={handleDownloadImage}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl transition flex items-center gap-2 text-white shadow-lg shadow-purple-500/20"
              title="Download High-Quality PNG"
            >
              <span>🖼️</span>
              <span>PNG</span>
            </button>
          </div>
        </div>

        {error ? (
          <div className="p-6 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 flex items-center gap-3 mb-6">
            <span className="text-2xl">⚠️</span>
            <span>{error}</span>
          </div>
        ) : (
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 overflow-auto">
            <div ref={containerRef} className="mermaid flex justify-center" />
          </div>
        )}
      </div>

      {/* Live Editor */}
      <div className="glass rounded-3xl p-8 animate-slideUp" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-white">Live Editor</h3>
            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
              Editable
            </span>
          </div>
          <span className="text-sm text-gray-400">Edit code to update diagram instantly</span>
        </div>
        <div className="bg-slate-900/50 rounded-xl border border-white/10 overflow-hidden">
          <textarea
            value={editableCode}
            onChange={(e) => setEditableCode(e.target.value)}
            className="w-full h-64 p-4 bg-transparent text-sm font-mono text-green-400 focus:outline-none resize-y"
            spellCheck="false"
            placeholder="Enter Mermaid code here..."
          />
        </div>
      </div>

      {/* Usage Tips */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-6 text-center">
          <div className="text-3xl mb-2">⚡</div>
          <div className="font-semibold text-white mb-1">Real-time</div>
          <div className="text-sm text-gray-400">Changes update instantly</div>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <div className="text-3xl mb-2">🔄</div>
          <div className="font-semibold text-white mb-1">Edit & Refine</div>
          <div className="text-sm text-gray-400">Fix typos or tweak styles</div>
        </div>
        <div className="glass rounded-2xl p-6 text-center">
          <div className="text-3xl mb-2">💾</div>
          <div className="font-semibold text-white mb-1">Auto-Saved</div>
          <div className="text-sm text-gray-400">Available in history</div>
        </div>
      </div>
    </div>
  );
};

export default DiagramDisplay;
