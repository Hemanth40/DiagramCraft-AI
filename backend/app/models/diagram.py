from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from app.models.enums import DiagramType

class DiagramRequest(BaseModel):
    """Request model for diagram generation."""
    prompt: str = Field(..., min_length=1, max_length=2000, description="Natural language description of the diagram")
    diagram_type: DiagramType = Field(default=DiagramType.FLOWCHART, description="Type of diagram to generate")
    
    class Config:
        json_schema_extra = {
            "example": {
                "prompt": "Create a login flow with authentication and error handling",
                "diagram_type": "flowchart"
            }
        }

class DiagramResponse(BaseModel):
    """Response model for generated diagram."""
    id: str = Field(..., description="Unique identifier for the diagram")
    mermaid_code: str = Field(..., description="Generated Mermaid.js code")
    diagram_type: str = Field(..., description="Type of diagram generated")
    prompt: str = Field(..., description="Original prompt used")
    created_at: datetime = Field(..., description="Timestamp of creation")
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "507f1f77bcf86cd799439011",
                "mermaid_code": "graph TD\n  A[Start] --> B[Login]\n  B --> C{Valid?}\n  C -->|Yes| D[Dashboard]\n  C -->|No| E[Error]",
                "diagram_type": "flowchart",
                "prompt": "Create a login flow",
                "created_at": "2024-01-01T12:00:00Z"
            }
        }

class DiagramTypeInfo(BaseModel):
    """Information about a diagram type."""
    type: str = Field(..., description="Diagram type identifier")
    name: str = Field(..., description="Human-readable name")
    description: str = Field(..., description="Description of the diagram type")
    mermaid_prefix: str = Field(..., description="Mermaid syntax prefix")
    example_prompt: str = Field(..., description="Example prompt for this type")

class HealthResponse(BaseModel):
    """Health check response."""
    status: str = Field(..., description="Overall health status")
    mongodb: str = Field(..., description="MongoDB connection status")
    ollama: str = Field(..., description="Ollama service status")
    timestamp: datetime = Field(..., description="Health check timestamp")
