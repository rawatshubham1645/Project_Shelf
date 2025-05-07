import React from "react";
import { cn } from "../../lib/utils";

const Suspense = ({ children, className, size = "default" }) => {
  const sizes = {
    sm: "h-4 w-4 border-2",
    default: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-3",
  };

  return (
    <React.Suspense
      fallback={
        <div
          className={cn(
            "h-screen w-full flex items-center justify-center",
            className
          )}
        >
          <div className="relative">
            <div
              className={cn(
                "animate-spin rounded-full border-t-primary border-l-transparent border-r-transparent border-b-transparent",
                sizes[size]
              )}
            />
          </div>
        </div>
      }
    >
      {children}
    </React.Suspense>
  );
};

Suspense.displayName = "Suspense";

export { Suspense };
