interface _ICommonFieldProps {
  name: string;
  label: string;
  type: _TFieldType;
  options?: {
    value: string | number;
    label: string;
  }[];
  placeholder?: string;
  group?: string;
  disabled?: boolean;
  description?: string;
  renderAfter?: React.ReactNode;
}

type _TFieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "radio"
  | "select";
type _TVariants = "default" | "secondary" | "destructive" | "outline";
type _TSizes = "default" | "lg" | "sm" | "icon";
type _TRefDivElement = React.HTMLAttributes<HTMLDivElement>;
type _TRefPElement = React.HTMLAttributes<HTMLParagraphElement>;
type _TIconType = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string;
    titleId?: string;
  } & React.RefAttributes<SVGSVGElement>
>;

type _TActionResult<T = unknown> =
  | {
      type: "success";
      message: string;
      data?: T; // Allow action-specific data in the result
    }
  | {
      type: "error";
      errors: Record<string, string[] | undefined>;
    }
  | { type: undefined; message: null; errors: null };