from fastapi import APIRouter, HTTPException
from app.models.diagram import DiagramRequest, DiagramResponse
from app.services.llm_service import llm_service
from app.db.mongodb import mongodb
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/diagrams", tags=["diagrams"])

@router.post("/generate", response_model=DiagramResponse)
async def generate_diagram(request: DiagramRequest):
    """
    Generate a Mermaid diagram from natural language description.
    
    Supports 10 diagram types:
    - flowchart, sequence, er, class, state, mindmap, gantt, pie, journey, gitGraph
    """
    try:
        # Generate diagram using LLM Service
        mermaid_code = await llm_service.generate_diagram(
            request.prompt,
            request.diagram_type
        )
        
        # Save to database
        diagram_id = mongodb.save_diagram(
            request.prompt,
            mermaid_code,
            request.diagram_type.value
        )
        
        return DiagramResponse(
            id=diagram_id,
            mermaid_code=mermaid_code,
            diagram_type=request.diagram_type.value,
            prompt=request.prompt,
            created_at=datetime.utcnow()
        )
        
    except Exception as e:
        logger.error(f"Failed to generate diagram: {e}")
        raise HTTPException(status_code=500, detail=str(e))
