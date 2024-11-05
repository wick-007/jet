import * as React from "react";
import { badgeVariants, cn } from "@/utils";

type _TBadgeVariants = _TVariants | "success";
export interface _IBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: _TBadgeVariants;
}
const Badge = React.forwardRef<HTMLDivElement, _IBadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
);

Badge.displayName = "Badge";

export { Badge };
