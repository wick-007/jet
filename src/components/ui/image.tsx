import { cn } from "@/utils";
import React, { ImgHTMLAttributes, Ref } from "react";

// Defining prop types that extend the default <img> attributes
interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  ref?: Ref<HTMLImageElement> | undefined;
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

const Image: React.FC<ImageProps> = ({
  src,
  ref,
  alt = "Image",
  width,
  height,
  className,
  ...props
}) => {
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("object-cover", className)}
      loading="lazy"
      {...props}
    />
  );
};

export default Image;
