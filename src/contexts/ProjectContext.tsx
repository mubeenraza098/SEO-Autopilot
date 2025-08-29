import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Project {
  id: string;
  name: string;
  url: string;
  cms_type: 'wordpress' | 'shopify' | 'custom';
  status: 'active' | 'paused' | 'setup';
  seo_score: number;
  created_at: string;
}

interface Connection {
  id: string;
  project_id: string;
  provider: 'ga4' | 'gsc' | 'cms';
  status: 'connected' | 'disconnected' | 'error';
  scopes: string[];
}

interface ProjectContextType {
  projects: Project[];
  activeProject: Project | null;
  openTabs: string[];
  connections: Connection[];
  showTabLimitModal: boolean;
  addProject: (project: Omit<Project, 'id' | 'created_at'>) => Project;
  setActiveProject: (projectId: string) => void;
  openProjectTab: (projectId: string) => void;
  closeProjectTab: (projectId: string) => void;
  updateProjectStatus: (projectId: string, status: Project['status']) => void;
  addConnection: (connection: Omit<Connection, 'id'>) => void;
  setShowTabLimitModal: (show: boolean) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProjectState] = useState<Project | null>(null);
  const [openTabs, setOpenTabs] = useState<string[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [showTabLimitModal, setShowTabLimitModal] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem('seo-tool-projects');
      const savedTabs = localStorage.getItem('seo-tool-open-tabs');
      const savedActiveProject = localStorage.getItem('seo-tool-active-project');
      
      if (savedProjects) {
        const parsedProjects = JSON.parse(savedProjects);
        setProjects(parsedProjects);
        
        if (savedActiveProject) {
          const activeProjectData = JSON.parse(savedActiveProject);
          setActiveProjectState(activeProjectData);
        }
      }
      
      if (savedTabs) {
        const parsedTabs = JSON.parse(savedTabs);
        setOpenTabs(parsedTabs);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);

  // Save to localStorage whenever projects change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('seo-tool-projects', JSON.stringify(projects));
    }
  }, [projects]);

  // Save to localStorage whenever tabs change
  useEffect(() => {
    if (openTabs.length > 0) {
      localStorage.setItem('seo-tool-open-tabs', JSON.stringify(openTabs));
    } else {
      localStorage.removeItem('seo-tool-open-tabs');
    }
  }, [openTabs]);

  // Save to localStorage whenever active project changes
  useEffect(() => {
    if (activeProject) {
      localStorage.setItem('seo-tool-active-project', JSON.stringify(activeProject));
    } else {
      localStorage.removeItem('seo-tool-active-project');
    }
  }, [activeProject]);

  const addProject = (projectData: Omit<Project, 'id' | 'created_at'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    };
    setProjects(prev => [...prev, newProject]);
    return newProject;
  };

  const setActiveProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setActiveProjectState(project);
    }
  };

  const openProjectTab = (projectId: string) => {
    if (openTabs.length >= 10) {
      setShowTabLimitModal(true);
      return;
    }
    if (!openTabs.includes(projectId)) {
      setOpenTabs(prev => [...prev, projectId]);
    }
    setActiveProject(projectId);
  };

  const closeProjectTab = (projectId: string) => {
    setOpenTabs(prev => prev.filter(id => id !== projectId));
    if (activeProject?.id === projectId) {
      const remainingTabs = openTabs.filter(id => id !== projectId);
      if (remainingTabs.length > 0) {
        setActiveProject(remainingTabs[remainingTabs.length - 1]);
      } else {
        setActiveProjectState(null);
      }
    }
  };

  const updateProjectStatus = (projectId: string, status: Project['status']) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId ? { ...p, status } : p
    ));
  };

  const addConnection = (connectionData: Omit<Connection, 'id'>) => {
    const newConnection: Connection = {
      ...connectionData,
      id: Date.now().toString(),
    };
    setConnections(prev => [...prev, newConnection]);
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      activeProject,
      openTabs,
      connections,
      showTabLimitModal,
      addProject,
      setActiveProject,
      openProjectTab,
      closeProjectTab,
      updateProjectStatus,
      addConnection,
      setShowTabLimitModal,
    }}>
      {children}
    </ProjectContext.Provider>
  );
};