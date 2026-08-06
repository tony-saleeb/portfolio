"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

export function TiltLogo({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
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
    <div className="absolute inset-0 flex items-center justify-center [perspective:1000px] overflow-hidden bg-black/40">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative flex items-center justify-center"
      >
        {/* Parallax Background Grid */}
        <div 
          className="absolute w-[150%] h-[150%] bg-[linear-gradient(to_right,#00bfff15_1px,transparent_1px),linear-gradient(to_bottom,#00bfff15_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_80%,transparent_100%)]"
          style={{ transform: "translateZ(-80px)" }}
        ></div>
        
        {/* Glowing Ambient Core */}
        <div 
          className="absolute w-2/3 h-2/3 bg-accent/30 rounded-full blur-[60px]"
          style={{ transform: "translateZ(-20px)" }}
        ></div>

        {/* 3D Floating Logo */}
        <motion.div 
          className="relative w-2/3 h-2/3 max-w-[300px] max-h-[300px]"
          style={{ transform: "translateZ(100px)" }}
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image 
            src={src} 
            alt={alt} 
            fill 
            className="object-contain drop-shadow-[0_30px_40px_rgba(0,191,255,0.6)]"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
