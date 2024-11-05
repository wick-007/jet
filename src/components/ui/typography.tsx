import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils";

// Define the HTML elements and Typography color types
export type _TTypographyVariants =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "strong"
  | "em"
  | "blockquote";

export type _TTypographyColors =
  | "default"
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning"
  | "muted";

// Map the `variant` prop to its corresponding HTML element types
type VariantElementMap = {
  h1: HTMLHeadingElement;
  h2: HTMLHeadingElement;
  h3: HTMLHeadingElement;
  h4: HTMLHeadingElement;
  h5: HTMLHeadingElement;
  h6: HTMLHeadingElement;
  p: HTMLParagraphElement;
  span: HTMLSpanElement;
  strong: HTMLElement;
  em: HTMLElement;
  blockquote: HTMLElement;
};

interface _ITypographyProps<T extends _TTypographyVariants = "p"> // Set default type for `T`
  extends React.HTMLAttributes<VariantElementMap[T]> {
  variant: T;
  color?: _TTypographyColors;
}

// Define styles based on the variant (tag) and color
const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-4xl font-bold",
      h2: "text-3xl font-bold",
      h3: "text-2xl font-semibold",
      h4: "text-xl font-semibold",
      h5: "text-lg font-medium",
      h6: "text-base font-medium",
      p: "text-base font-normal",
      span: "text-sm font-normal",
      strong: "font-bold",
      em: "italic",
      blockquote: "text-lg italic border-l-4 pl-4",
    },
    color: {
      default: "text-neutral-700 dark:text-neutral-200",
      primary: "text-blue-600 dark:text-blue-400",
      secondary: "text-gray-600 dark:text-gray-300",
      danger: "text-red-600 dark:text-red-400",
      success: "text-green-600 dark:text-green-400",
      warning: "text-yellow-600 dark:text-yellow-400",
      muted: "text-gray-400 dark:text-gray-300",
    },
  },
  defaultVariants: {
    variant: "p",
    color: "default",
  },
});

// Define the Typography component with conditional ref typing
const Typography = React.forwardRef(
  <T extends _TTypographyVariants>(
    { className, variant, color = "default", ...props }: _ITypographyProps<T>,
    ref: React.ForwardedRef<VariantElementMap[T]>
  ) => {
    const Component = variant as React.ElementType; // Dynamically set the tag based on the variant prop
    return (
      <Component
        className={cn(typographyVariants({ variant, color, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";

export { Typography };
