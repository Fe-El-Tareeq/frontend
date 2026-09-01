import { createContext, useContext, forwardRef } from "react";
import type {
  FormHTMLAttributes,
  HTMLAttributes,
  LabelHTMLAttributes,
} from "react";
import { cn } from "../../../utils/cn";
import { Input } from "../input/Input";
import type { InputProps } from "../input/Input";
import { PasswordInput } from "../input/PasswordInput";
import { Select } from "../input/Select";
import type { SelectProps } from "../input/Select";
import { Textarea } from "../input/Textarea";
import type { TextareaProps } from "../input/Textarea";

// Form Field Context
interface FormFieldContextValue {
  name?: string;
  error?: string;
  required?: boolean;
}

const FormFieldContext = createContext<FormFieldContextValue>({});

export const useFormField = () => useContext(FormFieldContext);

// Root Form
export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {}

const FormRoot = forwardRef<HTMLFormElement, FormProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <form ref={ref} className={cn("space-y-4", className)} {...props}>
        {children}
      </form>
    );
  },
);
FormRoot.displayName = "Form";

// Form Field Container
export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  error?: string;
  required?: boolean;
}

const FormField = ({
  name,
  error,
  required,
  className,
  children,
  ...props
}: FormFieldProps) => {
  return (
    <FormFieldContext.Provider value={{ name, error, required }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </FormFieldContext.Provider>
  );
};
FormField.displayName = "FormField";

// Form Label
export interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const FormLabel = ({
  className,
  required: propRequired,
  children,
  ...props
}: FormLabelProps) => {
  const { required: contextRequired } = useFormField();
  const isRequired = propRequired ?? contextRequired;

  return (
    <label
      className={cn(
        "block text-[14px] font-medium text-primary mb-1.5 text-right",
        className,
      )}
      {...props}
    >
      {children}
      {isRequired && <span className="mr-1 text-error font-bold">*</span>}
    </label>
  );
};
FormLabel.displayName = "FormLabel";

// Form Input (auto-injects error state from context)
const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ error: propError, ...props }, ref) => {
    const { error: contextError } = useFormField();
    const hasError = propError ?? contextError;

    return <Input ref={ref} error={hasError} {...props} />;
  },
);
FormInput.displayName = "FormInput";

// Form PasswordInput
const FormPasswordInput = forwardRef<
  HTMLInputElement,
  Omit<InputProps, "type">
>(({ error: propError, ...props }, ref) => {
  const { error: contextError } = useFormField();
  const hasError = propError ?? contextError;

  return <PasswordInput ref={ref} error={hasError} {...props} />;
});
FormPasswordInput.displayName = "FormPasswordInput";

// Form Select
const FormSelect = forwardRef<HTMLSelectElement, SelectProps>(
  ({ error: propError, ...props }, ref) => {
    const { error: contextError } = useFormField();
    const hasError = propError ?? contextError;

    return <Select ref={ref} error={hasError} {...props} />;
  },
);
FormSelect.displayName = "FormSelect";

// Form Textarea
const FormTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error: propError, ...props }, ref) => {
    const { error: contextError } = useFormField();
    const hasError = propError ?? contextError;

    return <Textarea ref={ref} error={hasError} {...props} />;
  },
);
FormTextarea.displayName = "FormTextarea";

// Form Error Message
export interface FormErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  message?: string;
}

const FormErrorMessage = ({
  className,
  message: propMessage,
  children,
  ...props
}: FormErrorMessageProps) => {
  const { error: contextError } = useFormField();
  const errorMessage = propMessage || contextError || children;

  if (!errorMessage) return null;

  return (
    <p
      className={cn(
        "mt-1.5 text-right text-[12px] font-medium text-error flex items-center gap-1",
        className,
      )}
      {...props}
    >
      {errorMessage}
    </p>
  );
};
FormErrorMessage.displayName = "FormErrorMessage";

// Form Helper Text
const FormHelperText = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => {
  if (!children) return null;

  return (
    <p
      className={cn(
        "mt-1.5 text-right text-[12px] text-text-secondary leading-relaxed",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
};
FormHelperText.displayName = "FormHelperText";

// Compound Component Assembly
export const Form = Object.assign(FormRoot, {
  Field: FormField,
  Label: FormLabel,
  Input: FormInput,
  PasswordInput: FormPasswordInput,
  Select: FormSelect,
  Textarea: FormTextarea,
  ErrorMessage: FormErrorMessage,
  HelperText: FormHelperText,
});
