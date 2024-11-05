import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  ControllerProps,
} from "react-hook-form";
import { cn } from "../classes.utils";

interface _IFormFieldContextProps {
  name: string;
}

interface _IFormItemContextProps {
  id: string;
}

// Use correct typing for FormField
type FormFieldProps = _IFormFieldContextProps &
  Omit<ControllerProps, "name" | "control">;

const Form = FormProvider;

const FormFieldContext = React.createContext<
  _IFormFieldContextProps | undefined
>(undefined);
const FormItemContext = React.createContext<_IFormItemContextProps | undefined>(
  undefined
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-1", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

// Updated FormField component
const FormField: React.FC<FormFieldProps> = ({
  name,
  rules,
  defaultValue = "",
  render,
  ...controllerProps
}) => {
  const { control } = useFormContext();

  return (
    <FormFieldContext.Provider value={{ name }}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={render}
        {...controllerProps} // Pass only valid Controller props
      />
    </FormFieldContext.Provider>
  );
};

export { FormItem, FormField, FormFieldContext, FormItemContext };
export default Form;
