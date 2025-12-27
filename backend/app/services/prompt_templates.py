from app.models.enums import DiagramType

class PromptTemplates:
    """Prompt templates for each diagram type to ensure correct Mermaid syntax."""
    
    @staticmethod
    def get_template(diagram_type: DiagramType, user_prompt: str) -> str:
        """Get the appropriate prompt template for the diagram type."""
        templates = {
            DiagramType.FLOWCHART: PromptTemplates._flowchart_template,
            DiagramType.SEQUENCE: PromptTemplates._sequence_template,
            DiagramType.ER_DIAGRAM: PromptTemplates._er_diagram_template,
            DiagramType.CLASS_DIAGRAM: PromptTemplates._class_diagram_template,
            DiagramType.STATE_DIAGRAM: PromptTemplates._state_diagram_template,
            DiagramType.MINDMAP: PromptTemplates._mindmap_template,
            DiagramType.GANTT: PromptTemplates._gantt_template,
            DiagramType.PIE_CHART: PromptTemplates._pie_chart_template,
            DiagramType.USER_JOURNEY: PromptTemplates._user_journey_template,
            DiagramType.GIT_GRAPH: PromptTemplates._git_graph_template,
            DiagramType.TIKZ: PromptTemplates._tikz_template,
        }
        
        template_func = templates.get(diagram_type, PromptTemplates._flowchart_template)
        return template_func(user_prompt)
    
    @staticmethod
    def _flowchart_template(user_prompt: str) -> str:
        return f"""You are a Mermaid.js diagram expert. Convert the description into a valid Mermaid flowchart.

RULES:
1. Start with 'graph TD' (Top-Down) or 'graph LR' (Left-Right).
2. Use valid node syntax: id[Label], id(Round), id{{Decision}}, id[(Database)].
3. Use clean alphanumeric IDs (e.g., A, Node1).
4. NO Markdown blocks. Output ONLY the code.

EXAMPLES:
Input: "Login process where user enters creds, if valid go to home, else show error."
Output:
graph TD
    A[Start] --> B(Enter Credentials)
    B --> C{{Valid?}}
    C -->|Yes| D[Home Page]
    C -->|No| E[Show Error]
    E --> B

Input: "A simple server architecture with Load Balancer pointing to 3 app servers, connected to a DB."
Output:
graph TD
    LB[Load Balancer] --> App1[App Server 1]
    LB --> App2[App Server 2]
    LB --> App3[App Server 3]
    App1 --> DB[(Database)]
    App2 --> DB
    App3 --> DB

Description: {user_prompt}
Generate ONLY the Mermaid flowchart code:"""

    @staticmethod
    def _sequence_template(user_prompt: str) -> str:
        return f"""You are a Mermaid.js diagram expert. Convert the description into a valid Mermaid sequence diagram.

RULES:
1. Start with 'sequenceDiagram'.
2. Define participants: 'participant A as Alice'.
3. Use '->' for sync, '-->' for reply/async.
4. Use 'activate'/'deactivate' for processing.
5. Use 'alt'/'else' for conditions.
6. NO Markdown blocks.

EXAMPLES:
Input: "User logs in. System checks DB. If found, return token, else error."
Output:
sequenceDiagram
    participant U as User
    participant S as System
    participant D as Database
    U->>S: Login Request
    activate S
    S->>D: Check Credentials
    activate D
    D-->>S: Result
    deactivate D
    alt Valid
        S-->>U: Return Token
    else Invalid
        S-->>U: Return Error
    end
    deactivate S

Description: {user_prompt}
Generate ONLY the Mermaid sequence diagram code:"""

    @staticmethod
    def _er_diagram_template(user_prompt: str) -> str:
        # Check for Chen notation keywords
        lower_prompt = user_prompt.lower()
        if any(k in lower_prompt for k in ["chen", "weak entity", "diamond", "associative entity"]):
            return PromptTemplates._chen_er_template(user_prompt)
            
        return f"""You are a Mermaid.js diagram expert. Convert the description into a valid Mermaid ER diagram (Crow's Foot).

RULES:
1. Start with 'erDiagram'.
2. Entities: 'ENTITY {{ type name }}'.
3. Relationships: ||--||, ||--o{{, }}o--o{{.
4. Format: Entity ||--o{{ Other : "label"
5. NO diamonds/ovals (use Chen notation if asked).
6. NO Markdown blocks.

EXAMPLES:
Input: "Users have many orders. Orders contain items."
Output:
erDiagram
    USER ||--o{{ ORDER : places
    ORDER ||--|{{ ITEM : contains
    USER {{
        string name
        string email
    }}
    ORDER {{
        int id
        date created_at
    }}

Description: {user_prompt}
Generate ONLY the Mermaid ER diagram code:"""

    @staticmethod
    def _chen_er_template(user_prompt: str) -> str:
        return f"""You are a Mermaid.js diagram expert. Convert the description into a Chen Notation ER diagram using Flowchart syntax.

RULES:
1. Start with 'graph LR' (preferred) or 'graph TD'.
2. Entities: Rectangles id[Name]. Style: fill:#C8E6C9,stroke:#333,stroke-width:1px
3. Weak Entities: id[[Name]]. Style: fill:#C8E6C9,stroke:#333,stroke-width:4px (to mimic double border)
4. Attributes: Circles id((Name)). Style: fill:#FFCDD2,stroke:#333,stroke-width:1px
5. Key Attributes: id((<u>Name</u>)).
6. Multivalued Attributes: id(((Name))). Style: fill:#FFCDD2,stroke:#333,stroke-width:4px
7. Relationships: Rhombus id{{Name}}. Style: fill:#E1BEE7,stroke:#333,stroke-width:1px
8. Identifying Relationships: id{{Name}}. Style: fill:#E1BEE7,stroke:#333,stroke-width:4px
9. Links: --- (no arrows).
10. Cardinality: -- "1" --- or -- "N" ---.

IMPORTANT: Apply styles using `style` commands at the end or inline.

EXAMPLES:
Input: "Employee works for Department. Employee has name, ID (key). Department has name."
Output:
graph LR
    Emp[Employee] --- Rel{{Works For}}
    Rel --- Dept[Department]
    Emp -- "N" --- Rel
    Dept -- "1" --- Rel
    Emp --- Name((Name))
    Emp --- ID((<u>ID</u>))
    Dept --- DName((Name))
    
    %% Styling
    style Emp fill:#C8E6C9,stroke:#333,stroke-width:1px
    style Dept fill:#C8E6C9,stroke:#333,stroke-width:1px
    style Rel fill:#E1BEE7,stroke:#333,stroke-width:1px
    style Name fill:#FFCDD2,stroke:#333,stroke-width:1px
    style ID fill:#FFCDD2,stroke:#333,stroke-width:1px
    style DName fill:#FFCDD2,stroke:#333,stroke-width:1px

Description: {user_prompt}
Generate ONLY the Mermaid code (using graph syntax with styling):"""

    @staticmethod
    def _class_diagram_template(user_prompt: str) -> str:
        return f"""You are a Mermaid.js diagram expert. Convert the description into a valid Mermaid class diagram.

RULES:
1. Start with 'classDiagram'.
2. Classes: 'class Name {{ +type name +method() }}'.
3. Relationships: <|-- (Inheritance), *-- (Composition), o-- (Aggregation), --> (Association).
4. Visibility: + (public), - (private), # (protected).
5. NO Markdown blocks.

EXAMPLES:
Input: "Duck and Fish are Animals. Duck can swim."
Output:
classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    class Animal {{
        +int age
        +eat()
    }}
    class Duck {{
        +swim()
    }}

Description: {user_prompt}
Generate ONLY the Mermaid class diagram code:"""

    @staticmethod
    def _state_diagram_template(user_prompt: str) -> str:
        return f"""You are a Mermaid.js diagram expert. Convert the description into a valid Mermaid state diagram.

RULES:
1. Start with 'stateDiagram-v2'.
2. Start/End: [*].
3. Transitions: [*] --> State1, State1 --> State2.
4. Composite: state State1 {{ ... }}.
5. NO Markdown blocks.

EXAMPLES:
Input: "Traffic light: Green -> Yellow -> Red -> Green."
Output:
stateDiagram-v2
    [*] --> Green
    Green --> Yellow
    Yellow --> Red
    Red --> Green
    Red --> [*]

Description: {user_prompt}
Generate ONLY the Mermaid state diagram code:"""

    @staticmethod
    def _mindmap_template(user_prompt: str) -> str:
        return f"""You are a Mermaid.js diagram expert. Convert the description into a valid Mermaid mindmap.

RULES:
1. Start with 'mindmap'.
2. Use indentation (2 spaces) for hierarchy.
3. Root at top.
4. Shapes: (), [], (()).
5. NO Markdown blocks.

EXAMPLES:
Input: "Business plan with Marketing (Online, Offline) and Sales."
Output:
mindmap
  root((Business Plan))
    Marketing
      Online
      Offline
    Sales
      Direct
      Partner

Description: {user_prompt}
Generate ONLY the Mermaid mindmap code:"""

    @staticmethod
    def _gantt_template(user_prompt: str) -> str:
        return f"""You are a Mermaid.js diagram expert. Convert the description into a valid Mermaid Gantt chart.

RULES:
1. Start with 'gantt'.
2. Header: title, dateFormat YYYY-MM-DD.
3. Sections: 'section Name'.
4. Tasks: 'Name :id, start, duration'.
5. NO Markdown blocks.

EXAMPLES:
Input: "Project Alpha. Design for 5 days, then Dev for 10 days."
Output:
gantt
    title Project Alpha
    dateFormat YYYY-MM-DD
    section Phase 1
    Design :des1, 2024-01-01, 5d
    Dev    :dev1, after des1, 10d

Description: {user_prompt}
Generate ONLY the Mermaid Gantt chart code:"""

    @staticmethod
    def _pie_chart_template(user_prompt: str) -> str:
        return f"""You are a Mermaid.js diagram expert. Convert the description into a valid Mermaid pie chart.

RULES:
1. Start with 'pie'.
2. Data: "Label" : value.
3. Values must be numbers.
4. NO Markdown blocks.

EXAMPLES:
Input: "Sales: 40% East, 60% West."
Output:
pie title Sales Distribution
    "East" : 40
    "West" : 60

Description: {user_prompt}
Generate ONLY the Mermaid pie chart code:"""

    @staticmethod
    def _user_journey_template(user_prompt: str) -> str:
        return f"""You are a Mermaid.js diagram expert. Convert the description into a valid Mermaid user journey.

RULES:
1. Start with 'journey'.
2. Sections: 'section Name'.
3. Tasks: 'Name: score: Actor'.
4. Score: 1-5.
5. NO Markdown blocks.

EXAMPLES:
Input: "Shopping: Browse (5), Pay (3)."
Output:
journey
    title Shopping Experience
    section Browsing
      Browse items: 5: User
    section Checkout
      Pay: 3: User

Description: {user_prompt}
Generate ONLY the Mermaid user journey code:"""

    @staticmethod
    def _git_graph_template(user_prompt: str) -> str:
        return f"""You are a Mermaid.js diagram expert. Convert the description into a valid Mermaid git graph.

RULES:
1. Start with 'gitGraph'.
2. Commands: commit, branch, checkout, merge.
3. 'branch name' creates it. 'checkout name' switches.
4. NO Markdown blocks.

EXAMPLES:
Input: "Main branch, create feature, commit, merge back."
Output:
gitGraph
    commit
    branch feature
    checkout feature
    commit
    checkout main
    merge feature

Description: {user_prompt}
Generate ONLY the Mermaid git graph code:"""

    @staticmethod
    def _tikz_template(user_prompt: str) -> str:
        return f"""You are a LaTeX/TikZ expert. Convert the description into a valid TikZ diagram.

RULES:
1. Start with '\\documentclass{{standalone}}'.
2. Use 'tikz' package and 'usetikzlibrary' as needed (e.g., shapes, arrows, positioning, er).
3. For ER diagrams, use 'tikz-er2' syntax if possible or standard nodes.
4. Output MUST be a complete, compilable LaTeX document.
5. NO Markdown blocks.

EXAMPLES:
Input: "Simple flowchart: Start -> Process -> End"
Output:
\\documentclass{{standalone}}
\\usepackage{{tikz}}
\\usetikzlibrary{{shapes,arrows,positioning}}
\\begin{{document}}
\\begin{{tikzpicture}}[node distance=2cm, auto]
    \\node [rectangle, draw] (start) {{Start}};
    \\node [rectangle, draw, below of=start] (process) {{Process}};
    \\node [rectangle, draw, below of=process] (end) {{End}};
    \\path [line] (start) -- (process);
    \\path [line] (process) -- (end);
\\end{{tikzpicture}}
\\end{{document}}

Description: {user_prompt}
Generate ONLY the LaTeX/TikZ code:"""
