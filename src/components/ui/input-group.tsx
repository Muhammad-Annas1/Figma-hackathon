import { cn } from "@/lib/utils";
import React, { InputHTMLAttributes } from "react";

// Type for InputGroupProps - accepts className and children
type InputGroupProps = {
  className?: string;
  children: React.ReactNode;
};

// Type for InputTextProps - extends the InputHTMLAttributes of an input element
type InputTextProps = InputHTMLAttributes<HTMLInputElement>;

// InputGroup component - wraps input and any other components within it
const InputGroup = ({ className, children }: InputGroupProps) => {
  return (
    <div
      className={cn(
        "input-group pl-4 relative flex items-center w-full rounded-full overflow-hidden",
        className ?? "" // applies the optional className if provided
      )}
    >
      {children}
    </div>
  );
};

// Input component - renders an input field with the passed props and classes
const Input = React.forwardRef<HTMLInputElement, InputTextProps>(
  (props: InputTextProps, ref: any) => {
    const { className, ...rest } = props;

    return (
      <input
        className={cn(
          "input-control w-full py-3 pr-4 outline-none placeholder:font-normal placeholder:text-sm",
          className ?? "" // applies the optional className if provided
        )}
        autoComplete="off" // prevents autocomplete suggestions
        autoCorrect="off" // prevents autocorrection on mobile devices
        spellCheck="false" // disables spell checking
        ref={ref} // attaches the ref to the input
        {...rest} // spreads the remaining props to the input
      />
    );
  }
);

// InputGroupText component - renders a label or text next to the input field
const InputGroupText = ({ className, children }: InputGroupProps) => {
  return (
    <div className={cn("input-group-text mr-3", className ?? "")}>
      {children}
    </div>
  );
};

// Associating Text component and Input component with InputGroup for easier usage
InputGroup.Text = InputGroupText;
InputGroup.Input = Input;

export default InputGroup;
