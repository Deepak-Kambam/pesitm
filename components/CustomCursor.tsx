
import React, { useState, useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  
  const cursorRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
  const requestRef = useRef<number>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button')) {
        setIsHoveringLink(true);
      } else {
        setIsHoveringLink(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    const updatePosition = () => {
      setPosition(prev => ({
        x: prev.x + (cursorRef.current.x - prev.x) * 0.15,
        y: prev.y + (cursorRef.current.y - prev.y) * 0.15
      }));
      requestRef.current = requestAnimationFrame(updatePosition);
    };
    
    requestRef.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Ring */}
      <div 
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-300 ease-out flex items-center justify-center mix-blend-difference`}
        style={{ 
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          width: isHoveringLink ? '60px' : (isClicking ? '20px' : '30px'),
          height: isHoveringLink ? '60px' : (isClicking ? '20px' : '30px'),
          border: '1px solid white',
          borderRadius: '50%',
          opacity: 0.8
        }}
      />
      {/* Inner Dot */}
      <div 
        className={`fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference`}
        style={{ 
          transform: `translate3d(${cursorRef.current.x}px, ${cursorRef.current.y}px, 0) translate(-50%, -50%)`,
          width: '4px',
          height: '4px',
          backgroundColor: 'white',
          borderRadius: '50%'
        }}
      />
    </>
  );
};

export default CustomCursor;
