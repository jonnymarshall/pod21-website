
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedWordCycleProps {
  words: string[];
  interval?: number;
  className?: string;
}

export default function AnimatedWordCycle({
  words,
  interval = 3000, // Changed from 5000 to 3000
  className = "",
}: AnimatedWordCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState("auto");
  const measureRef = useRef<HTMLDivElement>(null);
  const intervalIdRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(Date.now());

  // Get the width of the current word
  useEffect(() => {
    if (measureRef.current) {
      const elements = measureRef.current.children;
      if (elements.length > currentIndex) {
        // Add a small buffer (10px) to prevent text wrapping
        const newWidth = elements[currentIndex].getBoundingClientRect().width;
        setWidth(`${newWidth}px`);
      }
    }
  }, [currentIndex]);

  // Set up the word cycling with visibility API handling
  useEffect(() => {
    const startInterval = () => {
      // Clear any existing interval
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }

      // Set new interval with the updated frequency
      intervalIdRef.current = window.setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        lastUpdateTimeRef.current = Date.now();
      }, interval);
    };

    // Handle visibility change to maintain consistent timing
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Calculate how much time has passed and potentially skip updates
        const timeElapsed = Date.now() - lastUpdateTimeRef.current;
        const cyclesPassed = Math.floor(timeElapsed / interval);
        
        if (cyclesPassed > 0) {
          // Update the index based on time passed
          setCurrentIndex((prevIndex) => 
            (prevIndex + cyclesPassed) % words.length
          );
          lastUpdateTimeRef.current = Date.now();
        }
        
        // Restart the interval
        startInterval();
      } else {
        // Clear interval when tab is hidden
        if (intervalIdRef.current) {
          clearInterval(intervalIdRef.current);
          intervalIdRef.current = null;
        }
      }
    };

    // Start the initial interval
    startInterval();
    
    // Set up visibility change listener
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Clean up
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [interval, words.length]);

  // Container animation for the whole word (removed blur filter)
  const containerVariants = {
    hidden: {
      y: -20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      y: 20,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (
    <>
      {/* Hidden measurement div with all words rendered */}
      <div
        ref={measureRef}
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none"
        style={{ visibility: "hidden" }}
      >
        {words.map((word, i) => (
          <span key={i} className={`font-bold ${className}`}>
            {word}
          </span>
        ))}
      </div>

      {/* Visible animated word */}
      <motion.span
        className="relative inline-block"
        animate={{
          width,
          transition: {
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 1.2,
          },
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.h1
            key={currentIndex}
            className={`inline-block font-bold ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ whiteSpace: "nowrap" }}
          >
            {words[currentIndex]}
          </motion.h1>
        </AnimatePresence>
      </motion.span>
    </>
  );
}
