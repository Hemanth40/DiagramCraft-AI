from pydantic import BaseModel, Field
from typing import List
from datetime import datetime

class HistoryItem(BaseModel):
    """Single history item."""
    id: str = Field(..., description="Unique identifier")
    prompt: str = Field(..., description="Original prompt")
    diagram_type: str = Field(..., description="Type of diagram")
    mermaid_code: str = Field(..., description="Generated Mermaid code")
    created_at: datetime = Field(..., description="Creation timestamp")

class HistoryResponse(BaseModel):
    """Response model for history endpoint."""
    history: List[HistoryItem] = Field(..., description="List of history items")
    total: int = Field(..., description="Total number of items")
    limit: int = Field(..., description="Limit applied")
    diagram_type_filter: str | None = Field(None, description="Filter applied by diagram type")

class StatsResponse(BaseModel):
    """Statistics response."""
    total_diagrams: int = Field(..., description="Total diagrams generated")
    by_type: dict = Field(..., description="Count by diagram type")
    most_popular_type: str = Field(..., description="Most used diagram type")
    recent_activity: int = Field(..., description="Diagrams generated in last 24h")
