import * as React from "react";
import { cn } from "@/utils/classes.utils";
import { Label, _ILabelProps } from "@/components/ui/label";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useFormStatus } from "react-dom";
import { SvgSpinner } from "./icons";
import { useFormField } from "@/utils";

type _TFormButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  text: string;
  label: string;
  className?: string;
};

const FormLabel = React.forwardRef<HTMLLabelElement, _ILabelProps>(
  ({ className, ...props }, ref) => {
    const { formItemId } = useFormField();

    return (
      <Label
        ref={ref}
        className={cn("", className)}
        htmlFor={formItemId}
        {...props}
      />
    );
  }
);
FormLabel.displayName = "FormLabel";

const FormButton = React.forwardRef<HTMLButtonElement, _TFormButtonProps>(
  ({ className, text, label, ...props }, ref) => {
    const { pending } = useFormStatus();
    return (
      <button
        ref={ref}
        aria-disabled={pending}
        className={cn(
          "aria-disabled:pointer-events-none rounded w-full bg-blue-500 text-white py-2 mt-4 aria-disabled:bg-opacity-70",
          className
        )}
        {...props}
        // className="w-full bg-blue-500 text-white py-2 mt-4"
      >
        {pending ? (
          <div className="flex items-center justify-between capitalize">
            <p className="">{text}...</p>
            <SvgSpinner className="text-white" color="white" />
          </div>
        ) : (
          `${label}`
        )}
      </button>
    );
  }
);
FormButton.displayName = "FormButton";

const FormControl = React.forwardRef<HTMLDivElement, _TRefDivElement>(
  ({ ...props }, ref) => {
    const { error, formDescriptionId, formMessageId } = useFormField();

    return (
      <div
        ref={ref}
        aria-describedby={
          !error
            ? `${formDescriptionId}`
            : `${formDescriptionId} ${formMessageId}`
        }
        aria-invalid={!!error}
        {...props}
      />
    );
  }
);
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<HTMLParagraphElement, _TRefPElement>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return (
      <p
        ref={ref}
        id={formDescriptionId}
        className={cn("text-[0.8rem] text-muted-foreground", className)}
        {...props}
      />
    );
  }
);
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<HTMLParagraphElement, _TRefPElement>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
      return null;
    }

    return (
      <p
        ref={ref}
        id={formMessageId}
        className={cn("text-[0.8rem] font-medium text-destructive", className)}
        {...props}
      >
        {body}
      </p>
    );
  }
);
FormMessage.displayName = "FormMessage";

const FormError = ({ message }: { message: string }) => {
  const { error } = useFormField();

  if (!error) return;

  if (!message) return;

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

const FormSuccess = ({ message }: { message: string }) => {
  if (!message) return;

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CheckCircleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export {
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormButton,
  FormError,
  FormSuccess,
};
