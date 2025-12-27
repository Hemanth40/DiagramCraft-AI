from pymongo import MongoClient, DESCENDING
from pymongo.errors import ConnectionFailure
from datetime import datetime, timedelta
from typing import List, Optional, Dict
import logging
from app.core.config import settings

logger = logging.getLogger(__name__)

class MongoDB:
    """MongoDB connection and operations."""
    
    def __init__(self):
        self.client = None
        self.db = None
        self.history_collection = None
        self.users_collection = None
        self.connect()
    
    def connect(self):
        """Establish MongoDB connection."""
        try:
            self.client = MongoClient(settings.MONGODB_URL, serverSelectionTimeoutMS=5000)
            # Test connection
            self.client.admin.command('ping')
            self.db = self.client[settings.MONGODB_DB_NAME]
            self.history_collection = self.db.history
            self.users_collection = self.db.users
            
            # Create indexes for better performance
            self.history_collection.create_index([("created_at", DESCENDING)])
            self.history_collection.create_index([("diagram_type", 1)])
            self.users_collection.create_index([("email", 1)], unique=True)
            
            logger.info("Successfully connected to MongoDB")
        except ConnectionFailure as e:
            logger.error(f"Failed to connect to MongoDB: {e}")
            raise
    
    def save_diagram(self, prompt: str, mermaid_code: str, diagram_type: str) -> str:
        """Save a generated diagram to the database."""
        try:
            entry = {
                "prompt": prompt,
                "mermaid_code": mermaid_code,
                "diagram_type": diagram_type,
                "created_at": datetime.utcnow()
            }
            result = self.history_collection.insert_one(entry)
            logger.info(f"Saved diagram with ID: {result.inserted_id}")
            return str(result.inserted_id)
        except Exception as e:
            logger.error(f"Failed to save diagram: {e}")
            raise
    
    def get_history(self, limit: int = 10, diagram_type: Optional[str] = None) -> List[Dict]:
        """Retrieve diagram history with optional filtering."""
        try:
            query = {}
            if diagram_type:
                query["diagram_type"] = diagram_type
            
            cursor = self.history_collection.find(query).sort("created_at", DESCENDING).limit(limit)
            
            history = []
            for doc in cursor:
                history.append({
                    "id": str(doc["_id"]),
                    "prompt": doc["prompt"],
                    "mermaid_code": doc["mermaid_code"],
                    "diagram_type": doc.get("diagram_type", "flowchart"),
                    "created_at": doc["created_at"]
                })
            
            return history
        except Exception as e:
            logger.error(f"Failed to retrieve history: {e}")
            return []
    
    def get_diagram_by_id(self, diagram_id: str) -> Optional[Dict]:
        """Get a specific diagram by ID."""
        try:
            from bson import ObjectId
            doc = self.history_collection.find_one({"_id": ObjectId(diagram_id)})
            
            if doc:
                return {
                    "id": str(doc["_id"]),
                    "prompt": doc["prompt"],
                    "mermaid_code": doc["mermaid_code"],
                    "diagram_type": doc.get("diagram_type", "flowchart"),
                    "created_at": doc["created_at"]
                }
            return None
        except Exception as e:
            logger.error(f"Failed to get diagram: {e}")
            return None
    
    def delete_diagram(self, diagram_id: str) -> bool:
        """Delete a diagram by ID."""
        try:
            from bson import ObjectId
            result = self.history_collection.delete_one({"_id": ObjectId(diagram_id)})
            return result.deleted_count > 0
        except Exception as e:
            logger.error(f"Failed to delete diagram: {e}")
            return False
    
    def get_stats(self) -> Dict:
        """Get usage statistics."""
        try:
            total = self.history_collection.count_documents({})
            
            # Count by type
            pipeline = [
                {"$group": {"_id": "$diagram_type", "count": {"$sum": 1}}},
                {"$sort": {"count": -1}}
            ]
            by_type = {item["_id"]: item["count"] for item in self.history_collection.aggregate(pipeline)}
            
            # Most popular type
            most_popular = max(by_type, key=by_type.get) if by_type else "flowchart"
            
            # Recent activity (last 24 hours)
            yesterday = datetime.utcnow() - timedelta(days=1)
            recent = self.history_collection.count_documents({"created_at": {"$gte": yesterday}})
            
            return {
                "total_diagrams": total,
                "by_type": by_type,
                "most_popular_type": most_popular,
                "recent_activity": recent
            }
        except Exception as e:
            logger.error(f"Failed to get stats: {e}")
            return {
                "total_diagrams": 0,
                "by_type": {},
                "most_popular_type": "flowchart",
                "recent_activity": 0
            }

    # User Operations
    def create_user(self, user_data: dict) -> str:
        """Create a new user."""
        try:
            result = self.users_collection.insert_one(user_data)
            return str(result.inserted_id)
        except Exception as e:
            logger.error(f"Failed to create user: {e}")
            raise

    def get_user_by_email(self, email: str) -> Optional[dict]:
        """Get user by email."""
        try:
            user = self.users_collection.find_one({"email": email})
            if user:
                user["id"] = str(user["_id"])
            return user
        except Exception as e:
            logger.error(f"Failed to get user by email: {e}")
            return None
    
    def check_health(self) -> bool:
        """Check if MongoDB is accessible."""
        try:
            self.client.admin.command('ping')
            return True
        except:
            return False

# Singleton instance
mongodb = MongoDB()
