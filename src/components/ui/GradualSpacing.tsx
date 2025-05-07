
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useInView } from "framer-motion";
import * as React from "react";

export function GradualSpacing({
  text = "Gradual Spacing",
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      <AnimatePresence>
        {text.split("").map((char, i) => (
          <motion.h1
            key={i}
            initial={{ opacity: 0, x: -18 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            exit="hidden"
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={cn(
              "text-center tracking-tighter",
              "text-h2 md:text-h1 lg:text-banner"
            )}
          >
            {char === " " ? <span>&nbsp;</span> : char}
          </motion.h1>
        ))}
      </AnimatePresence>
    </div>
  );
}
