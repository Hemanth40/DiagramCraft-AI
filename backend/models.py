from pymongo import MongoClient
from datetime import datetime

client = MongoClient("mongodb://localhost:27017/")
db = client.diagramcraft

history_collection = db.history
diagrams_collection = db.diagrams

def save_prompt_and_diagram(prompt: str, mermaid_code: str):
    """Save the prompt and generated diagram Mermaid code to the database."""
    entry = {
        "prompt": prompt,
        "mermaid_code": mermaid_code,
        "created_at": datetime.utcnow()
    }
    result = history_collection.insert_one(entry)
    diagrams_collection.insert_one({
        "diagram_id": result.inserted_id,
        "mermaid_code": mermaid_code,
        "created_at": datetime.utcnow()
    })

def get_history(limit=10):
    """Retrieve the last 'limit' entries from the history collection."""
    cursor = history_collection.find().sort("created_at", -1).limit(limit)
    return [{"prompt": doc["prompt"], "mermaid_code": doc["mermaid_code"], "created_at": doc["created_at"].isoformat()} for doc in cursor]
