import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { Eye, EyeOff } from "lucide-react";

const Input = React.forwardRef(
  ({ className, type = "text", iconAfter, iconBefore, ...props }, ref) => {
    return (
      <div className="relative flex w-full items-center">
        {iconBefore && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 transform">
            {iconBefore}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "form-field-focus flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            iconBefore && "pl-10",
            iconAfter && "pr-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {iconAfter && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
            {iconAfter}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

const PasswordInput = React.forwardRef(({ className, ...props }, ref) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        ref={ref}
        type={visible ? "text" : "password"}
        className={className + " pr-10"}
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        tabIndex={-1}
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";

export { Input, PasswordInput };
