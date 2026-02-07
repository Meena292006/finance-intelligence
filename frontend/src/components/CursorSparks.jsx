import { useEffect, useRef } from 'react';

export default function CursorSparks() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const createSpark = (x, y) => {
      const spark = document.createElement('div');
      spark.className = 'spark';
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;

      // Random color variation (Golden/Orange/Yellow)
      const hue = Math.floor(Math.random() * 40) + 30;
      spark.style.backgroundColor = `hsl(${hue}, 100%, 60%)`;
      spark.style.boxShadow = `0 0 ${4 + Math.random() * 4}px hsl(${hue}, 100%, 60%)`;

      container.appendChild(spark);

      // Random spread direction
      const angle = Math.random() * Math.PI * 2;
      const distance = 30 + Math.random() * 50;
      const destinationX = Math.cos(angle) * distance;
      const destinationY = Math.sin(angle) * distance;

      const animation = spark.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: `translate(calc(-50% + ${destinationX}px), calc(-50% + ${destinationY}px)) scale(0)`, opacity: 0 }
      ], {
        duration: 600 + Math.random() * 400,
        easing: 'cubic-bezier(0, .9, .57, 1)',
      });

      animation.onfinish = () => {
        if (spark.parentNode) container.removeChild(spark);
      };
    };

    const handleMouseMove = (e) => {
      // Create sparks more frequently for a "trail" effect
      if (Math.random() < 0.3) {
        createSpark(e.clientX, e.clientY);
      }
    };

    // Burst on click
    const handleClick = (e) => {
      for (let i = 0; i < 12; i++) {
        createSpark(e.clientX, e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      if (container) container.innerHTML = '';
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="cursor-sparks-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden'
      }}
    />
  );
}
