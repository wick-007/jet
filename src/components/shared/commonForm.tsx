import { extractImagesFromData, groupFieldConfigs } from "@/utils/root.utils";
import { Input } from "../ui/input";
import { useActionState, useState, Fragment, use, useEffect } from "react";
import {
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
  FormSuccess,
} from "../ui/form";
import { FileUpload } from "./fileUpload";
import { FieldValues, UseFormReturn } from "react-hook-form";
import Form, { FormField, FormItem } from "@/utils/contexts/forms.context";
import { Typography } from "..";
import { SvgSpinner } from "../ui/icons";
import { ModalContext } from "@/utils/contexts/modal.context";

type _TActionFunction<R> = (
  initialState: _TActionResult<R>,
  formData: FormData
) => Promise<_TActionResult<R>>;
interface _IDynamicFormProps<T extends FieldValues, R> {
  fields: _ICommonFieldProps[];
  action: _TActionFunction<R>;
  form: UseFormReturn<T>;
  actionType?: "create" | "update";
  formType?: "single" | "grouped";
  pendingText?: string;
  label?: string;
  data?: Record<string, unknown>;
  className?: string;
  includeFiles?: boolean;
  id: string;
  isModal?: boolean;
  entity?: string;
}
export default function DynamicForm<T extends FieldValues, R>({
  form,
  fields,
  action,
  id,
  actionType = "create",
  entity,
  formType,
  includeFiles,
  isModal,
  data,
}: _IDynamicFormProps<T, R>) {
  const initialState: _TActionResult<R> = {
    type: undefined,
    message: null,
    errors: null,
  };

  console.log(id);

  const resolvedAction =
    actionType === "create" ? action : action;

  const [showSuccess, setShowSuccess] = useState(false);
  const { setOpen } = use(ModalContext);
  const [state, dispatch, isPending] = useActionState(
    resolvedAction,
    initialState
  );

  const imageUrls = data ? extractImagesFromData(data) : [];

  const [files, setFiles] = useState<File[]>([]);
  console.log(files);

  const handleFileUpload = (newFiles: File[]) => {
    if (includeFiles) {
      setFiles(newFiles);
    }
  };

    useEffect(() => {
      if (state?.type === "success") {
        setShowSuccess(true);
        const timer = setTimeout(() => {
          setShowSuccess(false);
          if (isModal && entity) {
            setOpen(`${entity}-${actionType}`, false);
          }
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [actionType, entity, isModal, setOpen, state]);
  
    // const onSubmit = useCallback(
    //   async (formData: T) => {
    //     const formDataObject = new FormData();
    //     Object.entries(formData).forEach(([key, value]) => {
    //       if (value !== undefined) {
    //         formDataObject.append(key, value as string); // Safe casting
    //       }
    //     });

    //     if (includeFiles) {
    //       files.forEach((file) => {
    //         console.log("FILE TO SUBMIT: ", file);
    //         formDataObject.append("files", file);
    //       });
    //     }

    //     await dispatch(formDataObject);
    //   },
    //   [dispatch, files, includeFiles]
    // );


  const groupedFieldConfigs = groupFieldConfigs(fields);

  const label = actionType === "create" ? "Create" : "Update";
  const text = actionType === "create" ? "Creating" : "Updating";

  const renderSingleFields = (fields: _ICommonFieldProps[]) => (
    <>
      {fields.map((field) => (
        <FormField
          key={field.name}
          name={field.name}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <FormControl className="mt-1 mb-2">
                <Input
                  {...formField}
                  type={field.type}
                  placeholder={field.placeholder}
                  options={field.type === "select" ? field.options : undefined}
                  className="form-input"
                />
              </FormControl>
              {field.description && (
                <FormDescription>{field.description}</FormDescription>
              )}
              <FormMessage />
              {field.renderAfter}
            </FormItem>
          )}
        />
      ))}
    </>
  );

  const renderGroupedFields = () => (
    <>
      {Object.entries(groupedFieldConfigs).map(([title, fields]) => (
        <Fragment key={title}>
          <Typography variant="h3" className="mb-4">
            {title}
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4">
            {renderSingleFields(fields)}
          </div>
        </Fragment>
      ))}
    </>
  );

  return (
    <Form {...form}>
      <form action={dispatch} className={`rounded-md p-4 md:p-6`}>
        {showSuccess && state?.type === "success" && (
          <FormSuccess message={state?.message} />
        )}
        <div className="">
          {formType === "single"
            ? renderSingleFields(fields)
            : renderGroupedFields()}
        </div>

        {includeFiles && (
          <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg mt-4">
            <FileUpload onChange={handleFileUpload} initialUrls={imageUrls} />
          </div>
        )}

        <button
          aria-disabled={isPending}
          className="aria-disabled:pointer-events-none rounded w-full bg-blue-500 text-white py-2 mt-4 aria-disabled:bg-opacity-70"
        >
          {isPending ? (
            <div className="flex items-center justify-between capitalize">
              <p className="">{text}...</p>
              <SvgSpinner className="text-white" color="white" />
            </div>
          ) : (
            `${label}`
          )}
        </button>
      </form>
    </Form>
  );
}
