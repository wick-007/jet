import { cn } from "@/utils";
import * as React from "react";
import Image from "./image"

type CardsImageProp = {
  src: string;
  alt: string;
  width: number | `${number}` | undefined;
  height: number | `${number}` | undefined;
  className?: string;
  loading?: "eager" | "lazy" | undefined;
};

const Card = React.forwardRef<HTMLDivElement, _TRefDivElement>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, _TRefDivElement>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLDivElement, _TRefDivElement>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLDivElement, _TRefDivElement>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, _TRefDivElement>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, _TRefDivElement>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

// Specialized table image cell for avatars or images
const CardImage = React.forwardRef<HTMLImageElement, CardsImageProp>(
  ({ src, alt, width, height, loading, className, ...props }, ref) => (
    <Image
      ref={ref}
      src={src}
      alt={alt}
      width={width ?? 120}
      height={height ?? 120}
      loading={loading}
      className={cn("w-full h-full object-cover", className)} // Ensure object-cover is applied
      {...props}
    />
  )
);

CardImage.displayName = "CardImage";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardImage,
  CardDescription,
  CardContent,
};
