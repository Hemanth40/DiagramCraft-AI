from fastapi import APIRouter
from app.models.diagram import HealthResponse, DiagramTypeInfo
from app.models.history import StatsResponse
from app.models.enums import DiagramType
from app.services.llm_service import llm_service
from app.db.mongodb import mongodb
from datetime import datetime

router = APIRouter(tags=["utilities"])

@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Check the health of backend services."""
    mongodb_status = "healthy" if mongodb.check_health() else "unhealthy"
    llm_status = "healthy" if await llm_service.check_health() else "unhealthy"
    
    overall_status = "healthy" if mongodb_status == "healthy" and llm_status == "healthy" else "degraded"
    
    return HealthResponse(
        status=overall_status,
        mongodb=mongodb_status,
        ollama=llm_status, # Keeping key name for compatibility or should I change it? Model says ollama.
        timestamp=datetime.utcnow()
    )

@router.get("/diagram-types", response_model=list[DiagramTypeInfo])
async def get_diagram_types():
    """Get list of all supported diagram types."""
    types = []
    
    example_prompts = {
        DiagramType.FLOWCHART: "Create a login flow with authentication and error handling",
        DiagramType.SEQUENCE: "Show the interaction between user, frontend, backend, and database for a login request",
        DiagramType.ER_DIAGRAM: "Design a database schema for a blog with users, posts, and comments",
        DiagramType.CLASS_DIAGRAM: "Create a class diagram for an e-commerce system with Product, Cart, and Order classes",
        DiagramType.STATE_DIAGRAM: "Model the states of an order: pending, processing, shipped, delivered, cancelled",
        DiagramType.MINDMAP: "Create a mindmap for planning a web application project",
        DiagramType.GANTT: "Create a project timeline for building a mobile app over 3 months",
        DiagramType.PIE_CHART: "Show the distribution of programming languages used in a project",
        DiagramType.USER_JOURNEY: "Map the user journey for online shopping from browsing to checkout",
        DiagramType.GIT_GRAPH: "Show a git workflow with main, develop, and feature branches",
        DiagramType.TIKZ: "Create a high-quality ER diagram for a library system using tikz-er2",
    }
    
    for diagram_type in DiagramType:
        types.append(DiagramTypeInfo(
            type=diagram_type.value,
            name=diagram_type.value.replace('_', ' ').title(),
            description=DiagramType.get_description(diagram_type),
            mermaid_prefix=DiagramType.get_mermaid_prefix(diagram_type),
            example_prompt=example_prompts.get(diagram_type, "")
        ))
    
    return types

@router.get("/stats", response_model=StatsResponse)
async def get_stats():
    """Get usage statistics."""
    stats = mongodb.get_stats()
    
    return StatsResponse(
        total_diagrams=stats["total_diagrams"],
        by_type=stats["by_type"],
        most_popular_type=stats["most_popular_type"],
        recent_activity=stats["recent_activity"]
    )
