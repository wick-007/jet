import { cn } from "@/utils";
import { Ref, FC } from "react";

export interface _ILabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  ref?: Ref<HTMLLabelElement>
  }
const Label: FC<_ILabelProps> = ({ className, ref, ...props}) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
  )
Label.displayName = "Label";

export { Label };