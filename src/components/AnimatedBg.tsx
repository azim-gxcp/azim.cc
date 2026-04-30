'use client';

import { useEffect, useRef, useCallback, useMemo } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const nodesRef = useRef<Node[]>([]);
  const lastTimeRef = useRef<number>(0);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastDimensionsRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

  // Memoized constants for performance
  const CONFIG = useMemo(() => ({
    NODE_DENSITY: 15000, // pixels per node
    MAX_CONNECTION_DISTANCE: 150,
    NODE_SPEED: 0.5,
    NODE_SIZE: 2,
    NODE_GLOW_SIZE: 1,
    CONNECTION_OPACITY: 0.3,
    NODE_OPACITY: 0.6,
    NODE_GLOW_OPACITY: 0.8,
    TARGET_FPS: 60,
    FRAME_TIME: 1000 / 60, // 16.67ms per frame
  }), []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Set canvas size
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    // Scale the context to ensure proper drawing on high-DPI screens
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, []);

  const createNodes = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const nodeCount = Math.floor((rect.width * rect.height) / CONFIG.NODE_DENSITY);
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * CONFIG.NODE_SPEED,
        vy: (Math.random() - 0.5) * CONFIG.NODE_SPEED,
      });
    }

    nodesRef.current = nodes;
    // Track current dimensions
    lastDimensionsRef.current = { width: rect.width, height: rect.height };
  }, [CONFIG.NODE_DENSITY, CONFIG.NODE_SPEED]);

  const adaptNodesToNewSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !nodesRef.current.length) return;

    const rect = canvas.getBoundingClientRect();
    const newNodeCount = Math.floor((rect.width * rect.height) / CONFIG.NODE_DENSITY);
    const currentNodes = nodesRef.current;

    // Use tracked dimensions for accurate scaling
    const oldDimensions = lastDimensionsRef.current;
    const scaleX = oldDimensions.width > 0 ? rect.width / oldDimensions.width : 1;
    const scaleY = oldDimensions.height > 0 ? rect.height / oldDimensions.height : 1;

    // Scale existing nodes smoothly
    currentNodes.forEach(node => {
      node.x = Math.max(0, Math.min(node.x * scaleX, rect.width - 1));
      node.y = Math.max(0, Math.min(node.y * scaleY, rect.height - 1));
    });

    // Add more nodes if needed
    if (newNodeCount > currentNodes.length) {
      const nodesToAdd = newNodeCount - currentNodes.length;
      for (let i = 0; i < nodesToAdd; i++) {
        currentNodes.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * CONFIG.NODE_SPEED,
          vy: (Math.random() - 0.5) * CONFIG.NODE_SPEED,
        });
      }
    }
    // Remove excess nodes if needed (remove from end to maintain existing nodes)
    else if (newNodeCount < currentNodes.length) {
      nodesRef.current = currentNodes.slice(0, newNodeCount);
    }

    // Update tracked dimensions
    lastDimensionsRef.current = { width: rect.width, height: rect.height };
  }, [CONFIG.NODE_DENSITY, CONFIG.NODE_SPEED]);

  const updateNodes = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !nodesRef.current.length) return;
    
    const rect = canvas.getBoundingClientRect();
    const nodes = nodesRef.current;

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      
      // Update position
      node.x += node.vx;
      node.y += node.vy;

      // Bounce off edges
      if (node.x <= 0 || node.x >= rect.width) {
        node.vx *= -1;
        node.x = Math.max(0, Math.min(rect.width, node.x));
      }
      if (node.y <= 0 || node.y >= rect.height) {
        node.vy *= -1;
        node.y = Math.max(0, Math.min(rect.height, node.y));
      }
    }
  }, []);

  const drawScene = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx || !nodesRef.current.length) return;

    const rect = canvas.getBoundingClientRect();
    const nodes = nodesRef.current;

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Pre-calculate connection distance squared for performance
    const connectionDistanceSq = CONFIG.MAX_CONNECTION_DISTANCE * CONFIG.MAX_CONNECTION_DISTANCE;

    // Draw connections first (behind nodes)
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      
      // Only check nodes ahead to avoid duplicate connections
      for (let j = i + 1; j < nodes.length; j++) {
        const otherNode = nodes[j];
        
        // Use squared distance to avoid expensive sqrt operation
        const dx = node.x - otherNode.x;
        const dy = node.y - otherNode.y;
        const distanceSq = dx * dx + dy * dy;

        if (distanceSq < connectionDistanceSq) {
          const distance = Math.sqrt(distanceSq);
          const opacity = (CONFIG.MAX_CONNECTION_DISTANCE - distance) / CONFIG.MAX_CONNECTION_DISTANCE * CONFIG.CONNECTION_OPACITY;
          
          ctx.strokeStyle = `rgba(127, 127, 127, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(otherNode.x, otherNode.y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes with glow effect
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      
      // Main node
      ctx.fillStyle = `rgba(23, 162, 16, ${CONFIG.NODE_OPACITY})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, CONFIG.NODE_SIZE, 0, Math.PI * 2);
      ctx.fill();

      // Glow effect
      ctx.shadowColor = `rgba(23, 162, 16, 0.5)`;
      ctx.shadowBlur = 10;
      ctx.fillStyle = `rgba(23, 162, 16, ${CONFIG.NODE_GLOW_OPACITY})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, CONFIG.NODE_GLOW_SIZE, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }, [CONFIG]);

  const animateFnRef = useRef<((currentTime: number) => void) | undefined>(undefined);
  const animate = useCallback((currentTime: number) => {
    // Throttle to target FPS
    if (currentTime - lastTimeRef.current < CONFIG.FRAME_TIME) {
      animationRef.current = requestAnimationFrame(animateFnRef.current!);
      return;
    }

    lastTimeRef.current = currentTime;

    updateNodes();
    drawScene();

    animationRef.current = requestAnimationFrame(animateFnRef.current!);
  }, [updateNodes, drawScene, CONFIG.FRAME_TIME]);
  useEffect(() => { animateFnRef.current = animate; }, [animate]);

  const handleResize = useCallback(() => {
    // Debounce resize events
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    
    resizeTimeoutRef.current = setTimeout(() => {
      resizeCanvas();
      // Use smooth adaptation instead of recreating nodes
      if (nodesRef.current.length > 0) {
        adaptNodesToNewSize();
      } else {
        createNodes();
      }
    }, 150);
  }, [resizeCanvas, adaptNodesToNewSize, createNodes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initial setup
    resizeCanvas();
    createNodes();

    // Respect prefers-reduced-motion: render one static frame, do not start rAF loop.
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches) {
      drawScene();
      window.addEventListener('resize', handleResize);
      return () => {
        if (resizeTimeoutRef.current) {
          clearTimeout(resizeTimeoutRef.current);
        }
        window.removeEventListener('resize', handleResize);
      };
    }

    // IntersectionObserver gate: pause rAF when canvas is offscreen.
    let isIntersecting = true;

    const startLoop = () => {
      if (animationRef.current !== undefined) return;
      animationRef.current = requestAnimationFrame(animate);
    };

    const stopLoop = () => {
      if (animationRef.current !== undefined) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
    };

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      });
    });
    io.observe(canvas);

    // Start animation immediately; observer will pause if already offscreen.
    startLoop();

    // Add resize listener
    window.addEventListener('resize', handleResize);

    return () => {
      // Cleanup
      stopLoop();
      io.disconnect();
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [animate, handleResize, resizeCanvas, createNodes, drawScene]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full min-h-full "
      // style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}
    />
  );
}
