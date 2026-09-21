import {
  Project,
  PipelineStage,
  ExperienceItem,
  BuildPrinciple,
  TechCategory,
  MetricItem,
} from '../types';

export const PERSONAL_INFO = {
  name: 'MUHAMMAD FAIZAN IMRAN',
  shortName: 'FAIZAN.IMRAN',
  title: 'AI/ML Engineer',
  subtitle: 'Machine Learning & Deep Learning · Full-Stack Developer',
  location: 'Pakistan',
  email: 'mfaizanimran11@gmail.com',
  github: '[ADD GITHUB URL]',
  linkedin: '[ADD LINKEDIN URL]',
  education: {
    degree: 'Bachelor of Science in Computer Engineering',
    institution: 'COMSATS University Islamabad, Lahore Campus',
    period: '2022 — 2026',
    status: 'Final Year Candidate',
  },
  domains: [
    'AI / ML & Deep Learning',
    'Natural Language Processing',
    'Local Agentic Systems',
    'API Security & Cybersecurity',
    'Full-Stack System Engineering',
  ],
};

export const PROJECTS: Project[] = [
  {
    id: 'nids',
    slug: 'network-intrusion-detection',
    number: '01',
    title: 'AI-POWERED NETWORK INTRUSION DETECTION SYSTEM',
    subtitle: 'High-Throughput Packet Inspection & Anomaly Classification',
    category: 'FINAL YEAR PROJECT / MACHINE LEARNING',
    tagline: 'Defending infrastructure with real-time neural packet analysis',
    description:
      'A real-time network anomaly detection architecture that captures live network traffic via raw socket layers, extracts multi-dimensional statistical features, and passes them through an optimized deep neural classifier to distinguish normal traffic from malicious intrusion attempts.',
    stack: ['Python', 'PyTorch', 'Scikit-learn', 'Scapy', 'Streamlit'],
    metric: '91%',
    metricLabel: 'ACCURACY',
    metricContext: "Reported accuracy on the project's evaluation dataset.",
    problem:
      'Traditional rule-based intrusion detection systems (IDS) fail against zero-day signatures, subtle protocol variations, and distributed denial-of-service patterns that mimic benign packets.',
    system:
      'Engineered an end-to-end telemetry ingestion stream using Scapy to listen on active network interfaces, parse raw TCP/UDP/ICMP payloads into structured statistical vectors (flow duration, byte entropy, SYN flag variance), and stream them through a feature extraction pipeline.',
    model:
      'Trained a hybrid deep neural network and decision ensemble with PyTorch and Scikit-learn, evaluated on standardized intrusion benchmarks. Evaluated against false-positive trade-offs to ensure low latency during inference.',
    result:
      'Achieved 91% classification accuracy across complex anomaly profiles while keeping packet inference latency beneath live buffer thresholds in an interactive Streamlit telemetry dashboard.',
    architecture: {
      nodes: [
        'Raw Network Stream',
        'Packet Capture (Scapy)',
        'Feature Extraction',
        'Preprocessing & Normalization',
        'PyTorch Deep Classifier',
        'Classification: Normal / Attack',
      ],
      flow: [
        'NETWORK',
        'PACKET CAPTURE',
        'FEATURE EXTRACTION',
        'PREPROCESSING',
        'MODEL',
        'CLASSIFICATION',
      ],
      description:
        'Continuous packet streaming with low-latency feature vectorization and real-time classification.',
    },
    codeSnippet: {
      language: 'python',
      title: 'packet_inference_pipeline.py',
      code: `# Real-Time Packet Capture & Neural Inference Layer
import torch
import numpy as np
from scapy.all import sniff, IP, TCP

class PacketClassifier(torch.nn.Module):
    def __init__(self, in_features=42, hidden_dim=128):
        super().__init__()
        self.encoder = torch.nn.Sequential(
            torch.nn.Linear(in_features, hidden_dim),
            torch.nn.BatchNorm1d(hidden_dim),
            torch.nn.SiLU(),
            torch.nn.Dropout(0.2),
            torch.nn.Linear(hidden_dim, 32),
            torch.nn.SiLU(),
            torch.nn.Linear(32, 2) # [Normal, Intrusion]
        )

    def forward(self, x):
        return self.encoder(x)

def process_live_flow(packet):
    features = extract_flow_features(packet)
    tensor = torch.tensor(features, dtype=torch.float32).unsqueeze(0)
    with torch.no_grad():
        logits = model(tensor)
        prediction = torch.argmax(logits, dim=1).item()
    return "ATTACK" if prediction == 1 else "NORMAL"`,
      explanation:
        'Extracts high-dimensional socket metrics and evaluates live batch packets with minimal per-packet latency overhead.',
    },
    githubUrl: null,
    demoUrl: null,
  },
  {
    id: 'agentic-rag',
    slug: 'agentic-rag',
    number: '02',
    title: 'LOCAL AGENTIC RAG SYSTEM',
    subtitle: 'Zero-Leakage Document Intelligence & Local LLM Synthesis',
    category: 'LOCAL AGENTIC RAG & NLP',
    tagline: 'Autonomous document retrieval and verified factual generation on edge hardware',
    description:
      'A completely offline, zero-data-leakage agentic Retrieval-Augmented Generation pipeline built to parse unstructured technical documentation, generate dense semantic embeddings, query ChromaDB, and route context through quantized local LLMs.',
    stack: [
      'LangChain',
      'Ollama',
      'Llama 3',
      'Mistral',
      'ChromaDB',
      'Hugging Face',
      'Streamlit',
    ],
    metric: '100% LOCAL',
    metricLabel: 'OFFLINE PRIVACY',
    metricContext:
      'Zero external cloud API dependencies; full token generation and vector persistence executed locally.',
    problem:
      'Enterprises and researchers handling proprietary code and sensitive technical documentation cannot transmit data to external proprietary API vendors without risking compliance and confidentiality breaches.',
    system:
      'Built a hierarchical chunking parser that understands code blocks and markdown hierarchies. Chunks are converted to dense vector embeddings using open-source Hugging Face embedding models, indexed in ChromaDB, and managed by an agentic LangChain router.',
    model:
      'Integrated Ollama running localized Llama 3 and Mistral 7B quantized checkpoints. Implemented semantic reranking to minimize context clutter and hallucinations before passing the top-k passages into the context window.',
    result:
      'Delivers instant citations and hallucination-guarded answers to complex technical queries on local developer workstations without a single external HTTP network call.',
    architecture: {
      nodes: [
        'Document Ingestion',
        'Semantic Chunking',
        'Hugging Face Embeddings',
        'ChromaDB Vector Store',
        'Natural Language Query',
        'Similarity Search & Retrieval',
        'Context Reranking',
        'Local LLM (Llama 3 / Mistral)',
        'Synthesized Answer + Citations',
      ],
      flow: [
        'DOCUMENT',
        'CHUNKING',
        'EMBEDDINGS',
        'CHROMADB',
        'QUERY',
        'RETRIEVAL',
        'RERANKING',
        'LOCAL LLM',
        'ANSWER',
      ],
      description:
        'End-to-end vector pipeline running fully on-device with zero data leaving the host.',
    },
    codeSnippet: {
      language: 'python',
      title: 'local_rag_orchestrator.py',
      code: `# Local Agentic RAG Vector Ingestion & Local LLM Routing
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.llms import Ollama
from langchain.chains import RetrievalQA

# Local embeddings model without remote calls
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vector_db = Chroma(persist_directory="./chroma_store", embedding_function=embeddings)

# Quantized local inference via Ollama
llm = Ollama(model="llama3:8b-instruct-q4_K_M", temperature=0.1)

retriever = vector_db.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 4}
)

def query_knowledge_base(user_prompt: str):
    relevant_chunks = retriever.get_relevant_documents(user_prompt)
    context_str = "\\n---\\n".join([doc.page_content for doc in relevant_chunks])
    system_prompt = f"Answer strictly based on context:\\n{context_str}\\nQuestion: {user_prompt}"
    return llm.invoke(system_prompt)`,
      explanation:
        'Strict local embeddings paired with low-temperature local inference to guarantee reproducibility and zero cloud telemetry.',
    },
    githubUrl: null,
    demoUrl: null,
  },
  {
    id: 'api-security',
    slug: 'api-security-scanner',
    number: '03',
    title: 'SELF-HEALING API SECURITY SCANNER',
    subtitle: 'Automated Vulnerability Classification & Code Remediation',
    category: 'MACHINE LEARNING / CYBERSECURITY',
    tagline: 'Identifying OWASP API top 10 flaws and generating parameterized code patches',
    description:
      'An intelligent security analyzer that parses OpenAPI schemas and live HTTP route definitions, leverages NLP-driven classification models to detect critical security vulnerabilities, and automatically produces verified, parameterized code remediations.',
    stack: ['Python', 'PyTorch', 'FastAPI', 'NLP', 'Streamlit'],
    metric: '92.3%',
    metricLabel: 'CLASSIFICATION ACCURACY',
    metricContext:
      'Achieved across synthetic and real-world OWASP API benchmark suites for threat categorization.',
    problem:
      'Fast-moving development teams release endpoints with subtle broken object level authorization (BOLA/IDOR), unparameterized SQL queries, and missing rate limiters that manual audits miss.',
    system:
      'Constructed a parser that extracts route contracts, payload typings, and SQL execution paths from FastAPI / Express endpoint definitions. The tokenized AST representations are analyzed by an NLP classifier trained to recognize vulnerability patterns.',
    model:
      'Trained an NLP-based classification model on code AST tokens achieving 92.3% classification accuracy across SQL Injection, IDOR, XSS, and Broken Authentication vectors. Includes a rule-directed code transformation engine for automated patching.',
    result:
      'Detects vulnerable API definitions in milliseconds and renders verified, syntactically sound FastAPI patches with parameterized queries and JWT guard dependencies.',
    supportedDetections: [
      'SQL INJECTION',
      'IDOR (Insecure Direct Object Reference)',
      'XSS (Cross-Site Scripting)',
      'BROKEN AUTHENTICATION',
    ],
    remediations: [
      'PARAMETERIZED QUERIES',
      'JWT TOKEN ENFORCEMENT',
      'RATE LIMITING & THROTTLING',
      'PAYLOAD SANITIZATION',
    ],
    architecture: {
      nodes: [
        'API Specification / AST Parse',
        'Security AST Tokenization',
        'NLP-based ML Classifier',
        'Vulnerability Categorization',
        'Remediation Engine',
        'Synthesized Code Fix',
      ],
      flow: [
        'API SPEC',
        'SECURITY ANALYSIS',
        'ML MODEL',
        'VULNERABILITY',
        'REMEDIATION',
        'CODE FIX',
      ],
      description:
        'Bi-directional static code security scanner that diagnoses flaws and writes production patches.',
    },
    codeSnippet: {
      language: 'python',
      title: 'self_healing_remediator.py',
      beforeCode: `# VULNERABLE: Direct string interpolation & missing authentication
@app.get("/users/{user_id}")
async def get_user_data(user_id: str):
    # SQL Injection & IDOR hazard
    query = f"SELECT * FROM users WHERE id = '{user_id}'"
    return db.execute_raw(query)`,
      afterCode: `# REMEDIATED: Parameterized query + JWT Auth Dependency + Rate Limit
@app.get("/users/{user_id}", response_model=UserResponse)
@limiter.limit("60/minute")
async def get_user_data(
    user_id: UUID,
    current_user: User = Depends(get_current_active_user)
):
    # Enforce Object-Level Authorization
    if current_user.id != user_id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Forbidden")
    
    # Fully Parameterized Query
    return await db.fetch_one(
        "SELECT id, username, email FROM users WHERE id = :user_id",
        values={"user_id": user_id}
    )`,
      explanation:
        'Converts unsafe raw string formatting and unprotected endpoints into type-safe, authenticated, parameterized routes.',
    },
    githubUrl: null,
    demoUrl: null,
  },
];

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    step: '01',
    title: 'DATA',
    badge: 'RAW SIGNAL INGESTION',
    description:
      'Ingesting, cleaning, parsing, and engineering feature vectors from raw telemetries, logs, and document sources.',
    stack: ['Python', 'Pandas', 'NumPy'],
    highlight: 'Clean tabular & numerical pipelines with robust outlier rejection.',
  },
  {
    step: '02',
    title: 'MODEL',
    badge: 'INTELLIGENCE CORE',
    description:
      'Designing, training, fine-tuning, and evaluating deep neural networks, transformers, and classifiers.',
    stack: ['PyTorch', 'Transformers', 'Scikit-learn'],
    highlight: 'Optimized weights, quantifiable validation, and edge quantization.',
  },
  {
    step: '03',
    title: 'API',
    badge: 'BACKEND ORCHESTRATION',
    description:
      'Wrapping model inference in high-throughput, asynchronous REST endpoints with validation and error containment.',
    stack: ['FastAPI', 'Node.js', 'Express'],
    highlight: 'Sub-100ms response times, JWT auth guards, and async workers.',
  },
  {
    step: '04',
    title: 'INTERFACE',
    badge: 'ACCESSIBLE INTERACTION',
    description:
      'Crafting clean, responsive user interfaces where operators and engineers can inspect and command intelligent systems.',
    stack: ['React', 'Streamlit'],
    highlight: 'Real-time telemetry feeds, reactive state trees, and visual hierarchy.',
  },
  {
    step: '05',
    title: 'PRODUCT',
    badge: 'PRODUCTION READINESS',
    description:
      'Packaging systems into self-contained containerized deployments with monitoring, CI/CD, and scalability.',
    stack: ['Docker', 'Deployment'],
    highlight: 'Reproducible environments running safely beyond Jupyter notebooks.',
  },
];

export const BUILD_PRINCIPLES: BuildPrinciple[] = [
  {
    step: '01',
    title: 'UNDERSTAND',
    tagline: 'Isolate the core bottleneck',
    description:
      'Map the fundamental engineering problem before writing code. Determine whether machine learning is genuinely required or if deterministic heuristics suffice.',
    technologies: ['Systems Thinking', 'Threat Modeling', 'Requirement Scoping'],
  },
  {
    step: '02',
    title: 'DATA',
    tagline: 'Structure the information ground truth',
    description:
      'Ingest raw packets, text corpses, or logs. Construct robust normalization, tokenization, and validation pipelines that reject drift.',
    technologies: ['NumPy', 'Pandas', 'Scapy', 'Feature Encoders'],
  },
  {
    step: '03',
    title: 'MODEL',
    tagline: 'Train architectures with intention',
    description:
      'Select and train deep neural networks or ensemble classifiers. Calibrate loss functions specifically to the penalty costs of false positives vs. false negatives.',
    technologies: ['PyTorch', 'Transformers', 'Scikit-learn', 'Quantization'],
  },
  {
    step: '04',
    title: 'EVALUATE',
    tagline: 'Quantify real-world performance',
    description:
      'Rigorously benchmark models against holdout sets, stress workloads, edge cases, and inference latency constraints.',
    technologies: ['Precision / Recall', 'Confusion Matrices', 'ROC-AUC', 'Latency Benchmarking'],
  },
  {
    step: '05',
    title: 'ENGINEER',
    tagline: 'Encase intelligence in reliable software',
    description:
      'Bridge model outputs into async microservices, schema-validated APIs, and responsive interactive control panels.',
    technologies: ['FastAPI', 'Express', 'React', 'Modular Components'],
  },
  {
    step: '06',
    title: 'DEPLOY',
    tagline: 'Ship reproducible, observable products',
    description:
      'Containerize components with Docker. Establish deterministic runtimes, log streaming, and operational observability.',
    technologies: ['Docker', 'CI/CD Pipelines', 'Linux Runtimes'],
  },
];

export const TECH_CATEGORIES: TechCategory[] = [
  {
    category: 'AI / ML',
    items: ['PYTORCH', 'TRANSFORMERS', 'SCIKIT-LEARN', 'HUGGING FACE', 'LANGCHAIN'],
  },
  {
    category: 'BACKEND',
    items: ['FASTAPI', 'NODE.JS', 'EXPRESS', 'REST APIs'],
  },
  {
    category: 'FRONTEND',
    items: ['REACT', 'STREAMLIT'],
  },
  {
    category: 'TOOLS',
    items: ['DOCKER', 'GIT', 'POSTMAN', 'CHROMADB', 'OLLAMA'],
  },
];

export const EXPERIENCE_HISTORY: ExperienceItem[] = [
  {
    year: '2025',
    company: 'EVOLVE EDGE TECHNOLOGIES',
    role: 'React.js Developer',
    type: 'Engineering Experience',
    location: 'Remote / Hybrid',
    achievements: [
      'Engineered and delivered 3 production-ready full-stack applications with React.js frontends and robust REST API integrations.',
      'Architected reusable modular component libraries and clean state management routines.',
      'Achieved a 30% estimated improvement in developer onboarding time through structured component contracts and documentation.',
      'Implemented responsive layouts optimized for diverse viewport scales and cross-browser stability.',
    ],
    stack: ['React.js', 'REST APIs', 'Modular Components', 'Responsive Architecture'],
    metricNumber: '3',
    metricLabel: 'Production-Ready Applications Delivered',
  },
  {
    year: '2024',
    company: 'FIVERR',
    role: 'Frontend Web Developer',
    type: 'Freelance Engineering',
    location: 'Global / Remote',
    achievements: [
      'Delivered 5+ custom React web applications tailored to specific international client workflows.',
      'Owned the complete project lifecycle from initial requirements gathering to architecture, development, QA, and deployment.',
      'Integrated external REST endpoints and managed asynchronous UI updates with zero layout shifts.',
      'Maintained consistent client communication and delivered production code on agreed deadlines.',
    ],
    stack: ['React', 'JavaScript / TypeScript', 'REST Integration', 'Lifecycle Management'],
    metricNumber: '5+',
    metricLabel: 'Client Web Applications Shipped',
  },
];

export const METRICS_DATA: MetricItem[] = [
  {
    value: '91%',
    label: 'NETWORK INTRUSION DETECTION',
    sublabel: 'MODEL ACCURACY',
    context: 'Reported accuracy on final year project evaluation dataset.',
  },
  {
    value: '92.3%',
    label: 'API SECURITY CLASSIFICATION',
    sublabel: 'VULNERABILITY DETECTION',
    context: 'Accuracy achieved in classifying OWASP API security threats.',
  },
  {
    value: '5+',
    label: 'REACT APPLICATIONS',
    sublabel: 'CLIENT DELIVERY',
    context: 'Delivered for international clients through end-to-end freelance lifecycles.',
  },
  {
    value: '3',
    label: 'FULL-STACK SYSTEMS',
    sublabel: 'PRODUCTION READY',
    context: 'Engineered at Evolve Edge Technologies with modular REST architectures.',
  },
  {
    value: '30%',
    label: 'ONBOARDING IMPROVEMENT',
    sublabel: 'ARCHITECTURE EFFICIENCY',
    context: 'Estimated reduction in engineering ramp-up via reusable modular component systems.',
  },
];
