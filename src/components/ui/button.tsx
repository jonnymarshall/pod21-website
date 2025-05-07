
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&:hover_.icon-rotate]:-rotate-45",
  {
    variants: {
      variant: {
        default: "bg-primary-100 text-carbonBlack hover:bg-primary-60",
        outline: "border border-stroke bg-transparent hover:bg-bgSecondary text-boneWhite",
        ghost: "bg-transparent hover:bg-bgSecondary text-boneWhite",
      },
      size: {
        sm: "px-[18px] py-3 gap-x-2 !text-body-sm",
        md: "px-6 py-4 gap-x-3 !text-body-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

// Export a wrapper component for the icon that should rotate
export const RotatingIcon = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "icon-rotate inline-block transition-transform duration-300",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export { Button };
