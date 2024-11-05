import * as React from "react";
import { buttonVariants, cn } from "@/utils";

export type _TButtonVariants = _TVariants | "ghost" | "link";

interface _IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: _TButtonVariants;
  size: _TSizes;
}

const Button = React.forwardRef<HTMLButtonElement, _IButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={type} // Using standard type instead of buttonType
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
