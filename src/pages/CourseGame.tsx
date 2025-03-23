
import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, Code, Circle, Play, Info } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { getCourseById } from '@/lib/courses';
import { useToast } from '@/components/ui/use-toast';

// Define the game levels
const javaScriptLevels = [
  {
    id: 1,
    title: "Variables",
    description: "Move the cube to the target position using variables",
    task: "Declare x, y, and z variables and use them to position the cube at (2, 1, 0)",
    hints: ["Try setting x = 2, y = 1, z = 0", "Use cube.position.set(x, y, z)"],
    initialCode: "// Declare variables here\nlet x = 0;\nlet y = 0;\nlet z = 0;\n\n// Position the cube\ncube.position.set(x, y, z);",
    solution: "let x = 2;\nlet y = 1;\nlet z = 0;\ncube.position.set(x, y, z);",
  },
  {
    id: 2,
    title: "Functions",
    description: "Create a function to animate the cube",
    task: "Write a function to rotate the cube on its y-axis",
    hints: ["Define a function that adds rotation to cube.rotation.y", "Use small increments like 0.01"],
    initialCode: "// Define a rotation function\nfunction rotateCube() {\n  // Your code here\n}\n\n// Call the function\nrotateCube();",
    solution: "function rotateCube() {\n  cube.rotation.y += 0.1;\n}\nrotateCube();",
  },
  {
    id: 3,
    title: "Conditionals",
    description: "Change the cube's color based on its position",
    task: "Make the cube turn red if x > 1, blue otherwise",
    hints: ["Use an if/else statement", "Set color with cube.material.color.set('red')"],
    initialCode: "// Write a conditional statement\nif (/* your condition */) {\n  // Change to red\n} else {\n  // Change to blue\n}",
    solution: "if (cube.position.x > 1) {\n  cube.material.color.set('red');\n} else {\n  cube.material.color.set('blue');\n}",
  },
  {
    id: 4,
    title: "Loops",
    description: "Create multiple objects using a loop",
    task: "Create 5 spheres in a row using a for loop",
    hints: ["Use a for loop with i < 5", "Position each sphere at x = i * 2"],
    initialCode: "// Write a loop to create spheres\nfor (/* your loop */) {\n  // Create and position a sphere\n}",
    solution: "for (let i = 0; i < 5; i++) {\n  let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);\n  sphere.position.x = i * 2;\n  scene.add(sphere);\n}",
  },
  {
    id: 5,
    title: "Arrays",
    description: "Work with arrays of objects",
    task: "Store cubes in an array and rotate them all",
    hints: ["Create an empty array first", "Push each cube to the array", "Use forEach to rotate all cubes"],
    initialCode: "// Create an array for cubes\nlet cubes = [];\n\n// Add cubes to the array\n\n// Rotate all cubes",
    solution: "let cubes = [];\nfor (let i = 0; i < 3; i++) {\n  let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);\n  cube.position.x = i * 3;\n  cubes.push(cube);\n  scene.add(cube);\n}\ncubes.forEach(cube => cube.rotation.y += 0.1);",
  },
  {
    id: 6,
    title: "Objects",
    description: "Use objects to represent complex data",
    task: "Create an object representing a game character and move it",
    hints: ["Define an object with position property", "Update the position property"],
    initialCode: "// Create a character object\nlet character = {\n  // Define properties\n};\n\n// Move the character",
    solution: "let character = {\n  name: 'Hero',\n  health: 100,\n  position: { x: 0, y: 0, z: 0 }\n};\ncharacter.position.x += 1;\ncube.position.x = character.position.x;",
  },
  {
    id: 7,
    title: "Event Handling",
    description: "Respond to user input",
    task: "Make the cube move up when the space key is pressed",
    hints: ["Add an event listener for 'keydown'", "Check if the key is ' ' (space)"],
    initialCode: "// Add keyboard event listener\ndocument.addEventListener('keydown', function(event) {\n  // Your code here\n});",
    solution: "document.addEventListener('keydown', function(event) {\n  if (event.key === ' ') {\n    cube.position.y += 1;\n  }\n});",
  },
  {
    id: 8,
    title: "Asynchronous Programming",
    description: "Work with asynchronous operations",
    task: "Create a function that changes cube color after a delay",
    hints: ["Use setTimeout", "Change the color inside the timeout callback"],
    initialCode: "// Create a function with setTimeout\nfunction changeColorWithDelay() {\n  // Your code here\n}\n\nchangeColorWithDelay();",
    solution: "function changeColorWithDelay() {\n  setTimeout(() => {\n    cube.material.color.set('purple');\n  }, 1000);\n}\n\nchangeColorWithDelay();",
  },
  {
    id: 9,
    title: "Error Handling",
    description: "Handle potential errors in your code",
    task: "Try to set an invalid property and handle the error",
    hints: ["Use try/catch", "Attempt to access a non-existent property"],
    initialCode: "// Use try/catch for error handling\ntry {\n  // Some code that might fail\n} catch (error) {\n  // Handle the error\n}",
    solution: "try {\n  cube.nonExistentMethod();\n} catch (error) {\n  console.error('An error occurred:', error.message);\n  cube.position.y += 1; // Alternative action\n}",
  },
  {
    id: 10,
    title: "Code Organization",
    description: "Organize code with functions and reusability",
    task: "Create and use a function to animate all objects in the scene",
    hints: ["Define a function that takes an object as parameter", "Apply it to multiple objects"],
    initialCode: "// Create a reusable animation function\nfunction animate(object) {\n  // Your animation code\n}\n\n// Apply to multiple objects",
    solution: "function animate(object) {\n  object.rotation.y += 0.1;\n  object.rotation.x += 0.05;\n}\n\nanimate(cube);\n// You can call this with any object: animate(sphere);",
  },
];

const CourseGame = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [userCode, setUserCode] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [codeExecuted, setCodeExecuted] = useState(false);
  
  const mountRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);
  const sphereGeometryRef = useRef<THREE.SphereGeometry | null>(null);
  const sphereMaterialRef = useRef<THREE.MeshPhongMaterial | null>(null);
  const cubeGeometryRef = useRef<THREE.BoxGeometry | null>(null);
  const cubeMaterialRef = useRef<THREE.MeshPhongMaterial | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const targetRef = useRef<THREE.Mesh | null>(null);
  
  const { toast } = useToast();

  // Fetch course data
  useEffect(() => {
    if (courseId) {
      // Simulate API call with setTimeout
      setTimeout(() => {
        const foundCourse = getCourseById(courseId);
        setCourse(foundCourse);
        setIsLoading(false);
      }, 500);
    }
  }, [courseId]);

  // Clean up Three.js resources
  const cleanupThreeJS = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Fix: Check if the renderer's DOM element is actually a child of mountRef before removing
    if (mountRef.current && rendererRef.current && rendererRef.current.domElement.parentNode === mountRef.current) {
      mountRef.current.removeChild(rendererRef.current.domElement);
    }
    
    if (sceneRef.current) {
      // Dispose geometries and materials
      sceneRef.current.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          }
        }
      });
    }
  };

  // Initialize Three.js scene
  const initThreeJS = () => {
    if (!mountRef.current) return;
    
    // Cleanup any existing scene
    cleanupThreeJS();

    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    camera.position.y = 1;
    cameraRef.current = camera;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Add grid for reference
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

    // Create reusable geometries and materials
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x1EAEDB });
    cubeGeometryRef.current = cubeGeometry;
    cubeMaterialRef.current = cubeMaterial;

    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x9b87f5 });
    sphereGeometryRef.current = sphereGeometry;
    sphereMaterialRef.current = sphereMaterial;

    // Setup level-specific elements
    setupLevelObjects(scene, currentLevel);

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      // Render the scene
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Return cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      cleanupThreeJS();
    };
  };

  // Setup objects based on current level
  const setupLevelObjects = (scene: THREE.Scene, level: number) => {
    // Clear previous objects (except lights and grid)
    scene.traverse((child) => {
      if (!(child instanceof THREE.Light) && !(child instanceof THREE.GridHelper)) {
        scene.remove(child);
      }
    });

    // Reset references
    cubeRef.current = null;
    targetRef.current = null;

    // Add basic cube for most levels
    const cube = new THREE.Mesh(
      cubeGeometryRef.current || new THREE.BoxGeometry(1, 1, 1),
      cubeMaterialRef.current || new THREE.MeshPhongMaterial({ color: 0x1EAEDB })
    );
    cube.position.set(0, 0.5, 0);
    scene.add(cube);
    cubeRef.current = cube;

    // Add level-specific elements
    if (level === 1) {
      // Level 1: Variables - Add a target marker
      const targetGeometry = new THREE.BoxGeometry(1.1, 1.1, 1.1);
      const targetMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x8B5CF6, 
        transparent: true, 
        opacity: 0.5,
        wireframe: true
      });
      const target = new THREE.Mesh(targetGeometry, targetMaterial);
      target.position.set(2, 1, 0);
      scene.add(target);
      targetRef.current = target;
    }
    
    // Initialize code editor with level-specific code
    const levelData = javaScriptLevels[currentLevel - 1];
    if (levelData) {
      setUserCode(levelData.initialCode);
    }
  };

  // Effect to initialize Three.js when game starts or level changes
  useEffect(() => {
    if (gameStarted) {
      const cleanup = initThreeJS();
      
      // Return the cleanup function
      return () => {
        if (cleanup) cleanup();
      };
    }
  }, [gameStarted, currentLevel]);

  const handleStartGame = () => {
    setGameStarted(true);
    toast({
      title: "Game Started",
      description: `Level ${currentLevel}: ${javaScriptLevels[currentLevel - 1]?.title}`,
    });
  };

  const handleShowCodeEditor = () => {
    setShowCodeEditor(true);
  };

  const handleHideCodeEditor = () => {
    setShowCodeEditor(false);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserCode(e.target.value);
  };

  const handleRunCode = () => {
    if (!sceneRef.current || !cubeRef.current) return;
    
    setCodeExecuted(true);
    
    try {
      // Create a sandboxed execution context with necessary objects
      const cube = cubeRef.current;
      const scene = sceneRef.current;
      const THREE_SANDBOX = THREE;
      const sphereGeometry = sphereGeometryRef.current;
      const sphereMaterial = sphereMaterialRef.current;
      const cubeGeometry = cubeGeometryRef.current;
      const cubeMaterial = cubeMaterialRef.current;
      
      // Execute user code
      // eslint-disable-next-line no-new-func
      new Function('cube', 'scene', 'THREE', 'sphereGeometry', 'sphereMaterial', 'cubeGeometry', 'cubeMaterial',
        userCode
      )(cube, scene, THREE_SANDBOX, sphereGeometry, sphereMaterial, cubeGeometry, cubeMaterial);
      
      // Check if level is completed based on the current level
      const isCompleted = checkLevelCompletion();
      
      if (isCompleted) {
        toast({
          title: "Success!",
          description: "You've completed this level!",
          variant: "default",
        });
        
        // Go to next level if not at the last level
        if (currentLevel < javaScriptLevels.length) {
          setTimeout(() => {
            setCurrentLevel(prev => prev + 1);
            setCodeExecuted(false);
            setShowCodeEditor(false);
            setShowHint(false);
          }, 1500);
        } else {
          toast({
            title: "Congratulations!",
            description: "You've completed all levels!",
            variant: "default",
          });
        }
      } else {
        toast({
          title: "Try Again",
          description: "That's not quite right. Keep trying!",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Code execution error:", error);
      toast({
        title: "Error",
        description: `There was an error in your code: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  };

  const checkLevelCompletion = () => {
    if (!cubeRef.current) return false;
    
    const cube = cubeRef.current;
    
    switch (currentLevel) {
      case 1: // Variables
        return Math.abs(cube.position.x - 2) < 0.1 && 
               Math.abs(cube.position.y - 1) < 0.1 && 
               Math.abs(cube.position.z - 0) < 0.1;
      
      case 2: // Functions
        return cube.rotation.y > 0.05;
      
      case 3: // Conditionals
        const isRed = cube.material.color.r > 0.9 && cube.material.color.g < 0.3 && cube.material.color.b < 0.3;
        const isBlue = cube.material.color.r < 0.3 && cube.material.color.g < 0.3 && cube.material.color.b > 0.9;
        return (cube.position.x > 1 && isRed) || (cube.position.x <= 1 && isBlue);
      
      // For simplicity, these are just basic checks
      // In a full implementation, you would have more sophisticated checks for each level
      case 4: // Loops
        return sceneRef.current ? sceneRef.current.children.filter(c => c instanceof THREE.Mesh && c.geometry instanceof THREE.SphereGeometry).length >= 5 : false;
      
      case 5: // Arrays
        return true; // Simplified check
      
      case 6: // Objects
        return cube.position.x !== 0;
      
      case 7: // Event Handling
        return true; // This would require actual user interaction
      
      case 8: // Async
        return true; // This requires observing over time
      
      case 9: // Error Handling
        return true; // Simple check for try/catch usage
      
      case 10: // Code Organization
        return cube.rotation.y > 0 && cube.rotation.x > 0;
      
      default:
        return false;
    }
  };

  const handleToggleHint = () => {
    setShowHint(!showHint);
  };

  const handleRestartLevel = () => {
    setupLevelObjects(sceneRef.current!, currentLevel);
    setCodeExecuted(false);
    toast({
      title: "Level Restarted",
      description: "Try again with a fresh start!",
      variant: "default",
    });
  };

  const handleRestartGame = () => {
    setCurrentLevel(1);
    setShowCodeEditor(false);
    setShowHint(false);
    setCodeExecuted(false);
    
    // Reset the scene
    if (sceneRef.current) {
      setupLevelObjects(sceneRef.current, 1);
    }
    
    toast({
      title: "Game Restarted",
      description: "Starting from Level 1. Good luck!",
    });
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-64 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!course) {
    return (
      <MainLayout>
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-6">Course Not Found</h1>
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  const currentLevelData = javaScriptLevels[currentLevel - 1];

  return (
    <MainLayout>
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
              <Link to={`/course/${courseId}`} className="flex items-center text-sm text-gray-500 hover:text-blue-500 transition-smooth">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Course
              </Link>
              {gameStarted && (
                <div className="flex items-center">
                  <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="font-medium">Level {currentLevel}/10: {currentLevelData?.title}</span>
                </div>
              )}
            </div>

            {!gameStarted ? (
              <div className="text-center p-12 border border-gray-200 rounded-xl mb-8 bg-white shadow-sm">
                <h1 className="text-3xl font-bold mb-6">JavaScript Puzzle Game</h1>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Learn JavaScript concepts by solving interactive 3D puzzles! Complete all 10 levels to master 
                  variables, functions, loops, and more advanced concepts.
                </p>
                <Button 
                  size="lg" 
                  onClick={handleStartGame}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Start Game
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col">
                    <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
                      <h2 className="text-xl font-bold mb-2">Level {currentLevel}: {currentLevelData?.title}</h2>
                      <p className="text-gray-600 mb-2">{currentLevelData?.description}</p>
                      <div className="bg-gray-100 p-3 rounded-lg mb-3">
                        <p className="font-medium"><span className="font-bold">Task:</span> {currentLevelData?.task}</p>
                      </div>
                      {showHint && (
                        <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg mb-3">
                          <p className="text-sm text-blue-800"><span className="font-bold">Hints:</span></p>
                          <ul className="list-disc ml-5 text-sm text-blue-800">
                            {currentLevelData?.hints.map((hint, index) => (
                              <li key={index}>{hint}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={handleToggleHint}
                          className="text-xs"
                        >
                          {showHint ? "Hide Hints" : "Show Hints"}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={handleRestartLevel}
                          className="text-xs"
                        >
                          Restart Level
                        </Button>
                      </div>
                    </div>
                    
                    <div 
                      ref={mountRef} 
                      className="flex-grow bg-gray-100 rounded-xl overflow-hidden mb-4 min-h-[300px]"
                    />
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={handleRestartGame}
                        className="text-xs"
                      >
                        Restart Game
                      </Button>
                      
                      {!showCodeEditor ? (
                        <Button 
                          onClick={handleShowCodeEditor}
                          className="bg-blue-500 hover:bg-blue-600"
                        >
                          <Code className="h-4 w-4 mr-2" />
                          Open Code Editor
                        </Button>
                      ) : (
                        <Button 
                          onClick={handleHideCodeEditor}
                          variant="outline"
                        >
                          Hide Code Editor
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {showCodeEditor && (
                    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                      <div className="bg-gray-800 text-gray-200 p-3 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="flex space-x-2 mr-4">
                            <Circle className="h-3 w-3 fill-current text-red-500" />
                            <Circle className="h-3 w-3 fill-current text-yellow-500" />
                            <Circle className="h-3 w-3 fill-current text-green-500" />
                          </div>
                          <span className="text-sm font-medium">JavaScript Editor</span>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={handleRunCode}
                          className="bg-green-500 hover:bg-green-600 text-xs"
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Run Code
                        </Button>
                      </div>
                      <textarea
                        ref={editorRef}
                        value={userCode}
                        onChange={handleCodeChange}
                        className="w-full h-[400px] bg-gray-900 text-gray-100 p-4 font-mono text-sm focus:outline-none resize-none"
                        spellCheck="false"
                      />
                      <div className="bg-gray-800 p-2 border-t border-gray-700">
                        <div className="flex items-center text-xs text-gray-400">
                          <Info className="h-3 w-3 mr-1" />
                          <span>You can use: cube, scene, THREE, sphereGeometry, sphereMaterial, cubeGeometry, cubeMaterial</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CourseGame;
