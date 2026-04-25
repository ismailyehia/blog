import React from "react";
import { cn } from "@/lib/utils";

interface AdSlotProps {
  type: "top" | "sidebar" | "mobile" | "in-content";
  className?: string;
}

export function AdSlot({ type, className }: AdSlotProps) {
  const dimensions = {
    top: "w-full max-w-[728px] h-[90px]",
    sidebar: "w-[300px] h-[250px]",
    mobile: "w-[320px] h-[100px]",
    "in-content": "w-full max-w-[728px] h-[90px]"
  };

  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center bg-muted/30 border border-dashed border-border rounded-lg overflow-hidden mx-auto my-6 relative group",
        dimensions[type],
        className
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-50 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-muted-foreground/20 to-transparent pointer-events-none"></div>
      <span className="text-xs uppercase tracking-widest text-muted-foreground font-mono font-medium opacity-70 z-10">
        Ad Slot — AdSense
      </span>
      <span className="text-[10px] text-muted-foreground/50 mt-1 z-10">
        {type === "top" || type === "in-content" ? "728x90" : type === "sidebar" ? "300x250" : "320x100"}
      </span>
    </div>
  );
}
