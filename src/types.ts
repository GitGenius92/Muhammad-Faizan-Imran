export interface ProjectArchitecture {
  nodes: string[];
  flow: string[];
  description: string;
}

export interface CodeSnippet {
  language: string;
  title: string;
  beforeCode?: string;
  afterCode?: string;
  code?: string;
  explanation: string;
}

export interface Project {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  tagline: string;
  description: string;
  stack: string[];
  metric: string;
  metricLabel: string;
  metricContext: string;
  problem: string;
  system: string;
  model: string;
  result: string;
  architecture: ProjectArchitecture;
  codeSnippet?: CodeSnippet;
  githubUrl: string | null;
  demoUrl: string | null;
  supportedDetections?: string[];
  remediations?: string[];
}

export interface PipelineStage {
  step: string;
  title: string;
  description: string;
  stack: string[];
  highlight: string;
  badge: string;
}

export interface ExperienceItem {
  year: string;
  company: string;
  role: string;
  type: string;
  location: string;
  achievements: string[];
  stack: string[];
  metricNumber: string;
  metricLabel: string;
}

export interface BuildPrinciple {
  step: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
}

export interface TechCategory {
  category: string;
  items: string[];
}

export interface MetricItem {
  value: string;
  label: string;
  sublabel: string;
  context: string;
}

export type CursorMode = 'default' | 'project' | 'link' | 'drag';
