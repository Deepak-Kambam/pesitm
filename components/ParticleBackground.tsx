
import React, { useRef, useEffect } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000, active: false };
    let time = 0;

    class Particle {
      originX: number;
      originY: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      phase: number;
      frequency: number;
      amplitude: number;

      constructor(centerX: number, centerY: number, radius: number) {
        // Initial loosely packed circle spawn
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.sqrt(Math.random()) * radius;
        this.originX = centerX + Math.cos(angle) * dist;
        this.originY = centerY + Math.sin(angle) * dist;
        
        this.x = this.originX;
        this.y = this.originY;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 2 + 0.8;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`;
        
        this.phase = Math.random() * Math.PI * 2;
        this.frequency = 0.001 + Math.random() * 0.003;
        this.amplitude = 5 + Math.random() * 10;
      }

      update() {
        // 1. "Floating on water" idle motion
        const waveX = Math.sin(time * this.frequency + this.phase) * 0.2;
        const waveY = Math.cos(time * this.frequency * 0.7 + this.phase) * 0.2;
        
        // 2. Strong Magnetic Follow Logic
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);
        
        // Follow range - significantly increased for better interaction
        const maxFollowDist = 800;

        if (mouse.active && dist < maxFollowDist) {
          // Force calculation: gets stronger as they get closer, but with a cap
          const force = (maxFollowDist - dist) / maxFollowDist;
          const attractionStrength = 1.8; // High strength to ensure they "follow"
          
          this.vx += (dx / dist) * force * attractionStrength;
          this.vy += (dy / dist) * force * attractionStrength;

          // Swirl effect when very close to cursor
          if (dist < 120) {
            const swirl = 0.15;
            this.vx += (dy / dist) * swirl;
            this.vy -= (dx / dist) * swirl;
          }
        }

        // 3. Dynamic Return to Origin
        // If mouse is active, the pull back to original position is much weaker
        // so they can be dragged around the screen.
        const elasticity = mouse.active && dist < 300 ? 0.0002 : 0.0015;
        const dOriginX = this.originX - this.x;
        const dOriginY = this.originY - this.y;
        
        this.vx += dOriginX * elasticity;
        this.vy += dOriginY * elasticity;

        // Apply velocities and wave motion
        this.x += this.vx + waveX;
        this.y += this.vy + waveY;

        // Dynamic Damping
        // Higher damping near the mouse to create a "sticky" clump effect
        const damping = (mouse.active && dist < 60) ? 0.82 : 0.92;
        this.vx *= damping;
        this.vy *= damping;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        
        ctx.fillStyle = this.color;
        
        // Glow effect increases when near cursor
        if (mouse.active && d < 200) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        } else {
            ctx.shadowBlur = 2;
            ctx.shadowColor = 'white';
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.3;
      
      const particleCount = 280; // Denser pack
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(centerX, centerY, radius));
      }
    };

    const animate = () => {
      time += 1;
      // Semi-transparent clear to leave short trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);
    
    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default ParticleBackground;
