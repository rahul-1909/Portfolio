import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

interface PhysicsDoodleItem {
  id: string;
  type: 'circle' | 'pill' | 'star' | 'box';
  label: string;
  icon?: string;
  bgColor: string;
  textColor: string;
  borderColor?: string;
  radius?: number;
  width?: number;
  height?: number;
}

const DOODLE_ITEMS: PhysicsDoodleItem[] = [
  { id: 'smiley', type: 'circle', label: '', icon: '😊', bgColor: '#FFE600', textColor: '#000000', radius: 36 },
  { id: 'python', type: 'pill', label: 'Python 3.12', icon: '🐍', bgColor: '#FFFFFF', textColor: '#000000', width: 120, height: 42 },
  { id: 'golang', type: 'pill', label: 'Go Lang', icon: '🐹', bgColor: '#E0F2FE', textColor: '#0369A1', width: 110, height: 42 },
  { id: 'fastapi', type: 'pill', label: 'FastAPI', icon: '⚡', bgColor: '#FFFFFF', textColor: '#000000', width: 110, height: 42 },
  { id: 'langgraph', type: 'circle', label: 'LangGraph', icon: '🤖', bgColor: '#FFE600', textColor: '#000000', radius: 42 },
  { id: 'latency', type: 'pill', label: 'Sub-14ms', icon: '🚀', bgColor: '#FEF08A', textColor: '#854D0E', width: 115, height: 40 },
  { id: 'docker', type: 'box', label: 'Docker', icon: '🐳', bgColor: '#FFFFFF', textColor: '#000000', width: 95, height: 44 },
  { id: 'redis', type: 'pill', label: 'Redis Cache', icon: '⚡', bgColor: '#FEE2E2', textColor: '#991B1B', width: 120, height: 40 },
  { id: 'aws', type: 'pill', label: 'AWS Cloud', icon: '☁️', bgColor: '#FFFFFF', textColor: '#000000', width: 115, height: 42 },
  { id: 'coffee', type: 'box', label: 'Coffee', icon: '☕', bgColor: '#FEF9C3', textColor: '#713F12', width: 85, height: 45 },
  { id: 'virtusa', type: 'pill', label: 'Virtusa Alum', icon: '★', bgColor: '#FFE600', textColor: '#000000', width: 125, height: 42 },
  { id: 'star', type: 'star', label: '', icon: '★', bgColor: '#FFE600', textColor: '#000000', radius: 32 },
  { id: 'rahul', type: 'circle', label: 'RAHUL', icon: '⚡', bgColor: '#000000', textColor: '#FFFFFF', radius: 38 },
];

export const FraPhysicsWorld: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hintVisible, setHintVisible] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 550;

    const {
      Engine,
      Render,
      Runner,
      Bodies,
      Composite,
      Mouse,
      MouseConstraint,
      Events,
      Vector,
    } = Matter;

    // 1. Create Engine
    const engine = Engine.create({
      gravity: { x: 0, y: 0.85, scale: 0.001 },
    });

    // 2. Create Custom Renderer
    const render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
      },
    });

    // 3. Setup Boundaries (Floor, Left, Right)
    const wallOptions = { isStatic: true, friction: 0.3, restitution: 0.4 };
    const floor = Bodies.rectangle(width / 2, height + 25, width * 2, 50, wallOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height * 2, wallOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height * 2, wallOptions);

    Composite.add(engine.world, [floor, leftWall, rightWall]);

    // 4. Create Doodle Physics Bodies
    const itemMap = new Map<number, PhysicsDoodleItem>();

    DOODLE_ITEMS.forEach((item, index) => {
      // Stagger initial drop positions horizontally
      const startX = (width * 0.15) + ((index * 60) % (width * 0.7));
      const startY = -40 - (index * 45);

      let body: Matter.Body;

      if (item.type === 'circle') {
        const r = item.radius || 35;
        body = Bodies.circle(startX, startY, r, {
          restitution: 0.65,
          friction: 0.15,
          frictionAir: 0.005,
          density: 0.0015,
        });
      } else if (item.type === 'star') {
        body = Bodies.polygon(startX, startY, 5, item.radius || 32, {
          restitution: 0.6,
          friction: 0.2,
          density: 0.0015,
        });
      } else {
        const w = item.width || 110;
        const h = item.height || 42;
        body = Bodies.rectangle(startX, startY, w, h, {
          chamfer: { radius: h / 2 },
          restitution: 0.55,
          friction: 0.2,
          density: 0.0015,
        });
      }

      // Add gentle random spin
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);

      itemMap.set(body.id, item);
      Composite.add(engine.world, body);
    });

    // 5. Setup Mouse & Touch Constraint for Dragging / Throwing
    const mouse = Mouse.create(canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.25,
        render: { visible: false },
      },
    });

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Hide user prompt after first drag
    Events.on(mouseConstraint, 'startdrag', () => {
      setHintVisible(false);
    });

    // 6. Custom Doodle Drawing Loop
    Events.on(render, 'afterRender', () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const bodies = Composite.allBodies(engine.world);

      bodies.forEach((body) => {
        if (body.isStatic) return;

        const item = itemMap.get(body.id);
        if (!item) return;

        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);

        // Draw Comic Shadow
        ctx.save();
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        if (item.type === 'circle' || item.type === 'star') {
          const r = item.radius || 35;
          ctx.arc(3, 4, r, 0, Math.PI * 2);
        } else {
          const w = item.width || 110;
          const h = item.height || 42;
          ctx.roundRect(-w / 2 + 3, -h / 2 + 4, w, h, h / 2);
        }
        ctx.fill();
        ctx.restore();

        // Draw Body Fill
        ctx.fillStyle = item.bgColor;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';

        ctx.beginPath();
        if (item.type === 'circle' || item.type === 'star') {
          const r = item.radius || 35;
          ctx.arc(0, 0, r, 0, Math.PI * 2);
        } else {
          const w = item.width || 110;
          const h = item.height || 42;
          ctx.roundRect(-w / 2, -h / 2, w, h, h / 2);
        }
        ctx.fill();
        ctx.stroke();

        // Draw Content / Face / Icons
        if (item.id === 'smiley') {
          // Doodle Smiley Face
          ctx.fillStyle = '#000000';
          // Eyes
          ctx.beginPath();
          ctx.arc(-11, -8, 3.5, 0, Math.PI * 2);
          ctx.arc(11, -8, 3.5, 0, Math.PI * 2);
          ctx.fill();
          // Arc Smile
          ctx.beginPath();
          ctx.arc(0, 2, 16, 0.2 * Math.PI, 0.8 * Math.PI);
          ctx.lineWidth = 3;
          ctx.stroke();
        } else if (item.id === 'star') {
          ctx.fillStyle = '#000000';
          ctx.font = 'bold 22px "Bebas Neue", sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('★', 0, 1);
        } else {
          // Text + Icon
          ctx.fillStyle = item.textColor;
          ctx.font = 'bold 12px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          const displayStr = item.icon ? `${item.icon} ${item.label}` : item.label;
          ctx.fillText(displayStr, 0, 1);
        }

        ctx.restore();
      });
    });

    // 7. Start Engine & Runner
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // 8. Handle Window Resize
    const handleResize = () => {
      if (!container || !canvas) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 550;

      render.options.width = newWidth;
      render.options.height = newHeight;
      canvas.width = newWidth;
      canvas.height = newHeight;

      Matter.Body.setPosition(floor, Vector.create(newWidth / 2, newHeight + 25));
      Matter.Body.setPosition(rightWall, Vector.create(newWidth + 25, newHeight / 2));
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
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto">
      <canvas ref={canvasRef} className="w-full h-full block" />
      
      {/* Playful Interactive Hint */}
      {hintVisible && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-300">
          <div className="flex items-center gap-2 bg-white/95 px-3 py-1.5 rounded-full border-2 border-black shadow-[3px_3px_0px_#000]">
            <span className="w-2 h-2 rounded-full bg-[#FFE600] border border-black animate-ping" />
            <span className="font-mono text-[11px] font-bold text-black tracking-tight">
              ✦ Grab, drag & toss the doodle stickers around!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
