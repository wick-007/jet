import { FC, Ref } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/utils";

interface _ISwitchProps extends React.HTMLAttributes<HTMLButtonElement> {
  checked: boolean;
  ref?: Ref<HTMLButtonElement>;
  size?: "default" | "sm" | "lg";
  onSwitchToggle: (checked: boolean) => void; // Rename here
}

const switchVariants = cva(
  "relative inline-flex items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  {
    variants: {
      size: {
        default: "w-12 h-6",
        sm: "w-10 h-5",
        lg: "w-14 h-7",
      },
      checked: {
        true: "bg-secondary dark:bg-secondary-dark",
        false: "bg-muted dark:bg-muted-dark",
      },
    },
    defaultVariants: {
      size: "default",
      checked: false,
    },
  }
);

const switchThumbVariants = cva(
  "inline-block transform rounded-full bg-white transition-transform",
  {
    variants: {
      size: {
        default: "h-5 w-5 translate-x-1",
        sm: "h-4 w-4 translate-x-1",
        lg: "h-6 w-6 translate-x-1",
      },
      checked: {
        true: "translate-x-6",
        false: "translate-x-1",
      },
    },
    defaultVariants: {
      size: "default",
      checked: false,
    },
  }
);

const Switch: FC<_ISwitchProps> = ({
  className,
  checked,
  size = "default",
  onSwitchToggle,
  ref,
  ...props
}) => {
  return (
    <button
      ref={ref}
      className={cn(switchVariants({ size, checked, className }))}
      role="switch"
      aria-checked={checked}
      onClick={() => onSwitchToggle(!checked)}
      {...props}
    >
      <span className={cn(switchThumbVariants({ size, checked }))} />
    </button>
  );
};
Switch.displayName = "Switch";

export { Switch };
