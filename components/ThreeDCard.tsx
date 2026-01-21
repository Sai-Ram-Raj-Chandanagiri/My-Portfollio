import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
}

export const ThreeDCard: React.FC<ThreeDCardProps> = ({ children, className = "", enableTilt = true }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth movement
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Transform mouse position to rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Reset values if tilt is disabled
  useEffect(() => {
    if (!enableTilt) {
      x.set(0);
      y.set(0);
    }
  }, [enableTilt, x, y]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !enableTilt) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      {...({
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
      } as any)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative h-full w-full transition-all duration-200 ease-linear ${className}`}
    >
      <div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
        className="h-full w-full"
      >
        {children}
      </div>
    </motion.div>
  );
};

export const CardItem: React.FC<{
  children: React.ReactNode;
  translateZ?: number | string;
  className?: string;
  as?: React.ElementType;
}> = ({ children, translateZ = 30, className, as: Tag = "div" }) => {
  const Component = Tag as any;
  return (
    <Component
      style={{ transform: `translateZ(${translateZ}px)` }}
      className={className}
    >
      {children}
    </Component>
  );
};