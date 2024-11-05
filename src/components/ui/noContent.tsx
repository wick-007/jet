import * as React from "react";
import { cn } from "@/utils";
import { Button } from "./button";

type NoContentProps = {
  message?: string; // Customizable message for empty state
  subMessage?: string; // Optional sub-message
  onActionClick?: () => void; // Optional action callback for a CTA button
  actionLabel?: string; // Label for the CTA button
  className?: string; // Optional className for customization
};

const NoContent: React.FC<NoContentProps> = ({
  message = "No items found",
  subMessage,
  onActionClick,
  actionLabel,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16",
        className
      )}
    >
      <div className="text-center">
        {/* Illustration or Icon could be added here */}
        <div className="text-2xl font-semibold text-gray-600">{message}</div>
        {subMessage && (
          <p className="mt-2 text-sm text-gray-500">{subMessage}</p>
        )}
        {onActionClick && actionLabel && (
          <Button onClick={onActionClick} className="mt-4" variant={"default"} size={"default"}>
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default React.memo(NoContent);
