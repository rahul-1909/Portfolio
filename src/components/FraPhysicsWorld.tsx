import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

export const FraPhysicsWorld: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 650;

    const {
      Engine,
      Render,
      Runner,
      Bodies,
      Composite,
      Mouse,
      MouseConstraint,
      Body,
      Vector,
    } = Matter;

    // 1. Create Engine with realistic gravity
    const engine = Engine.create({
      gravity: { x: 0, y: 0.65 },
      enableSleeping: true,
    });

    // 2. Create Render
    const render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio || 1,
      },
    });

    // 3. Create Static Boundaries (Floor, Left Wall, Right Wall)
    const wallThickness = 80;
    const wallOptions = { isStatic: true, friction: 0.3, restitution: 0.4, render: { visible: false } };
    const floor = Bodies.rectangle(width / 2, height + wallThickness / 2, width * 2, wallThickness, wallOptions);
    const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions);
    const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions);

    Composite.add(engine.world, [floor, leftWall, rightWall]);

    // 4. Preload and Spawn the 36 Authentic Fra Doodle Images
    const totalItems = 36;
    const isMobile = width < 640;
    const scale = isMobile ? 0.38 : 0.52;
    const bodiesToAdd: Matter.Body[] = [];

    // Preload images to get natural dimensions
    let loadedCount = 0;
    const itemsToLoad = isMobile ? 24 : totalItems;

    for (let i = 1; i <= itemsToLoad; i++) {
      const img = new Image();
      const src = `/images/fra/menu-object-${i}-clean.png`;
      img.src = src;

      img.onload = () => {
        const itemW = (img.naturalWidth || 100) * scale;
        const itemH = (img.naturalHeight || 100) * scale;

        // Spread initial fall positions horizontally and vertically
        const startX = Math.random() * (width - 120) + 60;
        const startY = -40 - (i * 45) - (Math.random() * 80);

        const body = Bodies.rectangle(startX, startY, itemW, itemH, {
          chamfer: { radius: Math.min(itemW, itemH) * 0.25 },
          restitution: 0.55,
          friction: 0.15,
          frictionAir: 0.006,
          density: 0.0015,
          render: {
            sprite: {
              texture: src,
              xScale: scale,
              yScale: scale,
            },
          },
        });

        // Add initial gentle spin
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.07);

        bodiesToAdd.push(body);
        loadedCount++;

        if (loadedCount === itemsToLoad) {
          Composite.add(engine.world, bodiesToAdd);
          setLoaded(true);
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount === itemsToLoad && bodiesToAdd.length > 0) {
          Composite.add(engine.world, bodiesToAdd);
          setLoaded(true);
        }
      };
    }

    // 5. Setup Mouse & Touch Control for Dragging / Throwing
    const mouse = Mouse.create(canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // 6. Start Engine & Runner
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // 7. Handle Window Resize
    const handleResize = () => {
      if (!container || !canvas) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 650;

      render.options.width = newWidth;
      render.options.height = newHeight;
      canvas.width = newWidth;
      canvas.height = newHeight;

      Body.setPosition(floor, Vector.create(newWidth / 2, newHeight + wallThickness / 2));
      Body.setPosition(rightWall, Vector.create(newWidth + wallThickness / 2, newHeight / 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto z-10">
      <canvas ref={canvasRef} id="world" className="w-full h-full block" />
      
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs font-mono text-gray-400">
          (caricamento doodle world...)
        </div>
      )}
    </div>
  );
};
