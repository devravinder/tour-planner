import { FieldErrors } from "react-hook-form";
import tw from "tailwind-styled-components";
import { ErrorMessage as HookformErrorMessage } from "@hookform/error-message";

export const Label = tw.label`group-focus-within:text-primary`;
export const InputContainer = tw.div`group flex flex-col gap-y-1`;
export const Description = tw.p`text-[0.8rem]`;
export const ErrorMessage = tw(Description)`text-danger`;

export const InputError = ({
  className = "",
  ...props
}: {
  name: keyof FieldErrors;
  errors: FieldErrors;
  className?: string;
}) => (
  <HookformErrorMessage
    {...props}
    render={(error) => (
      <ErrorMessage className={className}>{error.message}</ErrorMessage>
    )}
  />
);
