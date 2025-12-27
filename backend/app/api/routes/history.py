from fastapi import APIRouter, HTTPException, Query
from app.models.history import HistoryResponse, HistoryItem
from app.db.mongodb import mongodb
from typing import Optional
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/history", tags=["history"])

@router.get("", response_model=HistoryResponse)
async def get_history(
    limit: int = Query(default=10, ge=1, le=100),
    diagram_type: Optional[str] = Query(default=None)
):
    """
    Get diagram generation history.
    
    - **limit**: Number of items to return (1-100)
    - **diagram_type**: Optional filter by diagram type
    """
    try:
        history_data = mongodb.get_history(limit=limit, diagram_type=diagram_type)
        
        history_items = [
            HistoryItem(
                id=item["id"],
                prompt=item["prompt"],
                diagram_type=item["diagram_type"],
                mermaid_code=item["mermaid_code"],
                created_at=item["created_at"]
            )
            for item in history_data
        ]
        
        return HistoryResponse(
            history=history_items,
            total=len(history_items),
            limit=limit,
            diagram_type_filter=diagram_type
        )
        
    except Exception as e:
        logger.error(f"Failed to get history: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve history")

@router.get("/{diagram_id}", response_model=HistoryItem)
async def get_diagram(diagram_id: str):
    """Get a specific diagram by ID."""
    try:
        diagram = mongodb.get_diagram_by_id(diagram_id)
        
        if not diagram:
            raise HTTPException(status_code=404, detail="Diagram not found")
        
        return HistoryItem(
            id=diagram["id"],
            prompt=diagram["prompt"],
            diagram_type=diagram["diagram_type"],
            mermaid_code=diagram["mermaid_code"],
            created_at=diagram["created_at"]
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to get diagram: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve diagram")

@router.delete("/{diagram_id}")
async def delete_diagram(diagram_id: str):
    """Delete a diagram by ID."""
    try:
        success = mongodb.delete_diagram(diagram_id)
        
        if not success:
            raise HTTPException(status_code=404, detail="Diagram not found")
        
        return {"message": "Diagram deleted successfully", "id": diagram_id}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to delete diagram: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete diagram")
