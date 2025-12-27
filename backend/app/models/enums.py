from enum import Enum

class DiagramType(str, Enum):
    """Supported Mermaid diagram types."""
    FLOWCHART = "flowchart"
    SEQUENCE = "sequence"
    ER_DIAGRAM = "er"
    CLASS_DIAGRAM = "class"
    STATE_DIAGRAM = "state"
    MINDMAP = "mindmap"
    GANTT = "gantt"
    PIE_CHART = "pie"
    USER_JOURNEY = "journey"
    GIT_GRAPH = "gitGraph"
    TIKZ = "tikz"

    @classmethod
    def get_description(cls, diagram_type: str) -> str:
        """Get human-readable description for each diagram type."""
        descriptions = {
            cls.FLOWCHART: "Flowcharts and process diagrams",
            cls.SEQUENCE: "Sequence diagrams for interactions",
            cls.ER_DIAGRAM: "Entity Relationship diagrams for databases",
            cls.CLASS_DIAGRAM: "Class diagrams for OOP structures",
            cls.STATE_DIAGRAM: "State diagrams for state machines",
            cls.MINDMAP: "Mindmaps for brainstorming and organization",
            cls.GANTT: "Gantt charts for project timelines",
            cls.PIE_CHART: "Pie charts for data visualization",
            cls.USER_JOURNEY: "User journey maps for UX flows",
            cls.GIT_GRAPH: "Git workflow and branching diagrams",
            cls.TIKZ: "Professional LaTeX/TikZ diagrams (for Overleaf)",
        }
        return descriptions.get(diagram_type, "Unknown diagram type")

    @classmethod
    def get_mermaid_prefix(cls, diagram_type: str) -> str:
        """Get the Mermaid syntax prefix for each diagram type."""
        prefixes = {
            cls.FLOWCHART: "graph TD",
            cls.SEQUENCE: "sequenceDiagram",
            cls.ER_DIAGRAM: "erDiagram",
            cls.CLASS_DIAGRAM: "classDiagram",
            cls.STATE_DIAGRAM: "stateDiagram-v2",
            cls.MINDMAP: "mindmap",
            cls.GANTT: "gantt",
            cls.PIE_CHART: "pie",
            cls.USER_JOURNEY: "journey",
            cls.GIT_GRAPH: "gitGraph",
            cls.TIKZ: "\\documentclass{standalone}",
        }
        return prefixes.get(diagram_type, "graph TD")
