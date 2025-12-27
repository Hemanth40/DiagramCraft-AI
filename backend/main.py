from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
from models import save_prompt_and_diagram, get_history
import json

app = FastAPI(title="DiagramCraft AI Backend")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OLLAMA_URL = "http://localhost:11434/api/generate"

@app.post("/generate")
async def generate_diagram(prompt: str):
    """Generate Mermaid code from text prompt using Ollama."""
    if not prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt cannot be empty")

    # Prepare prompt for Ollama
    ollama_prompt = f"""
Convert the following natural language description into valid Mermaid.js flowchart syntax.
Ensure the output is only the Mermaid code, starting with 'graph TD' or similar, and no additional text.

Description: {prompt}

Mermaid Code:
"""

    payload = {
        "model": "llama3.1",
        "prompt": ollama_prompt,
        "stream": False
    }

    try:
        response = requests.post(OLLAMA_URL, json=payload, timeout=30)
        response.raise_for_status()
        result = response.json()
        mermaid_code = result.get('response', '').strip()

        # Basic validation: check if it starts with graph
        if not mermaid_code.startswith('graph'):
            # Attempt to fix or regenerate
            mermaid_code = f"graph TD;\nA[{prompt[:50]}...];"

        # Save to DB
        save_prompt_and_diagram(prompt, mermaid_code)

        return {"mermaid_code": mermaid_code}

    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Ollama error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")

@app.get("/history")
async def get_diagram_history(limit: int = 10):
    """Retrieve recent diagram history."""
    history = get_history(limit)
    return {"history": history}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
