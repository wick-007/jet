import { cn, useFormField } from "@/utils";
// import iconMap from "@/utils/constants/root.constants";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Ref, useState } from "react";
import { Typography } from "./typography";

type _TInputProps =
  | {
      type: "text" | "email" | "password" | "number" | "radio";
      placeholder?: string;
    }
  | { type: "select"; options?: { value: string | number; label: string }[] }
  | { type: "textarea"; placeholder?: string };

interface _ICommonProps {
  ref?: Ref<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  className?: string;
}
interface _InputWithErrors {
  id: string;
  prependComponent?: React.ReactNode;
  errors: Record<string, string[] | undefined>;
}

export const InputErrors = ({
  errors,
  id,
  prependComponent = <ExclamationCircleIcon className="h-5 w-5 text-red-500" />,
}: _InputWithErrors) => {
  return (
    <>
      {errors && errors[id] ? (
        <div id={`${id}-error`} className="mt-2 text-sm text-red-500">
          {errors[id]?.map((error: string) => (
            <div className="flex space-x-2" key={error}>
              {prependComponent}
              <Typography variant="span" className="">
                {error}
              </Typography>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

// Input Component
const Input: React.FC<_TInputProps & _ICommonProps> = ({
  className,
  ref,
  // disabled,
  // label,
  // icon,
  type,
  // tooltip,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  // const LinkIcon = icon ? iconMap[icon] : undefined;
  const { error, formItemId } = useFormField();
  const err_bool = !!error;

  const renderSelect = () => {
    const { options } = props as {
      options: { value: string | number; label: string }[];
    };
    return (
      <select
        id={formItemId}
        aria-label={formItemId}
        ref={ref as React.Ref<HTMLSelectElement>}
        className={cn(
          "block w-full bg-gray-50 dark:bg-zinc-800 text-black dark:text-white rounded-md px-3 py-2",
          err_bool
          ? "border-2 border-red-500 focus-visible:ring-red-500 dark:focus-visible:ring-red-500"
          : "focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600",
          className
        )}
        {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
        >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };

  const renderTextarea = () => (
    <div className="relative">
      <textarea
        id={formItemId}
        ref={ref as React.Ref<HTMLTextAreaElement>}
        className={cn(
          "block w-full bg-gray-50 dark:bg-zinc-800 text-black dark:text-white rounded-md px-3 py-2",
          err_bool
            ? "border-2 border-red-500 focus-visible:ring-red-500 dark:focus-visible:ring-red-500"
            : "focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600",
          className
        )}
        aria-label={formItemId}
        autoComplete={"on"}
        rows={4}
        {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
      {/* {icon && LinkIcon && (
        <LinkIcon className="pointer-events-none absolute left-3 top-[26px]  h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      )} */}
    </div>
  );

  const renderInput = () => (
    <div className="relative">
      <input
        ref={ref as React.Ref<HTMLInputElement>}
        type={type}
        id={formItemId}
        autoComplete="on"
        aria-label={formItemId}
        className={cn(
          `flex h-10 w-full bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm
            file:border-0 file:bg-transparent file:text-sm file:font-medium 
            placeholder:text-neutral-400 dark:placeholder:text-neutral-600 
            focus-visible:outline-none transition duration-300 ease-in-out
            disabled:cursor-not-allowed disabled:opacity-50`,
          err_bool
            ? "border-2 border-red-500 focus-visible:ring-red-500 dark:focus-visible:ring-red-500"
            : "focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600",
          className
        )}
        {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
      />
      {/* {icon && LinkIcon && (
        <LinkIcon className="pointer-events-none absolute left-3 top-[26px]  h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      )} */}
    </div>
  );

  const renderDifferentInputs = () => {
    // Render input field based on type
    switch (type) {
      case "select":
        return renderSelect();
      case "textarea":
        return renderTextarea();
      default:
        return renderInput();
    }
  };

  return (
    <div className="">
      {/* <label
        htmlFor={id}
        className={`mb-2 text-sm font-medium ${
          tooltip ? "flex items-center" : "block"
        } ${id === "email" ? "mt-1" : ""} `}
      >
        {label}
      </label> */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative p-[2px] rounded-lg transition-all duration-300 ${
          isHovered
            ? err_bool
              ? "bg-red-500"
              : "bg-blue-500"
            : "bg-transparent"
        }`}
      >
        {renderDifferentInputs()}
      </div>
      {/* {errors && (
        <InputErrors
          id={id}
          errors={errors}
          prependComponent={
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          }
        />
      )} */}
    </div>
  );
};

Input.displayName = "Input";

export { Input };
