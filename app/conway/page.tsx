"use client"

import { useCallback, useEffect, useRef, useState } from 'react';

interface Project {
  name: string;
  description: string;
  creator: string;
  link: string;
  emoji: string;
}

interface Cell {
  alive: boolean;
  emoji: string;
  color: string;
  owner: string;
  project: Project | null;
}

interface Coordinates {
  x: number;
  y: number;
}

const FRAME_RATE = 5;
const FRAME_DELAY = 1000 / FRAME_RATE;

// Color palette for different owners
const OWNERS = {
  Ananth: { 
    name: 'Ananth', 
    color: '#F93C31', 
    projects: [
      {
        name: 'AI Chat Interface',
        description: 'A modern chat interface for AI interactions',
        creator: 'Ananth',
        link: 'https://github.com/ananth/ai-chat',
        emoji: '🤖'
      },
      {
        name: 'Portfolio Game of Life',
        description: 'Interactive portfolio using Conway\'s Game of Life',
        creator: 'Ananth',
        link: 'https://github.com/ananth/portfolio-life',
        emoji: '🎮'
      },
      {
        name: 'Personal Site',
        description: 'My personal website and blog',
        creator: 'Ananth',
        link: 'example.com',
        emoji: '🌐'
      }
    ]
  },
  Matt: { 
    name: 'Matt', 
    color: '#1E93FF', 
    projects: [
      {
        name: 'Weather Dashboard',
        description: 'Real-time weather visualization dashboard',
        creator: 'Matt',
        link: 'https://github.com/matt/weather-dash',
        emoji: '🌤️'
      }
    ]
  },
};

const PRESET_OFFSET = {
    x: 10,
    y: 10
}

const PRESETS = processOffset({
  gliderWar: {
    name: 'Glider War',
    pattern: [
      { x: 1, y: 0, owner: 'Ananth', project: OWNERS.Ananth.projects[0] },
      { x: 2, y: 1, owner: 'Ananth', project: OWNERS.Ananth.projects[0] },
      { x: 0, y: 2, owner: 'Ananth', project: OWNERS.Ananth.projects[0] },
      { x: 1, y: 2, owner: 'Ananth', project: OWNERS.Ananth.projects[0] },
      { x: 2, y: 2, owner: 'Ananth', project: OWNERS.Ananth.projects[0] },

      { x: 10, y: 10, owner: 'Matt', project: OWNERS.Matt.projects[0] },
      { x: 11, y: 11, owner: 'Matt', project: OWNERS.Matt.projects[0] },
      { x: 9, y: 12, owner: 'Matt', project: OWNERS.Matt.projects[0] },
      { x: 10, y: 12, owner: 'Matt', project: OWNERS.Matt.projects[0] },
      { x: 11, y: 12, owner: 'Matt', project: OWNERS.Matt.projects[0] },
    ]
  },
});

function processOffset(preset : Record<string, (typeof PRESETS.gliderWar)>) {
    for (const presetName in preset) {
        const presetData = preset[presetName];
        for (const pattern of presetData.pattern) {
        pattern.x += PRESET_OFFSET.x;
        pattern.y += PRESET_OFFSET.y;
        }
    }
    return preset; 
}

export default function GameOfLife() {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [hoveredCell, setHoveredCell] = useState<Coordinates | null>(null);
  const [selectedOwner, setSelectedOwner] = useState<keyof typeof OWNERS>('Ananth');
  const [selectedProject, setSelectedProject] = useState<Project>(OWNERS.Ananth.projects[0]);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const createEmptyGrid = useCallback(() => {
    return Array(size.height).fill(null).map(() =>
      Array(size.width).fill(null).map(() => ({
        alive: false,
        emoji: '',
        color: '',
        owner: '',
        project: null as Project | null
      }))
    );
  }, [size]);

  const loadPreset = useCallback((preset: typeof PRESETS.gliderWar) => {
    const newGrid = createEmptyGrid();
    preset.pattern.forEach(({ x, y, owner, project }) => {
      if (x < size.width && y < size.height) {
        newGrid[y][x] = {
          alive: true,
          emoji: project.emoji,
          color: OWNERS[owner as keyof typeof OWNERS].color,
          owner,
          project
        };
      }
    });
    setGrid(newGrid);
    setIsRunning(false);
  }, [size, createEmptyGrid]);

  const countNeighbors = useCallback((grid: Cell[][], x: number, y: number) => {
    let count = 0;
    const ownerCounts = new Map<string, number>();
    const projectCounts = new Map<Project, number>();

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newX = (x + i + size.width) % size.width;
        const newY = (y + j + size.height) % size.height;
        
        if (grid[newY][newX].alive) {
          count++;
          const owner = grid[newY][newX].owner;
          const project = grid[newY][newX].project;
          ownerCounts.set(owner, (ownerCounts.get(owner) || 0) + 1);
          if (project) projectCounts.set(project, (projectCounts.get(project) || 0) + 1);
        }
      }
    }

    let dominantOwner = '';
    let dominantProject: Project | null = null;
    let maxCount = 0;

    ownerCounts.forEach((count, owner) => {
      if (count > maxCount) {
        maxCount = count;
        dominantOwner = owner;
      }
    });

    // Randomly select a project from neighbors
    const projects = Array.from(projectCounts.keys());
    if (projects.length > 0) {
      dominantProject = projects[Math.floor(Math.random() * projects.length)];
    }

    return { count, dominantOwner, dominantProject };
  }, [size]);

  const updateGrid = useCallback(() => {
    setGrid(currentGrid => {
      const newGrid = createEmptyGrid();
      
      for (let y = 0; y < size.height; y++) {
        for (let x = 0; x < size.width; x++) {
          const { count, dominantOwner, dominantProject } = countNeighbors(currentGrid, x, y);
          const cell = currentGrid[y][x];
          
          if (cell.alive) {
            newGrid[y][x] = {
              alive: count === 2 || count === 3,
              emoji: count === 2 || count === 3 ? cell.emoji : '',
              color: count === 2 || count === 3 ? cell.color : '',
              owner: count === 2 || count === 3 ? cell.owner : '',
              project: count === 2 || count === 3 ? cell.project : null
            };
          } else if (count === 3 && dominantOwner) {
            newGrid[y][x] = {
              alive: true,
              emoji: dominantProject?.emoji || OWNERS[dominantOwner as keyof typeof OWNERS].emoji,
              color: OWNERS[dominantOwner as keyof typeof OWNERS].color,
              owner: dominantOwner,
              project: dominantProject
            };
          }
        }
      }
      
      return newGrid;
    });
  }, [size, countNeighbors, createEmptyGrid]);

  const updateGridSize = useCallback(() => {
    if (!containerRef.current) return;
    
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    
    // Calculate cell size to fit screen while maintaining aspect ratio
    const cellSize = Math.floor(Math.min(vw, vh) / 40); // Adjust divisor for desired cell count
    
    setSize({
      width: Math.floor(vw / cellSize),
      height: Math.floor(vh / cellSize)
    });
  }, []);

  useEffect(() => {
    updateGridSize();
    window.addEventListener('resize', updateGridSize);
    return () => window.removeEventListener('resize', updateGridSize);
  }, [updateGridSize]);

  useEffect(() => {
    setGrid(createEmptyGrid());
    loadPreset(PRESETS.gliderWar);
  }, [size, createEmptyGrid]);

  useEffect(() => {
    if (isRunning) {
      timeoutRef.current = setTimeout(updateGrid, FRAME_DELAY);
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
  }, [isRunning, grid, updateGrid]);

  const toggleCell = (x: number, y: number) => {
    setGrid(currentGrid => {
      const newGrid = [...currentGrid.map(row => [...row])];
      if (!newGrid[y][x].alive) {
        newGrid[y][x] = {
          alive: true,
          emoji: selectedProject.emoji,
          color: OWNERS[selectedOwner].color,
          owner: selectedOwner,
          project: selectedProject
        };
      } else {
        newGrid[y][x] = {
          alive: false,
          emoji: '',
          color: '',
          owner: '',
          project: null
        };
      }
      return newGrid;
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const ProjectInfo = ({ project, position }: { project: Project, position: { x: number, y: number } }) => (
    <div 
      className="fixed bg-black bg-opacity-90 p-4 rounded-lg shadow-lg z-50 max-w-md"
      style={{ 
        left: `${position.x + 20}px`, 
        top: `${position.y + 20}px`,
        transform: `translate(${position.x + 420 > window.innerWidth ? -440 : 0}px, ${position.y + 220 > window.innerHeight ? -240 : 0}px)`
      }}
    >
      <h3 className="text-xl font-bold mb-2">{project.name}</h3>
      <p className="text-gray-300 mb-2">{project.description}</p>
      <p className="text-gray-400 mb-2">Created by: {project.creator}</p>
      <a 
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300"
      >
        View Project →
      </a>
    </div>
  );

  return (
    <div className="w-screen h-screen bg-black text-white overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Controls Overlay */}
      <div className="fixed top-4 left-4 z-50 bg-black bg-opacity-90 p-4 rounded-lg">
        <div className="flex gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={() => setGrid(createEmptyGrid())}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
          >
            Clear
          </button>
          <select
            value={selectedOwner}
            onChange={(e) => {
              const owner = e.target.value as keyof typeof OWNERS;
              setSelectedOwner(owner);
              setSelectedProject(OWNERS[owner].projects[0]);
            }}
            className="px-4 py-2 bg-gray-800 rounded-lg"
          >
            {Object.entries(OWNERS).map(([key, { name }]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
          <select
            value={selectedProject.name}
            onChange={(e) => {
              const project = OWNERS[selectedOwner].projects.find(p => p.name === e.target.value);
              if (project) setSelectedProject(project);
            }}
            className="px-4 py-2 bg-gray-800 rounded-lg"
          >
            {OWNERS[selectedOwner].projects.map((project) => (
              <option key={project.name} value={project.name}>{project.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div 
        ref={containerRef} 
        className="w-full h-full p-0.5 bg-gray-900"
      >
        <div 
          className="w-full h-full grid bg-gray-800"
          style={{
            gridTemplateColumns: `repeat(${size.width}, 1fr)`,
            gridTemplateRows: `repeat(${size.height}, 1fr)`,
            gap: '1px'
          }}
        >
          {grid.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className="w-full h-full flex items-center justify-center relative cursor-pointer"
                style={{
                  backgroundColor: cell.alive ? cell.color : '#000',
                  fontSize: 'min(1vw, 1vh)'
                }}
                onClick={() => toggleCell(x, y)}
                onMouseEnter={() => setHoveredCell({ x, y })}
                onMouseLeave={() => setHoveredCell(null)}
              >
                <span className="pointer-events-none">{cell.emoji}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Project Info Overlay */}
      {hoveredCell && grid[hoveredCell.y][hoveredCell.x].project && (
        <ProjectInfo 
          project={grid[hoveredCell.y][hoveredCell.x].project!} 
          position={mousePosition}
        />
      )}
    </div>
  );
}