import { useEffect, useState } from 'react';

const useDraggable = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [top, setTop] = useState('20%');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setTop(`${Math.min(window.innerHeight - 200, Math.max(0, e.clientY))}px`);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  return {
    style: {
      top,
    },
    onMouseDown: handleMouseDown,
  };
};

export default useDraggable;
