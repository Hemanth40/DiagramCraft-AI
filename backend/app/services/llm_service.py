import requests
import logging
from typing import Optional
from app.models.enums import DiagramType
from app.services.prompt_templates import PromptTemplates
from app.core.config import settings

logger = logging.getLogger(__name__)

class LLMService:
    """Service for interacting with LLM providers (Groq, Ollama)."""
    
    def __init__(self):
        self.provider = settings.LLM_PROVIDER
        
        # Ollama Config
        self.ollama_url = settings.OLLAMA_URL.replace('/api/generate', '/api/chat')
        self.ollama_model = settings.OLLAMA_MODEL
        self.ollama_timeout = settings.OLLAMA_TIMEOUT
        
        # Groq Config
        self.groq_url = "https://api.groq.com/openai/v1/chat/completions"
        self.groq_api_key = settings.GROQ_API_KEY
        self.groq_model = settings.GROQ_MODEL
    
    async def generate_diagram(self, prompt: str, diagram_type: DiagramType) -> str:
        """
        Generate Mermaid diagram code using the configured LLM provider.
        """
        try:
            if self.provider == "groq":
                mermaid_code = await self._generate_with_groq(prompt, diagram_type)
            else:
                mermaid_code = await self._generate_with_ollama(prompt, diagram_type)
            
            # Clean up the response
            mermaid_code = self._clean_mermaid_code(mermaid_code, diagram_type)
            
            # Validate the code
            if not self._validate_mermaid_code(mermaid_code, diagram_type):
                logger.warning(f"Generated code failed validation, attempting fallback")
                mermaid_code = self._generate_fallback(prompt, diagram_type)
            
            logger.info(f"Successfully generated {diagram_type} diagram using {self.provider}")
            return mermaid_code
            
        except Exception as e:
            logger.error(f"Failed to generate diagram: {str(e)}")
            raise Exception(f"Failed to generate diagram: {str(e)}")

    async def _generate_with_groq(self, prompt: str, diagram_type: DiagramType) -> str:
        """Generate using Groq API."""
        if not self.groq_api_key:
            raise Exception("Groq API Key not configured")
            
        llm_prompt = PromptTemplates.get_template(diagram_type, prompt)
        
        headers = {
            "Authorization": f"Bearer {self.groq_api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": self.groq_model,
            "messages": [
                {
                    "role": "system",
                    "content": "You are a strict code generator. Output ONLY the Mermaid code. No markdown, no explanations. Start directly with the diagram type declaration."
                },
                {
                    "role": "user",
                    "content": llm_prompt
                }
            ],
            "temperature": 0.2,
            "max_tokens": 4096
        }
        
        try:
            response = requests.post(self.groq_url, json=payload, headers=headers, timeout=30)
            response.raise_for_status()
            result = response.json()
            return result['choices'][0]['message']['content'].strip()
        except requests.RequestException as e:
            error_msg = f"Groq request failed: {str(e)}"
            if hasattr(e, 'response') and e.response is not None:
                error_msg += f"\nResponse: {e.response.text}"
            logger.error(error_msg)
            raise Exception(error_msg)

    async def _generate_with_ollama(self, prompt: str, diagram_type: DiagramType) -> str:
        """Generate using Ollama API."""
        llm_prompt = PromptTemplates.get_template(diagram_type, prompt)
        
        payload = {
            "model": self.ollama_model,
            "messages": [
                {
                    "role": "system",
                    "content": "You are a strict code generator. Output ONLY the Mermaid code. No markdown, no explanations. Start directly with the diagram type declaration."
                },
                {
                    "role": "user",
                    "content": llm_prompt
                }
            ],
            "stream": False,
            "options": {
                "num_predict": 4096,
                "temperature": 0.2
            }
        }
        
        try:
            response = requests.post(self.ollama_url, json=payload, timeout=self.ollama_timeout)
            response.raise_for_status()
            result = response.json()
            return result.get('message', {}).get('content', '').strip()
        except requests.RequestException as e:
            logger.error(f"Ollama request failed: {str(e)}")
            raise Exception(f"Ollama service error: {str(e)}")

    def _clean_mermaid_code(self, code: str, diagram_type: DiagramType) -> str:
        """Clean and format the generated Mermaid code."""
        import re
        
        # Remove markdown code blocks if present
        if "```mermaid" in code:
            code = code.split("```mermaid")[1].split("```")[0]
        elif "```" in code:
            code = code.split("```")[1].split("```")[0]
            
        lines = code.strip().split('\n')
        
        # Define regex patterns for each diagram type
        patterns = {
            DiagramType.FLOWCHART: r"^(graph|flowchart)\s+(TD|LR|TB|BT|RL)",
            DiagramType.SEQUENCE: r"^sequenceDiagram",
            DiagramType.ER_DIAGRAM: r"^(erDiagram|graph|flowchart)",
            DiagramType.CLASS_DIAGRAM: r"^classDiagram",
            DiagramType.STATE_DIAGRAM: r"^stateDiagram(-v2)?",
            DiagramType.MINDMAP: r"^mindmap",
            DiagramType.GANTT: r"^gantt",
            DiagramType.PIE_CHART: r"^pie",
            DiagramType.USER_JOURNEY: r"^journey",
            DiagramType.GIT_GRAPH: r"^gitGraph",
            DiagramType.TIKZ: r"^\\documentclass",
        }
        
        pattern = patterns.get(diagram_type, r"^graph")
        
        # Find the first line that matches the pattern
        start_index = 0
        for i, line in enumerate(lines):
            if re.match(pattern, line.strip(), re.IGNORECASE):
                start_index = i
                break
        
        # Return from the correct starting point
        cleaned_code = '\n'.join(lines[start_index:]).strip()
        
        # Apply common syntax fixes
        cleaned_code = self._fix_syntax_errors(cleaned_code, diagram_type)
        
        return cleaned_code
    
    def _fix_syntax_errors(self, code: str, diagram_type: DiagramType) -> str:
        """Fix common syntax errors made by LLMs."""
        import re
        
        # Fix invalid sequence diagram arrows
        if diagram_type == DiagramType.SEQUENCE:
            code = code.replace('--x>', '-->>')
            code = code.replace('-->x', '--x')
            
        # Fix ER diagram attribute commas
        if diagram_type == DiagramType.ER_DIAGRAM:
            code = re.sub(r',\s*$', '', code, flags=re.MULTILINE)
            code = re.sub(r'(\w+),\s+(\w+)', r'\1 \2', code)

        # Fix GitGraph commit syntax
        if diagram_type == DiagramType.GIT_GRAPH:
            def normalize_commit_line(match):
                indent = match.group(1)
                args = match.group(2).strip()
                
                if not args:
                    return f"{indent}commit"
                
                if 'id:' not in args and 'msg:' not in args:
                    parts = args.split(' ', 1)
                    if len(parts) == 2:
                        msg = parts[1].replace('"', "'")
                        return f'{indent}commit id: "{parts[0]}" msg: "{msg}"'
                    return f'{indent}commit id: "{parts[0]}"'

                new_args = []
                id_match = re.search(r'id:\s*(?:"([^"]*)"|\'([^\']*)\'|([^"\s]+))', args)
                if id_match:
                    val = next(g for g in id_match.groups() if g is not None)
                    new_args.append(f'id: "{val}"')
                
                msg_match = re.search(r'msg:\s*(?:"([^"]*)"|\'([^\']*)\'|(.+))', args)
                if msg_match:
                    val = next(g for g in msg_match.groups() if g is not None)
                    val = val.replace('"', "'")
                    new_args.append(f'msg: "{val}"')
                
                type_match = re.search(r'type:\s*(?:"([^"]*)"|\'([^\']*)\'|(\w+))', args)
                if type_match:
                    val = next(g for g in type_match.groups() if g is not None)
                    new_args.append(f'type: {val}')
                
                tag_match = re.search(r'tag:\s*(?:"([^"]*)"|\'([^\']*)\'|([^"\s]+))', args)
                if tag_match:
                    val = next(g for g in tag_match.groups() if g is not None)
                    new_args.append(f'tag: "{val}"')

                if not new_args:
                    return match.group(0)
                    
                return f"{indent}commit {' '.join(new_args)}"

            code = re.sub(r'^(\s*)commit(?:\s+(.+))?$', normalize_commit_line, code, flags=re.MULTILINE | re.IGNORECASE)
            code = re.sub(r'branch\s+-b\s+', 'branch ', code, flags=re.IGNORECASE)
            code = re.sub(r'checkout\s+-b\s+', 'branch ', code, flags=re.IGNORECASE)
            
            lines = code.split('\n')
            seen_branches = set(['main'])
            new_lines = []
            
            for line in lines:
                branch_match = re.match(r'^(\s*)branch\s+([^\s]+)', line, re.IGNORECASE)
                checkout_match = re.match(r'^(\s*)checkout\s+([^\s]+)', line, re.IGNORECASE)
                
                if branch_match:
                    indent = branch_match.group(1)
                    branch_name = branch_match.group(2)
                    if branch_name in seen_branches:
                        new_lines.append(f"{indent}checkout {branch_name}")
                    else:
                        seen_branches.add(branch_name)
                        new_lines.append(line)
                elif checkout_match:
                    indent = checkout_match.group(1)
                    branch_name = checkout_match.group(2)
                    if branch_name not in seen_branches:
                        seen_branches.add(branch_name)
                        new_lines.append(f"{indent}branch {branch_name}")
                    else:
                        new_lines.append(line)
                else:
                    new_lines.append(line)
            
            code = '\n'.join(new_lines)
            
        return code
    
    def _validate_mermaid_code(self, code: str, diagram_type: DiagramType) -> bool:
        """Basic validation of Mermaid code."""
        if not code:
            return False
        
        code = code.strip()
        prefixes = {
            DiagramType.FLOWCHART: ("graph", "flowchart"),
            DiagramType.SEQUENCE: ("sequenceDiagram",),
            DiagramType.ER_DIAGRAM: ("erDiagram", "graph", "flowchart"),
            DiagramType.CLASS_DIAGRAM: ("classDiagram",),
            DiagramType.STATE_DIAGRAM: ("stateDiagram",),
            DiagramType.MINDMAP: ("mindmap",),
            DiagramType.GANTT: ("gantt",),
            DiagramType.PIE_CHART: ("pie",),
            DiagramType.USER_JOURNEY: ("journey",),
            DiagramType.PIE_CHART: ("pie",),
            DiagramType.USER_JOURNEY: ("journey",),
            DiagramType.GIT_GRAPH: ("gitGraph",),
            DiagramType.TIKZ: ("\\documentclass",),
        }
        valid_prefixes = prefixes.get(diagram_type, ("graph",))
        return code.startswith(valid_prefixes) 
    
    def _generate_fallback(self, prompt: str, diagram_type: DiagramType) -> str:
        """Generate a simple fallback diagram if AI generation fails."""
        prefix = DiagramType.get_mermaid_prefix(diagram_type)
        fallback_templates = {
            DiagramType.FLOWCHART: f"{prefix}\n    A[{prompt[:30]}...] --> B[Process]\n    B --> C[End]",
            DiagramType.SEQUENCE: f"{prefix}\n    participant User\n    participant System\n    User->>System: {prompt[:30]}...\n    System-->>User: Response",
            DiagramType.ER_DIAGRAM: f"{prefix}\n    ENTITY {{\n        string id\n        string name\n    }}",
            DiagramType.CLASS_DIAGRAM: f"{prefix}\n    class Entity {{\n        +String id\n        +String name\n    }}",
            DiagramType.STATE_DIAGRAM: f"{prefix}\n    [*] --> State1\n    State1 --> [*]",
            DiagramType.MINDMAP: f"{prefix}\n  root({prompt[:20]}...)\n    Child1\n    Child2",
            DiagramType.GANTT: f"{prefix}\n    title {prompt[:30]}\n    dateFormat YYYY-MM-DD\n    section Tasks\n    Task 1 :2024-01-01, 7d",
            DiagramType.PIE_CHART: f'{prefix}\n    title {prompt[:30]}\n    "Item 1" : 40\n    "Item 2" : 60',
            DiagramType.USER_JOURNEY: f"{prefix}\n    title {prompt[:30]}\n    section Journey\n    Step 1: 5: User",
            DiagramType.USER_JOURNEY: f"{prefix}\n    title {prompt[:30]}\n    section Journey\n    Step 1: 5: User",
            DiagramType.GIT_GRAPH: f"{prefix}\n    commit\n    branch develop\n    checkout develop\n    commit",
            DiagramType.TIKZ: f"\\documentclass{{standalone}}\n\\usepackage{{tikz}}\n\\begin{{document}}\n\\begin{{tikzpicture}}\n\\node {{Error: {prompt[:20]}...}};\n\\end{{tikzpicture}}\n\\end{{document}}",
        }
        return fallback_templates.get(diagram_type, fallback_templates[DiagramType.FLOWCHART])
    
    async def check_health(self) -> bool:
        """Check if LLM service is available."""
        if self.provider == "groq":
            # Simple check for Groq (e.g. list models or just assume true if key exists)
            return bool(self.groq_api_key)
        else:
            try:
                response = requests.get(self.ollama_url.replace('/api/chat', '/api/tags'), timeout=5)
                return response.status_code == 200
            except:
                return False

# Singleton instance
llm_service = LLMService()
