
import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { getCourseById } from '@/lib/courses';
import { useToast } from '@/components/ui/use-toast';

const CourseGame = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const gameObjectRef = useRef<THREE.Mesh | null>(null);
  const animationFrameRef = useRef<number | null>(null);
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
    
    if (mountRef.current && rendererRef.current) {
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

    // Add objects based on the current level
    addLevelObjects(scene, currentLevel);

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      if (gameObjectRef.current) {
        gameObjectRef.current.rotation.x += 0.01;
        gameObjectRef.current.rotation.y += 0.01;
      }
      
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

  // Effect to initialize Three.js when game starts or level changes
  useEffect(() => {
    if (gameStarted) {
      const cleanup = initThreeJS();
      return cleanup;
    }
  }, [gameStarted, currentLevel]);

  // Add objects based on level
  const addLevelObjects = (scene: THREE.Scene, level: number) => {
    // Clear previous objects (except lights)
    scene.children.forEach((child) => {
      if (!(child instanceof THREE.Light)) {
        scene.remove(child);
      }
    });

    // Add shapes based on level
    if (level <= 3) {
      // Beginner levels - simple cube
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshPhongMaterial({ 
        color: level === 1 ? 0x00ff00 : level === 2 ? 0x0000ff : 0xff0000 
      });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      gameObjectRef.current = cube;
    } else if (level <= 6) {
      // Intermediate levels - torus
      const torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 50);
      const torusMaterial = new THREE.MeshPhongMaterial({ 
        color: level === 4 ? 0xff00ff : level === 5 ? 0xffff00 : 0x00ffff 
      });
      const torus = new THREE.Mesh(torusGeometry, torusMaterial);
      scene.add(torus);
      gameObjectRef.current = torus;
    } else {
      // Advanced levels - more complex shapes
      const geometry = new THREE.DodecahedronGeometry(1, 0);
      const material = new THREE.MeshPhongMaterial({ 
        color: level === 7 ? 0x990000 : level === 8 ? 0x009900 : 0x000099,
        wireframe: level === 10,
      });
      const shape = new THREE.Mesh(geometry, material);
      scene.add(shape);
      gameObjectRef.current = shape;
    }
  };

  const handleStartGame = () => {
    setGameStarted(true);
    toast({
      title: "Game Started",
      description: `Level ${currentLevel} - Click on the shape to advance to the next level!`,
    });
  };

  const handleNextLevel = () => {
    if (currentLevel < 10) {
      setCurrentLevel(prev => prev + 1);
      toast({
        title: `Level ${currentLevel + 1}`,
        description: "New level unlocked! Keep going!",
      });

      // Reinitialize the scene with new level objects
      if (sceneRef.current) {
        addLevelObjects(sceneRef.current, currentLevel + 1);
      }
    } else {
      toast({
        title: "Congratulations!",
        description: "You've completed all levels!",
        variant: "default",
      });
    }
  };

  const handleRestartGame = () => {
    setCurrentLevel(1);
    if (sceneRef.current) {
      addLevelObjects(sceneRef.current, 1);
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

  return (
    <MainLayout>
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
              <Link to={`/course/${courseId}`} className="flex items-center text-sm text-gray-500 hover:text-blue-500 transition-smooth">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Course
              </Link>
              {gameStarted && (
                <div className="flex items-center">
                  <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="font-medium">Level {currentLevel}/10</span>
                </div>
              )}
            </div>

            {!gameStarted ? (
              <div className="text-center p-12 border border-gray-200 rounded-xl mb-8 bg-white shadow-sm">
                <h1 className="text-3xl font-bold mb-6">Ready to Play?</h1>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  This interactive game will help you learn {course.title} concepts through 10 increasingly challenging levels.
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
                <div 
                  ref={mountRef} 
                  className="w-full h-[400px] bg-gray-100 rounded-xl overflow-hidden mb-6 cursor-pointer"
                  onClick={handleNextLevel}
                />
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Click on the shape to advance to the next level</p>
                  <Button
                    variant="outline"
                    onClick={handleRestartGame}
                    className="text-sm"
                  >
                    Restart Game
                  </Button>
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
