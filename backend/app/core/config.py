from pydantic import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # MongoDB Configuration
    MONGODB_URL: str = "mongodb://localhost:27017/"
    MONGODB_DB_NAME: str = "diagramcraft"
    
    # Ollama Configuration
    OLLAMA_URL: str = "http://localhost:11434/api/generate"
    OLLAMA_MODEL: str = "llama3.1"
    OLLAMA_TIMEOUT: int = 240

    # Groq Configuration
    GROQ_API_KEY: str = ""
    GROQ_MODEL: str = "llama-3.3-70b-versatile"
    
    # LLM Provider (ollama or groq)
    LLM_PROVIDER: str = "groq"
    
    # API Configuration
    API_V1_PREFIX: str = "/api/v1"
    PROJECT_NAME: str = "DiagramCraft AI Backend"
    VERSION: str = "2.0.0"
    
    class Config:
        env_file = ".env"
        case_sensitive = True
    
    @property
    def cors_origins(self) -> List[str]:
        """Get CORS origins as a list."""
        return ["http://localhost:3000", "http://localhost:3001"]

settings = Settings()
