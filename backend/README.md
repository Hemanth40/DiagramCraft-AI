# DiagramCraft AI - Backend

## Overview
Multi-diagram AI generation backend supporting 10 Mermaid diagram types powered by LLaMA 3.1 via Ollama.

## Supported Diagram Types
1. **Flowcharts** - Process flows and decision trees
2. **Sequence Diagrams** - Interaction sequences
3. **ER Diagrams** - Database entity relationships
4. **Class Diagrams** - OOP class structures
5. **State Diagrams** - State machines
6. **Mindmaps** - Brainstorming and organization
7. **Gantt Charts** - Project timelines
8. **Pie Charts** - Data visualization
9. **User Journey** - UX flow mapping
10. **Git Graphs** - Git workflow diagrams

## Setup

### Prerequisites
- Python 3.11+
- MongoDB (running on localhost:27017)
- Ollama with LLaMA 3.1 model (running on localhost:11434)

### Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Copy environment file:
```bash
cp .env.example .env
```

3. Start MongoDB (if not running):
```bash
mongod
```

4. Start Ollama (if not running):
```bash
ollama serve
```

5. Pull LLaMA 3.1 model:
```bash
ollama pull llama3.1
```

### Running the Server

```bash
# Development
python -m app.main

# Or with uvicorn
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

### Diagram Generation
- **POST** `/api/v1/diagrams/generate`
  - Generate a diagram from natural language
  - Body: `{ "prompt": "string", "diagram_type": "flowchart" }`

### History
- **GET** `/api/v1/history?limit=10&diagram_type=flowchart`
  - Get generation history with optional filtering
- **GET** `/api/v1/history/{id}`
  - Get specific diagram by ID
- **DELETE** `/api/v1/history/{id}`
  - Delete diagram

### Utilities
- **GET** `/api/v1/health`
  - Health check for MongoDB and Ollama
- **GET** `/api/v1/diagram-types`
  - List all supported diagram types with examples
- **GET** `/api/v1/stats`
  - Usage statistics

## API Documentation
Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure
```
backend/
├── app/
│   ├── main.py              # FastAPI application
│   ├── api/routes/          # API endpoints
│   ├── models/              # Pydantic models
│   ├── services/            # Business logic
│   ├── db/                  # Database operations
│   └── core/                # Configuration
├── requirements.txt
└── .env
```

## Environment Variables
See `.env.example` for all available configuration options.

## Development
- Logs are output to console with timestamps
- MongoDB indexes are created automatically
- Ollama health check on startup
- CORS enabled for frontend (localhost:3000)
